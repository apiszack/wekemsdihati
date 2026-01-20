
import React, { useState } from 'react';
import { RoomType, Booking } from '../types';
import { TIME_SLOTS } from '../constants';

interface BookingFormProps {
  onSubmit: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    teacherName: '',
    room: RoomType.BILIK_TAYANG,
    date: new Date().toISOString().split('T')[0],
    startTime: '08:00',
    endTime: '09:00',
    purpose: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.startTime >= formData.endTime) {
      alert("Masa tamat mestilah selepas masa mula.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Borang Tempahan Baru</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Nama Guru / Staf</label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Contoh: Cikgu Ahmad"
            value={formData.teacherName}
            onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Pilihan Bilik</label>
            <select
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.room}
              onChange={(e) => setFormData({ ...formData, room: e.target.value as RoomType })}
            >
              <option value={RoomType.BILIK_TAYANG}>{RoomType.BILIK_TAYANG}</option>
              <option value={RoomType.MAKMAL_KOMPUTER}>{RoomType.MAKMAL_KOMPUTER}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Tarikh</label>
            <input
              type="date"
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Masa Mula</label>
            <select
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            >
              {TIME_SLOTS.map(slot => <option key={`start-${slot}`} value={slot}>{slot}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Masa Tamat</label>
            <select
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            >
              {TIME_SLOTS.map(slot => <option key={`end-${slot}`} value={slot}>{slot}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Tujuan / Subjek</label>
          <textarea
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none h-24"
            placeholder="Contoh: PdP Sains (Topik Manusia)"
            value={formData.purpose}
            onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
          />
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md"
          >
            Hantar Tempahan
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-slate-100 text-slate-700 py-2 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
