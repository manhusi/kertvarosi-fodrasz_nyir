import {
    AvailabilityResponse,
    BookingRequest,
    IdentifyCustomerRequest,
    IdentifyCustomerResponse
} from './types';

// Bence Masszázs API configuration
const BASE_URL = 'https://jdwhmvruzbvkzgfdousz.supabase.co/functions/v1';
const PUBLIC_API_KEY = 'X4hzn2nsAaxfJDNIfJfUsieoZq0jGTISIybxvwp2ABI9iDBi';
const BOOKING_API_KEY = 'UCaGlu9lhQuEqSWR6wPn3caImYCbLOvgyHS056UdC5RdBOLO';

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

// reCAPTCHA site key
const RECAPTCHA_SITE_KEY = '6LciqFYsAAAAADFbX1Gcv_mahZj6JkhUIJ0-YM9L';

// Intent token response interface
export interface IntentResponse {
    intent_token: string;
    require_captcha: boolean;
}

// Declare grecaptcha for TypeScript
declare global {
    interface Window {
        grecaptcha?: {
            ready: (callback: () => void) => void;
            execute: (siteKey: string, options: { action: string }) => Promise<string>;
        };
    }
}

/**
 * Get an intent token before creating a booking.
 * This is required for external widget bookings.
 */
export async function createBookingIntent(): Promise<IntentResponse> {
    const response = await fetch(`${BASE_URL}/create-booking-intent`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${BOOKING_API_KEY}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new BookingApiError(
            'Nem sikerült foglalási tokent kérni',
            response.status
        );
    }

    return response.json();
}

/**
 * Get a reCAPTCHA token for bot protection.
 * Returns null if reCAPTCHA is not loaded.
 */
export async function getRecaptchaToken(): Promise<string | null> {
    return new Promise((resolve) => {
        if (!window.grecaptcha) {
            console.warn('reCAPTCHA not loaded');
            resolve(null);
            return;
        }

        window.grecaptcha.ready(() => {
            window.grecaptcha!
                .execute(RECAPTCHA_SITE_KEY, { action: 'booking' })
                .then(resolve)
                .catch(() => resolve(null));
        });
    });
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
