import React from "react";
import { 
  FaChartLine, 
  FaShoppingCart, 
  FaBoxOpen, 
  FaWarehouse,
  FaUsers,
  FaTruck,
  FaMoneyCheckAlt,
  FaCreditCard,
  FaMoneyBillWave,
  FaFileInvoiceDollar,
  FaProjectDiagram
} from 'react-icons/fa';

export default function Sidebar() {


const  menuItems = [
  {
    title: "Tableau de bord",
    icon: FaChartLine,
    completed: false
  },
  {
    title: "Gestion des ventes",
    icon: FaShoppingCart,
    completed: false
  },
  {
    title: "Gestion des achats",
    icon: FaBoxOpen,
    completed: true
  },
  {
    title: "Gestion des produits",
    icon: FaBoxOpen,
    completed: false
  },
  {
    title: "Gestion de stock",
    icon: FaWarehouse,
    completed: false
  },
  {
    title: "Gestion des clients",
    icon: FaUsers,
    completed: false
  },
  {
    title: "Gestion des fournisseurs",
    icon: FaTruck,
    completed: false
  },
  {
    title: "Gestion des règlements",
    icon: FaMoneyCheckAlt,
    completed: false
  },
  {
    title: "Gestion paiement frs",
    icon: FaCreditCard,
    completed: false
  },
  {
    title: "Gestion des dépenses",
    icon: FaMoneyBillWave,
    completed: false
  },
  {
    title: "Gestion des avoirs",
    icon: FaFileInvoiceDollar,
    completed: false
  },
  {
    title: "Gestion Projet",
    icon: FaProjectDiagram,
    completed: false
  }
];


  return (
    <aside className="w-64  bg-white ">
      <h2 className="text-2xl font-bold  border-b-1 p-1 min-h-[74px] flex justify-center items-center  ">Ebtikar gestion </h2>
      <ul className="space-y-1">
        {menuItems.map((item, index) => (
          <li 
            key={index} 
            className={`
              flex items-center px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer
              
            `}
          >
            <item.icon className={`
              w-5 h-5 mr-3
            `} />
            <span className="flex-1 font-medium">{item.title}</span>
          </li>
        ))}
    </ul>
    </aside>
  );
}