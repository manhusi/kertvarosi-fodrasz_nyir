import { AvailabilityResponse, BookingRequest } from './types';

// Kertvárosi Fodrászat API configuration
const BASE_URL = 'https://jdwhmvruzbvkzgfdousz.supabase.co/functions/v1';
const PUBLIC_API_KEY = 'angL3FmH0SzxfQd1KpTODiodaegzqiNDD36CH4rHFCpg6Ffw';
const BOOKING_API_KEY = 'G4ui9UlnchGO1KkgYF6nWa1aK2OPt5MPYXKZVa3m2hAC3XIz';

export class BookingApiError extends Error {
    constructor(
        message: string,
        public status: number,
        public isSlotTaken: boolean = false
    ) {
        super(message);
        this.name = 'BookingApiError';
    }
}

export async function fetchAvailability(): Promise<AvailabilityResponse> {
    const response = await fetch(`${BASE_URL}/get-availability`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${PUBLIC_API_KEY}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new BookingApiError(
            'Nem sikerült lekérni az elérhetőségeket',
            response.status
        );
    }

    return response.json();
}

export async function createBooking(data: BookingRequest): Promise<void> {
    const response = await fetch(`${BASE_URL}/create-booking`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${BOOKING_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.status === 409) {
        throw new BookingApiError(
            'Ez az időpont már nem elérhető',
            409,
            true
        );
    }

    if (!response.ok) {
        throw new BookingApiError(
            'Nem sikerült elküldeni a foglalást',
            response.status
        );
    }
}
