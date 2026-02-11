import React, { useEffect, useState } from 'react';
import { 
  FiSearch, 
  FiBell, 
  FiSettings, 
  FiChevronDown,
  FiMenu 
} from 'react-icons/fi';

const Navbar = ({setIsAuthenticated}) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(()=>{
    console.log(user.name)
  },[user])

  const notifications = [
    { id: 1, text: 'New quote request from Client XYZ', time: '5 min ago', unread: true },
    { id: 2, text: 'Payment received from ABC Corp', time: '1 hour ago', unread: true },
    { id: 3, text: 'Inventory low for Product #123', time: '2 hours ago', unread: false }
  ];

  const signOut = () =>{
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setIsAuthenticated(false)
  }

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        
        {/* Left Section - Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search clients, products, orders..."
            />
          </div>
        </div>

        {/* Right Section - Icons and Profile */}
        <div className="flex items-center space-x-4 ml-6">
          
          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiBell className="h-5 w-5" />
              {/* Notification badge */}
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-xs text-white items-center justify-center">
                  3
                </span>
              </span>
            </button>

            {/* Notifications Dropdown Menu */}
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                        notification.unread ? 'bg-blue-50' : ''
                      }`}
                    >
                      <p className="text-sm text-gray-800">{notification.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-200">
                  <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Settings Icon */}
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <FiSettings className="h-5 w-5" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <img
                className="h-8 w-8 rounded-full object-cover"
                src={user.avatar}
                alt={user.name}
              />
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
              <FiChevronDown className="h-4 w-4 text-gray-500" />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
                <div className="p-2">
                  <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                    Profile Settings
                  </a>
                  <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                    Account Settings
                  </a>
                  <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                    Billing
                  </a>
                </div>
                <div className="p-2 border-t border-gray-200">
                  <button 
                    onClick={()=>signOut()}
                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded">
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for dropdowns */}
      {(isNotificationOpen || isProfileOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsNotificationOpen(false);
            setIsProfileOpen(false);
          }}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;