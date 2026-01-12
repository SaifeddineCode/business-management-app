import React, { useEffect, useState } from 'react';
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
import { useQuery } from "@tanstack/react-query";
import { fetchWithToken } from '../../utils/api';


const Sales = () => {
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');


  const [turnOverCurrentMonth,setturnOverCurrentMonth] = useState([])
  // const [pendingQuotes,setPendingQuotes] = useState([])
  const [dailyOrders,setDailyOrders] = useState([])
  // const [recentQuotes,setRecentQuotes] = useState([])
  const [dailySalesOrders,setDailySalesOrders] = useState([])



  useEffect(() => {
  const fetchSalesOrders = async () => {
    try {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const currentDay = new Date().getDate()

      const response = await fetchWithToken("/api/salesOrders");
      const data = await response.json();

      if (!data?.data) {
        throw new Error("Invalid API response format");
      }

      setDailySalesOrders(data.data)

      const currentDailyOrders = data.data.filter((order)=>{
        const orderDate = new Date(order.order_date);
        return orderDate.getMonth() === currentMonth &&
            orderDate.getFullYear() === currentYear 
            && orderDate.getDate() === currentDay 
            
      })

      setDailyOrders(currentDailyOrders)

      const currentMonthSalesOrder = data.data
        .filter(sale => {
          const saleDate = new Date(sale.order_date);
          return (
            saleDate.getMonth() === currentMonth &&
            saleDate.getFullYear() === currentYear
          );
        })
        .reduce((total, sale) => total + (sale.total_ttc || 0), 0).toFixed(2) ;

      setturnOverCurrentMonth(currentMonthSalesOrder);
    } catch (error) {
      console.error("Error fetching sales orders:", error);
    }
  };

  fetchSalesOrders();
}, []);


// useEffect(()=>{
//   const fetchingPendingQuotes = async() =>{
//     try{
//       const result = await fetch("/api/quote")
//       const data = await result.json()
      
//       if(!data){
//         throw new Error("Error while fetching pending quotes")
//       }
//       setRecentQuotes(data)
//       const filtredQuotesPending = data.filter((quote)=>{
//         return quote?.status === "brouillon"
//       })

//       setPendingQuotes(filtredQuotesPending)    
//     }catch(err){
//       console.log(err.message)
//     }
//   }

//   fetchingPendingQuotes()
// },[])


const fetchQuotes = async() =>{
  // const res = await fetch("/api/quote")
  const res = await fetchWithToken("/api/quote")
  if(!res.ok) throw new Error("Error while fetching quotes")
  const quotes = await res.json()
  
  return quotes.data
}

const {data  = [],isLoading,error} = useQuery({
  queryKey:["quotes"],
  queryFn:fetchQuotes
})

const pendingQuotes = data.filter((quote)=>{
  return quote.status === "brouillon"
})




const handleDeleteSingleQuote = async(id) =>{


 try{

  const result =  await fetch(`/api/quote/${id}`, {
    method: 'DELETE'
  });

   if (!result.ok) {
      const errorData = await result.json(); // or .text()
      throw new Error(errorData.message || 'Failed to delete quote');
    }

 }catch(err){
  console.log(err)
 }

}

  

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
  const filteredQuotes = data.filter(quote =>
    quote.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
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
            to={"/add-quote"}
            className="bg-[#112074] text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-800 transition-colors">
            <FiPlus size={18} />
            <span>Nouveau Devis</span>
          </Link>
          <Outlet />

          {/* Ajouter un bon de vente */}
          <Link to={"/add-sales-order"} className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-800 transition-colors">
            <FiShoppingCart size={18} />
            <span>Ajouter un bon de vente</span>
          </Link>
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
          <Link to={"/sales-order-list"} className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-800 transition-colors">
            <FiList size={18} />
            <span>Consulter les bons de ventes</span>
          </Link>

          {/* Facturer le client */}
          <Link to={"/invoice"} className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-800 transition-colors">
            <FiDollarSign size={18} />
            <span>Facturer le client</span>
          </Link>

          {/* Consulter les factures */}
          <Link to={"/invoiceList"} className="bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-800 transition-colors">
            <FiFile size={18} />
            <span>Consulter les factures</span>
          </Link>
          
        </div>

      {/* Sales Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Monthly Revenue Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">CA Mensuel</p>
              <p className="text-2xl font-bold text-gray-800">{turnOverCurrentMonth } MAD</p>
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
              <p className="text-2xl font-bold text-gray-800">{pendingQuotes.length}</p>
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
              <p className="text-2xl font-bold text-gray-800">{dailyOrders.length}</p>
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
              <p className="text-2xl font-bold text-gray-800">{""}</p>
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
            <option value="brouillon">Brouillon</option>
            <option value="en_attente">En attente</option>
            <option value="accepte">Accepté</option>
            <option value="refuse">Refusé</option>
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
              {/* {filteredQuotes.slice(0,4).map((quote) => ( */}
              {  filteredQuotes.slice(0,4).map((quote) => (
                <tr key={quote.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ `#${quote.id}` }</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{quote.customer_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quote.total_ttc} €</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{quote.date.split('T')[0]}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(quote.status)}`}>
                      {quote.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link to={`/quote/${quote.id}`} className="text-blue-600 hover:text-blue-800 transition-colors">
                        <FiEye size={16} />
                      </Link>
                      <button
                      className="text-gray-600 hover:text-gray-800 transition-colors">
                        <FiEdit size={16} />
                      </button>
                      <button
                      onClick={()=>handleDeleteSingleQuote(quote.id)}
                      className="text-red-600 hover:text-red-800 transition-colors">
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
          <Link to={"/sales-order-list"} className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            Voir tout
          </Link>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {dailySalesOrders.slice(0,4).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FiShoppingCart className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{order.order_number}</p>
                    <p className="text-sm text-gray-600">{order.customer_name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{order.total_ttc} €</p>
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