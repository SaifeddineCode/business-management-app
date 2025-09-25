import React from "react";

export default function Navbar() {
  return (
    <header className="w-full bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      <div className="flex items-center space-x-4">
        <input type="text" placeholder="Search..." className="border rounded p-2" />
        <div>🔔</div>
        <div>👤 Profile</div>
      </div>
    </header>
  );
}
