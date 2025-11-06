import React, { useEffect, useState } from 'react';
import { FaEye, FaEdit, FaFileInvoice, FaBuilding, FaUserTie, FaMoneyCheck, FaReceipt, FaEuroSign, FaSearch, FaFilter } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';


const SalesOrdersList = () => {

  const dummySalesOrders = [
  {
    id: "SO-001",
    billingNumber: "FACT-2024-001",
    date: "2024-01-15",
    company: "Tech Corp SARL",
    distributor: "Distrib Solutions",
    paymentStatus: "paid",
    tvaAmount: 200.00,
    totalHT: 1000.00,
    totalTTC: 1200.00,
    status: "completed"
  },
  {
    id: "SO-002",
    billingNumber: "FACT-2024-002",
    date: "2024-01-16",
    company: "Business Ltd",
    distributor: "Global Distribution",
    paymentStatus: "pending",
    tvaAmount: 150.00,
    totalHT: 750.00,
    totalTTC: 900.00,
    status: "pending"
  },
  {
    id: "SO-003",
    billingNumber: "FACT-2024-003",
    date: "2024-01-17",
    company: "Enterprise SA",
    distributor: "Premium Distrib",
    paymentStatus: "overdue",
    tvaAmount: 300.00,
    totalHT: 1500.00,
    totalTTC: 1800.00,
    status: "processing"
  },
  {
    id: "SO-004",
    billingNumber: "FACT-2024-004",
    date: "2024-01-18",
    company: "Startup Inc",
    distributor: "Quick Distrib",
    paymentStatus: "paid",
    tvaAmount: 80.00,
    totalHT: 400.00,
    totalTTC: 480.00,
    status: "completed"
  }
];



    const [salesOrders, setSalesOrders] = useState(dummySalesOrders);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [paymentFilter, setPaymentFilter] = useState('all');


useEffect(()=>{
    const fetchSalesOrder = async () =>{
        try{
            const response = await fetch("api/salesOrders")
            .then(result => result.json())
            .then(data => console.log(data))

            if(response.success){
                return toast.success("was fetched naddi")
            }else {
                throw new Error
            }
            
        }catch(err){
        toast.error(err.message)
        }   
        
    }

    fetchSalesOrder()
},[])



  // Filter orders based on search and filters
  const filteredOrders = salesOrders.filter(order => {
    const matchesSearch = 
      order.billingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.distributor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || order.paymentStatus === paymentFilter;
    
    return matchesSearch && matchesStatus && matchesPayment;
  });

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      completed: { color: 'bg-green-100 text-green-800', label: 'Terminé' },
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'En attente' },
      processing: { color: 'bg-blue-100 text-blue-800', label: 'En traitement' },
      cancelled: { color: 'bg-red-100 text-red-800', label: 'Annulé' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  // Payment status badge component
  const PaymentStatusBadge = ({ status }) => {
    const paymentConfig = {
      paid: { color: 'bg-green-100 text-green-800', label: 'Payé', icon: '💳' },
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'En attente', icon: '⏳' },
      overdue: { color: 'bg-red-100 text-red-800', label: 'En retard', icon: '⚠️' },
      partial: { color: 'bg-blue-100 text-blue-800', label: 'Partiel', icon: '💰' }
    };
    
    const config = paymentConfig[status] || paymentConfig.pending;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.icon} {config.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <FaFileInvoice className="text-blue-600" />
          Commandes de Vente
        </h1>
        <p className="text-gray-600">Gérez et suivez toutes vos commandes de vente</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Commandes</p>
              <p className="text-2xl font-bold text-gray-900">{salesOrders.length}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <FaFileInvoice className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total HT</p>
              <p className="text-2xl font-bold text-gray-900">
                {salesOrders.reduce((sum, order) => sum + order.totalHT, 0).toFixed(2)} €
              </p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <FaEuroSign className="text-green-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total TVA</p>
              <p className="text-2xl font-bold text-gray-900">
                {salesOrders.reduce((sum, order) => sum + order.tvaAmount, 0).toFixed(2)} €
              </p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <FaReceipt className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total TTC</p>
              <p className="text-2xl font-bold text-gray-900">
                {salesOrders.reduce((sum, order) => sum + order.totalTTC, 0).toFixed(2)} €
              </p>
            </div>
            <div className="p-2 bg-orange-100 rounded-lg">
              <FaMoneyCheck className="text-orange-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher par N° facturation, Société, Distributeur..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              <div className="relative">
                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">Tous les statuts</option>
                  <option value="completed">Terminé</option>
                  <option value="pending">En attente</option>
                  <option value="processing">En traitement</option>
                </select>
              </div>

              {/* Payment Status Filter */}
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
              >
                <option value="all">Tous les paiements</option>
                <option value="paid">Payé</option>
                <option value="pending">En attente</option>
                <option value="overdue">En retard</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  N° de facturation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Société
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Distributeur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut paiement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Montant TVA
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total HT
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total TTC
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FaFileInvoice className="text-blue-600 mr-2" />
                      <span className="font-medium text-gray-900">{order.billingNumber}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FaBuilding className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{order.company}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FaUserTie className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{order.distributor}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <PaymentStatusBadge status={order.paymentStatus} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.tvaAmount.toFixed(2)} €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.totalHT.toFixed(2)} €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.totalTTC.toFixed(2)} €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <FaEye className="text-lg" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <FaEdit className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <FaFileInvoice className="mx-auto text-gray-400 text-4xl mb-4" />
            <p className="text-gray-500 text-lg">Aucune commande trouvée</p>
            <p className="text-gray-400">Essayez de modifier vos filtres de recherche</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesOrdersList