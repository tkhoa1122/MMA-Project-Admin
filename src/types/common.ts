// ============= CALENDAR & SETTINGS =============
export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: 'shift' | 'maintenance' | 'appointment';
  status: string;
  color: string;
}

export interface AppSettings {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  language: 'vi' | 'en';
  theme: 'light' | 'dark' | 'auto';
}
