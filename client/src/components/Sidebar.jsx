import React from "react";

export default function Sidebar() {


  const MenuItemns =[
    
  ]


  return (
    <aside className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <ul className="space-y-4">
        <li>🏠 Home</li>
        <li>👤 Users</li>
        <li>📊 Reports</li>
        <li>⚙️ Settings</li>
      </ul>
    </aside>
  );
}