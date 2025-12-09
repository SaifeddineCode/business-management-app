import React, { useState } from 'react';
import { useEffect } from 'react';
import { 
  FiSearch, 
  FiFileText, 
  FiCheckCircle, 
  FiAlertCircle, 
  FiClock,
  FiDollarSign,
  FiTrendingUp,
  FiCalendar,
  FiEye,
  FiDownload,
  FiFilter
} from 'react-icons/fi';

const InvoiceListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tous');
  const [invoices,setInvoices] = useState([])

  // Mock data for KPIs
  const kpiData = {
    totalInvoices: 342,
    paidInvoices: 278,
    unpaidInvoices: 45,
    overdueInvoices: 19,
    totalRevenue: '€42,850',
    avgPaymentTime: '14.5 jours'
  };

  // Mock invoice data
  const dumbInvoices = [
    { id: 1, number: 'INV-2024-001', client: 'TechCorp Inc', amount: '€2,850', date: '15 Jan 2024', status: 'paid' },
    { id: 2, number: 'INV-2024-002', client: 'Marketing Pro', amount: '€1,250', date: '18 Jan 2024', status: 'pending' },
    { id: 3, number: 'INV-2024-003', client: 'Retail Solutions', amount: '€4,500', date: '20 Jan 2024', status: 'overdue' },
    { id: 4, number: 'INV-2024-004', client: 'Digital Agency', amount: '€3,200', date: '22 Jan 2024', status: 'paid' },
    { id: 5, number: 'INV-2024-005', client: 'Consulting Group', amount: '€5,750', date: '25 Jan 2024', status: 'pending' },
  ];

  const statusFilters = ['Tous', 'Payées', 'Impayées', 'En Retard'];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid': return <FiCheckCircle className="text-green-500" />;
      case 'pending': return <FiClock className="text-yellow-500" />;
      case 'overdue': return <FiAlertCircle className="text-red-500" />;
      default: return null;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'paid': return 'Payée';
      case 'pending': return 'Impayée';
      case 'overdue': return 'En Retard';
      default: return '';
    }
  };


useEffect(()=>{
  const fetchInvoices = async() =>{
    const result = await fetch("/api/invoice")
    const data = await result.json()
    setInvoices(data.invoices)
  }
  fetchInvoices()
},[])


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Top Banner Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Factures</h1>
        <p className="text-sm text-gray-500 mt-1">Gérez et suivez toutes vos factures</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Invoices */}
        <div className="bg-white rounded-xl shadow-md shadow-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Factures</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{kpiData.totalInvoices}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <FiFileText className="text-blue-500 text-xl" />
            </div>
          </div>
        </div>

        {/* Paid Invoices */}
        <div className="bg-white rounded-xl shadow-md shadow-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Factures Payées</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{kpiData.paidInvoices}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <FiCheckCircle className="text-green-500 text-xl" />
            </div>
          </div>
        </div>

        {/* Unpaid Invoices */}
        <div className="bg-white rounded-xl shadow-md shadow-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Factures Impayées</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{kpiData.unpaidInvoices}</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <FiAlertCircle className="text-yellow-500 text-xl" />
            </div>
          </div>
        </div>

        {/* Overdue Invoices */}
        <div className="bg-white rounded-xl shadow-md shadow-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Factures En Retard</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{kpiData.overdueInvoices}</p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <FiClock className="text-red-500 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl shadow-md shadow-gray-200 p-5 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une facture ou un client…"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter Dropdown */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full md:w-48 pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              {statusFilters.map((filter) => (
                <option key={filter} value={filter}>
                  {filter}
                </option>
              ))}
            </select>
            <FiFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="bg-white rounded-xl shadow-md shadow-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="bg-gray-50 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">Liste des Factures</h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-xl">
                  Numéro
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-xl">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr 
                  key={invoice.id} 
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                    {invoice.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {invoice.client}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">
                    {invoice.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {invoice.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(invoice.status)}
                      <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                        invoice.status === 'paid' 
                          ? 'bg-green-100 text-green-800'
                          : invoice.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {getStatusText(invoice.status)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-3">
                      <button className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                        <FiEye className="text-lg" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <FiDownload className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional KPI Cards Section */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Total Revenue */}
        <div className="bg-white rounded-xl shadow-md shadow-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Chiffre d'Affaires Total</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{kpiData.totalRevenue}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <FiTrendingUp className="text-green-500 text-xl" />
            </div>
          </div>
        </div>

        {/* Average Payment Time */}
        <div className="bg-white rounded-xl shadow-md shadow-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Délai Moyen de Paiement</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{kpiData.avgPaymentTime}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <FiCalendar className="text-blue-500 text-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceListPage;