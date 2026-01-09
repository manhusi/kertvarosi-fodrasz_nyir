// Booking Component Types

export interface Service {
  id: string;
  name: string;
  price: number;
  currency: string;
  duration_minutes: number;
  description?: string | null;
  isReturning?: boolean; // Optional flag for frontend added services
}

export interface Slot {
  date: string;              // YYYY-MM-DD
  time: string;              // HH:MM
  datetime: string;          // ISO string
  available_services: string[];  // Szolgáltatások, amik ezen a slot-on elérhetők
}

export interface AvailabilityResponse {
  account_name: string;
  slots: Slot[];
  service_id: string[];  // Deprecated: kept for backward compatibility
  services: Service[];   // New detailed structure
  has_returning_customers?: boolean; // New flag from API
}

export interface BookingRequest {
  name: string;
  datetime: string;  // ISO datetime
  service: string;
  is_returning?: boolean;
  service_id?: string; // New field for backend, optional for returning users
  include_price?: boolean; // Request price in response
  email?: string;
  phone?: string;
  notes?: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export type BookingStep = 'service' | 'date' | 'time' | 'form' | 'success';

export interface BookingResult {
  accountName: string;
  date: string;
  time: string;
  service: string;
  serviceDetails?: {
    price: number;
    currency: string;
    duration_minutes: number;
  };
}
