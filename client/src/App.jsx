import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sales from "./pages/sales/Sales";
import Purchases from "./pages/purchases/Purchases";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from "./pages/dashboard/Dashboard";
import AddQuote from "./pages/sales/forms/AddQuote";
import Quote from "./pages/quote/Quote";
import AddSalesOrder from "./pages/sales/forms/AddSalesOrder";
import SalesOrdersList from "./pages/salesOrders/SalesOrders";
import Invoice from "./pages/invoice/Invoice";
import InvoiceListPage from "./pages/invoice/InvoiceListPage";
import Login from "./pages/login/Login";
import { useEffect, useState } from "react";
import QuoteDetails from "./pages/quote/QuoteDetails";
import Products from "./pages/products/Products";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

   useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // !! converts to boolean
  }, []);


  if (!isAuthenticated) {
    return <Login setIsAuthenticated={setIsAuthenticated} />;
  }

  return (
    <div className="flex flex-col">
      <div className="flex  bg-gray-100">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Navbar setIsAuthenticated={setIsAuthenticated} />
          <main className="flex-1 p-6">
            <Routes>
              {/* <Route path='/login' element={<Login />} />
              <Route path='/' element={<Navigate to={'/login'} />} /> */}
              <Route path='/dashboard' element={<Dashboard/>} />
              <Route path='/sales' element={<Sales/>} />
              <Route path='/add-quote' element={<AddQuote />} />
              <Route path="/quote" element={<Quote />} />
              <Route path="/quote/:id" element={<QuoteDetails />} />
              <Route path="/quote/:id/edit" element={<AddQuote />} />
              {/* <Route path="/quote/:id" element={<AddQuote />} /> */}
              <Route path='/add-sales-order' element={ <AddSalesOrder /> } />
              <Route path='/sales-order-list' element={ <SalesOrdersList /> } />
              <Route path='/invoice' element={ <Invoice /> } />
              <Route path='/invoiceList' element={ <InvoiceListPage /> } />
              <Route path='/purchases' element={<Purchases/>} />
              <Route path='/products' element={<Products/>} />
            </Routes>
          </main>
        </div>
      </div>
      <Footer />
    </div>
   
  )
}

export default App
