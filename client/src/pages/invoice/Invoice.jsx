import { useEffect, useState } from 'react';
import { 
  FaSearch, 
  FaChevronRight, 
  FaEdit, 
  FaCheck, 
  FaFileInvoice,
  FaBuilding,
  FaShoppingCart,
  FaClipboardList,
  FaArrowLeft
} from 'react-icons/fa';



const Invoice = () => {


  const [invoiceData,setInvoiceData] = useState({
    order_ID :"",
    date : new Date().toLocaleDateString(),
    total_ht:"",
    tva:"",
    total_ttc :"",
    statut:"payee"
  })


  const [customers,setCustomers] = useState([])  
  const [salesOrders,setSalesOrders] = useState([])
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedClient, setSelectedClient] = useState(null);
  // const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  // const [orderAlreadyExist,setOrderAlreadyExist] = useState(false)


  // Filter clients based on search
  const filteredClients = customers.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const handleClientSelect = (client) => {
  //   setSelectedClient(client);
  //   const handleSalesOrderPerClient = async () =>{
  //       try{
  //           const fetchResult =  await fetch("/api/salesOrders")
  //           .then(result => result.json())

  //           // if(!selectedClient){
  //           //     throw new Error("Client not selected")
  //           // }

  //           // console.log(fetchResult)

  //           // if(!fetchResult){
  //           //     throw new Error("Sales Order not found for this client")
  //           // } else {
  //           //     const filteredSalesOrder = fetchResult.data.filter((order)=>{
  //           //         return order.client_id === client.id
  //           //     })
  //           //     setSalesOrders(filteredSalesOrder)
  //           // }
  //           const filteredSalesOrder = fetchResult.data.filter((order)=>{
  //                   return order.client_id === client.id
  //               })
  //               console.log(filteredSalesOrder)
  //           if(filteredSalesOrder.length === 0 ){
  //             throw new Error("Sales Order not found for this client")
  //           }else {
  //             setSalesOrders(filteredSalesOrder)
  //           }

  //       }catch(err){
  //           console.log(err)
  //       }
  //   }
  //   handleSalesOrderPerClient()
  //   setCurrentStep(2);
  // };

const handleClientSelect = async (client) => {
  try {
    setSelectedClient(client);

    const response = await fetch("/api/salesOrders");
    if (!response.ok) throw new Error("Failed to fetch sales orders");

    const result = await response.json();
    if (!result || !result.data) throw new Error("Invalid data format");

    const filteredSalesOrders = result.data.filter(
      (order) => order.client_id === client.id
    );

    setSalesOrders(filteredSalesOrders);
    setCurrentStep(2);
  } catch (error) {
    console.error("Error fetching sales orders:", error);
  }
};




  // const handleOrderSelect = (order) => {
  //   setSelectedOrders(prev => {
  //     const exists = prev.find(o => o.id === order.id);
  //     if (exists) {
  //       return prev.filter(o => o.id !== order.id);
  //     } else {
  //       return [...prev, order]
  //       // return order
  //     }
  // setInvoiceData(prev=>({...prev,order_ID:order.id,total_ht:order.total_ht,tva:order.tva,total_ttc:order.total_ttc,statut:order.statut}))
  //   });

  const handleOrderSelect = (order) => {

   setSelectedOrders(prev => {
      const {id} = prev

      if (id===order.id) {
        setInvoiceData(prev=>({...prev,
          order_ID :"",
          date : new Date().toLocaleDateString(),
          total_ht:"",
          tva:"",
          total_ttc :"",
          statut:""
        
            }))
        return {}
      } else {
        setInvoiceData(prev=>({...prev,order_ID:order.id,total_ht:order.total_ht,tva:order.tva,total_ttc:order.total_ttc}))
        return order
      }
    })
  
    // if(!orderAlreadyExist){
    //   setInvoiceData(prev=>({...prev,order_ID:order.id,total_ht:order.total_ht,tva:order.tva,total_ttc:order.total_ttc}))
    // }

  };

  // useEffect(()=>{

  //   try{
  //     if(!selectedOrders){
  //       throw new Error("no order was selected")
  //     }
  //     return setInvoiceData(prev=>({...prev,order_ID:selectedOrders.id,total_ht:selectedOrders.total_ht,tva:selectedOrders.tva,total_ttc:selectedOrders.total_ttc,statut:selectedOrders.statut}))
  //   }catch(err){
  //     console.log(err)
  //   }


  // },selectedOrders)

  

  const handleProceedToInvoice = () => {
    setCurrentStep(3);
  };




  const handleCreateInvoice = async () => {

    try{

      const response = await fetch("/api/invoice",{
        method :"POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body : JSON.stringify(invoiceData)
      })

      if(!response.ok){
         throw new Error("error while posting the invoice")
      }else {
        console.log("good , the invoice was added successefuly")
      }


    }catch(err){  
      console.log(err)

    }

  };





 useEffect(() => {
  const fetchClients = async () => {
    try {
        await fetch("/api/customers")
       .then(result=>result.json())
       .then(data => setCustomers(data))
    } catch (err) {
      console.log(err.message);
    }
  };
  
  fetchClients();
}, []);




useEffect(()=>{
    // console.log(selectedClient)
    console.log(invoiceData)
    // console.log(selectedOrders)
,[selectedOrders]})



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create New Invoice</h1>
          <p className="text-gray-600">Transform completed sales orders into professional invoices</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                currentStep >= step 
                  ? 'bg-blue-500 border-blue-500 text-white' 
                  : 'border-gray-300 text-gray-400'
              }`}>
                {step === 1 && <FaBuilding className="text-sm" />}
                {step === 2 && <FaShoppingCart className="text-sm" />}
                {step === 3 && <FaFileInvoice className="text-sm" />}
              </div>
              {step < 3 && (
                <div className={`w-24 h-1 ${
                  currentStep > step ? 'bg-blue-500' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Client Selection */}
        {currentStep === 1 && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FaBuilding className="text-blue-600 text-xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Select Client</h2>
                <p className="text-gray-600">Choose which client to invoice</p>
              </div>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search clients..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Client List */}
            <div className="grid gap-4">
              {filteredClients.map((client) => (
                <div
                  key={client.id}
                  className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-400 hover:shadow-md transition-all duration-200 cursor-pointer group"
                  onClick={() => handleClientSelect(client)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg group-hover:text-blue-600">
                          {client.name}
                        </h3>
                        <p className="text-gray-600">{client.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 group-hover:text-blue-500">
                      <span className="text-sm">Select</span>
                      <FaChevronRight className="text-sm" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Sales Order Selection */}
        {currentStep === 2 && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setCurrentStep(1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FaArrowLeft className="text-gray-600" />
                </button>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <FaShoppingCart className="text-orange-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Select Sales Orders</h2>
                  <p className="text-gray-600">Choose which completed orders to invoice for {selectedClient?.name}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {selectedOrders.length} selected
              </span>
            </div>

            {/* Sales Orders List */}
            <div className="space-y-4 mb-8">
              {/* {dummySalesOrders[selectedClient.id]?.map((order) => ( */}
              {             
              salesOrders.length === 0 ? <div> No sales order was found </div> :
              salesOrders.map((order) => (
                <div
                  key={order.id}
                  className={`border-2 rounded-xl p-6 transition-all duration-200 cursor-pointer ${
                    // selectedOrders.find(o => o.id === order.id)
                    order.id === selectedOrders.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => handleOrderSelect(order)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${
                        // selectedOrders.find(o => o.id === order.id)
                        // orderAlreadyExist 
                        order.id === selectedOrders.id
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        <FaClipboardList />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{order.orderNumber}</h3>
                        <p className="text-gray-600">Date: {order.order_date} • Total: ${order.total_ttc.toFixed(2)}</p>
                        {/* <div className="flex gap-2 mt-2">
                          {order.items.map((item, index) => (
                            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {item.name}
                            </span>
                          ))}
                        </div> */}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {/* {selectedOrders.find(o => o.id === order.id) ? ( */}
                      {order.id === selectedOrders.id ? (
                        <div className="flex items-center gap-2 text-blue-600">
                          <FaCheck className="text-sm" />
                          <span className="text-sm font-medium">Selected</span>
                        </div>
                      ) : (
                        <div className="text-gray-400">
                          <span className="text-sm">Click to select</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
              }
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Back to Clients
              </button>
              <button
                onClick={handleProceedToInvoice}
                disabled={selectedOrders.length === 0}
                className={`px-8 py-3 rounded-xl font-medium transition-all ${
                  selectedOrders.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl'
                }`}
              >
                Review & Create Invoice
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Invoice Review */}
        {currentStep === 3 && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setCurrentStep(2)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FaArrowLeft className="text-gray-600" />
                </button>
                <div className="p-3 bg-green-100 rounded-lg">
                  <FaFileInvoice className="text-green-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Review Invoice</h2>
                  <p className="text-gray-600">Final review before creating the invoice</p>
                </div>
              </div>
            </div>

            {/* Client Summary */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">Client Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Client Name</p>
                  <p className="font-medium">{selectedClient?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{selectedClient?.email}</p>
                </div>
              </div>
            </div>

            {/* Selected Orders */}
            <div className="space-y-4 mb-8">
              <h3 className="font-semibold text-gray-800 mb-4">
                Selected Sales Orders ({selectedOrders.length})
              </h3>
              {/* {selectedOrders.map((order) => ( */}
                <div key={selectedOrders.id} className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-800">{selectedOrders.order_number}</h4>
                    <span className="text-lg font-bold text-blue-600">
                      ${selectedOrders.total_ttc.toFixed(2)}
                    </span>
                  </div>
                   <div className="w-full max-w-xs">
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                        Sélectionner le statut :
                      </label>
                      <select
                        id="status"
                        value={invoiceData.statut}
                        onChange={(e)=>setInvoiceData((prev)=>({...prev,statut : e.target.value}))}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="">Choisir un statut</option>
                        <option value="payee">payee</option>
                        <option value="impayee">impayee</option>
                        <option value="partiellement">partiellement</option>
                      </select>
                    </div>
                  {/* <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.quantity}x {item.name}</span>
                        <span>${item.rate.toFixed(2)}</span>
                      </div>
                    ))}
                  </div> */}
                  {/* <button className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm">
                    <FaEdit className="text-xs" />
                    Edit Items
                  </button> */}
                </div>
              {/* ))} */}
            </div>

            {/* Invoice Summary */}
            {/* <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-gray-800 mb-4">Invoice Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold">
                    ${selectedOrders.reduce((sum, order) => sum + order.total_ttc, 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%):</span>
                  <span className="font-semibold">
                    ${(selectedOrders.reduce((sum, order) => sum + order.total_ttc, 0) * 0.1).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-blue-200">
                  <span>Total Amount:</span>
                  <span className="text-blue-600">
                    ${(selectedOrders.reduce((sum, order) => sum + order.total_ttc, 0) * 1.1).toFixed(2)}
                  </span>
                </div>
              </div>
            </div> */}

            {/* Final Actions */}
            <div className="flex justify-between pt-6 border-t">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Back to Orders
              </button>
              <div className="flex gap-4">
                <button className="px-6 py-3 border border-blue-500 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors">
                  Save as Draft
                </button>
                <button
                  onClick={handleCreateInvoice}
                  className="px-8 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 shadow-lg hover:shadow-xl transition-all"
                >
                  Create Invoice
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Invoice;