
import React, { useState } from 'react';
import { Booking, RoomType } from '../types';
import { TIME_SLOTS, DAYS_OF_WEEK } from '../constants';

interface CalendarViewProps {
  bookings: Booking[];
  onNavigateToBooking: () => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ bookings, onNavigateToBooking }) => {
  const [selectedRoom, setSelectedRoom] = useState<RoomType>(RoomType.BILIK_TAYANG);
  
  // Ambil tarikh Isnin minggu semasa
  const getMonday = (d: Date) => {
    d = new Date(d);
    const day = d.getDay(),
        diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  const monday = getMonday(new Date());
  const weekDates = DAYS_OF_WEEK.map((_, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    return date.toISOString().split('T')[0];
  });

  const getBookingForSlot = (date: string, time: string) => {
    return bookings.find(b => 
      b.room === selectedRoom && 
      b.date === date && 
      time >= b.startTime && 
      time < b.endTime
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Kalendar Mingguan</h2>
          <p className="text-slate-500 text-sm">Lihat ketersediaan fasiliti secara visual</p>
        </div>
        
        <div className="flex bg-slate-200 p-1 rounded-xl w-fit">
          <button 
            onClick={() => setSelectedRoom(RoomType.BILIK_TAYANG)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${selectedRoom === RoomType.BILIK_TAYANG ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-800'}`}
          >
            Bilik Tayang
          </button>
          <button 
            onClick={() => setSelectedRoom(RoomType.MAKMAL_KOMPUTER)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${selectedRoom === RoomType.MAKMAL_KOMPUTER ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-600 hover:text-slate-800'}`}
          >
            Makmal Komputer
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Calendar Header */}
            <div className="grid grid-cols-6 border-b border-slate-100 bg-slate-50">
              <div className="p-4 border-r border-slate-100"></div>
              {DAYS_OF_WEEK.map((day, i) => (
                <div key={day} className="p-4 text-center border-r border-slate-100 last:border-r-0">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{day}</div>
                  <div className="text-lg font-bold text-slate-700">
                    {new Date(weekDates[i]).getDate()} {new Date(weekDates[i]).toLocaleDateString('ms-MY', { month: 'short' })}
                  </div>
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="max-height-[600px] overflow-y-auto">
              {TIME_SLOTS.map((time) => (
                <div key={time} className="grid grid-cols-6 border-b border-slate-50 group hover:bg-slate-50/30 transition-colors">
                  <div className="p-3 text-right text-xs font-bold text-slate-400 border-r border-slate-100 bg-slate-50/50 sticky left-0 z-10">
                    {time}
                  </div>
                  {weekDates.map((date) => {
                    const booking = getBookingForSlot(date, time);
                    const isStartTime = booking?.startTime === time;
                    
                    return (
                      <div key={`${date}-${time}`} className="relative h-14 border-r border-slate-100 last:border-r-0">
                        {booking ? (
                          <div className={`absolute inset-x-1 inset-y-0.5 rounded-lg p-2 text-[10px] leading-tight shadow-sm z-20 overflow-hidden ${
                            selectedRoom === RoomType.BILIK_TAYANG 
                            ? 'bg-indigo-100 text-indigo-700 border-l-4 border-indigo-500' 
                            : 'bg-teal-100 text-teal-700 border-l-4 border-teal-500'
                          }`}>
                            {isStartTime && (
                              <>
                                <div className="font-bold truncate">{booking.teacherName}</div>
                                <div className="opacity-80 truncate">{booking.purpose}</div>
                              </>
                            )}
                          </div>
                        ) : (
                          <button 
                            onClick={onNavigateToBooking}
                            className="w-full h-full opacity-0 hover:opacity-100 bg-slate-100/50 flex items-center justify-center transition-opacity"
                            title="Klik untuk tempah"
                          >
                            <span className="text-slate-300 text-xl">+</span>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-6 text-xs text-slate-500 p-2">
        <div className="flex items-center">
          <span className="w-3 h-3 bg-indigo-500 rounded-sm mr-2"></span>
          Bilik Tayang (Ditempah)
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-teal-500 rounded-sm mr-2"></span>
          Makmal Komputer (Ditempah)
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-slate-100 border border-slate-200 rounded-sm mr-2"></span>
          Tersedia
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
