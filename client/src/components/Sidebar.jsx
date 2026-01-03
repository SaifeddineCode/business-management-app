// import React from "react";
// import { Link, useLocation } from 'react-router-dom';
// import { 
//   FaChartLine, 
//   FaShoppingCart, 
//   FaBoxOpen, 
//   FaWarehouse,
//   FaUsers,
//   FaTruck,
//   FaMoneyCheckAlt,
//   FaCreditCard,
//   FaMoneyBillWave,
//   FaFileInvoiceDollar,
//   FaProjectDiagram
// } from 'react-icons/fa';

// export default function Sidebar() {

// const  menuItems = [
//   {
//     title: "Tableau de bord",
//     icon: FaChartLine,
//     path:'/'
//   },
//   {
//     title: "Gestion des ventes",
//     icon: FaShoppingCart,
//     path:'/sales'
    
//   },
//   {
//     title: "Gestion des achats",
//     icon: FaBoxOpen,
//     path:'/purchases'
    
//   },
//   {
//     title: "Gestion des produits",
//     icon: FaBoxOpen,
//     path:'/products'
//   },
//   {
//     title: "Gestion de stock",
//     icon: FaWarehouse,
//     path:'/stock'
//   },
//   {
//     title: "Gestion des clients",
//     icon: FaUsers,
//     path:'/customers'
//   },
//   {
//     title: "Gestion des fournisseurs",
//     icon: FaTruck,
//     path:'/suppliers'
//   },
//   {
//     title: "Gestion des règlements",
//     icon: FaMoneyCheckAlt,
//     path:'/regulations'
//   },
//   {
//     title: "Gestion paiement frs",
//     icon: FaCreditCard,
//     path:'/payment-suppliers'
//   },
//   {
//     title: "Gestion des dépenses",
//     icon: FaMoneyBillWave,
//     path:'/expenses'
//   },
//   {
//     title: "Gestion des avoirs",
//     icon: FaFileInvoiceDollar,
//     path:'/Assets'
//   },
//   {
//     title: "Gestion Projet",
//     icon: FaProjectDiagram,
//     path:'/Project-Management'
//   }
// ];


// const location = useLocation();

// console.log(location)

//   return (
//     <aside className="w-64  bg-white ">
//       <h2 className="text-2xl text-#112074 font-bold  border-b-1 border-gray-200 p-1 min-h-[85px] text-center  ">Ebtikar gestion commercial </h2>
//       <ul className="space-y-1 p-2">
//         {menuItems.map((item, index) => (
//           <Link
//           to={item.path} 
//             key={index} 
//             className={`
//               flex items-center px-4 py-3 rounded-lg cursor-pointer
//               transition-all duration-200 ease-out
            
//               ${
//             location.pathname === item.path ? 'bg-[#112074] ' : 'bg-white'
//           }
//             `}
//           >
//             <item.icon className={`
//               w-5 h-5 mr-3 
//             `
//           }
//           color={`${location.pathname === item.path ? 'white ' : 'gray'}`}
          
//             />
//             <span className={`flex-1
            
//               ${
//             location.pathname === item.path ? 'text-white font-medium ' : 'text-black'
//           }
//               `}>{item.title}</span>
//           </Link>
//         ))}
//     </ul>
//     </aside>
//   );
// }
import React, { useState } from 'react';
import { 
  FiHome, 
  FiTrendingUp, 
  FiShoppingCart, 
  FiPackage,
  FiDatabase,
  FiUsers,
  FiTruck,
  FiCreditCard,
  FiDollarSign,
  FiBarChart2,
  FiFileText,
  FiFolder,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  // const [activeItem, setActiveItem] = useState('');
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: FiHome, path: '/dashboard' },
    { id: 'sales', label: 'Gestion des ventes', icon: FiTrendingUp, path: '/sales' },
    { id: 'purchases', label: 'Gestion des achats', icon: FiShoppingCart, path: '/purchases' },
    { id: 'products', label: 'Gestion des produits', icon: FiPackage, path: '/products' },
    { id: 'stock', label: 'Gestion de stock', icon: FiDatabase, path: '/stock' },
    { id: 'clients', label: 'Gestion des clients', icon: FiUsers, path: '/clients' },
    { id: 'suppliers', label: 'Gestion des fournisseurs', icon: FiTruck, path: '/suppliers' },
    { id: 'payments', label: 'Gestion des règlements', icon: FiCreditCard, path: '/payments' },
    { id: 'supplier-payments', label: 'Gestion paiement frs', icon: FiDollarSign, path: '/supplier-payments' },
    { id: 'expenses', label: 'Gestion des dépenses', icon: FiBarChart2, path: '/expenses' },
    { id: 'credits', label: 'Gestion des avoirs', icon: FiFileText, path: '/credits' },
    { id: 'projects', label: 'Gestion Projet', icon: FiFolder, path: '/projects' },
  ];



  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        bg-white border-r border-gray-200
        transition-all duration-300 ease-in-out
        ${isExpanded ? ' w-72 translate-x-0' : 'w-20 translate-x-0 lg:translate-x-0'}
        flex flex-col
      `}>
        
        {/* Header */}
        <div className="flex items-center max-h-[85px] justify-between p-6 border-b border-gray-200">
          {isExpanded && (
            <h2 className="text-xl font-bold text-gray-800">Ebtikargestion commercial</h2>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-800"
          >
            {isExpanded ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`
                  w-full flex items-center rounded-xl px-4 py-3 transition-all duration-200 ease-in-out
                  ${isActive 
                    ? 'bg-[#112074] text-white shadow-lg transform scale-[1.02]' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }
                  ${isExpanded ? 'justify-start space-x-3' : 'justify-center'}
                  group
                `}
              >
                <Icon 
                  size={20} 
                  className={`
                    flex-shrink-0 transition-colors
                    ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}
                  `} 
                />
                
                {isExpanded && (
                  <span className={`
                    font-medium transition-all duration-200
                    ${isActive ? 'text-white' : 'text-gray-700 group-hover:text-gray-900'}
                  `}>
                    {item.label}
                  </span>
                )}
                
                {/* Tooltip for collapsed state */}
                {!isExpanded && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile (Mini) */}
        <div className={`
          border-t border-gray-200 p-4 transition-all duration-300
          ${isExpanded ? 'px-4' : 'px-2'}
        `}>
          <div className={`
            flex items-center transition-all duration-200
            ${isExpanded ? 'space-x-3' : 'justify-center'}
          `}>
            <img
              className="h-8 w-8 rounded-full object-cover border-2 border-gray-300"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
              alt="Profile"
            />
            {isExpanded && (
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-800 truncate">Saif Hassouni</p>
                <p className="text-xs text-gray-500 truncate">Ceo</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;