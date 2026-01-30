import React, { useEffect, useState } from 'react';
import { FiSave, FiArrowLeft, FiUpload, FiPackage, FiDollarSign, FiHash, FiTag } from 'react-icons/fi';
import { MdDescription, MdCategory, MdInventory } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate = useNavigate();
  
  const [productData, setProductData] = useState({
    product_name: '',
    category: '',
    product_price: '',
    stock: '',
    sku: '',
    description: '',
    status: 'Disponible',
  });

  
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

  const handleAddProduct = () => {
    return console.log("hellllo")
  };



  const generateSku = () => {
    const prefix = productData.category ? productData.category.substring(0, 3).toUpperCase() : 'PROD';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newSku = `${prefix}-${randomNum}`;
    setProductData({ ...productData, sku: newSku });
  };


  useEffect(()=>{
    console.log(productData)
  },[productData])

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
        {/* <form onSubmit={handleSubmit} className="space-y-8"> */}
        <form  className="space-y-8">
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
                  value={productData.product_name}
                  onChange={(e) => setProductData({...productData, product_name: e.target.value})}
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
                    value={productData.product_price}
                    onChange={(e) => setProductData({...productData, product_price: e.target.value})}
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
                type="button"
                  onClick={()=>handleAddProduct()}
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