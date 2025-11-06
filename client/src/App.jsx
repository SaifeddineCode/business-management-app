
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sales from "./pages/sales/Sales";
import Purchases from "./pages/purchases/Purchases";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/dashboard/Dashboard";
import AddQuote from "./pages/sales/forms/AddQuote";
import Quote from "./pages/quote/Quote";
import AddSalesOrder from "./pages/sales/forms/AddSalesOrder";
import SalesOrdersList from "./pages/salesOrders/SalesOrders";

function App() {


  return (
    <div className="flex flex-col">
      <div className="flex  bg-gray-100">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Navbar />
          <main className="flex-1 p-6">
            <Routes>
              <Route path='' element={<Dashboard/>} />
              <Route path='/sales' element={<Sales/>} />
              <Route path='/add-quote' element={<AddQuote />} />
              <Route path="/quote" element={<Quote />} />
              <Route path='/add-sales-order' element={ <AddSalesOrder /> } />
              <Route path='/sales-order-list' element={ <SalesOrdersList /> } />
              <Route path='/purchases' element={<Purchases/>} />
            </Routes>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App
