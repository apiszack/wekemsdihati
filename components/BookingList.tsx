
import React from 'react';
import { Booking } from '../types';

interface BookingListProps {
  bookings: Booking[];
  onDelete: (id: string) => void;
}

const BookingList: React.FC<BookingListProps> = ({ bookings, onDelete }) => {
  const sortedBookings = [...bookings].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Senarai Semua Tempahan</h2>
        <div className="text-sm text-slate-500">Jumlah: {bookings.length}</div>
      </div>
      
      {bookings.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          <p>Tiada data tempahan direkodkan.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500 text-sm">
                <th className="pb-3 font-semibold">Guru</th>
                <th className="pb-3 font-semibold">Bilik</th>
                <th className="pb-3 font-semibold">Tarikh & Masa</th>
                <th className="pb-3 font-semibold">Tujuan</th>
                <th className="pb-3 font-semibold text-right">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedBookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 font-medium text-slate-800">{b.teacherName}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${b.room.includes('Tayang') ? 'bg-indigo-50 text-indigo-600' : 'bg-teal-50 text-teal-600'}`}>
                      {b.room}
                    </span>
                  </td>
                  <td className="py-4 text-sm">
                    <div className="font-semibold text-slate-700">{b.date}</div>
                    <div className="text-slate-500">{b.startTime} - {b.endTime}</div>
                  </td>
                  <td className="py-4 text-sm text-slate-600 italic">"{b.purpose}"</td>
                  <td className="py-4 text-right">
                    <button 
                      onClick={() => onDelete(b.id)}
                      className="text-red-400 hover:text-red-600 transition-colors p-2"
                      title="Padam Tempahan"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingList;
