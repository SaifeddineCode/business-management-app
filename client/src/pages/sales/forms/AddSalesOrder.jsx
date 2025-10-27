import React, { useEffect, useState } from 'react';
import { FaUser, FaFileInvoice, FaShoppingCart, FaCalendarAlt, FaMoneyBillWave, FaTruck, FaPlus, FaTrash } from 'react-icons/fa';

const AddSalesOrder = () => {
  

  const [saleOrderData,setSaleOrderData] = useState({
    quoteID : "",
    clientID : "",
    orderNumber :`SO-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`,
    orderDate:"",
    deliveryDate:"",
    deliveryAdress:"",
    vendorId:"",
    totalHt:"",
    tva:"",
    totalTTC:"",
    status:""
  })



  const [quotes,setQuotes] = useState([])



  // const [products,setProducts] = useState([])

  // const orderedProducts = [
  //   { id: 1, productId: 1, name: 'Laptop Dell XPS 13', quantity: 2, unitPrice: 1200, discount: 0, total: 2400 },
  //   { id: 2, productId: 2, name: 'Wireless Mouse', quantity: 5, unitPrice: 25, discount: 10, total: 112.5 },
  // ];

  const orderSummary = {
    subtotal: 2512.5,
    globalDiscount: 100,
    tax: 482.5,
    shipping: 50,
    total: 2945
  };


  const [selectedQuote,setSelectedQuote] = useState({customer_name:' ------'})
  const [orderedItems,setOrderedItems] = useState([])
  const [quoteItems,setQuoteItems] = useState([])
  const [products,setProducts] = useState([])


 useEffect(()=>{

    fetch("/api/quote")
    .then(result => result.json())
    .then (data => setQuotes(data))

    fetch("/api/products")
    .then(result => result.json())
    .then (data => setProducts(data))

  },[])





useEffect( ()=>{
  const fetchingQuoteItems = async () =>{
    
    try{

      const response = await fetch("/api/quote_item")
      
      if(!response.ok){
        console.log(response.message)
      }

      const result = await response.json()
      return setQuoteItems(result.data)


    }catch(error){
      console.log(error)
    }
    
  }

  fetchingQuoteItems()  
},[])



// const handleQuoteChange = (value) =>{

//     setSaleOrderData((prev)=>({
//         ...prev,
//         quoteID : value
//     }))


//   const currentQuote=quotes.find(quote => quote.id === parseFloat(value) )
//   setSelectedQuote(currentQuote)

//   const currentOrderedProducts = quoteItems.find((quoteItem)=> quoteItem.quote_ID === parseFloat(value) )
//   setOrderedProducts((prev)=>([...prev,currentOrderedProducts]))

//   }


const handleQuoteChange = (value) => {
  
  const quoteId = parseInt(value, 10);
  
  
  setSaleOrderData((prev) => ({
    ...prev,
    quoteID: quoteId
  }));

  
  const currentQuote = quotes.find(quote => quote.id === quoteId);
  
  if (!currentQuote) {
    console.error(`Quote with ID ${quoteId} not found`);
    setSelectedQuote(null);
    setOrderedItems([]);
    return;
  }
  
  setSelectedQuote(currentQuote);

  const currentOrderedProducts = quoteItems.filter(
    (quoteItem) => quoteItem.quote_ID === quoteId
  );
  
  setOrderedItems(currentOrderedProducts);
};



const handleAddProduct = () =>{

  setOrderedItems((prev)=>(  
    [
    ...prev,
    {
      id: Math.floor(Math.random() * 1_000_000_0000),
      product_id:"",
      product_name:"",
      quantity:1,
      unit_price:"",
      discount:"",
      total:"",
      is_new:true
    }
    ]
  ))
}





const handleRemoveProduct = (productID) => {

  const updateItems = orderedItems.filter(item => item.id !== parseFloat(productID))
  return setOrderedItems(updateItems)  

}



const handleChangeProduct = (orderedPID,value,field) =>{

  const target = products.find(item => item.id === parseFloat(value))

  setOrderedItems((prev)=>prev.map((item)=>{

    const updatedTotal = item.quantity * target.product_price

    if(item.id === orderedPID){

      if(field == "product_id") {
        return {
        ...item,
        product_id:parseFloat(value),
        unit_price:target.product_price,
        total : updatedTotal
      }
      }else if(field == "quantity") {
        const newTotal = value * target.product_price
        return {
        ...item,
        quantity : value,
        total : newTotal
      } 

      } else if(field == "discount") {
        // const newTotal = value
        return {
        ...item,
        total : value
      } 
      } 

    }
    return item
  }))

}








  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Ajouter un Bon de Vente</h1>
          <p className="text-gray-600 mt-2">Créer une nouvelle commande client</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quote Selection Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <FaFileInvoice className="text-blue-600 mr-3" />
                <h2 className="text-lg font-semibold text-gray-900">Sélectionner un Devis</h2>
              </div>
              <div className="space-y-4">
                <select 
                onChange={(e)=>handleQuoteChange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Choisir un devis...</option>
                  {quotes.map(quote => (
                    <option key={quote.id} value={quote.id}>
                      {quote.libelle}
                    </option>
                  ))}
                </select>
                
                {/* Quote Preview */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Client:</span>
                      <p className="text-gray-700"> {selectedQuote.customer_name}</p>
                    </div>
                    <div>
                      <span className="font-medium">Total Devis TTC:</span>
                      <p className="text-gray-700">{selectedQuote.total_ttc} €</p>
                    </div>
                    <div>
                      <span className="font-medium">Validité:</span>
                      <p className="text-gray-700">31/12/2024</p>
                    </div>
                    <div>
                      <span className="font-medium">Numéro:</span>
                      <p className="text-gray-700">{saleOrderData.orderNumber}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Client Information Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <FaUser className="text-green-600 mr-3" />
                <h2 className="text-lg font-semibold text-gray-900">Informations Client</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom du Client</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value={selectedQuote.customer_name}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value={selectedQuote.customer_email}
                    readOnly
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adresse de Livraison</label>
                  <textarea 
                    readOnly
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    rows="3"
                    value={selectedQuote.customer_adresse}
                  />
                </div>
              </div>
            </div>

            {/* Products Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <FaShoppingCart className="text-purple-600 mr-3" />
                  <h2 className="text-lg font-semibold text-gray-900">Produits</h2>
                </div>
                <button
                onClick={()=>handleAddProduct()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                  <FaPlus className="mr-2" />
                  Ajouter Produit
                </button>
              </div>

              {/* Products Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 font-medium text-gray-700">Produit</th>
                      <th className="text-left py-3 font-medium text-gray-700">Quantité</th>
                      <th className="text-left py-3 font-medium text-gray-700">Prix Unitaire</th>
                      <th className="text-left py-3 font-medium text-gray-700">Remise</th>
                      <th className="text-left py-3 font-medium text-gray-700">Total</th>
                      <th className="text-left py-3 font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  {/* <tbody>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3">
                        <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option value="">Selectionner un produit</option>
                          {products.map((product,index)=>{
                            return (
                              <option key={index} value={product.id}> {product.product_name} </option>
                            )
                          })}
                        </select>
                      </td>
                       <td className="py-3">
                          <input 
                            type="number" 
                            className="w-20 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                            value={product.quantity}
                          />
                        </td>
                        <td className="py-3">
                          <input 
                            type="number" 
                            className="w-24 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                            value={product.unitPrice}
                          />
                        </td>
                        <td className="py-3">
                          <input 
                            type="number" 
                            className="w-20 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                            value={product.discount}
                          />
                        </td>
                        <td className="py-3 font-medium">{product.total} €</td>
                        <td className="py-3">
                          <button className="text-red-600 hover:text-red-800">
                            <FaTrash />
                          </button>
                        </td>
                    </tr>
                  </tbody> */}
                   <tbody>
                    {orderedItems.map(item => (
                      <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                        {/* <td className="py-3">
                          <select className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500">
                            <option>{item.product_name}</option>
                          </select>
                         
                        </td> */}
                         <td className="py-3">
                          {item.is_new ? (
                            <select 
                            onChange={(e)=>handleChangeProduct(item.id,e.target.value,'product_id')}
                              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                              value={item.product_id}
                            >
                              <option value="">Select Product</option>
                              {products.map(product => (
                                <option key={product.id} value={product.id}>
                                  {product.product_name}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input 
                              type="text" 
                              className="w-full p-2 border border-gray-300 rounded bg-gray-50"
                              value={item.product_name}
                              readOnly 
                            />
                          )}
                        </td>
                        <td className="py-3">
                          <input 
                           onChange={(e)=>handleChangeProduct(item.id,e.target.value,'quantity')}
                            type="number" 
                            className="w-20 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                            value={item.quantity}
                          />
                        </td>
                        <td className="py-3">
                          <input 
                          readOnly
                          //  onChange={(e)=>handleChangeProduct(item.id,e.target.value,'unit_price')}
                            type="number" 
                            className="w-24 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                            value={item.unit_price}
                          />
                        </td>
                        <td className="py-3">
                          {/* <input 
                            onChange={(e)=>handleChangeProduct(item.id,e.target.value,'discount')}
                            type="number" 
                            className="w-20 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                            value={item.discount}
                          /> */}
                          <select 
                            onChange={(e)=>handleChangeProduct(item.id,e.target.value,'discount')}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                          >
                            <option value="" >select remise</option>
                            <option value="0.03" >0.03</option>
                            <option value="0.04" >0.04</option>
                          </select>
                        </td>
                        <td className="py-3 font-medium">{item.total} €</td>
                        <td className="py-3">
                          <button
                          onClick={()=>handleRemoveProduct(item.id)}
                          className="text-red-600 hover:text-red-800">
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}

                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary & Actions */}
          <div className="space-y-6">
            {/* Order Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <FaCalendarAlt className="text-orange-600 mr-3" />
                <h2 className="text-lg font-semibold text-gray-900">Informations Commande</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date de Commande</label>
                  <input 
                    onChange={(e)=>setSaleOrderData(prev=> ({...prev,orderDate : e.target.value})  )}
                    type="date" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    value="2024-01-15"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date de Livraison</label>
                  <input 
                    onChange={(e)=>setSaleOrderData(prev => ({...prev,deliveryDate : e.target.value}) )}
                    type="date" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    value="2024-01-20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Numéro de Commande</label>
                  <input 
                    readOnly
                    type="text" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    value={saleOrderData.orderNumber}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                  {/* <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                    <option value="draft">Brouillon</option>
                    <option value="confirmed">Confirmé</option>
                    <option value="delivered">Livré</option>
                  </select> */}
                  <input type='text' value={selectedQuote.status} />
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <FaMoneyBillWave className="text-green-600 mr-3" />
                <h2 className="text-lg font-semibold text-gray-900">Récapitulatif</h2>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sous-total:</span>
                  <span className="font-medium">{orderSummary.subtotal} €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Remise globale:</span>
                  <span className="font-medium text-red-600">-{orderSummary.globalDiscount} €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">TVA (20%):</span>
                  <span className="font-medium">{orderSummary.tax} €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Frais de livraison:</span>
                  <span className="font-medium">{orderSummary.shipping} €</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-blue-600">{orderSummary.total} €</span>
                </div>
              </div>
            </div>

            {/* Payment & Shipping */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <FaTruck className="text-indigo-600 mr-3" />
                <h2 className="text-lg font-semibold text-gray-900">Paiement & Livraison</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mode de Paiement</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                    <option value="cash">Espèces</option>
                    <option value="card">Carte Bancaire</option>
                    <option value="transfer">Virement</option>
                    <option value="check">Chèque</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes Internes</label>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    rows="3"
                    placeholder="Notes supplémentaires..."
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Enregistrer le Bon de Vente
                </button>
                <button className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors font-medium">
                  Enregistrer Brouillon
                </button>
                <button className="flex-1 bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-colors font-medium">
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSalesOrder;