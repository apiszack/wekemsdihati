
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import BookingForm from './components/BookingForm';
import BookingList from './components/BookingList';
import CalendarView from './components/CalendarView';
import AIAssistant from './components/AIAssistant';
import { Booking, AppNotification } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  // Load state from local storage on mount
  useEffect(() => {
    const savedBookings = localStorage.getItem('sk_kemasek_bookings');
    if (savedBookings) {
      try { setBookings(JSON.parse(savedBookings)); } catch (e) { console.error(e); }
    }

    const savedNotifs = localStorage.getItem('sk_kemasek_notifications');
    if (savedNotifs) {
      try { setNotifications(JSON.parse(savedNotifs)); } catch (e) { console.error(e); }
    }

    // Request notification permission on first load
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('sk_kemasek_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('sk_kemasek_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const triggerAdminNotification = (booking: Booking) => {
    const title = "Tempahan Baharu Diterima!";
    const body = `${booking.teacherName} telah menempah ${booking.room} pada ${booking.date} (${booking.startTime} - ${booking.endTime})`;

    // 1. Browser Notification
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, {
        body: body,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Logo_SK_Kemasek.png/480px-Logo_SK_Kemasek.png'
      });
    }

    // 2. App-internal notification
    const newNotif: AppNotification = {
      id: Math.random().toString(36).substr(2, 9),
      title: title,
      message: body,
      timestamp: Date.now(),
      read: false,
      type: 'booking_new'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const addBooking = (newBooking: Omit<Booking, 'id' | 'createdAt'>) => {
    const hasConflict = bookings.some(b => 
      b.date === newBooking.date && 
      b.room === newBooking.room &&
      ((newBooking.startTime >= b.startTime && newBooking.startTime < b.endTime) ||
       (newBooking.endTime > b.startTime && newBooking.endTime <= b.endTime) ||
       (newBooking.startTime <= b.startTime && newBooking.endTime >= b.endTime))
    );

    if (hasConflict) {
      alert("⚠️ Maaf, slot masa ini telah ditempah oleh guru lain.");
      return;
    }

    const booking: Booking = {
      ...newBooking,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now()
    };
    
    setBookings([booking, ...bookings]);
    triggerAdminNotification(booking); // Trigger notifikasi di sini
    
    setCurrentPage('list');
    alert("✅ Tempahan berjaya direkodkan! Admin telah dimaklumkan.");
  };

  const deleteBooking = (id: string) => {
    if (confirm("Adakah anda pasti mahu memadam tempahan ini?")) {
      setBookings(bookings.filter(b => b.id !== id));
    }
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard bookings={bookings} onAction={setCurrentPage} />;
      case 'calendar':
        return <CalendarView bookings={bookings} onNavigateToBooking={() => setCurrentPage('booking')} />;
      case 'booking':
        return <BookingForm onSubmit={addBooking} onCancel={() => setCurrentPage('dashboard')} />;
      case 'list':
        return <BookingList bookings={bookings} onDelete={deleteBooking} />;
      default:
        return <Dashboard bookings={bookings} onAction={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        onNavigate={setCurrentPage} 
        currentPage={currentPage} 
        notifications={notifications}
        onMarkAsRead={markNotificationsAsRead}
      />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 w-full">
        {renderPage()}
      </main>

      <AIAssistant currentBookings={bookings} />

      <footer className="bg-white border-t border-slate-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} Sekolah Kebangsaan Kemasek. Dibangunkan secara pintar untuk pendidik.
          </p>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        .animate-slideUp { animation: slideUp 0.3s ease-out forwards; }
      `}} />
    </div>
  );
};

export default App;
