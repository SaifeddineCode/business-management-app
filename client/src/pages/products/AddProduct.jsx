import React, { useState } from 'react';
import { FiSave, FiArrowLeft, FiUpload, FiPackage, FiDollarSign, FiHash, FiTag } from 'react-icons/fi';
import { MdDescription, MdCategory, MdInventory } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate = useNavigate();
  
  const [productData, setProductData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    sku: '',
    description: '',
    status: 'Disponible',
    weight: '',
    dimensions: {
      length: '',
      width: '',
      height: ''
    },
    tags: []
  });

  const [currentTag, setCurrentTag] = useState('');
  const [errors, setErrors] = useState({});

  const categories = [
    'Électronique',
    'Mobilier',
    'Livres',
    'Vêtements',
    'Électroménager',
    'Alimentation',
    'Beauté',
    'Sport',
    'Jardin',
    'Bureau'
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!productData.name.trim()) newErrors.name = 'Le nom est requis';
    if (!productData.category) newErrors.category = 'La catégorie est requise';
    if (!productData.price || productData.price <= 0) newErrors.price = 'Prix invalide';
    if (!productData.stock || productData.stock < 0) newErrors.stock = 'Stock invalide';
    if (!productData.sku.trim()) newErrors.sku = 'Le SKU est requis';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Dans une vraie application, on enverrait les données à l'API
      const newProduct = {
        id: Date.now(),
        ...productData,
        price: parseFloat(productData.price),
        stock: parseInt(productData.stock),
        weight: productData.weight ? parseFloat(productData.weight) : null,
        dimensions: productData.dimensions
      };
      
      // Ici, on simule l'ajout au state global
      // En réalité, vous utiliseriez Context API, Redux, ou une requête API
      console.log('Nouveau produit:', newProduct);
      
      alert(`Produit "${productData.name}" créé avec succès !`);
      navigate('/products'); // Retour à la liste
    }
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !productData.tags.includes(currentTag.trim())) {
      setProductData({
        ...productData,
        tags: [...productData.tags, currentTag.trim()]
      });
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setProductData({
      ...productData,
      tags: productData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const generateSku = () => {
    const prefix = productData.category ? productData.category.substring(0, 3).toUpperCase() : 'PROD';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newSku = `${prefix}-${randomNum}`;
    setProductData({ ...productData, sku: newSku });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Navigation */}
      <div className="mb-8">
        <Link
          to="/products"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <FiArrowLeft className="mr-2" />
          Retour à la liste
        </Link>
        
        <div className="flex items-center mb-6">
          <div className="p-3 rounded-lg mr-4" style={{ backgroundColor: '#112074', color: 'white' }}>
            <FiPackage className="text-2xl" />
          </div>
          <div>
            <h1 className="text-3xl font-bold" style={{ color: '#112074' }}>Ajouter un Nouveau Produit</h1>
            <p className="text-gray-600">Remplissez le formulaire pour ajouter un produit à votre catalogue</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section: Informations de base */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6 pb-4 border-b" style={{ color: '#112074', borderColor: '#11207420' }}>
              <MdInventory className="inline mr-2" />
              Informations de Base
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nom du produit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom du Produit *
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.name ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                  }`}
                  style={{ color: '#112074' }}
                  value={productData.name}
                  onChange={(e) => setProductData({...productData, name: e.target.value})}
                  placeholder="Ex: iPhone 14 Pro Max"
                />
                {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
              </div>

              {/* Catégorie */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Catégorie *
                </label>
                <div className="relative">
                  <MdCategory className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 appearance-none ${
                      errors.category ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                    style={{ color: '#112074' }}
                    value={productData.category}
                    onChange={(e) => setProductData({...productData, category: e.target.value})}
                  >
                    <option value="">Sélectionnez une catégorie</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                {errors.category && <p className="mt-2 text-sm text-red-600">{errors.category}</p>}
              </div>

              {/* SKU */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SKU (Référence) *
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <FiHash className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.sku ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                      }`}
                      style={{ color: '#112074' }}
                      value={productData.sku}
                      onChange={(e) => setProductData({...productData, sku: e.target.value})}
                      placeholder="Ex: ELEC-001"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={generateSku}
                    className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                    style={{ color: '#112074' }}
                  >
                    Générer
                  </button>
                </div>
                {errors.sku && <p className="mt-2 text-sm text-red-600">{errors.sku}</p>}
              </div>

              {/* Statut */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Statut Initial
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Disponible', 'Stock bas', 'Rupture'].map(status => (
                    <label
                      key={status}
                      className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${
                        productData.status === status
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="status"
                        className="sr-only"
                        checked={productData.status === status}
                        onChange={() => setProductData({...productData, status})}
                      />
                      <span className={`font-medium ${
                        productData.status === status ? 'text-blue-700' : 'text-gray-700'
                      }`}>
                        {status}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section: Prix et Stock */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6 pb-4 border-b" style={{ color: '#112074', borderColor: '#11207420' }}>
              <FiDollarSign className="inline mr-2" />
              Prix et Stock
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Prix */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prix (€) *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.price ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                    style={{ color: '#112074' }}
                    value={productData.price}
                    onChange={(e) => setProductData({...productData, price: e.target.value})}
                    placeholder="0.00"
                  />
                </div>
                {errors.price && <p className="mt-2 text-sm text-red-600">{errors.price}</p>}
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantité en Stock *
                </label>
                <input
                  type="number"
                  min="0"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.stock ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                  }`}
                  style={{ color: '#112074' }}
                  value={productData.stock}
                  onChange={(e) => setProductData({...productData, stock: e.target.value})}
                  placeholder="Ex: 100"
                />
                {errors.stock && <p className="mt-2 text-sm text-red-600">{errors.stock}</p>}
              </div>
            </div>
          </div>

          {/* Section: Description */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6 pb-4 border-b" style={{ color: '#112074', borderColor: '#11207420' }}>
              <MdDescription className="inline mr-2" />
              Description et Détails
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description du Produit
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 h-48 resize-none"
                  style={{ color: '#112074' }}
                  value={productData.description}
                  onChange={(e) => setProductData({...productData, description: e.target.value})}
                  placeholder="Décrivez votre produit en détail..."
                />
                <p className="mt-2 text-sm text-gray-500">
                  {productData.description.length}/2000 caractères
                </p>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiTag className="inline mr-2" />
                  Tags
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                    style={{ color: '#112074' }}
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    placeholder="Ajouter un tag (appuyez sur Entrée)"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    style={{ color: '#112074' }}
                  >
                    Ajouter
                  </button>
                </div>
                
                {productData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {productData.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section: Informations supplémentaires */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6 pb-4 border-b" style={{ color: '#112074', borderColor: '#11207420' }}>
              <FiPackage className="inline mr-2" />
              Informations Supplémentaires
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Poids */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Poids (kg)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                    style={{ color: '#112074' }}
                    value={productData.weight}
                    onChange={(e) => setProductData({...productData, weight: e.target.value})}
                    placeholder="Ex: 0.5"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">kg</span>
                </div>
              </div>

              {/* Dimensions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dimensions (cm)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    min="0"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="L"
                    style={{ color: '#112074' }}
                    value={productData.dimensions.length}
                    onChange={(e) => setProductData({
                      ...productData,
                      dimensions: { ...productData.dimensions, length: e.target.value }
                    })}
                  />
                  <input
                    type="number"
                    min="0"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="l"
                    style={{ color: '#112074' }}
                    value={productData.dimensions.width}
                    onChange={(e) => setProductData({
                      ...productData,
                      dimensions: { ...productData.dimensions, width: e.target.value }
                    })}
                  />
                  <input
                    type="number"
                    min="0"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="H"
                    style={{ color: '#112074' }}
                    value={productData.dimensions.height}
                    onChange={(e) => setProductData({
                      ...productData,
                      dimensions: { ...productData.dimensions, height: e.target.value }
                    })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-500">
                <p>* Champs obligatoires</p>
              </div>
              
              <div className="flex gap-4">
                <Link
                  to="/products"
                  className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Annuler
                </Link>
                <button
                  type="submit"
                  className="flex items-center justify-center px-8 py-3 rounded-lg font-medium text-white transition-all hover:opacity-90 shadow-md hover:shadow-lg"
                  style={{ backgroundColor: '#112074' }}
                >
                  <FiSave className="mr-2" />
                  Créer le Produit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;