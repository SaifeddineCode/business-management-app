import React, { useState } from 'react';
import { FaEdit, FaMailBulk, FaMap, FaPhone, FaPlus, FaSearch, FaTrash, FaUser } from 'react-icons/fa';

export default function Suppliers() {

  const [searchTerm, setSearchTerm] = useState('');

  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: 'Fournisseur ABC SARL',
      email: 'contact@abc.com',
      phone: '+212 5 35 94 46 00',
      address: '123 Rue Mohammed V',
      city: 'Casablanca',
      contact_person: 'Ahmed Bennani',
      created_at: '2025-01-15'
    },
    {
      id: 2,
      name: 'Supplier XYZ Ltd',
      email: 'info@xyz.com',
      phone: '+212 6 61 23 45 67',
      address: '456 Avenue Hassan II',
      city: 'Rabat',
      contact_person: 'Fatima Al-Mansouri',
      created_at: '2025-02-01'
    },
    {
      id: 3,
      name: 'Global Imports Co',
      email: 'sales@globalimports.com',
      phone: '+212 5 24 39 99 99',
      address: '789 Boulevard de la Paix',
      city: 'Marrakech',
      contact_person: 'Mohamed Alaoui',
      created_at: '2025-02-10'
    },
    {
      id: 4,
      name: 'Tech Solutions Morocco',
      email: 'tech@techsolutions.ma',
      phone: '+212 6 77 88 99 00',
      address: '321 Rue de l\'Innovation',
      city: 'Fès',
      contact_person: 'Nadia Zahra',
      created_at: '2025-02-05'
    },
    {
      id: 5,
      name: 'Premium Distributors',
      email: 'premium@distributors.com',
      phone: '+212 5 22 45 67 89',
      address: '654 Chemin de Meknes',
      city: 'Salé',
      contact_person: 'Hassan Chakir',
      created_at: '2025-02-12'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newSupplier, setNewSupplier] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    contact_person: ''
  });

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSupplier = () => {
    // Functionality to be added
    console.log('Add supplier:', newSupplier);
    setShowAddModal(false);
    setNewSupplier({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      contact_person: ''
    });
  };

  const handleDeleteSupplier = (id) => {
    // Functionality to be added
    console.log('Delete supplier:', id);
  };

  const handleEditSupplier = (supplier) => {
    // Functionality to be added
    console.log('Edit supplier:', supplier);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Gestion de Fournisseurs
        </h1>
        <p className="text-gray-600">Gérez vos fournisseurs et leurs informations de contact</p>
      </div>

      {/* Top Bar - Search and Add Button */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search Box */}
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Rechercher par nom, email ou ville..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          <FaSearch className="absolute left-3 top-3.5 text-gray-400" size={20} />
        </div>

        {/* Add Button */}
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2 justify-center md:justify-start"
        >
          <FaPlus size={20} /> Ajouter Fournisseur
        </button>
      </div>

      {/* Suppliers Grid / List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.length === 0 ? (
          <div className="col-span-full bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500 text-lg">Aucun fournisseur trouvé</p>
          </div>
        ) : (
          filteredSuppliers.map((supplier) => (
            <div key={supplier.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden border border-gray-200">
              
              {/* Header with color stripe */}
              <div className="h-2 bg-gradient-to-r from-blue-600 to-blue-400"></div>

              {/* Card Content */}
              <div className="p-6">
                
                {/* Supplier Name */}
                <h3 className="text-lg font-bold text-gray-900 mb-4 truncate">
                  {supplier.name}
                </h3>

                {/* Contact Person */}
                <div className="flex items-center gap-2 text-sm text-gray-700 mb-3">
                  <FaUser size={16} className="text-blue-600" />
                  <span className="font-semibold">{supplier.contact_person}</span>
                </div>

                {/* Email */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3 truncate">
                  <FaMailBulk size={16} className="text-green-600 flex-shrink-0" />
                  <a href={`mailto:${supplier.email}`} className="hover:text-blue-600 truncate">
                    {supplier.email}
                  </a>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <FaPhone size={16} className="text-orange-600" />
                  <a href={`tel:${supplier.phone}`} className="hover:text-blue-600">
                    {supplier.phone}
                  </a>
                </div>

                {/* Address */}
                <div className="flex items-start gap-2 text-sm text-gray-600 mb-4">
                  <FaMap size={16} className="text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p>{supplier.address}</p>
                    <p className="font-semibold">{supplier.city}</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-4"></div>

                {/* Date Added */}
                <p className="text-xs text-gray-500 mb-4">
                  Ajouté le: {new Date(supplier.created_at).toLocaleDateString('fr-FR')}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditSupplier(supplier)}
                    className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                  >
                    <FaEdit size={16} /> Modifier
                  </button>
                  <button
                    onClick={() => handleDeleteSupplier(supplier.id)}
                    className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                  >
                    <FaTrash size={16} /> Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Supplier Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-400 text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Ajouter Fournisseur</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Nom du Fournisseur <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newSupplier.name}
                  onChange={(e) => setNewSupplier({...newSupplier, name: e.target.value})}
                  placeholder="Ex: ABC Fournisseurs"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Contact Person */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Personne de Contact
                </label>
                <input
                  type="text"
                  value={newSupplier.contact_person}
                  onChange={(e) => setNewSupplier({...newSupplier, contact_person: e.target.value})}
                  placeholder="Ex: Ahmed Bennani"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={newSupplier.email}
                  onChange={(e) => setNewSupplier({...newSupplier, email: e.target.value})}
                  placeholder="Ex: contact@supplier.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={newSupplier.phone}
                  onChange={(e) => setNewSupplier({...newSupplier, phone: e.target.value})}
                  placeholder="Ex: +212 5 35 94 46 00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Adresse
                </label>
                <input
                  type="text"
                  value={newSupplier.address}
                  onChange={(e) => setNewSupplier({...newSupplier, address: e.target.value})}
                  placeholder="Ex: 123 Rue Mohammed V"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Ville
                </label>
                <input
                  type="text"
                  value={newSupplier.city}
                  onChange={(e) => setNewSupplier({...newSupplier, city: e.target.value})}
                  placeholder="Ex: Casablanca"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Annuler
              </button>
              <button
                onClick={handleAddSupplier}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}