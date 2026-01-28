import React, { useState } from 'react';
import { useEffect } from 'react';
import { FiPlus, FiEye, FiEdit, FiTrash2, FiSearch, FiFilter } from 'react-icons/fi';
import { MdInventory } from 'react-icons/md';
import { fetchWithToken } from '../../utils/api';
import { use } from 'react';

const Products = () => {




const [products,setProducts] = useState([])



useEffect(()=>{
    const fetchProducts = async () =>{
        try{
            const result = await fetchWithToken("/api/products")
            const data = await result.json()
            console.log(data)
            
            if(!result.ok){
            throw new Error("Error while fetching product FS")
            }
            return setProducts(data)
        }
        catch (err){
            console.log(err)
        }
    }

    fetchProducts()
},[])










  const [dummyProducts, setDummyProducts] = useState([
    { id: 1, name: 'Ordinateur Portable', category: 'Électronique', price: 899.99, stock: 15, status: 'Disponible' },
    { id: 2, name: 'Smartphone', category: 'Électronique', price: 699.99, stock: 32, status: 'Disponible' },
    { id: 3, name: 'Chaise de Bureau', category: 'Mobilier', price: 249.99, stock: 8, status: 'Stock bas' },
    { id: 4, name: 'Livre React Avancé', category: 'Livres', price: 39.99, stock: 0, status: 'Rupture' },
    { id: 5, name: 'Casque Audio', category: 'Électronique', price: 129.99, stock: 25, status: 'Disponible' },
    { id: 6, name: 'Table Basse', category: 'Mobilier', price: 179.99, stock: 5, status: 'Stock bas' },
    { id: 7, name: 'T-shirt Premium', category: 'Vêtements', price: 29.99, stock: 48, status: 'Disponible' },
    { id: 8, name: 'Cafetière', category: 'Électroménager', price: 89.99, stock: 12, status: 'Disponible' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const categories = ['Tous', 'Electronics', 'ELEC1', 'ELEC2', 'categoryx'];

  // Filtrer les produits
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Gestionnaires d'événements pour les actions
  const handleAddProduct = () => {
    const newProduct = {
      id: dummyProducts.length + 1,
      name: `Nouveau Produit ${dummyProducts.length + 1}`,
      category: 'Nouvelle Catégorie',
      price: 99.99,
      stock: 10,
      status: 'Disponible'
    };
    setDummyProducts([newProduct, ...dummyProducts]);
    alert(`Produit "${newProduct.name}" ajouté!`);
  };

  const handleViewProduct = (id) => {
    const product = dummyProducts.find(p => p.id === id);
    alert(`Visualisation: ${product.name}\nCatégorie: ${product.category}\nPrix: ${product.price}€\nStock: ${product.stock}\nStatut: ${product.status}`);
  };

  const handleEditProduct = (id) => {
    const product = dummyProducts.find(p => p.id === id);
    const newName = prompt(`Modifier le nom du produit (actuel: ${product.name}):`, product.name);
    if (newName) {
      const updatedProducts = dummyProducts.map(p => 
        p.id === id ? { ...p, name: newName } : p
      );
      setDummyProducts(updatedProducts);
      alert(`Produit "${product.name}" modifié!`);
    }
  };

  const handleDeleteProduct = (id) => {
    const product = dummyProducts.find(p => p.id === id);
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${product.name}" ?`)) {
      const updatedProducts = dummyProducts.filter(p => p.id !== id);
      setDummyProducts(updatedProducts);
      alert(`Produit "${product.name}" supprimé!`);
    }
  };

  return ( 
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* En-tête */}
      <header className="mb-8">
        <div className="flex items-center mb-4">
          <MdInventory className="text-4xl mr-3" style={{ color: '#112074' }} />
          <h1 className="text-3xl font-bold" style={{ color: '#112074' }}>Gestion des Produits</h1>
        </div>
        <p className="text-gray-600 text-lg">Gérez votre inventaire, ajoutez, modifiez ou supprimez des produits</p>
      </header>

      {/* Section de contrôle */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-semibold" style={{ color: '#112074' }}>Liste des Produits</h2>
            <p className="text-gray-500">{filteredProducts.length} produit(s) trouvé(s)</p>
          </div>
          
          <button 
            onClick={handleAddProduct}
            className="flex items-center justify-center px-5 py-3 rounded-lg font-medium text-white transition-all hover:opacity-90"
            style={{ backgroundColor: '#112074' }}
          >
            <FiPlus className="mr-2" />
            Ajouter un Produit
          </button>
        </div>

        {/* Filtres et recherche */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un produit ou catégorie..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              style={{ borderColor: '#112074', color: '#112074' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center">
            <FiFilter className="mr-2" style={{ color: '#112074' }} />
            <select 
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
              style={{ borderColor: '#112074', color: '#112074' }}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tableau des produits */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="text-left text-sm font-semibold uppercase tracking-wider" style={{ color: '#112074' }}>
                <th className="px-6 py-3">Nom du Produit</th>
                <th className="px-6 py-3">Catégorie</th>
                <th className="px-6 py-3">Prix (€)</th>
                <th className="px-6 py-3">Stock</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{product.product_name}</td>
                  <td className="px-6 py-4 text-gray-700">{product.category}</td>
                  <td className="px-6 py-4 font-medium" style={{ color: '#112074' }}>{product.product_price.toFixed(2)} €</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.stock > 15 ? 'bg-green-100 text-green-800' : 
                      product.stock > 5 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.stock} unités
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium `}>
                      {product.description}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center space-x-3">
                      <button 
                        onClick={() => handleViewProduct(product.id)}
                        className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                        title="Voir les détails"
                      >
                        <FiEye />
                      </button>
                      <button 
                        onClick={() => handleEditProduct(product.id)}
                        className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                        title="Modifier"
                      >
                        <FiEdit />
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                        title="Supprimer"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <MdInventory className="text-6xl mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-medium text-gray-500 mb-2">Aucun produit trouvé</h3>
              <p className="text-gray-400">Essayez de modifier vos critères de recherche</p>
            </div>
          )}
        </div>
      </div>

      {/* Résumé */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-medium text-gray-500 mb-2">Produits Disponibles</h3>
          <p className="text-3xl font-bold" style={{ color: '#112074' }}>
            {dummyProducts.filter(p => p.status === 'Disponible').length}
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-medium text-gray-500 mb-2">Stock Bas</h3>
          <p className="text-3xl font-bold" style={{ color: '#112074' }}>
            {dummyProducts.filter(p => p.status === 'Stock bas').length}
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-medium text-gray-500 mb-2">En Rupture</h3>
          <p className="text-3xl font-bold" style={{ color: '#112074' }}>
            {dummyProducts.filter(p => p.status === 'Rupture').length}
          </p>
        </div>
      </div>

      {/* Pied de page */}
      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>Page de gestion des produits • {new Date().getFullYear()} • Tous les produits sont fictifs</p>
      </footer>
    </div>
  );
};

export default Products;