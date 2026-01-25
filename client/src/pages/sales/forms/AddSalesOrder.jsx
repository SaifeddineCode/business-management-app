import React, { useEffect, useRef, useState } from 'react';
import { FaUser, FaFileInvoice, FaShoppingCart, FaCalendarAlt, FaMoneyBillWave, FaTruck, FaPlus, FaTrash } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { fetchWithToken } from '../../../utils/api';
import { data } from 'react-router-dom';

const AddSalesOrder = () => {
  

  const [saleOrderData,setSaleOrderData] = useState({
    quote_id : "",
    client_id : "",
    order_number :`SO-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`,
    order_date:"",
    delivery_date:"",
    delivery_adress:"",
    vendor_id:3,
    total_ht:"",
    tva:0.1,
    tvaAmount:"",
    disountAmount:"",
    total_ttc:"",
    status:"en_attente",
    paymentMethod:"",
    notes:"",
    orderItems:[]
  })



  const [quotes,setQuotes] = useState([])




  const [selectedQuote,setSelectedQuote] = useState({})
  const [quoteItems,setQuoteItems] = useState([])
  const [products,setProducts] = useState([])

 



 useEffect(()=>{

  

    const fetchQuoteProduct = async () =>{

    try{
      
      // fetch("/api/quote")
      // .then(result => result.json())
      // .then (data => setQuotes(data))


      // fetch("/api/products")
      // .then(result => result.json())
      // .then (data => setProducts(data))

      await Promise.all([
        // fetchWithToken("/api/quote")
        //   .then(result => result.json())
        //   .then(data => setQuotes(data)),
          
        fetchWithToken("/api/quote")
          .then(result => result.json())
          .then(data => setQuotes(data.data))
          ,
        
        fetchWithToken("/api/products")
          .then(result => result.json()) 
          .then(data => setProducts(data))
      ]);



    }catch(err){
      console.log(err.message)
    }
    }

    fetchQuoteProduct()

  },[])


// useEffect(()=>{
//     // console.log(saleOrderData)
//     console.log(quotes)
//   },[quotes])



useEffect( ()=>{

  const fetchingQuoteItems = async () =>{
    
    try{
     

      const response = await fetchWithToken("/api/quote_item")
      
      if(!response.ok){
        console.log(response.message)
      }

      const result = await response.json()
      
      return setQuoteItems(result.data)
      

    }catch(error){
      console.log(error.message)
    }
    
  }

  fetchingQuoteItems()  
},[])





const handleQuoteChange = (value) => {
  
  const quoteId = parseInt(value, 10);
  
  
  setSaleOrderData((prev) => ({
    ...prev,
    quote_id: quoteId
  }));

  
  const currentQuote = quotes.find(quote => quote.id === quoteId);
  
  if (!currentQuote) {
    console.error(`Quote with ID ${quoteId} not found`);
    setSelectedQuote(null);
    // setOrderedItems([]);
    setSaleOrderData(prev=>({...prev,orderItems:[]}))
    return;
  }
  
  setSelectedQuote(currentQuote);

  const currentOrderedProducts = quoteItems.filter(
    (quoteItem) => quoteItem.quote_ID === quoteId
  );
  
  // setOrderedItems(currentOrderedProducts);
  setSaleOrderData(prev=>({...prev,orderItems:currentOrderedProducts}))
  setSaleOrderData(prev=>({
    ...prev,
    client_id : currentQuote.client_id,
    delivery_adress:currentQuote.customer_adresse
  }))
};



const handleAddProduct = () =>{
  setSaleOrderData(prev=>({...prev,orderItems:[...prev.orderItems,{
     id: Math.floor(Math.random() * 1_000_000_0000),
      product_ID:"",
      product_name:"",
      quantity:1,
      unit_price:"",
      tva:0.1,
      discount:"",
      total:"",
      is_new:true
  }]}))


}





const handleRemoveProduct = (productID) => {

  const updateItems = saleOrderData.orderItems.filter(item => item.id !== parseFloat(productID))
  return setSaleOrderData(prev=>({...prev,orderItems:updateItems}))

}



const handleChangeProduct = (orderedPID,value,field) =>{
      setSaleOrderData( (prev) => ({
      ...prev,
      orderItems: prev.orderItems.map((orderItem) => {  
      if(orderItem.id === parseFloat(orderedPID)){

      if (field === "product_ID") {
        const selectedProduct = products.find(product => product.id === parseFloat(value));
        
        const updatedItem =  {
          ...orderItem,
          [field]: parseFloat(value),
          unit_price: selectedProduct?.product_price || orderItem.unit_price,
        };
        return {
          ...updatedItem,
          total: parseFloat((updatedItem.quantity * updatedItem.unit_price) + (updatedItem.quantity * updatedItem.unit_price)*updatedItem.tva)
        }
      }

      if (field === "quantity" || field === "unit_price") {
        
        const updatedItem = {
          ...orderItem,
          [field]: parseFloat(value)
        };
        return {
          ...updatedItem,
          total : parseFloat((updatedItem.unit_price * updatedItem.quantity ))
        }
      }
      if(field === "discount"){
        const updatedItem = {
          ...orderItem,
          [field]: parseFloat(value)
        };
        return {
          ...updatedItem,
          total : parseFloat((updatedItem.unit_price * updatedItem.quantity * (1 - updatedItem.discount)).toFixed(2))
        }
      }
    }
    return orderItem;
})}))

}





useEffect(()=>{

  // const totalHT = orderedItems.reduce((acc,item)=>{
  const totalHT = saleOrderData.orderItems.reduce((acc,item)=>{
  return acc + (item.quantity * item.unit_price);
  },0)


const totalAmountDiscount = saleOrderData.orderItems.reduce((acc, item) => {
  const subtotal = item.quantity * item.unit_price;
  const discountAmount = subtotal * (item.discount || 0);
  
  return acc + discountAmount;
}, 0).toFixed(2);


const totalAmountTva = saleOrderData.orderItems.reduce((acc, item) => {
  const subtotal = item.quantity * item.unit_price;
  const discountedSubtotal = subtotal * (1 - (item.discount || 0));
  const tvaAmount = discountedSubtotal * (item.tva || 0);
  return acc + tvaAmount;
}, 0);

const totalAfterDiscount = totalHT - totalAmountDiscount;
const totalTTC = totalAfterDiscount + totalAmountTva;

setSaleOrderData(prev => ({
  ...prev,
  total_ht : totalHT,
  total_ttc :totalTTC,
  tvaAmount:totalAmountTva,
  disountAmount:totalAmountDiscount
}))

},[saleOrderData.orderItems])



const resetSaleOrderData = () =>{
  setSelectedQuote({})
  setSaleOrderData(prev => ({...prev,
    quote_id : "",
    client_id : "",
    order_number :`SO-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`,
    order_date:"",
    delivery_date:"",
    delivery_adress:"",
    vendor_id:3,
    total_ht:"",
    tva:0.1,
    tvaAmount:"",
    disountAmount:"",
    total_ttc:"",
    status:"en_attente",
    paymentMethod:"",
    notes:"",
    orderItems:[]
  }))
}


const hasRun = useRef(false); // ← Creates a "box" with value false


const addSaleOrder = async() =>{

  if (hasRun.current) return; // ← Check what's in the box
    hasRun.current = true;      // ← Put true in the box

  try{

    if(!saleOrderData.quote_id || !saleOrderData.order_date || !saleOrderData.status){
      throw new Error("Please check the required fields");
    }

    const response = await fetchWithToken("/api/salesOrders",{
      method :"POST",
      // headers :{
      //   "Content-Type" :"application/json"
      // },
      body:JSON.stringify(saleOrderData)
    })

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Server responded with ${response.status}`);
    }

    const result = await response.json();

    toast.success("Sale order was created successfuly")
    
    return result;
    
  }catch(err){
    toast.error(err.message)
    // Re-throw the error so the caller can handle it
    throw err;
  }
}


const handleCreatOrder = async () =>{
 try {
    await addSaleOrder();  // Your existing API call
    resetSaleOrderData();  // Your existing reset function
    alert('Order created successfully!');
  } catch (error) {
    toast.error(error.message)
  }
}

// useEffect(()=>{
//   console.log(selectedQuote)
// },[selectedQuote])


// useEffect(()=>{
//   console.log(saleOrderData.orderItems)
// },[saleOrderData.orderItems])


useEffect(()=>{
  console.log(saleOrderData)
},[saleOrderData])


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
                  value={saleOrderData.quote_id || ""}
                  onChange={(e)=>handleQuoteChange(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Choisir un devis...</option>
                  {/* {quotes.map(quote => ( */}
                  {quotes.map((quote) => (
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
                      <p className="text-gray-700">{saleOrderData.order_number}</p>
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
                    value={selectedQuote?.customer_name || ""}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value={selectedQuote?.customer_email || ""}
                    readOnly
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adresse de Livraison</label>
                  <textarea 
                    readOnly
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    rows="3"
                    value={selectedQuote?.customer_adresse || ""}
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
                      <th className="text-left py-3 font-medium text-gray-700">TVA</th>
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
                    {saleOrderData.orderItems.map(item => (
                      <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                        {/* <td className="py-3">
                          <select className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500">
                            <option>{item.product_name}</option>
                          </select>
                         
                        </td> */}
                         <td className="py-3">
                          {item.is_new ? (
                            <select 
                            onChange={(e)=>handleChangeProduct(item.id,e.target.value,'product_ID')}
                              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                              value={item.product_ID}
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
                          <input 
                          readOnly
                          //  onChange={(e)=>handleChangeProduct(item.id,e.target.value,'tva')}
                            type="number" 
                            className="w-24 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                            value={item.tva}
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
                            value={item.discount}
                          >
                            <option value="0" >select remise</option>
                            <option  value="0.03" >0.03</option>
                            <option  value="0.04" >0.04</option>
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
                    onChange={(e)=>setSaleOrderData(prev=> ({...prev,order_date : e.target.value})  )}
                    type="date" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    value={saleOrderData.order_date}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date de Livraison</label>
                  <input 
                    onChange={(e)=>setSaleOrderData(prev => ({...prev,delivery_date : e.target.value}) )}
                    type="date" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    value={saleOrderData.delivery_date}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Numéro de Commande</label>
                  <input 
                    readOnly
                    type="text" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    value={saleOrderData.order_number}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                  <select 
                  value={saleOrderData.status || ""}
                  onChange={(e)=>setSaleOrderData(prev => ({...prev,status:e.target.value}))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                    <option value="en_attente">Brouillon</option>
                    <option value="annule">annule</option>
                    <option value="facture">facture</option>
                    <option value="livre">Livré</option>
                  </select>
                  {/* <input type='text' value={selectedQuote.status} /> */}
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
                  <span className="font-medium">{saleOrderData.total_ttc} MAD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Remise globale:</span>
                  <span className="font-medium text-red-600">{saleOrderData.disountAmount} MAD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">TVA (10%):</span>
                  <span className="font-medium">{saleOrderData.tvaAmount} MAD</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-blue-600">{saleOrderData.total_ttc} MAD</span>
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
                  <select 
                  value={saleOrderData.paymentMethod || ""}
                    onChange={(e)=>setSaleOrderData(prev=>({...prev,paymentMethod:e.target.value}))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                    <option value="">Ajouter un mode de paiement</option>
                    <option value="Espèces">Espèces</option>
                    <option value="CarteBancaire">Carte Bancaire</option>
                    <option value="Virement">Virement</option>
                    <option value="Chèque">Chèque</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes Internes</label>
                  <textarea 
                  onChange={(e)=>setSaleOrderData(prev=>({...prev,notes:e.target.value}))}
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
                <button 
                  onClick={handleCreatOrder}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Ajouter le Bon
                </button>
                <button className="flex-1 bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-colors font-medium">
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default AddSalesOrder;