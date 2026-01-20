
import React from 'react';
import { Booking, RoomType } from '../types';
import { LOGO_URL } from '../constants';

interface DashboardProps {
  bookings: Booking[];
  onAction: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ bookings, onAction }) => {
  const today = new Date().toISOString().split('T')[0];
  const todayBookings = bookings.filter(b => b.date === today);
  
  const roomStatus = (room: RoomType) => {
    const isOccupied = todayBookings.some(b => {
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      return b.room === room && timeStr >= b.startTime && timeStr <= b.endTime;
    });
    return isOccupied;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center space-x-4">
          <img 
            src={LOGO_URL} 
            alt="Logo Sekolah" 
            className="w-16 h-16 object-contain"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Selamat Datang ke WEKEMS</h2>
            <p className="text-slate-500 mt-1">Sistem Pengurusan Fasiliti SK Kemasek</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button 
            onClick={() => onAction('calendar')}
            className="bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-100 text-sm font-bold text-indigo-700 hover:bg-indigo-100 transition-colors flex items-center justify-center shadow-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Kalendar Mingguan
          </button>
          <div className="bg-slate-50 px-4 py-2 rounded-lg border border-slate-100 text-sm font-medium text-slate-600 flex items-center justify-center">
            📅 {new Date().toLocaleDateString('ms-MY', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bilik Tayang Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden group">
          <div className={`absolute top-0 right-0 px-4 py-1 rounded-bl-xl text-xs font-bold uppercase ${roomStatus(RoomType.BILIK_TAYANG) ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
            {roomStatus(RoomType.BILIK_TAYANG) ? 'Sedang Diguna' : 'Tersedia'}
          </div>
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800">{RoomType.BILIK_TAYANG}</h3>
          </div>
          <p className="text-slate-500 mb-6 text-sm">Dilengkapi dengan projektor HD, sistem bunyi surround, dan kerusi yang selesa untuk sesi tayangan PdP.</p>
          <button 
            onClick={() => onAction('booking')}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-md group-hover:scale-[1.01]"
          >
            Tempah Sekarang
          </button>
        </div>

        {/* Makmal Komputer Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden group">
          <div className={`absolute top-0 right-0 px-4 py-1 rounded-bl-xl text-xs font-bold uppercase ${roomStatus(RoomType.MAKMAL_KOMPUTER) ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
            {roomStatus(RoomType.MAKMAL_KOMPUTER) ? 'Sedang Diguna' : 'Tersedia'}
          </div>
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800">{RoomType.MAKMAL_KOMPUTER}</h3>
          </div>
          <p className="text-slate-500 mb-6 text-sm">Mempunyai 40 unit komputer dengan akses internet berkelajuan tinggi untuk PdP berasaskan ICT.</p>
          <button 
            onClick={() => onAction('booking')}
            className="w-full bg-teal-600 text-white py-2.5 rounded-xl font-semibold hover:bg-teal-700 transition-all shadow-md group-hover:scale-[1.01]"
          >
            Tempah Sekarang
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
          <span className="w-2 h-6 bg-indigo-600 rounded-full mr-2"></span>
          Tempahan Hari Ini ({todayBookings.length})
        </h3>
        {todayBookings.length > 0 ? (
          <div className="space-y-3">
            {todayBookings.map((b) => (
              <div key={b.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center space-x-4">
                   <div className="w-12 h-12 bg-white flex flex-col items-center justify-center rounded-lg border border-slate-200 text-xs font-bold">
                      <span className="text-indigo-600">{b.startTime}</span>
                      <span className="text-slate-400">-{b.endTime}</span>
                   </div>
                   <div>
                     <p className="font-bold text-slate-800">{b.teacherName}</p>
                     <p className="text-sm text-slate-500">{b.room} • {b.purpose}</p>
                   </div>
                </div>
                <div className="text-xs px-3 py-1 bg-white border border-slate-200 rounded-full text-slate-600 font-medium">
                   Disahkan
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-slate-400 italic bg-slate-50/50 rounded-xl">
            Tiada tempahan untuk hari ini.
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
