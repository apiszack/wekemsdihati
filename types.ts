
export enum RoomType {
  BILIK_TAYANG = 'Bilik Tayang',
  MAKMAL_KOMPUTER = 'Makmal Komputer'
}

export interface Booking {
  id: string;
  teacherName: string;
  room: RoomType;
  date: string; // ISO format
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  purpose: string;
  createdAt: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  type: 'booking_new' | 'system';
}
