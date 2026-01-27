// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { fetchWithToken } from '../../utils/api';

// const QuoteDetails = () => {
//   const { id } = useParams();
//   const [dummyQuote, setQuote] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchWithToken(`/api/dummyQuote/${id}`)
//       .then(res => res.json())
//       .then(data => {
//         setQuote(data);
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) return <p>Chargement...</p>;
//   if (!dummyQuote) return <p>Devis introuvable</p>;

//   return (
//     <div>
//       <h2>Devis #{dummyQuote.id}</h2>
//       <p><strong>Client :</strong> {dummyQuote.customer_name}</p>
//       <p><strong>Date :</strong> {dummyQuote.dateCreated.split("T")[0]}</p>
//       <p><strong>Status :</strong> {dummyQuote.status}</p>
//       <p><strong>Total :</strong> {dummyQuote.total_ttc} DH</p>
//     </div>
//   );
// };

// export default QuoteDetails;
import { useEffect } from 'react';
import { FaArrowLeft, FaEdit, FaDownload, FaPrint } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { fetchWithToken } from '../../utils/api';
import { useState } from 'react';

export default function QuoteDetails() {

  const {id} = useParams()


  const [quote,setQuote] = useState(null)

  useEffect(()=>{
    const fetchSingleQuote = async () =>{
      try{
        const result = await fetchWithToken(`/api/quote/${id}`)
        const data = await result.json()
        console.log(data)
        return setQuote(data)
      }catch(err){
        console.log(err)
      }
    }
  fetchSingleQuote()

  },[id])




  const getStatusColor = (status) => {
    const colors = {
      brouillon: 'bg-gray-100 text-gray-800',
      envoye: 'bg-blue-100 text-blue-800',
      accepte: 'bg-green-100 text-green-800',
      refuse: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const statusLabels = {
    brouillon: 'Brouillon',
    envoye: 'Envoyé',
    accepte: 'Accepté',
    refuse: 'Refusé'
  };

  // useEffect(()=>{
  //   console.log("quote :",quote)
  // },[id,quote])


  if(!quote){
return (
  <>
  Loading quote...
  </>
)
  }


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-200 rounded-lg transition">
              <FaArrowLeft className="text-gray-600" size={24} />
            </button>
            <h1 className="text-3xl font-bold text-gray-800">Détails du Devis</h1>
          </div>
          {/* <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
              <FaEdit size={18} /> Modifier
            </button>
            <button className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition">
              <FaPrint size={18} /> Imprimer
            </button>
            <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition">
              <FaDownload size={18} /> Télécharger
            </button>
          </div> */}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section - dummyQuote Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* dummyQuote Header */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Numéro de Devis</p>
                  <p className="text-xl font-semibold text-blue-600">{quote.quoteNumber || "en attendant l'ajout de ce champs dans la base de donnees"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Statut</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(quote.status)}`}>
                    {statusLabels[quote.status]}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Date Création</p>
                  <p className="font-medium text-gray-800">{quote.dateCreated.split("T")[0]}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Date Expiration</p>
                  <p className="font-medium text-gray-800">{quote.expiryDate.split("T")[0]}</p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-gray-500 mb-1">Libellé du Devis</p>
                <p className="text-lg font-semibold text-gray-800">{quote.libelle}</p>
              </div>
            </div>

            {/* Items Table */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Articles</h2>
              {!quote.items ? "loading quote items" : 
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2">
                      <th className="text-left p-3 font-semibold text-gray-700">Produit</th>
                      <th className="text-center p-3 font-semibold text-gray-700">Quantité</th>
                      <th className="text-right p-3 font-semibold text-gray-700">Prix Unit.</th>
                      <th className="text-center p-3 font-semibold text-gray-700">TVA</th>
                      <th className="text-right p-3 font-semibold text-gray-700">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quote.items.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium text-gray-800">{item.product_name}</td>
                        <td className="p-3 text-center text-gray-800">{item.quantity}</td>
                        <td className="p-3 text-right text-gray-800">{item.unit_price.toFixed(2)}€</td>
                        <td className="p-3 text-center text-gray-800">{item.taxRate}%</td>
                        <td className="p-3 text-right font-semibold text-gray-800">{item.total.toFixed(2)}€</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              }

              {/* Totals */}
              <div className="flex justify-end mt-6">
                <div className="w-80 space-y-3">
                  <div className="flex justify-between text-gray-700">
                    <span>Sous-total:</span>
                    <span className="font-medium">{quote.total_ht.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Montant TVA:</span>
                    <span className="font-medium">{quote.tva.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between border-t-2 pt-3 text-lg font-bold text-gray-800">
                    <span>Total TTC:</span>
                    <span>{quote.total_ttc.toFixed(2)}€</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Client Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Client</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Nom</p>
                  <p className="font-semibold text-gray-800">{quote.customer_name}</p>
                </div>
                {/* <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="text-gray-700 break-all">{quote.customer_email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Téléphone</p>
                  <p className="text-gray-700">{quote.customer_phone}</p>
                </div> */}
              </div>
            </div>

            {/* Summary */}
            <div className="bg-blue-50 rounded-lg shadow-sm p-6 border border-blue-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Résumé</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nombre d'articles:</span>
                  <span className="font-semibold text-gray-800">{quote.items.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Montant HT:</span>
                  <span className="font-semibold text-gray-800">{quote.total_ht.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">TVA Total:</span>
                  <span className="font-semibold text-gray-800">{quote.tva.toFixed(2)}€</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="text-gray-800 font-semibold">Total TTC:</span>
                  <span className="text-lg font-bold text-blue-600">{quote.total_ttc.toFixed(2)}€</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
