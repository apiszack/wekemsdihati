
import React, { useState } from 'react';
import { SCHOOL_NAME, APP_NAME, LOGO_URL } from '../constants';
import { AppNotification } from '../types';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  notifications: AppNotification[];
  onMarkAsRead: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage, notifications, onMarkAsRead }) => {
  const [showNotifs, setShowNotifs] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleToggleNotifs = () => {
    setShowNotifs(!showNotifs);
    if (!showNotifs && unreadCount > 0) {
      // Small delay to allow user to see the unread before marking
      setTimeout(onMarkAsRead, 1000);
    }
  };

  return (
    <nav className="bg-indigo-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('dashboard')}>
             <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-white">
                <img 
                  src={LOGO_URL} 
                  alt="Logo SK Kemasek" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/40?text=SKK";
                  }}
                />
             </div>
             <div>
               <h1 className="text-lg font-bold leading-none">{APP_NAME}</h1>
               <p className="text-xs text-indigo-200">{SCHOOL_NAME}</p>
             </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-baseline space-x-4">
              <button 
                onClick={() => onNavigate('dashboard')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === 'dashboard' ? 'bg-indigo-700 text-white' : 'text-indigo-100 hover:bg-indigo-800'}`}
              >
                Utama
              </button>
              <button 
                onClick={() => onNavigate('calendar')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === 'calendar' ? 'bg-indigo-700 text-white' : 'text-indigo-100 hover:bg-indigo-800'}`}
              >
                Kalendar
              </button>
              <button 
                onClick={() => onNavigate('booking')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === 'booking' ? 'bg-indigo-700 text-white' : 'text-indigo-100 hover:bg-indigo-800'}`}
              >
                Tempah
              </button>
              <button 
                onClick={() => onNavigate('list')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === 'list' ? 'bg-indigo-700 text-white' : 'text-indigo-100 hover:bg-indigo-800'}`}
              >
                Senarai
              </button>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={handleToggleNotifs}
                className="p-2 rounded-full hover:bg-indigo-800 transition-colors relative"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifs && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 z-[100] overflow-hidden animate-fadeIn">
                  <div className="p-3 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                    <span className="font-bold text-slate-800 text-sm">Notifikasi Admin</span>
                    <button onClick={() => setShowNotifs(false)} className="text-slate-400 hover:text-slate-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.slice(0, 10).map((n) => (
                        <div key={n.id} className={`p-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors ${!n.read ? 'bg-indigo-50/50' : ''}`}>
                          <div className="text-xs font-bold text-indigo-600 mb-1">{n.title}</div>
                          <div className="text-xs text-slate-600 mb-1">{n.message}</div>
                          <div className="text-[10px] text-slate-400">{new Date(n.timestamp).toLocaleString('ms-MY')}</div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-slate-400 text-xs italic">Tiada notifikasi baru.</div>
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <div className="p-2 bg-slate-50 text-center">
                       <button onClick={() => setShowNotifs(false)} className="text-[10px] text-indigo-600 font-bold hover:underline">Tutup</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
