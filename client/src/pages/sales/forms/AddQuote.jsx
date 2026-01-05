import { useState, useEffect } from 'react';
import { FaSave, FaPrint, FaPaperPlane, FaFileInvoice, FaPlus, FaTrash, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { fetchWithToken } from '../../../utils/api';

// =============================================================================
// COMPONENT: AddQuote
// PURPOSE: Form for creating new quotes with client selection, product items, and terms
// =============================================================================
function AddQuote({ onClose }) {
  // ===========================================================================
  // STATE MANAGEMENT SECTION
  // ===========================================================================
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [isSaving, setIsSaving] = useState(false); // Loading state for save button

  // ===========================================================================
  // QUOTE DATA STATE - Main form data structure
  // WARNING: Changing this structure may break save functionality
  // ===========================================================================
  const [quoteData, setQuoteData] = useState({
    clientID: '',
    libelle:"",
    // Quote Header - Auto-generated values
    quoteNumber: `DEV-${Date.now()}`,
    dateCreated: new Date().toISOString().split('T')[0],
    expiryDate: '',
    status: 'brouillon',
    
    // Products/Services - Dynamic items array
    items: [
      {
        id: 1,
        productId: '',
        description: '',
        quantity: 1,
        unitPrice: 0,
        taxRate: 0,
        total: 0
      }
    ],
     
    // // Terms & Conditions - Default values
    // paymentTerms: '30 jours',
    // deliveryConditions: 'Livraison sous 15 jours',
    // validityPeriod: '30 jours',
    // specialNotes: ''
  });


  useEffect(()=>{
    console.log(quoteData.status)
  },[quoteData.status])

  // ===========================================================================
  // API DATA FETCHING SECTION
  // ERROR: If these fail, check network tab and API endpoints
  // ===========================================================================
  const fetchClients = async () => {
    // TODO: Add error handling for failed API calls
    const response = await fetchWithToken('/api/customers');
    const data = await response.json();
    setClients(data);
  };


  const fetchProducts = async () => {
    // TODO: Add error handling for failed API calls
    const response = await fetchWithToken('/api/products');
    const data = await response.json();
    setProducts(data);
  };

  // ===========================================================================
  // EFFECT HOOKS SECTION
  // ===========================================================================
  useEffect(() => {
    // Load initial data on component mount
    fetchClients();
    fetchProducts();
  }, []);

  
  

  // ===========================================================================
  // PRODUCT/ITEM MANAGEMENT SECTION
  // CRITICAL: This handles product selection and item updates
  // ===========================================================================
  const handleProductChange = (itemId, productId) => {
    // Find selected product and auto-populate fields
    const selectedProduct = products.find(product => product.id === parseInt(productId));
    if (selectedProduct) {
      updateItemLine(itemId, 'productId', productId);
      updateItemLine(itemId, 'description', selectedProduct.product_name);
      updateItemLine(itemId, 'unitPrice', selectedProduct.product_price);
    }
  };
 
  const addItem = () => {
    // Add new empty item to the quote
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
    
    if(quoteData.items.length === 1 ){
      return alert("you can't delete just this only row so you can add at least one item")
    } else {
      // Remove item by id - TODO: Add validation for minimum items
    setQuoteData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
    }
    
    // Remove item by id - TODO: Add validation for minimum items
    // setQuoteData(prev => ({
    //   ...prev,
    //   items: prev.items.filter(item => item.id !== id)
    // }));
  };

  // const updateItem = (id, field, value) => {
  //   // Update specific item field and recalculate totals if needed
  //   setQuoteData(prev => ({
  //     ...prev,
  //     items: prev.items.map(item => {
  //       if (item.id === id) {
  //         const updatedItem = { ...item, [field]: value };
  //         // Recalculate total when quantity or price changes
  //         if (field === 'quantity' || field === 'unitPrice') {
  //           updatedItem.total = updatedItem.quantity * updatedItem.unitPrice;
  //         }
  //         return updatedItem;
  //       }
  //       return item;
  //     })
  //   }));
  // };


// const updateItemLine = (id, field, value) => {
//   setQuoteData(prev => ({
//     ...prev,
//     items: prev.items.map(item => {
//       if (item.id === id) {
//         const updatedItem = { ...item, [field]: value };
        
//         // Recalculate total when quantity, price, OR tax rate changes
//         if (field === 'quantity' || field === 'unitPrice' || field === 'taxRate') {
//           const subtotal = updatedItem.quantity * updatedItem.unitPrice;
//           const taxAmount = subtotal * (updatedItem.taxRate / 100);
//           updatedItem.total = subtotal + taxAmount;
//         }
//         return updatedItem;
//       }
//       return item;
//     })
//   }));
// };


const updateItemLine =(id,field,value)=>{
  setQuoteData((prev)=>{
  return (
    {
      ...prev,
      items : prev.items.map((item)=>{
        if(item.id === id){
          const updateItem = {...item,[field] : value}

          const amountHT = updateItem.quantity * updateItem.unitPrice
          const amountTax = amountHT * (updateItem.taxRate / 100); 
          updateItem.total = amountHT + amountTax

          return updateItem
        } 
        return item
      })
    }
  )
  })
}




// const updateItemLine = (id, field, value) => {
//   setQuoteData((prev) => {
//     return {
//       ...prev,
//       items: prev.items.map((item) => {
//         if (item.id === id) {
//           const updatedItem = { ...item, [field]: value };
          
//           // Use updatedItem instead of mixing with item
//           const amountHT = updatedItem.quantity * updatedItem.unitPrice;
//           const amountTax = amountHT * (updatedItem.taxRate / 100); // Don't forget divide by 100!
//           updatedItem.total = amountHT + amountTax;
          
//           return updatedItem;
//         } 
//         return item;
//       })
//     };
//   });
// };



 

  // ===========================================================================
  // CALCULATIONS SECTION
  // IMPORTANT: These values are used in the save operation
  // ===========================================================================

  // const subtotal = quoteData.items.reduce((sum, item) => sum + item.total, 0);
  // const taxAmount = subtotal * quoteData.items[0].taxRate; // 20% TVA - TODO: Make dynamic based on item tax rates
  // const totalAmount = subtotal + taxAmount;


    const subtotal = quoteData.items.reduce((sum, item) => sum + item.total, 0);
    const taxAmount = quoteData.items.reduce((sum, item) =>  sum + (item.total * (item.taxRate / 100)), 0);
  
    const totalAmount = subtotal + taxAmount;


  // ===========================================================================
  // SAVE OPERATION SECTION
  // CRITICAL: This sends data to the backend API
  // ===========================================================================


  const resetNewQuote = () => {
    setQuoteData(prev => {
      return ({
        ...prev,
        clientID: '',
        libelle :"",
    // Quote Header - Auto-generated values
    quoteNumber: `DEV-${Date.now()}`,
    dateCreated: new Date().toISOString().split('T')[0],
    expiryDate: '',
    status: '',
    
    // Products/Services - Dynamic items array
    items: [
      {
        id: prev.items.length + 1,
        productId: '',
        description: '',
        quantity: 1,
        unitPrice: 0,
        taxRate: 0,
        total: 0
      }
    ],
      })
    })
  }



  const saveQuote = async () => {
    // Validation - TODO: Enhance with better error messages
    if (!quoteData.clientID) {
      alert('Veuillez sélectionner un client');
      return;
    }

    if (quoteData.items.length === 0 || quoteData.items.some(item => !item.productId)) {
      alert('Veuillez ajouter au moins un article valide');
      return;
    }

    setIsSaving(true);

    try {
      // Prepare data for API - includes calculated fields
      const quoteToSave = {
        ...quoteData,
        subtotal: subtotal,
        taxAmount: taxAmount,
        totalAmount: totalAmount
      };

      // API Call - TODO: Add timeout and retry logic
        // const response = await fetch('/api/quote', {
        const response = await fetchWithToken('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quoteToSave)
      });

      const result = await response.json();

      if (result.success) {
        // Success handling - TODO: Add success notification instead of alert
        alert(`Devis ${result.quoteNumber} créé avec succès!`);
        
        // TODO: Implement proper form reset or navigation
        // onClose();
          resetNewQuote()
        
      } else {
        // Server-side error
        // alert(`Erreur: ${result.message}`);
        console.log(result.message)
      }

    } catch (error) {
      // Network or client-side error
      console.error('Erreur lors de la sauvegarde:', error);
      alert('Erreur lors de la sauvegarde du devis');
    } finally {
      setIsSaving(false);
    }
  };




  // ===========================================================================
  // UI RENDERING SECTION
  // STRUCTURE: Divided into logical sections for maintainability
  // ===========================================================================
  return (
    <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto relative">
      <div className="p-6">
        {/* =====================================================================
            HEADER SECTION: Quote information and client selection
        ===================================================================== */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-start gap-3">
            {/* Quote Header - Left side with quote details */}
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
                    <option value="brouillon">Brouillon</option>
                    <option value="envoye">Envoyé</option>
                    <option value="accepte">Accepté</option>
                    <option value="refuse">Refusé</option>
                  </select>
                </div>
              </div>
            </div>
            <div className='flex flex-1 flex-col' >
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Libellé du devis</h2>
              <input
                type="text"
                id="libelle"
                name="libelle"
                value={quoteData.libelle || ''}
                onChange={(e)=>{setQuoteData(prev=>({...prev,libelle:e.target.value}))}}
                placeholder="Description du devis"
                className="w-full border rounded px-3 py-2"
              />
            </div>
            {/* Client Information - Right side with client selection */}
              <div className="flex-1 max-w-md">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Client</h2>
                <div className="space-y-3">
                  <select 
                    value={quoteData.clientID} 
                    onChange={(e) => {
                      setQuoteData(prev => ({
                        ...prev,
                        clientID:e.target.value
                      }));
                    }}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Sélectionner un client</option>
                    {clients.map(client => (
                      <option key={client.id} value={client.id}>
                        {client.name} 
                      </option>
                    ))}
                  </select>
                </div>
              </div>
          </div>
        </div>

        {/* =====================================================================
            PRODUCTS/SERVICES SECTION: Dynamic items table with calculations
        ===================================================================== */}
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
                        value={item.productId || ""}
                        onChange={(e) => handleProductChange(item.id,e.target.value)}
                        className="w-full border rounded px-2 py-1"
                      >
                        <option value="">Sélectionner un produit</option>
                        {products.map(product => (
                          <option key={product.id} value={product.id}>
                            {product.product_name} - {product.product_price}€
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateItemLine(item.id, 'description', e.target.value)}
                        className="w-full border rounded px-2 py-1"
                        placeholder="Description de l'article"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItemLine(item.id, 'quantity', parseInt(e.target.value) || 0)}
                        className="w-20 border rounded px-2 py-1"
                        min="1"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => updateItemLine(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                        className="w-32 border rounded px-2 py-1"
                        step="0.01"
                      />
                    </td>
                    <td className="p-3">
                      <select
                        value={item.taxRate}
                        onChange={(e) => updateItemLine(item.id, 'taxRate', parseInt(e.target.value))}
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

          {/* Calculations Section - Auto-calculated totals */}
          <div className="flex justify-end mt-6">
            <div className="w-64 space-y-2">
              <div className="flex justify-between">
                <span>Sous-total:</span>
                <span>{subtotal.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between">
                <span>Montant TVA:</span>
                <span>{taxAmount.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-bold text-lg">
                <span>Total:</span>
                <span>{totalAmount.toFixed(2)} €</span>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================================
            ACTION BUTTONS SECTION: Navigation and save operations
        ===================================================================== */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex gap-4 justify-between">
            <Link
              to={"/sales"} 
              onClick={onClose}
              className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              <FaArrowLeft /> Retour aux Ventes
            </Link>
            <div >
              {/* Save Button - Primary Action with loading state */}
              <button 
                onClick={saveQuote}
                disabled={isSaving}
                className={`flex items-center gap-2 ${
                  isSaving ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'
                } text-white px-4 py-2 rounded transition-colors`}
              >
                <FaSave /> 
                {isSaving ? 'Sauvegarde...' : 'Ajouter le Devis'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddQuote;