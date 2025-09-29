import { useState, useEffect } from 'react';
import { FaSave, FaPrint, FaPaperPlane, FaFileInvoice, FaPlus, FaTrash, FaArrowLeft } from 'react-icons/fa';

function AddQuote({ onClose }) {
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  
  const [quoteData, setQuoteData] = useState({
    clientId: '',
    // Client Information
    clientName: '',
    clientCompany: '',
    clientEmail: '',
    clientPhone: '',
    clientAddress: '',
    clientReference: '',
    
    // Quote Header
    quoteNumber: `DEV-${Date.now()}`,
    dateCreated: new Date().toISOString().split('T')[0],
    expiryDate: '',
    status: 'draft',
    
    // Products/Services
    items: [
      {
        id: 1,
        productId: '',
        description: '',
        quantity: 1,
        unitPrice: 0,
        taxRate: 20,
        total: 0
      }
    ],
    
    // Terms & Conditions
    paymentTerms: '30 jours',
    deliveryConditions: 'Livraison sous 15 jours',
    validityPeriod: '30 jours',
    specialNotes: ''
  });

  useEffect(() => {
    fetchClients();
    fetchProducts();
  }, []);

  const fetchClients = async () => {
    // Your API call to get clients from MySQL
    const response = await fetch('/api/clients');
    const data = await response.json();
    setClients(data);
    // Mock data for now
    // setClients([
    //   { id: 1, name: 'John Doe', company: 'ABC Corp', email: 'john@abc.com', phone: '0123456789', address: '123 Main St' },
    //   { id: 2, name: 'Jane Smith', company: 'XYZ Ltd', email: 'jane@xyz.com', phone: '0987654321', address: '456 Oak Ave' }
    // ]);
  };

  const fetchProducts = async () => {
    // Your API call to get products from MySQL
    const response = await fetch('/api/products');
    const data = await response.json();
    setProducts(data);
    console.log(data)
    
    // Mock data for now
    // setProducts([
    //   { id: 1, name: 'Product A', price: 100, description: 'Description A' },
    //   { id: 2, name: 'Product B', price: 200, description: 'Description B' },
    //   { id: 3, name: 'Product C', price: 150, description: 'Description C' }
    // ]);
  };

  // const handleClientChange = (clientId) => {
  //   const selectedClient = clients.find(client => client.id === parseInt(clientId));
  //   if (selectedClient) {
  //     setQuoteData(prev => ({
  //       ...prev,
  //       clientId: clientId,
  //       clientName: selectedClient.name,
  //       clientCompany: selectedClient.company,
  //       clientEmail: selectedClient.email,
  //       clientPhone: selectedClient.phone,
  //       clientAddress: selectedClient.address
  //     }));
  //   }
  // };

  const handleProductChange = (itemId, productId) => {
    const selectedProduct = products.find(product => product.id === parseInt(productId));
    if (selectedProduct) {
      updateItem(itemId, 'productId', productId);
      updateItem(itemId, 'description', selectedProduct.name);
      updateItem(itemId, 'unitPrice', selectedProduct.price);
    }
  };

  const addItem = () => {
    setQuoteData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: prev.items.length + 1,
          productId: '',
          description: '',
          quantity: 1,
          unitPrice: 0,
          taxRate: 20,
          total: 0
        }
      ]
    }));
  };

  const removeItem = (id) => {
    setQuoteData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const updateItem = (id, field, value) => {
    setQuoteData(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'quantity' || field === 'unitPrice') {
            updatedItem.total = updatedItem.quantity * updatedItem.unitPrice;
          }
          return updatedItem;
        }
        return item;
      })
    }));
  };

  const subtotal = quoteData.items.reduce((sum, item) => sum + item.total, 0);
  const taxAmount = subtotal * 0.2; // 20% TVA
  const totalAmount = subtotal + taxAmount;

  return (
    <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto relative">
      {/* Close button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10 bg-white rounded-full p-2"
      >
        ✕
      </button>
      
      <div className="p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-start">
            {/* Quote Header - Left */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">Nouveau Devis</h1>
              <div className="mt-4 space-y-2">
                <div className="flex">
                  <span className="w-32 font-medium text-gray-600">Numéro:</span>
                  <span className="text-blue-600 font-semibold">{quoteData.quoteNumber}</span>
                </div>
                <div className="flex">
                  <span className="w-32 font-medium text-gray-600">Date création:</span>
                  <input
                    type="date"
                    value={quoteData.dateCreated}
                    onChange={(e) => setQuoteData(prev => ({ ...prev, dateCreated: e.target.value }))}
                    className="border rounded px-2 py-1"
                  />
                </div>
                <div className="flex">
                  <span className="w-32 font-medium text-gray-600">Date expiration:</span>
                  <input
                    type="date"
                    value={quoteData.expiryDate}
                    onChange={(e) => setQuoteData(prev => ({ ...prev, expiryDate: e.target.value }))}
                    className="border rounded px-2 py-1"
                  />
                </div>
                <div className="flex">
                  <span className="w-32 font-medium text-gray-600">Statut:</span>
                  <select
                    value={quoteData.status}
                    onChange={(e) => setQuoteData(prev => ({ ...prev, status: e.target.value }))}
                    className="border rounded px-2 py-1"
                  >
                    <option value="draft">Brouillon</option>
                    <option value="sent">Envoyé</option>
                    <option value="accepted">Accepté</option>
                    <option value="rejected">Refusé</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Client Information - Right */}
            {/* <div className="flex-1 max-w-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Client</h2>
              <div className="space-y-3">
                <select 
                  value={quoteData.clientId} 
                  onChange={(e) => handleClientChange(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Sélectionner un client</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>
                      {client.name} - {client.company}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Nom du client"
                  value={quoteData.clientName}
                  onChange={(e) => setQuoteData(prev => ({ ...prev, clientName: e.target.value }))}
                  className="w-full border rounded px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Entreprise"
                  value={quoteData.clientCompany}
                  onChange={(e) => setQuoteData(prev => ({ ...prev, clientCompany: e.target.value }))}
                  className="w-full border rounded px-3 py-2"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={quoteData.clientEmail}
                  onChange={(e) => setQuoteData(prev => ({ ...prev, clientEmail: e.target.value }))}
                  className="w-full border rounded px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Téléphone"
                  value={quoteData.clientPhone}
                  onChange={(e) => setQuoteData(prev => ({ ...prev, clientPhone: e.target.value }))}
                  className="w-full border rounded px-3 py-2"
                />
                <textarea
                  placeholder="Adresse"
                  value={quoteData.clientAddress}
                  onChange={(e) => setQuoteData(prev => ({ ...prev, clientAddress: e.target.value }))}
                  className="w-full border rounded px-3 py-2"
                  rows="2"
                />
                <input
                  type="text"
                  placeholder="Référence client"
                  value={quoteData.clientReference}
                  onChange={(e) => setQuoteData(prev => ({ ...prev, clientReference: e.target.value }))}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div> */}
            {/* Client Information - Right */}
            <div className="flex-1 max-w-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Client</h2>
              <div className="space-y-3">
                <select 
                  value={quoteData.clientId} 
                  onChange={(e) => {
                    const selectedClient = clients.find(client => client.id === parseInt(e.target.value));
                    setQuoteData(prev => ({
                      ...prev,
                      clientId: e.target.value,
                      clientName: selectedClient ? selectedClient.name : ''
                    }));
                  }}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Sélectionner un client</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>
                      {client.nom} 
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Products/Services Table */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Articles</h2>
            <button
              onClick={addItem}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              <FaPlus /> Ajouter un article
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Produit</th>
                  <th className="text-left p-3">Description</th>
                  <th className="text-left p-3">Quantité</th>
                  <th className="text-left p-3">Prix Unitaire</th>
                  <th className="text-left p-3">TVA</th>
                  <th className="text-left p-3">Total</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {quoteData.items.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-3">
                      <select
                        value={item.productId}
                        onChange={(e) => handleProductChange(item.id, e.target.value)}
                        className="w-full border rounded px-2 py-1"
                      >
                        <option value="">Sélectionner un produit</option>
                        {products.map(product => (
                          <option key={product.id} value={product.id}>
                            {product.nom} - {product.prix}€
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                        className="w-full border rounded px-2 py-1"
                        placeholder="Description de l'article"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                        className="w-20 border rounded px-2 py-1"
                        min="1"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                        className="w-32 border rounded px-2 py-1"
                        step="0.01"
                      />
                    </td>
                    <td className="p-3">
                      <select
                        value={item.taxRate}
                        onChange={(e) => updateItem(item.id, 'taxRate', parseInt(e.target.value))}
                        className="border rounded px-2 py-1"
                      >
                        <option value="0">0%</option>
                        <option value="10">10%</option>
                        <option value="20">20%</option>
                      </select>
                    </td>
                    <td className="p-3 font-semibold">
                      {item.total.toFixed(2)} €
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Calculations Section */}
          <div className="flex justify-end mt-6">
            <div className="w-64 space-y-2">
              <div className="flex justify-between">
                <span>Sous-total:</span>
                <span>{subtotal.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between">
                <span>TVA (20%):</span>
                <span>{taxAmount.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-bold text-lg">
                <span>Total:</span>
                <span>{totalAmount.toFixed(2)} €</span>
              </div>
            </div>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Conditions générales</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Conditions de paiement
              </label>
              <input
                type="text"
                value={quoteData.paymentTerms}
                onChange={(e) => setQuoteData(prev => ({ ...prev, paymentTerms: e.target.value }))}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Conditions de livraison
              </label>
              <input
                type="text"
                value={quoteData.deliveryConditions}
                onChange={(e) => setQuoteData(prev => ({ ...prev, deliveryConditions: e.target.value }))}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Validité
              </label>
              <input
                type="text"
                value={quoteData.validityPeriod}
                onChange={(e) => setQuoteData(prev => ({ ...prev, validityPeriod: e.target.value }))}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes spéciales
              </label>
              <textarea
                value={quoteData.specialNotes}
                onChange={(e) => setQuoteData(prev => ({ ...prev, specialNotes: e.target.value }))}
                className="w-full border rounded px-3 py-2"
                rows="3"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex gap-4 justify-between">
            <button 
              onClick={onClose}
              className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              <FaArrowLeft /> Retour aux Ventes
            </button>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                <FaSave /> Sauvegarder
              </button>
              <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                <FaPrint /> Imprimer
              </button>
              <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                <FaPaperPlane /> Envoyer
              </button>
              <button className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
                <FaFileInvoice /> Convertir en Facture
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddQuote;