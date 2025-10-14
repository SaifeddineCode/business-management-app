import { useEffect, useState } from 'react';
import { FaSearch, FaPaperPlane, FaPrint, FaCheck, FaPlus, FaTrash } from 'react-icons/fa';

export default function AddSalesOrder() {
  // ========== STATE MANAGEMENT ==========
  const [salesOrders, setSalesOrders] = useState([
    {
      id: '',
      date: '',
      customer: { name: 'ebtikarweb', phone: '+212669708949' },
      subject: 'BON DE LIVRAISON SYSTÈME',
      totalHT: 632.40,
      tva: 126.48,
      totalTTC: 758.88,
      status: 'Non Payé',
      vendor: 'demo',
      products: [
        { id: 1, name: '', quantity: 1, price: "", discount: "", tva: "" }
      ]
    }
  ]);

  const [products, setProducts] = useState([]);

  const [clients, setClients] = useState([]);

  const [selectedOrder, setSelectedOrder] = useState(salesOrders[0]);


  // fetch clients and products, 
  useEffect(()=>{
    fetch("/api/customers")
    .then(res => res.json())
    .then(customersFetched => setClients(customersFetched))
  },[])


  useEffect(()=>{
    fetch("/api/products")
    .then(res => res.json())
    .then(productsFetched => setProducts(productsFetched))
  },[])

  // ========== HANDLERS ==========
  const handleAddProduct = () => {
    const newProduct = { id: Date.now(), name: '', quantity: 1, price: 0, discount: 0, tva: 20 };
    setSelectedOrder(prev => ({
      ...prev,
      products: [...prev.products, newProduct]
    }));
  };

  const handleRemoveProduct = (productId) => {
    setSelectedOrder(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== productId)
    }));
  };

  const handleProductChange = (productId, field, value) => {
    setSelectedOrder(prev => ({
      ...prev,
      products: prev.products.map(p => 
        p.id === productId ? { ...p, [field]: value } : p
      )
    }));
  };

  // ========== CALCULATIONS ==========

  
  const calculateProductTotal = (product) => {
    const discountedPrice = product.price * (1 - product.discount / 100);
    return discountedPrice * product.quantity;
  };



  const subtotal = selectedOrder.products.reduce((sum, product) => sum + calculateProductTotal(product), 0);
  const totalTVA = selectedOrder.products.reduce((sum, product) => sum + (calculateProductTotal(product) * product.tva / 100), 0);
  const totalTTC = subtotal + totalTVA;






// const addingSalesOrder = async () => {
//   try {
//     const response = await fetch("/api/salesOrders", {
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(salesOrders)  // 👈 Pass your actual data here
//     });
    
//     if (!response.ok) throw new Error('Failed to create order');
    
//     const result = await response.json();
//     return result;
    
//   } catch(err) {
//     console.log('Error creating sales order:', err);
//   }
// }




  return (
    <div className="min-h-screen bg-gray-50 p-6">
      
      {/* ========== HEADER SECTION ========== */}
       <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        {/* <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Bons de Livraison</h1>
          <button 
            onClick={()=>addingSalesOrder()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2">
            <FaPlus /> Ajouter Bon
          </button>
        </div>  */}

        {/* Search Bar */}
        {/* <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Recherche rapide..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div> */}

        {/* Action Buttons */}
        {/* <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            <FaPaperPlane /> Envoyer par email
          </button>
          <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            <FaPrint /> Imprimer le bon de livraison
          </button>
          <button className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
            <FaCheck /> Valider
          </button>
        </div> */}
      </div>

      <div className="grid grid-cols-3 gap-6">
        
        {/* ========== LEFT COLUMN - ORDER INFO ========== */}
        <div className="col-span-2 space-y-6">
          
          {/* Order Header Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-600">BON DE LIVRAISON</div>
                <div className="text-lg font-bold">{selectedOrder.id}</div>
                <div className="text-sm text-gray-600">{selectedOrder.subject}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Date</div>
                <div className="font-semibold">{selectedOrder.date}</div>
                <div className="text-sm text-red-600 font-semibold">{selectedOrder.status}</div>
              </div>
            </div>

            {/* Client Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Client</label>
              <select className="w-full border rounded px-3 py-2">
                <option value="">Sélectionner le Client</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>
                    {client.name} - {client.telephone}
                  </option>
                ))}
              </select>
            </div>

            {/* Order Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="flex justify-between py-1">
                  <span>Total HT:</span>
                  <span>{subtotal.toFixed(2)} DH</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Montant TVA:</span>
                  <span>{totalTVA.toFixed(2)} DH</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between py-1 font-semibold">
                  <span>Total A Payer:</span>
                  <span className="text-green-600">{totalTTC.toFixed(2)} DH</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Montant en lettres:</span>
                  <span className="text-gray-600">Sept cent cinquante-huit DH</span>
                </div>
              </div>
            </div>
          </div>

          {/* ========== PRODUCTS TABLE ========== */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Détail Bon Vente</h2>
              <button 
                onClick={handleAddProduct}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                <FaPlus /> Ajouter les Produits
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3">Produit</th>
                    <th className="text-left p-3">Quantité</th>
                    <th className="text-left p-3">Prix</th>
                    <th className="text-left p-3">Remise %</th>
                    <th className="text-left p-3">TVA %</th>
                    <th className="text-left p-3">Montant</th>
                    <th className="text-left p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.products.map((product) => (
                    <tr key={product.id} className="border-b">
                      <td className="p-3">
                        <select 
                          value={product.product_name}
                          onChange={(e) => handleProductChange(product.id, 'product_name', e.target.value)}
                          className="w-full border rounded px-2 py-1"
                        >
                          <option value="">Sélectionner produit</option>
                          {products.map(p => (
                            <option key={p.id} value={p.product_name}>{p.product_name}</option>
                          ))}
                        </select>
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          value={product.quantity}
                          onChange={(e) => handleProductChange(product.id, 'quantity', parseInt(e.target.value))}
                          className="w-20 border rounded px-2 py-1"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          value={product.product_price}
                          onChange={(e) => handleProductChange(product.id, 'product_price', parseFloat(e.target.value))}
                          className="w-24 border rounded px-2 py-1"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          value={product.discount}
                          onChange={(e) => handleProductChange(product.id, 'discount', parseFloat(e.target.value))}
                          className="w-20 border rounded px-2 py-1"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          value={product.tva}
                          onChange={(e) => handleProductChange(product.id, 'tva', parseFloat(e.target.value))}
                          className="w-20 border rounded px-2 py-1"
                        />
                      </td>
                      <td className="p-3 font-semibold">
                        {calculateProductTotal(product).toFixed(2)} DH
                      </td>
                      <td className="p-3">
                        <button 
                          onClick={() => handleRemoveProduct(product.id)}
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
          </div>
        </div>

        {/* ========== RIGHT COLUMN - SIDE INFO ========== */}
        <div className="space-y-6">
          
          {/* Payment Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold mb-4">Ajouter un règlement</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Le solde</label>
                <div className="font-bold text-lg text-green-600">{totalTTC.toFixed(2)} DH</div>
              </div>
              <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                Enregistrer Paiement
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Vendeur</label>
                <div className="font-medium">{selectedOrder.vendor}</div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Date commande</label>
                <input type="date" className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Date de livraison</label>
                <input type="date" className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Lieu de livraison</label>
                <textarea className="w-full border rounded px-3 py-2" rows="2" />
              </div>
            </div>
          </div>

          {/* Stock Info */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold mb-4">Information Stock</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>QT EN STOCK:</span>
                <span className="font-semibold">50</span>
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Entrepôt</label>
                <select className="w-full border rounded px-2 py-1">
                  <option>TOP6-09</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
