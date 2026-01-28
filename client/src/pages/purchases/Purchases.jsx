import React, { useState } from 'react';
import { 
  FiSearch, 
  FiPlus, 
  FiFilter, 
  FiEye, 
  FiEdit, 
  FiCheckCircle, 
  FiClock, 
  FiAlertCircle,
  FiTruck,
  FiDollarSign,
  FiTrendingUp,
  FiCalendar,
  FiDownload,
  FiMail,
  FiCopy
} from 'react-icons/fi';

const Purchases = () => {

  

  // Sample data
  const purchaseOrders = [
    { 
      id: 'PO-2024-001', 
      supplier: 'TechnoPlus SARL', 
      date: '2024-01-15', 
      deliveryDate: '2024-01-22',
      amountHT: 4500, 
      tva: 900, 
      status: 'delivered',
      items: 5,
      supplierRating: 4.5
    },
    { 
      id: 'PO-2024-002', 
      supplier: 'OfficePro', 
      date: '2024-01-14', 
      deliveryDate: '2024-01-25',
      amountHT: 1200, 
      tva: 240, 
      status: 'in-progress',
      items: 3,
      supplierRating: 4.2
    },
    { 
      id: 'PO-2024-003', 
      supplier: 'MateriauxExpert', 
      date: '2024-01-13', 
      deliveryDate: '2024-01-30',
      amountHT: 8900, 
      tva: 1780, 
      status: 'pending',
      items: 8,
      supplierRating: 3.8
    },
    { 
      id: 'PO-2024-004', 
      supplier: 'InformatiqueStore', 
      date: '2024-01-12', 
      deliveryDate: '2024-01-18',
      amountHT: 3200, 
      tva: 640, 
      status: 'delivered',
      items: 4,
      supplierRating: 4.7
    },
  ];

  const suppliers = [
    { name: 'TechnoPlus SARL', contact: 'Jean Dupont', email: 'j.dupont@technoplus.com', phone: '01 23 45 67 89', rating: 4.5 },
    { name: 'OfficePro', contact: 'Marie Martin', email: 'm.martin@officepro.com', phone: '01 34 56 78 90', rating: 4.2 },
    { name: 'MateriauxExpert', contact: 'Pierre Lambert', email: 'p.lambert@materiauxexpert.com', phone: '01 45 67 89 01', rating: 3.8 },
  ];

  const metrics = [
    { label: 'Monthly Purchases', value: '54,280 €', change: '+8%', icon: FiTrendingUp, color: 'text-green-600 bg-green-100' },
    { label: 'Pending Orders', value: '7', change: '-2', icon: FiClock, color: 'text-orange-600 bg-orange-100' },
    { label: 'Upcoming Deliveries', value: '3', change: 'Today', icon: FiTruck, color: 'text-blue-600 bg-blue-100' },
    { label: 'Overdue Payments', value: '4,210 €', change: 'Urgent', icon: FiAlertCircle, color: 'text-red-600 bg-red-100' },
  ];

  const getStatusBadge = (status) => {
    const styles = {
      'delivered': { class: 'bg-green-100 text-green-800', icon: FiCheckCircle, label: 'Livré' },
      'in-progress': { class: 'bg-blue-100 text-blue-800', icon: FiClock, label: 'En Cours' },
      'pending': { class: 'bg-yellow-100 text-yellow-800', icon: FiAlertCircle, label: 'En Attente' },
      'cancelled': { class: 'bg-red-100 text-red-800', icon: FiAlertCircle, label: 'Annulé' }
    };
    return styles[status] || { class: 'bg-gray-100 text-gray-800', icon: FiClock, label: 'Inconnu' };
  };

  const getSupplierRating = (rating) => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestion des Achats</h1>
            <p className="text-gray-600 mt-2">Gérez vos commandes, fournisseurs et approvisionnements</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              <FiDownload className="w-4 h-4" />
              Exporter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <FiPlus className="w-4 h-4" />
              Nouveau Bon de Commande
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        {/* <div className="flex border-b border-gray-200">
          {['overview', 'orders', 'suppliers', 'deliveries', 'invoices'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'overview' && 'Vue d\'ensemble'}
              {tab === 'orders' && 'Bons de Commande'}
              {tab === 'suppliers' && 'Fournisseurs'}
              {tab === 'deliveries' && 'Livraisons'}
              {tab === 'invoices' && 'Factures'}
            </button>
          ))}
        </div> */}
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${metric.color}`}>
                <metric.icon className="w-6 h-6" />
              </div>
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                metric.change.includes('+') ? 'bg-green-100 text-green-800' :
                metric.change.includes('-') ? 'bg-red-100 text-red-800' :
                metric.change === 'Today' ? 'bg-blue-100 text-blue-800' :
                'bg-red-100 text-red-800'
              }`}>
                {metric.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
            <p className="text-sm text-gray-600">{metric.label}</p>
          </div>
        ))}
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un bon de commande, fournisseur, produit..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Tous les statuts</option>
            <option>En attente</option>
            <option>En cours</option>
            <option>Livré</option>
            <option>Annulé</option>
          </select>
          <select className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Tous les fournisseurs</option>
            {suppliers.map(supplier => (
              <option key={supplier.name}>{supplier.name}</option>
            ))}
          </select>
          <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            <FiFilter className="w-4 h-4" />
            Filtres
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Purchase Orders Table */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Bons de Commande Récents</h2>
            <span className="text-sm text-gray-500">{purchaseOrders.length} commandes</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N° COMMANDE</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FOURNISSEUR</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MONTANT</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LIVRAISON</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUT</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {purchaseOrders.map((order) => {
                  const statusInfo = getStatusBadge(order.status);
                  const StatusIcon = statusInfo.icon;
                  return (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <span className="font-bold text-gray-900">{order.id}</span>
                          <div className="text-xs text-gray-500">{order.items} articles</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <span className="text-gray-900">{order.supplier}</span>
                          <div className="text-xs text-gray-500">{getSupplierRating(order.supplierRating)}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-right">
                          <span className="font-semibold text-gray-900">{(order.amountHT + order.tva).toLocaleString()} €</span>
                          <div className="text-xs text-gray-500">{order.amountHT.toLocaleString()} € HT</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-gray-500">
                          <FiCalendar className="w-4 h-4" />
                          {order.deliveryDate}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.class}`}>
                          <StatusIcon className="w-3 h-3" />
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button className="p-1 text-blue-600 hover:text-blue-700 transition-colors" title="Voir">
                            <FiEye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-600 hover:text-gray-700 transition-colors" title="Modifier">
                            <FiEdit className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-green-600 hover:text-green-700 transition-colors" title="Recevoir">
                            <FiTruck className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-purple-600 hover:text-purple-700 transition-colors" title="Dupliquer">
                            <FiCopy className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Suppliers & Quick Actions */}
        <div className="space-y-6">
          {/* Suppliers Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Fournisseurs Principaux</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Voir tout</button>
            </div>
            <div className="p-4 space-y-4">
              {suppliers.map((supplier, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{supplier.name}</h3>
                    <p className="text-sm text-gray-500">{supplier.contact}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-yellow-500 text-sm">{getSupplierRating(supplier.rating)}</span>
                      <span className="text-xs text-gray-400">{supplier.rating}/5</span>
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <FiMail className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Actions Rapides</h2>
            </div>
            <div className="p-4 grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <FiPlus className="w-6 h-6 text-blue-600 mb-2" />
                <span className="text-sm font-medium text-gray-700">Nouveau BC</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <FiTruck className="w-6 h-6 text-green-600 mb-2" />
                <span className="text-sm font-medium text-gray-700">Réception</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <FiDollarSign className="w-6 h-6 text-purple-600 mb-2" />
                <span className="text-sm font-medium text-gray-700">Paiement</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <FiDownload className="w-6 h-6 text-gray-600 mb-2" />
                <span className="text-sm font-medium text-gray-700">Rapport</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchases;