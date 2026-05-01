import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { 
  FiSearch, 
  FiPlus, 
  FiMoreVertical, 
  FiMail, 
  FiPhone, 
  FiUser, 
  FiFilter,
  FiCheckCircle,
  FiXCircle,
  FiClock
} from 'react-icons/fi';
import { fetchWithToken } from '../../utils/api';




const ListsPages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');


const statusColors = {
  active: { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500', icon: FiCheckCircle },
  inactive: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500', icon: FiXCircle },
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500', icon: FiClock }
};


  const fetchClients = async()=>{
    try{
        const response = await fetchWithToken("/api/customers")

    if(!response.ok){
        throw new Error(response.statusText)
    }

    const data = await response.json()
    // setClients(data)

    return data

    } catch(err){   
        console.log(err)
    }
  }

  useEffect(()=>{
    fetchClients()
  },[])


  const {data :clients,isLoading,error} = useQuery({
    queryKey:["clients"],
    queryFn : fetchClients,
  })

   useEffect(()=>{
    console.log(clients)
  },[clients])

  if(isLoading){
    return (
        <div>Loading ...  </div>
    )
  }



  // Filter clients based on search and status (dummy filtering - no functionality to implement logic, just for display)
  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          client.telephone.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });


  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Header Section */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Clients
          </h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Manage and view all your client information
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search Input */}
          <div className="flex-1 relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search by name, email or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-sm text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative sm:w-64">
            <FiFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-sm appearance-none cursor-pointer text-gray-700"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {/* Add Client Button */}
          <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02]">
            <FiPlus className="text-lg" />
            <span>Add Client</span>
          </button>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-500">
          Showing {filteredClients.length} of {clients.length} clients
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => {
            const StatusIcon = statusColors[client.status].icon;
            return (
              <div
                key={client.id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-100"
              >
                {/* Card Content */}
                <div className="p-6">
                  {/* Header with Avatar and Menu */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={client.avatar}
                        alt={client.name}
                        className="w-12 h-12 rounded-full ring-2 ring-white shadow-md"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg">{client.name}</h3>
                        <p className="text-sm text-gray-500">{client.company}</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <FiMoreVertical className="text-lg" />
                    </button>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <FiMail className="text-indigo-500 flex-shrink-0" />
                      <span className="truncate">{client.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <FiPhone className="text-indigo-500 flex-shrink-0" />
                      <span>{client.telephone}</span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${statusColors[client.status].bg}`}>
                      <StatusIcon className={`text-sm ${statusColors[client.status].text}`} />
                      <span className={`text-xs font-medium capitalize ${statusColors[client.status].text}`}>
                        {client.status}
                      </span>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredClients.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <FiUser className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-1">No clients found</h3>
            <p className="text-gray-400 text-sm">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListsPages;