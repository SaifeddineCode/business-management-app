import { useEffect } from 'react';
import { useState } from 'react';
import { FaSearch, FaFilter, FaEye, FaEdit, FaCopy, FaPaperPlane, FaFileInvoice, FaTrash } from 'react-icons/fa';

function QuotesList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Mock data - replace with your API data
//   const quotes = [
//     { id: 'DEV-001', clientId: 'CL-001', clientName: 'John Doe', date: '2024-01-15', total_ht: 1000, tva: 200, total_ttc: 1200, status: 'sent' },
//     { id: 'DEV-002', clientId: 'CL-002', clientName: 'Jane Smith', date: '2024-01-16', total_ht: 1500, tva: 300, total_ttc: 1800, status: 'draft' },
//     { id: 'DEV-003', clientId: 'CL-003', clientName: 'Mike Johnson', date: '2024-01-17', total_ht: 800, tva: 160, total_ttc: 960, status: 'accepted' },
//   ];

    const [quotes,setQuotes] = useState([])

    useEffect(()=>{
        fetch("/api/quote")
        .then(res => res.json()
        .then(result => setQuotes(result))
    )
    
    },[])

    // console.log(quotes)

  // const getStatusBadge = (status) => {
  //   const statusConfig = {
  //     draft: { color: 'bg-gray-100 text-gray-800', label: 'Brouillon' },
  //     sent: { color: 'bg-blue-100 text-blue-800', label: 'Envoye' },
  //     accepted: { color: 'bg-green-100 text-green-800', label: 'accepte' },
  //     rejected: { color: 'bg-red-100 text-red-800', label: 'refuse' }
  //   };
  //   const config = statusConfig[status] || statusConfig.draft;
  //   return <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>{config.label}</span>;
  // };

//   const filteredQuotes = quotes.filter(quote => {
//     const matchesSearch = quote.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                          quote.clientName.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Liste des Devis</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            + Nouveau Devis
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par numéro ou client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="draft">Brouillon</option>
            <option value="sent">Envoyé</option>
            <option value="accepted">Accepté</option>
            <option value="rejected">Refusé</option>
          </select>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-2xl font-bold text-gray-800">{quotes.length}</div>
          <div className="text-gray-600">Total Devis</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-2xl font-bold text-blue-600">{quotes.filter(q => q.status === 'sent').length}</div>
          <div className="text-gray-600">Envoyés</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-2xl font-bold text-green-600">{quotes.filter(q => q.status === 'accepted').length}</div>
          <div className="text-gray-600">Acceptés</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-2xl font-bold text-gray-800">
            {quotes.reduce((sum, q) => sum + parseFloat(q.total_ttc), 0).toFixed(2)} €
          </div>
          <div className="text-gray-600">Chiffre Total</div>
        </div>
      </div>

      {/* Quotes Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 border-b text-left font-semibold text-gray-700">ID</th>
                <th className="py-3 px-4 border-b text-left font-semibold text-gray-700">Client</th>
                <th className="py-3 px-4 border-b text-left font-semibold text-gray-700">Date</th>
                <th className="py-3 px-4 border-b text-left font-semibold text-gray-700">Total HT</th>
                <th className="py-3 px-4 border-b text-left font-semibold text-gray-700">TVA</th>
                <th className="py-3 px-4 border-b text-left font-semibold text-gray-700">Total TTC</th>
                <th className="py-3 px-4 border-b text-left font-semibold text-gray-700">Statut</th>
                <th className="py-3 px-4 border-b text-left font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* {filteredQuotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b text-blue-600 font-medium">{quote.id}</td>
                  <td className="py-3 px-4 border-b">
                    <div className="font-medium text-gray-800">{quote.clientName}</div>
                    <div className="text-sm text-gray-500">{quote.clientId}</div>
                  </td>
                  <td className="py-3 px-4 border-b text-gray-600">{quote.date}</td>
                  <td className="py-3 px-4 border-b font-medium">{quote.total_ht.toFixed(2)} €</td>
                  <td className="py-3 px-4 border-b text-gray-600">{quote.tva.toFixed(2)} €</td>
                  <td className="py-3 px-4 border-b font-bold text-green-600">{quote.total_ttc.toFixed(2)} €</td>
                  <td className="py-3 px-4 border-b">{getStatusBadge(quote.status)}</td>
                  <td className="py-3 px-4 border-b">
                    <div className="flex gap-2">
                      <button className="text-blue-500 hover:text-blue-700">
                        <FaEye />
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <FaEdit />
                      </button>
                      <button className="text-green-500 hover:text-green-700">
                        <FaPaperPlane />
                      </button>
                      <button className="text-purple-500 hover:text-purple-700">
                        <FaFileInvoice />
                      </button>
                    </div>
                  </td>
                </tr>
              ))} */}
              {quotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b text-blue-600 font-medium">{quote.id}</td>
                  <td className="py-3 px-4 border-b">
                    {/* <div className="font-medium text-gray-800">{quote.clientName}</div> */}
                    <div className="text-sm text-gray-500">{quote.client_id}</div>
                  </td>
                  <td className="py-3 px-4 border-b text-gray-600">{quote.date}</td>
                  <td className="py-3 px-4 border-b font-medium">{quote.total_ht.toFixed(2)} €</td>
                  <td className="py-3 px-4 border-b text-gray-600">{parseFloat(quote.tva).toFixed(2)} €</td>
                  <td className="py-3 px-4 border-b font-bold text-green-600">{parseFloat(quote.total_ttc).toFixed(2)} €</td>
                  <td className="py-3 px-4 border-b">{quote.statut}</td>
                  <td className="py-3 px-4 border-b">
                    <div className="flex gap-2">
                      <button className="text-blue-500 hover:text-blue-700">
                        <FaEye />
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <FaEdit />
                      </button>
                      <button className="text-green-500 hover:text-green-700">
                        <FaPaperPlane />
                      </button>
                      <button className="text-purple-500 hover:text-purple-700">
                        <FaFileInvoice />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {quotes.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="text-gray-400 text-6xl mb-4">📄</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun devis trouvé</h3>
          <p className="text-gray-500">Aucun devis ne correspond à vos critères de recherche.</p>
        </div>
      )}
    </div>
  );
}

export default QuotesList;