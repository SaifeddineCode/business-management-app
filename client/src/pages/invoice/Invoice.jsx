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

// Dummy data
const dummyClients = [
  { id: 1, name: 'TechCorp Inc.', email: 'billing@techcorp.com', phone: '+1 (555) 123-4567' },
  { id: 2, name: 'Design Studio LLC', email: 'accounts@designstudio.com', phone: '+1 (555) 987-6543' },
  { id: 3, name: 'Global Solutions Ltd', email: 'finance@globalsolutions.com', phone: '+1 (555) 456-7890' },
  { id: 4, name: 'StartUp Ventures', email: 'payables@startup.com', phone: '+1 (555) 234-5678' },
];

const dummySalesOrders = {
  1: [ // Client ID 1
    { id: 101, orderNumber: 'SO-001', date: '2024-01-15', total: 2500.00, status: 'completed', items: [
      { name: 'Web Development', quantity: 1, rate: 2000.00 },
      { name: 'SEO Package', quantity: 1, rate: 500.00 }
    ]},
    { id: 102, orderNumber: 'SO-002', date: '2024-01-20', total: 1800.00, status: 'completed', items: [
      { name: 'Mobile App', quantity: 1, rate: 1500.00 },
      { name: 'UI/UX Design', quantity: 1, rate: 300.00 }
    ]}
  ],
  2: [ // Client ID 2
    { id: 201, orderNumber: 'SO-003', date: '2024-01-18', total: 3200.00, status: 'completed', items: [
      { name: 'Brand Identity', quantity: 1, rate: 2000.00 },
      { name: 'Marketing Materials', quantity: 1, rate: 1200.00 }
    ]}
  ]
};

const Invoice = () => {


  const [customers,setCustomers] = useState([])  
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter clients based on search
  const filteredClients = customers.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClientSelect = (client) => {
    setSelectedClient(client);
    setCurrentStep(2);
  };

  const handleOrderSelect = (order) => {
    setSelectedOrders(prev => {
      const exists = prev.find(o => o.id === order.id);
      if (exists) {
        return prev.filter(o => o.id !== order.id);
      } else {
        return [...prev, order];
      }
    });
  };

  const handleProceedToInvoice = () => {
    setCurrentStep(3);
  };

  const handleCreateInvoice = () => {
    // This would be your logic to create the final invoice
    console.log('Creating invoice with:', { selectedClient, selectedOrders });
    alert('Invoice created successfully!');
  };

 useEffect(() => {
  const fetchClients = async () => {
    try {
      const result = await fetch("/api/customers");
      const data = await result.json();
      setCustomers(data);
    } catch (err) {
      console.log(err.message);
    }
  };
  
  fetchClients();
}, []);


  useEffect(()=>{
    console.log(customers)
  },[customers])


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
              {dummySalesOrders[selectedClient.id]?.map((order) => (
                <div
                  key={order.id}
                  className={`border-2 rounded-xl p-6 transition-all duration-200 cursor-pointer ${
                    selectedOrders.find(o => o.id === order.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => handleOrderSelect(order)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${
                        selectedOrders.find(o => o.id === order.id)
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        <FaClipboardList />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{order.orderNumber}</h3>
                        <p className="text-gray-600">Date: {order.date} • Total: ${order.total.toFixed(2)}</p>
                        <div className="flex gap-2 mt-2">
                          {order.items.map((item, index) => (
                            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {item.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {selectedOrders.find(o => o.id === order.id) ? (
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
              ))}
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
              {selectedOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-800">{order.orderNumber}</h4>
                    <span className="text-lg font-bold text-blue-600">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.quantity}x {item.name}</span>
                        <span>${item.rate.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <button className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm">
                    <FaEdit className="text-xs" />
                    Edit Items
                  </button>
                </div>
              ))}
            </div>

            {/* Invoice Summary */}
            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-gray-800 mb-4">Invoice Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold">
                    ${selectedOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%):</span>
                  <span className="font-semibold">
                    ${(selectedOrders.reduce((sum, order) => sum + order.total, 0) * 0.1).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-blue-200">
                  <span>Total Amount:</span>
                  <span className="text-blue-600">
                    ${(selectedOrders.reduce((sum, order) => sum + order.total, 0) * 1.1).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

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