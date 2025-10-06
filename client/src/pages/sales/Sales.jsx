import React, { useState } from 'react';
import { 
  FiPlus, 
  FiFilter, 
  FiDownload, 
  FiSearch,
  FiTrendingUp,
  FiFileText,
  FiShoppingCart,
  FiDollarSign,
  FiEdit,
  FiTrash2,
  FiEye,
  FiChevronDown,
  FiList, 
  FiFile 
} from 'react-icons/fi';
import { Link, Outlet } from 'react-router-dom';

const Sales = () => {
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock sales data
  const salesData = {
    metrics: {
      monthlyRevenue: 45280,
      pendingQuotes: 12,
      todaysOrders: 8,
      unpaidInvoices: 5
    },
    quotes: [
      { id: 1, number: 'DEV-2024-001', client: 'Client A', amount: 1500, date: '2024-01-15', status: 'pending' },
      { id: 2, number: 'DEV-2024-002', client: 'Client B', amount: 3200, date: '2024-01-14', status: 'accepted' },
      { id: 3, number: 'DEV-2024-003', client: 'Client C', amount: 850, date: '2024-01-13', status: 'draft' },
      { id: 4, number: 'DEV-2024-004', client: 'Client D', amount: 2100, date: '2024-01-12', status: 'rejected' }
    ],
    recentOrders: [
      { id: 1, number: 'CMD-2024-001', client: 'Client A', products: 3, total: 1500, status: 'delivered' },
      { id: 2, number: 'CMD-2024-002', client: 'Client B', products: 5, total: 3200, status: 'shipped' },
      { id: 3, number: 'CMD-2024-003', client: 'Client C', products: 2, total: 850, status: 'processing' }
    ]
  };

  // Status badge colors
  const getStatusColor = (status) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      delivered: 'bg-green-100 text-green-800',
      shipped: 'bg-blue-100 text-blue-800',
      processing: 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // Filter quotes based on search and status
  const filteredQuotes = salesData.quotes.filter(quote =>
    quote.client.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === 'all' || quote.status === statusFilter)
  );


  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestion des Ventes</h1>
          <p className="text-gray-600">Gérez vos devis, commandes et factures</p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Link 
            to={"/sales/add-quote"}
            className="bg-[#112074] text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-800 transition-colors">
            <FiPlus size={18} />
            <span>Nouveau Devis</span>
          </Link>
          <Outlet />

          {/* Ajouter un bon de vente */}
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-800 transition-colors">
            <FiShoppingCart size={18} />
            <span>Ajouter un bon de vente</span>
          </button>
        </div>
      </div>
      {/* Action Buttons */}
        <div className="flex space-x-3">

          {/* Consulter les devis */}
          <Link to={"/quote"} className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-800 transition-colors">
            <FiFileText size={18} />
            <span>Consulter les devis</span>
          </Link>
          

          {/* Consulter les bons de ventes */}
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-800 transition-colors">
            <FiList size={18} />
            <span>Consulter les bons de ventes</span>
          </button>

          {/* Facturer le client */}
          <button className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-800 transition-colors">
            <FiDollarSign size={18} />
            <span>Facturer le client</span>
          </button>

          {/* Consulter les factures */}
          <button className="bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-800 transition-colors">
            <FiFile size={18} />
            <span>Consulter les factures</span>
          </button>
          
        </div>

      {/* Sales Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Monthly Revenue Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">CA Mensuel</p>
              <p className="text-2xl font-bold text-gray-800">{salesData.metrics.monthlyRevenue.toLocaleString()} €</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <FiTrendingUp className="text-blue-600" size={24} />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-2">+12% vs mois dernier</p>
        </div>

        {/* Pending Quotes Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Devis En Attente</p>
              <p className="text-2xl font-bold text-gray-800">{salesData.metrics.pendingQuotes}</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <FiFileText className="text-yellow-600" size={24} />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">À traiter rapidement</p>
        </div>

        {/* Today's Orders Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Commandes du Jour</p>
              <p className="text-2xl font-bold text-gray-800">{salesData.metrics.todaysOrders}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <FiShoppingCart className="text-green-600" size={24} />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">À préparer</p>
        </div>

        {/* Unpaid Invoices Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Factures Impayées</p>
              <p className="text-2xl font-bold text-gray-800">{salesData.metrics.unpaidInvoices}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <FiDollarSign className="text-red-600" size={24} />
            </div>
          </div>
          <p className="text-sm text-red-600 mt-2">Relance nécessaire</p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher un devis ou client..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Status Filter */}
          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Tous les statuts</option>
            <option value="draft">Brouillon</option>
            <option value="pending">En attente</option>
            <option value="accepted">Accepté</option>
            <option value="rejected">Refusé</option>
          </select>
        </div>
      </div>

      {/* Quotes Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Devis Récents</h2>
        </div>
        
        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Numéro</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredQuotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{quote.number}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{quote.client}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quote.amount} €</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{quote.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(quote.status)}`}>
                      {quote.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 transition-colors">
                        <FiEye size={16} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 transition-colors">
                        <FiEdit size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-800 transition-colors">
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Commandes Récentes</h2>
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            Voir tout
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {salesData.recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FiShoppingCart className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{order.number}</p>
                    <p className="text-sm text-gray-600">{order.client}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{order.total} €</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;