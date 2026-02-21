import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { FaMoon, FaPlus, FaTrash } from 'react-icons/fa';
import { fetchWithToken } from '../../utils/api';

export default function AddPurchaserder() {

  const [sequenceNumber,setSequenceNumber] = useState(1)
  const [purchaseOrderData, setPurchaseOrderData] = useState({
    po_number: `PO-${String(sequenceNumber).padStart(3, '0')}-${new Date().getFullYear().toString().slice(-2)}`,
    order_date: '02/15/2026',
    currency: 'MAD (Dirham Marocain)',
    subject: '',
    incoterm: 'DDP',
    delivery_location: '',
    supplier_id: '',
    article_code_type: 'Notre Société',
    requires_signature: 'Avec Signature',
    tva_rate: 20,
    internal_notes: '',
    purchaseOrderItems :[]
  });

  

  const [activeTab, setActiveTab] = useState('details');

 
 
 
 
  const addPurchaseOrderItem = () =>{
    setPurchaseOrderData((prev)=>({...prev,
      purchaseOrderItems : [...purchaseOrderData.purchaseOrderItems ,{
        id:Date.now().toString(36) + Math.random().toString(36).substring(2),
        reference : "",
        product_id : "",
        unit : "",
        quantity : "",
        unit_price : "" , 
        discount_percent :"",
        line_total : ""
      }]
    }))
  }

  const deletePurchaseOrderItem =  (item_ID) =>{
    setPurchaseOrderData((prev)=>({
      ...prev,
      purchaseOrderItems : purchaseOrderData.purchaseOrderItems.filter((item)=>{
        return item.id !== item_ID
      })
    }))
  }
 


  // const numberToFrench = (num) => {
  //   const ones = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'];
  //   const teens = ['dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
  //   const tens = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingt', 'quatre-vingt-dix'];

  //   if (num === 0) return 'zéro';
  //   if (num < 10) return ones[num];
  //   if (num < 20) return teens[num - 10];
  //   if (num < 100) {
  //     const ten = Math.floor(num / 10);
  //     const one = num % 10;
  //     return tens[ten] + (one > 0 ? '-' + ones[one] : '');
  //   }
  //   if (num < 1000) {
  //     const hundred = Math.floor(num / 100);
  //     const rest = num % 100;
  //     return (hundred > 1 ? ones[hundred] + ' cents' : 'cent') + (rest > 0 ? ' ' + numberToFrench(rest) : '');
  //   }
  //   return num.toString();
  // };




  // const addPurchaseOrder = () =>{
  //   setSequenceNumber((prev)=>prev + 1)
  // }

  const fetchSuppliers = async () =>{
      
      const result = await fetchWithToken("/api/suppliers")
      if(!result.ok){
        throw new Error("error while fetching suppliers")
      }
      return result.json()
  
    }

  const {data : suppliers,isloading,error} = useQuery({
    queryKey:["suppliers"],
    queryFn:fetchSuppliers
  })


  useEffect(()=>{
    console.log(purchaseOrderData.supplier_id)
  },[purchaseOrderData.supplier_id])



  if(isloading) return <div> isloading </div>
  if(error) return <div> {error} </div>

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-lg p-4 mb-6 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start">
            <button className="bg-[#1e3a8a] bg-opacity-20 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-opacity-30 transition flex items-center gap-2 border border-white border-opacity-30">
              <span>📋</span> Liste des BCs
            </button>
            <button
              // onClick={()=>addPurchaseOrder()}
              className="bg-[#1e3a8a] bg-opacity-20 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-opacity-30 transition flex items-center gap-2 border border-white border-opacity-30">
              <span>➕</span> Ajouter un BC
            </button>
            <div className="flex items-center gap-3 ml-2">
              <span className="text-white font-semibold">●</span>
              <label className="flex items-center gap-2 cursor-pointer text-white text-sm">
                <input type="radio" name="signature" checked={purchaseOrderData.requires_signature === 'Avec Signature'} onChange={() => setPurchaseOrderData({...purchaseOrderData, requires_signature: 'Avec Signature'})} className="w-4 h-4" />
                Avec Signature
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-white text-sm">
                <input type="radio" name="signature" checked={purchaseOrderData.requires_signature === 'Sans Signature'} onChange={() => setPurchaseOrderData({...purchaseOrderData, requires_signature: 'Sans Signature'})} className="w-4 h-4" />
                Sans Signature
              </label>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-center md:justify-end">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition flex items-center gap-2">
              <span>↗️</span> Transformer en BR
            </button>
            <button className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-opacity-30 transition flex items-center gap-2 border border-white border-opacity-30">
              <span>🖨️</span> Imprimer Local
            </button>
            <button className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-opacity-30 transition flex items-center gap-2 border border-white border-opacity-30">
              <span>🖨️</span> Imprimer Intl.
            </button>
          </div>
        </div>
      </div>

      {/* Three Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Left Column - Information Commande */}
        <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-blue-600">
          <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-4">Information Commande</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">N° Bon de Commande</label>
              <input
                type="text"
                name="numeroBc"
                value={purchaseOrderData.po_number}
                onChange={(e)=>setPurchaseOrderData((prev)=>({...prev,po_number : e.target.value}))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
              <div className="relative">
                <input
                  type="date"
                  name="date"
                  value={purchaseOrderData.date}
                  onChange={(e)=>setPurchaseOrderData((prev)=>({...prev,order_date : e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Devise</label>
              <select
                name="devise"
                value={purchaseOrderData.currency}
                onChange={(e)=>setPurchaseOrderData((prev)=>({...prev,currency : e.target.value}))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900 bg-white"
              >
                <option>MAD (Dirham Marocain)</option>
                <option>EUR (€)</option>
                <option>USD ($)</option>
                <option>GBP (£)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Middle Column - Objet & Incoterm */}
        <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-blue-600">
          <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-4">Objet & Incoterm</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Objet</label>
              <textarea
                name="objet"
                value={purchaseOrderData.subject}
                onChange={(e)=>setPurchaseOrderData((prev)=>({...prev,subject : e.target.value}))}
                rows="4"
                placeholder="Saisir l'objet de la commande..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Incoterm</label>
              <div className="flex gap-2">
                <select
                  name="incoterm"
                  value={purchaseOrderData.incoterm}
                  onChange={(e)=>setPurchaseOrderData((prev)=>({...prev,incoterm : e.target.value}))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900 bg-white"
                >
                  <option>DDP</option>
                  <option>FOB</option>
                  <option>CIF</option>
                  <option>EXW</option>
                </select>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg transition flex items-center gap-1">
                  📍
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Lieu de livraison</label>
              <input
                type="text"
                name="lieuLivraison"
                value={purchaseOrderData.delivery_location}
                onChange={(e)=>setPurchaseOrderData((prev)=>({...prev,delivery_location : e.target.value}))}
                placeholder="Lieu de livraison"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Fournisseur */}
        <div className="bg-green-50 rounded-lg p-6 shadow-md border-t-4 border-green-600">
          <h3 className="text-xs font-bold text-green-700 uppercase tracking-wider mb-4">Fournisseur</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Sélectionner Fournisseur</label>
              <select
                name="fournisseur"
                value={purchaseOrderData.supplier_id}
                onChange={(e)=>setPurchaseOrderData((prev)=>({...prev,supplier_id : e.target.value}))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-900 bg-white"
              >
                <option value=" "> Choisissez un fournisseur </option>
                {/* <option>Sélectionnez un fournisseur...</option>
                <option>Fournisseur A</option>
                <option>Fournisseur B</option>
                <option>Fournisseur C</option> */}
                {suppliers?.map((supplier,index)=>{
                  return (
                    <option key={index} value={supplier.id}> {supplier.contact_person} </option>
                  )
                })}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Adresse</label>
              {/* <input
                type="text"
                name="adresseFournisseur"
                // onChange={handleFormChange}
                placeholder="L'adresse du fournisseur s'affichera ici..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-600 italic bg-gray-50"
              /> */}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Type de code Articles</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="typeCodeArticles"
                    value="Notre Société"
                    checked={purchaseOrderData.article_code_type === 'Notre Société'}
                    onChange={(e)=>setPurchaseOrderData((prev)=>({...prev,article_code_type : e.target.value}))}
                    className="w-4 h-4 accent-green-600"
                  />
                  <span className="text-gray-900 text-sm">Notre Société</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="typeCodeArticles"
                    value="Fournisseur"
                    checked={purchaseOrderData.article_code_type === 'Fournisseur'}
                    onChange={(e)=>setPurchaseOrderData((prev)=>({...prev,article_code_type : e.target.value}))}
                    className="w-4 h-4 accent-green-600"
                  />
                  <span className="text-gray-900 text-sm">Fournisseur</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        
        {/* Tabs */}
        <div className="border-b border-gray-200 flex gap-0">
          <button
            onClick={() => setActiveTab('details')}
            className={`flex-1 px-6 py-4 font-semibold text-sm flex items-center gap-2 transition border-b-2 ${
              activeTab === 'details'
                ? 'border-blue-900 text-blue-900 bg-blue-50'
                : 'border-transparent text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span>📋</span> Détails Bon de Commande
          </button>
          <button
            onClick={() => setActiveTab('virement')}
            className={`flex-1 px-6 py-4 font-semibold text-sm flex items-center gap-2 transition border-b-2 ${
              activeTab === 'virement'
                ? 'border-blue-900 text-blue-900 bg-blue-50'
                : 'border-transparent text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span>💳</span> Ordre de virement
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'details' && (
            <div>
              {/* Add Button */}
              <div className="flex justify-end mb-6">
                <button
                  onClick={addPurchaseOrderItem}
                  className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold text-sm transition flex items-center gap-2"
                >
                  <FaPlus size={18} /> Ajouter un élément
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100 border-b-2 border-gray-300">
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">RÉF</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">PRODUIT</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">UNITÉ</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">QTÉ</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">TARIF U.HT</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">REMISE %</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">MONTANT HT</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchaseOrderData.purchaseOrderItems.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="px-4 py-8 text-center text-gray-500 italic">
                          Aucune ligne de commande ajoutée pour le moment.
                        </td>
                      </tr>
                    ) : (
                      purchaseOrderData.purchaseOrderItems.map((item) => (
                        <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-900">{item.reference}</td>
                          <td className="px-4 py-3 text-gray-900">{item.product_id}</td>
                          <td className="px-4 py-3 text-gray-900">{item.unit}</td>
                          <td className="px-4 py-3 text-center text-gray-900">{item.quantity}</td>
                          <td className="px-4 py-3 text-right text-gray-900">{item.unit_price}</td>
                          <td className="px-4 py-3 text-center text-gray-900">{item.discount_percent || '-'}</td>
                          <td className="px-4 py-3 text-right font-semibold text-gray-900">{item.line_total}</td>
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={()=>deletePurchaseOrderItem(item.id)}
                              className="text-red-600 hover:text-red-800 transition"
                            >
                              <FaTrash size={18} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                    {/* Input Row */}
                    {/* <tr className="border-t-2 border-gray-400 bg-gray-50">
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          name="ref"
                          value={newItem.ref}
                          // onChange={handleItemChange}
                          placeholder="Réf..."
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 text-sm"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          name="produit"
                          value={newItem.produit}
                          // onChange={handleItemChange}
                          placeholder="Nom du produit..."
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 text-sm"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <select
                          name="unite"
                          value={newItem.unite}
                          // onChange={handleItemChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 text-sm bg-white"
                        >
                          <option>U</option>
                          <option>PC</option>
                          <option>KG</option>
                          <option>L</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          name="quantite"
                          value={newItem.quantite}
                          // onChange={handleItemChange}
                          placeholder="0"
                          step="0.01"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-1 focus:ring-blue-600 text-sm"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          name="tarif"
                          value={newItem.tarif}
                          // onChange={handleItemChange}
                          placeholder="0"
                          step="0.01"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-right focus:outline-none focus:ring-1 focus:ring-blue-600 text-sm"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          name="remise"
                          value={newItem.remise}
                          // onChange={handleItemChange}
                          placeholder="%"
                          step="0.01"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-1 focus:ring-blue-600 text-sm"
                        />
                      </td>
                      <td className="px-4 py-3 text-right text-gray-900 font-semibold">0.00</td>
                      <td className="px-4 py-3 text-center">
                        <button className="text-red-600 hover:text-red-800 transition">
                          <FaTrash size={18} />
                        </button>
                      </td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'virement' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">IBAN</label>
                <input
                  type="text"
                  placeholder="FR76 1234 5678 9012 3456 7890"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">BIC</label>
                <input
                  type="text"
                  placeholder="BNPAFRPP"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Bénéficiaire</label>
                <input
                  type="text"
                  placeholder="Nom du fournisseur"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* Resume / Notes Internes */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">Résumé / Notes Internes</h3>
          <textarea
            value={purchaseOrderData.internal_notes}
            onChange={(e) => setPurchaseOrderData({...purchaseOrderData, internal_notes: e.target.value})}
            placeholder="Ajouter un commentaire ou un résumé ici..."
            rows="6"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
          />
        </div>

        {/* Summary */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-semibold">Total HT</span>
              {/* <span className="text-2xl font-bold text-gray-900">{formatCurrency(totalHT)}</span> */}
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-gray-700 font-semibold">Montant TVA</span>
                <span className="text-gray-700 font-semibold">Taux:</span>
                <input
                  type="number"
                  value={purchaseOrderData.tva_rate}
                  onChange={(e) => setPurchaseOrderData({...purchaseOrderData, tva_rate: parseFloat(e.target.value)})}
                  className="w-12 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-1 focus:ring-blue-600 text-sm"
                />
                <span className="text-gray-700 font-semibold">%</span>
              </div>
              {/* <span className="text-2xl font-bold text-gray-900">{formatCurrency(montantTva)}</span> */}
            </div>

            <div className="border-t-2 border-gray-300 pt-4 flex justify-between items-center">
              <span className="text-gray-700 font-bold text-lg">Total TTC</span>
              {/* <span className="text-3xl font-bold text-gray-900">{formatCurrency(totalTTC)}</span> */}
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-red-700 font-bold">Net A Payer</span>
                {/* <span className="text-3xl font-bold text-red-600">{formatCurrency(totalTTC)}</span> */}
              </div>
            </div>

            <div className="border border-gray-300 rounded-lg p-3">
              <p className="text-xs text-gray-600 mb-1">Montant en lettres</p>
              {/* <p className="text-gray-900 font-semibold text-sm">{amountInLetters}</p> */}
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
}