import {
    AvailabilityResponse,
    BookingRequest,
    IdentifyCustomerRequest,
    IdentifyCustomerResponse
} from './types';

// Bence Masszázs API configuration
const BASE_URL = 'https://jdwhmvruzbvkzgfdousz.supabase.co/functions/v1';
const PUBLIC_API_KEY = '78EIFxt4yHhvFoqiygMBHGKWTR8FzNiOwCvGnimsJInHcuo3';
const BOOKING_API_KEY = 'aDLEj5fxvN6b5IItp0GDcYIbkLgyVK4aLmSdtYQBP6EUfw8U';

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

export async function identifyReturningCustomer(
    data: IdentifyCustomerRequest
): Promise<IdentifyCustomerResponse> {
    const response = await fetch(`${BASE_URL}/identify-returning-customer`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${PUBLIC_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new BookingApiError(
            'Nem sikerült azonosítani a vendéget',
            response.status
        );
    }

    return response.json();
}

export async function fetchAvailability(duration?: number): Promise<AvailabilityResponse> {
    const url = duration
        ? `${BASE_URL}/get-availability?duration=${duration}`
        : `${BASE_URL}/get-availability`;

    const response = await fetch(url, {
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

export interface BookingResponse {
    success: boolean;
    booking: {
        id: string;
        service_details?: {
            price: number;
            currency: string;
            duration_minutes: number;
        };
    };
}

export async function createBooking(data: BookingRequest): Promise<BookingResponse> {
    const response = await fetch(`${BASE_URL}/create-booking`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${BOOKING_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...data,
            include_price: true, // Always request price
        }),
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

    return response.json();
}
