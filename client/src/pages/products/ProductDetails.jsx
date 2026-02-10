import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchWithToken } from '../../utils/api';

export default function ProductDetails() {
  const {id} = useParams()

  const [product,setProduct] = useState({})


  useEffect(()=>{

    const fetchSingleProduct = async() =>{
        const response = await fetchWithToken(`/api/products/${id}`)
        if(!response.ok){   
            throw new Error("something went wrong while fetching the single product")
        }

        const data = await response.json()
        return setProduct(data)
    }

    fetchSingleProduct()
  },[id])


useEffect(()=>{
    console.log(product)
},[product])


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Détails du Produit
          </h1>
          <p className="text-gray-600">Informations du produit</p>
        </div>

        {/* Product Details Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          
          {/* Nom du Produit */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nom du Produit
            </label>
            <p className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-medium">
              {product.product_name}
            </p>
          </div>

          {/* Catégorie */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Catégorie
            </label>
            <p className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-medium">
              {product.category}
            </p>
          </div>

          {/* Prix and Quantité en Stock - Side by Side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            
            {/* Prix */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Prix (€)
              </label>
              <div className="relative">
                <p className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-medium">
                  {product.product_price} €
                </p>
              </div>
            </div>

            {/* Quantité en Stock */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Quantité en Stock
              </label>
              <p className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-medium">
                {product.stock} unités
              </p>
            </div>
          </div>

          {/* Description du Produit */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description du Produit
            </label>
            <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 min-h-[120px]">
              <p className="whitespace-pre-wrap">{product.description}</p>
            </div>
          </div>

          {/* Stock Status Badge */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              {parseInt(product.stock) > 0 ? (
                <div className="bg-green-100 border border-green-400 rounded-lg p-4">
                  <p className="text-green-800 font-semibold">✓ En Stock</p>
                  <p className="text-green-700 text-sm">{product.stock} unités disponibles</p>
                </div>
              ) : (
                <div className="bg-red-100 border border-red-400 rounded-lg p-4">
                  <p className="text-red-800 font-semibold">✗ Rupture de Stock</p>
                  <p className="text-red-700 text-sm">Produit actuellement indisponible</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Informations supplémentaires</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <p>• <span className="font-semibold">Réf. Produit:</span> {product.sku}</p>
            <p>• <span className="font-semibold">Dernière mise à jour:</span> 10 Février 2026</p>
            <p>• <span className="font-semibold">Statut:</span> <span className="text-green-600 font-semibold">{product.status}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}