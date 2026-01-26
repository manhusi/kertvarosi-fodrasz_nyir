import React, { useState, useEffect, useMemo } from 'react';
import { fetchAvailability, createBooking, createBookingIntent, getRecaptchaToken, identifyReturningCustomer, BookingApiError } from './api';
import {
    Slot,
    AvailabilityResponse,
    BookingStep,
    BookingFormData,
    BookingResult,
    ReturningCustomer,
} from './types';

const WEEKDAYS = ['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V'];
const MONTHS = [
    'Január', 'Február', 'Március', 'Április', 'Május', 'Június',
    'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December',
];

function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = MONTHS[date.getMonth()];
    const day = date.getDate();
    return `${year}. ${month} ${day}.`;
}

function formatShortDate(dateStr: string): string {
    const date = new Date(dateStr);
    const month = MONTHS[date.getMonth()];
    const day = date.getDate();
    return `${month} ${day}.`;
}

interface BookingWidgetProps {
    initialService?: string | null;
}

export function BookingWidget({ initialService }: BookingWidgetProps) {
    const [step, setStep] = useState<BookingStep>('customer-type');
    const [availability, setAvailability] = useState<AvailabilityResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Customer type and returning customer states
    const [customerType, setCustomerType] = useState<'new' | 'returning' | null>(null);
    const [returningCustomer, setReturningCustomer] = useState<ReturningCustomer | null>(null);
    const [identifyData, setIdentifyData] = useState({ email: '', phone: '' });
    const [identifyError, setIdentifyError] = useState<string | null>(null);
    const [identifying, setIdentifying] = useState(false);

    const [selectedService, setSelectedService] = useState<string | null>(initialService || null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedHour, setSelectedHour] = useState<string | null>(null);
    const [selectedMinute, setSelectedMinute] = useState<string | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const [formData, setFormData] = useState<BookingFormData>({
        name: '',
        email: '',
        phone: '',
        notes: '',
    });

    const [bookingResult, setBookingResult] = useState<BookingResult | null>(null);

    // Fetch availability on mount
    useEffect(() => {
        const loadAvailability = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchAvailability();
                setAvailability(data);

                // Determine initial step based on API configuration
                const isHairsalon = data.has_returning_customers || data.account_type === 'fodraszat';

                if (isHairsalon) {
                    // Has returning customer feature - start with customer type selection
                    setStep('customer-type');
                } else if (initialService) {
                    // Auto-select service if provided via prop
                    setSelectedService(initialService);
                    setStep('date');
                } else if (data.service_id.length === 1) {
                    // Auto-select if only one service
                    setSelectedService(data.service_id[0]);
                    setStep('date');
                } else {
                    // Multiple services, start with service selection
                    setStep('service');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Hiba történt');
            } finally {
                setLoading(false);
            }
        };

        loadAvailability();
    }, [initialService]);

    // Get all available services
    const availableServices = useMemo(() => {
        if (!availability) return [];
        let services: any[] = [];

        // Prefer the detailed 'services' array if available
        if (availability.services && availability.services.length > 0) {
            services = [...availability.services];
        }

        // Add returning customer option if enabled
        if (availability.has_returning_customers) {
            services.push({
                id: 'returning',
                name: 'Visszatérő vagyok',
                price: 0,
                currency: '',
                duration_minutes: 0,
                isReturning: true
            });
        }

        return services;
    }, [availability]);

    // Backward compatibility for slot filtering (slots might still use names)
    // We need to map selected service ID back to name if slots rely on names
    const selectedServiceName = useMemo(() => {
        if (!selectedService) return null;
        const service = availableServices.find(s => s.id === selectedService);
        return service ? service.name : selectedService;
    }, [selectedService, availableServices]);


    // Get slots filtered by selected service
    const slotsForService = useMemo(() => {
        if (!availability) return [];

        // If we have a returning customer, the slots are already filtered by duration from the API
        // So we just return all slots
        if (returningCustomer) {
            return availability.slots;
        }

        if (!selectedServiceName) return [];

        return availability.slots.filter(s => {
            if (!s.available_services || s.available_services.length === 0) return true;

            // Special handling for returning customers (legacy/manual selection)
            if (selectedService === 'returning') {
                return s.available_services.includes('Visszatérő');
            }

            return s.available_services.includes(selectedServiceName) || s.available_services.includes(selectedService!);
        });
    }, [availability, selectedServiceName, selectedService, returningCustomer]);

    // ... (availableDates, slotsForDate, availableHours logic remains mostly same)

    // Get available dates for selected service
    const availableDates = useMemo(() => {
        return new Set(slotsForService.map(slot => slot.date));
    }, [slotsForService]);

    // Get slots for selected date
    const slotsForDate = useMemo(() => {
        if (!selectedDate) return [];
        return slotsForService.filter(slot => slot.date === selectedDate);
    }, [slotsForService, selectedDate]);

    // Get available hours for selected date (unique, sorted)
    const availableHours = useMemo(() => {
        const hours = [...new Set(slotsForDate.map(s => s.time.split(':')[0]))].sort();
        return hours;
    }, [slotsForDate]);

    // Get slots for selected hour
    const slotsForHour = useMemo(() => {
        if (!selectedHour) return [];
        return slotsForDate.filter(s => s.time.startsWith(selectedHour + ':'));
    }, [slotsForDate, selectedHour]);

    // Get available minutes for selected hour
    const availableMinutes = useMemo(() => {
        return slotsForHour.map(s => s.time.split(':')[1]);
    }, [slotsForHour]);

    // Get the selected slot
    const selectedSlot = useMemo(() => {
        if (!selectedHour || !selectedMinute) return null;
        return slotsForHour.find(s => s.time === `${selectedHour}:${selectedMinute}`) || null;
    }, [slotsForHour, selectedHour, selectedMinute]);

    // Calendar helpers
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        let startDay = firstDay.getDay() - 1;
        if (startDay < 0) startDay = 6;

        const days: (number | null)[] = [];
        for (let i = 0; i < startDay; i++) {
            days.push(null);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }
        return days;
    };

    const formatDateKey = (year: number, month: number, day: number) => {
        return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    };

    const today = new Date();
    const todayStr = formatDateKey(today.getFullYear(), today.getMonth(), today.getDate());

    // Handlers
    const handleCustomerTypeSelect = (type: 'new' | 'returning') => {
        setCustomerType(type);
        setIdentifyError(null);
        if (type === 'new') {
            setStep('service');
        } else {
            setStep('returning-identify');
        }
    };

    const handleIdentifySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!identifyData.email && !identifyData.phone) {
            setIdentifyError('Kérjük, adjon meg email címet vagy telefonszámot!');
            return;
        }

        try {
            setIdentifying(true);
            setIdentifyError(null);
            const response = await identifyReturningCustomer(identifyData);

            if (response.found && response.contact) {
                setReturningCustomer(response.contact);
                // Pre-fill form with available data
                setFormData(prev => ({
                    ...prev,
                    name: response.contact!.name,
                    // Use email/phone from API if available, otherwise use what was entered for identification
                    email: response.contact!.email || identifyData.email || prev.email,
                    phone: response.contact!.phone || identifyData.phone || prev.phone
                }));
                // Fetch availability with duration filter
                const data = await fetchAvailability(response.contact.usual_duration_minutes);
                setAvailability(data);
                // Skip service selection, go straight to date
                setStep('date');
            } else {
                setIdentifyError(response.message || 'Nem találtunk ilyen vendéget.');
            }
        } catch (err) {
            setIdentifyError(err instanceof Error ? err.message : 'Hiba az azonosítás során');
        } finally {
            setIdentifying(false);
        }
    };

    const handleContinueAsNew = () => {
        setCustomerType('new');
        setIdentifyError(null);
        setIdentifyData({ email: '', phone: '' });
        setStep('service');
    };

    const handleServiceSelect = (service: string) => {
        setSelectedService(service);
        setSelectedDate(null);
        setSelectedHour(null);
        setSelectedMinute(null);
        setStep('date');
    };

    const handleDateSelect = (day: number) => {
        const dateKey = formatDateKey(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            day
        );
        setSelectedDate(dateKey);
        setSelectedHour(null);
        setSelectedMinute(null);
        setStep('time');
    };

    const handleHourSelect = (hour: string) => {
        setSelectedHour(hour);
        setSelectedMinute(null);
    };

    const handleMinuteSelect = (minute: string) => {
        setSelectedMinute(minute);
    };

    const handleContinueToForm = () => {
        if (selectedSlot) {
            setStep('form');
        }
    };

    const handleFormChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // If returning customer, we don't need selectedService
        if (!selectedSlot && !(returningCustomer || selectedService)) return;

        // Find service object only if not a returning customer logic
        let serviceName = '';
        let serviceId: string | undefined = undefined;

        if (returningCustomer) {
            serviceName = 'Visszatérő vendég';
        } else {
            if (!selectedService) return;
            const serviceObj = availableServices.find(s => s.id === selectedService);
            if (!serviceObj) return;
            serviceName = serviceObj.name;
            serviceId = serviceObj.id === 'returning' ? undefined : serviceObj.id;
        }

        try {
            setSubmitting(true);
            setError(null);

            // 1. Get intent token
            const intentResponse = await createBookingIntent();
            const { intent_token, require_captcha } = intentResponse;

            // 2. Get reCAPTCHA token if required
            let recaptcha_token: string | undefined = undefined;
            if (require_captcha) {
                const captchaResult = await getRecaptchaToken();
                recaptcha_token = captchaResult || undefined;
            }

            // 3. Create booking with tokens
            const response = await createBooking({
                name: formData.name,
                datetime: selectedSlot!.datetime,
                service: serviceName,
                service_id: serviceId,
                intent_token: intent_token,
                recaptcha_token: recaptcha_token,
                is_returning: customerType === 'returning',
                email: formData.email || undefined,
                phone: formData.phone || undefined,
                notes: formData.notes || undefined,
            });

            // Extract price from response if available
            const priceDetails = response.booking.service_details;

            setBookingResult({
                accountName: availability?.account_name || '',
                date: selectedSlot!.date,
                time: selectedSlot!.time,
                service: serviceName,
                serviceDetails: priceDetails,
            });
            setStep('success');
        } catch (err) {
            // ... rest of error handling
            if (err instanceof BookingApiError && err.isSlotTaken) {
                setError('Ez az időpont már nem elérhető. Kérjük, válasszon másikat.');
                setStep('time');
                setSelectedHour(null);
                setSelectedMinute(null);
            } else {
                setError(err instanceof Error ? err.message : 'Hiba történt');
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleReset = () => {
        // Reset all state
        setCustomerType(null);
        setReturningCustomer(null);
        setIdentifyData({ email: '', phone: '' });
        setIdentifyError(null);
        setSelectedService(null);
        setSelectedDate(null);
        setSelectedHour(null);
        setSelectedMinute(null);
        setFormData({ name: '', email: '', phone: '', notes: '' });
        setBookingResult(null);
        setError(null);

        fetchAvailability()
            .then((data) => {
                setAvailability(data);
                const isHairsalon = data.has_returning_customers || data.account_type === 'fodraszat';

                if (isHairsalon) {
                    setStep('customer-type');
                } else if (data.service_id.length === 1) {
                    setSelectedService(data.service_id[0]);
                    setStep('date');
                } else {
                    setStep('service');
                }
            })
            .catch(() => { });
    };

    const handleBack = () => {
        switch (step) {
            case 'returning-identify':
                setStep('customer-type');
                setIdentifyError(null);
                break;
            case 'service':
                if (availability?.has_returning_customers || availability?.account_type === 'fodraszat') {
                    setStep('customer-type');
                }
                break;
            case 'date':
                if (customerType === 'returning') {
                    // Returning customers skip service selection
                    setStep('returning-identify');
                } else if (availableServices.length > 1) {
                    setStep('service');
                    setSelectedDate(null);
                }
                break;
            case 'time':
                setStep('date');
                setSelectedHour(null);
                setSelectedMinute(null);
                break;
            case 'form':
                setStep('time');
                break;
        }
    };

    const navigateMonth = (direction: 1 | -1) => {
        setCurrentMonth((prev) => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() + direction);
            return newDate;
        });
    };

    const stepIndex = { 'customer-type': 0, 'returning-identify': 0, service: 0, date: 1, time: 2, form: 3, success: 4 };
    const totalSteps = 4;

    // Get step subtitle
    const getStepSubtitle = () => {
        switch (step) {
            case 'customer-type': return 'Válasszon vendég típust';
            case 'returning-identify': return returningCustomer ? `Szia ${returningCustomer.name}!` : 'Azonosítás';
            case 'service': return 'Válasszon szolgáltatást';
            case 'date': return 'Válasszon napot';
            case 'time': return 'Válasszon időpontot';
            case 'form': return 'Adja meg adatait';
            case 'success': return 'Sikeres foglalás';
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="booking-widget">
                <div className="booking-widget__card">
                    <div className="booking-widget__loading">
                        <div className="booking-widget__loading-spinner" />
                        <span className="booking-widget__loading-text">Betöltés...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="booking-widget">
            <div className="booking-widget__card">
                <div className="booking-widget__header">
                    <h2 className="booking-widget__title">
                        {availability?.account_name || 'Időpontfoglalás'}
                    </h2>
                    <p className="booking-widget__subtitle">
                        {getStepSubtitle()}
                    </p>
                </div>

                <div className="booking-widget__content">
                    {/* Step Indicator */}
                    {step !== 'success' && (
                        <div className="booking-widget__steps">
                            {Array.from({ length: totalSteps }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`booking-widget__step-dot ${i === stepIndex[step]
                                        ? 'booking-widget__step-dot--active'
                                        : i < stepIndex[step]
                                            ? 'booking-widget__step-dot--completed'
                                            : ''
                                        }`}
                                />
                            ))}
                        </div>
                    )}

                    {/* Error Display */}
                    {error && (
                        <div className="booking-widget__error">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            {error}
                        </div>
                    )}

                    {/* Step 0: Customer Type Selection */}
                    {step === 'customer-type' && (
                        <div className="booking-widget__fade-in">
                            <div className="booking-widget__service-list">
                                <button
                                    type="button"
                                    className="booking-widget__service-card"
                                    onClick={() => handleCustomerTypeSelect('new')}
                                >
                                    <div className="flex flex-col items-start gap-1">
                                        <span className="booking-widget__service-name text-left">Új vendég vagyok</span>
                                        <span className="text-sm text-gray-400">Első alkalommal foglalok időpontot</span>
                                    </div>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 18l6-6-6-6" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    className="booking-widget__service-card"
                                    onClick={() => handleCustomerTypeSelect('returning')}
                                >
                                    <div className="flex flex-col items-start gap-1">
                                        <span className="booking-widget__service-name text-left">Visszatérő vendég vagyok</span>
                                        <span className="text-sm text-gray-400">Már voltam itt korábban</span>
                                    </div>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 18l6-6-6-6" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 0b: Returning Customer Identification */}
                    {step === 'returning-identify' && (
                        <div className="booking-widget__fade-in">
                            {returningCustomer ? (
                                // Successfully identified
                                <div className="booking-widget__success-message" style={{ marginBottom: '1.5rem' }}>
                                    <div className="booking-widget__success-icon" style={{ width: '48px', height: '48px', marginBottom: '1rem' }}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20 6L9 17l-5-5" />
                                        </svg>
                                    </div>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                        Szia {returningCustomer.name}! 👋
                                    </h3>
                                    <p style={{ color: '#64748b', marginBottom: '0.5rem' }}>
                                        {returningCustomer.usual_duration_minutes} perc az időtartamod
                                    </p>
                                    <button
                                        type="button"
                                        className="booking-widget__button booking-widget__button--primary"
                                        onClick={() => setStep('date')}
                                        style={{ marginTop: '1rem' }}
                                    >
                                        Időpont választása
                                    </button>
                                </div>
                            ) : (
                                // Identification form
                                <form onSubmit={handleIdentifySubmit} className="booking-widget__form">
                                    <p style={{ marginBottom: '1.5rem', color: '#64748b' }}>
                                        Add meg az email címedet vagy a telefonszámodat az azonosításhoz.
                                    </p>

                                    {identifyError && (
                                        <div className="booking-widget__error" style={{ marginBottom: '1rem' }}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10" />
                                                <line x1="12" y1="8" x2="12" y2="12" />
                                                <line x1="12" y1="16" x2="12.01" y2="16" />
                                            </svg>
                                            {identifyError}
                                        </div>
                                    )}

                                    {identifyError && (
                                        <button
                                            type="button"
                                            className="booking-widget__button booking-widget__button--secondary"
                                            onClick={handleContinueAsNew}
                                            style={{ marginBottom: '1.5rem', width: '100%' }}
                                        >
                                            Új vendégként folytatom
                                        </button>
                                    )}

                                    <div className="booking-widget__field">
                                        <label className="booking-widget__label">Email</label>
                                        <input
                                            type="email"
                                            className="booking-widget__input"
                                            placeholder="pelda@email.com"
                                            value={identifyData.email}
                                            onChange={(e) => setIdentifyData(prev => ({ ...prev, email: e.target.value }))}
                                        />
                                    </div>

                                    <div className="booking-widget__field">
                                        <label className="booking-widget__label">Telefonszám</label>
                                        <input
                                            type="tel"
                                            className="booking-widget__input"
                                            placeholder="+36 30 123 4567"
                                            value={identifyData.phone}
                                            onChange={(e) => setIdentifyData(prev => ({ ...prev, phone: e.target.value }))}
                                        />
                                    </div>

                                    <div className="booking-widget__nav">
                                        <button
                                            type="button"
                                            className="booking-widget__button booking-widget__button--secondary"
                                            onClick={handleBack}
                                            disabled={identifying}
                                        >
                                            Vissza
                                        </button>
                                        <button
                                            type="submit"
                                            className="booking-widget__button booking-widget__button--primary"
                                            disabled={identifying || (!identifyData.email && !identifyData.phone)}
                                        >
                                            {identifying ? (
                                                <>
                                                    <span className="booking-widget__spinner" />
                                                    Azonosítás...
                                                </>
                                            ) : (
                                                'Tovább'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    )}

                    {/* Step 1: Service Selection */}
                    {step === 'service' && (
                        <div className="booking-widget__fade-in">
                            <div className="booking-widget__service-list">
                                {availableServices.map((service) => {
                                    const isObject = typeof service !== 'string';
                                    const serviceId = isObject ? service.id : service;
                                    const serviceName = isObject ? service.name : service;
                                    const servicePrice = isObject ? `${service.price} ${service.currency}` : '';

                                    return (
                                        <button
                                            key={serviceId}
                                            type="button"
                                            className="booking-widget__service-card"
                                            onClick={() => handleServiceSelect(serviceId)}
                                        >
                                            <div className="flex flex-col items-start gap-1">
                                                <span className="booking-widget__service-name text-left">{serviceName}</span>
                                                {servicePrice && (
                                                    <span className="text-sm text-gray-400 font-medium">
                                                        {servicePrice}
                                                    </span>
                                                )}
                                            </div>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M9 18l6-6-6-6" />
                                            </svg>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Navigation */}
                            {(availability?.has_returning_customers || availability?.account_type === 'fodraszat') && (
                                <div className="booking-widget__nav">
                                    <button
                                        type="button"
                                        className="booking-widget__button booking-widget__button--secondary"
                                        onClick={handleBack}
                                    >
                                        Vissza
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 2: Date Selection */}
                    {step === 'date' && (
                        <div className="booking-widget__fade-in">
                            {/* Selected Service Summary */}
                            {(selectedServiceName || returningCustomer) && (
                                <div className="booking-widget__selection-summary">
                                    <span className="booking-widget__summary-text">
                                        {returningCustomer
                                            ? `👋 ${returningCustomer.name} • ${returningCustomer.usual_duration_minutes} perc`
                                            : `🎯 ${selectedServiceName}`
                                        }
                                    </span>
                                </div>
                            )}

                            {/* Calendar */}
                            <div className="booking-widget__calendar">
                                <div className="booking-widget__calendar-header">
                                    <span className="booking-widget__calendar-title">
                                        {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                                    </span>
                                    <div className="booking-widget__calendar-nav">
                                        <button
                                            type="button"
                                            className="booking-widget__calendar-btn"
                                            onClick={() => navigateMonth(-1)}
                                            aria-label="Előző hónap"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M15 18l-6-6 6-6" />
                                            </svg>
                                        </button>
                                        <button
                                            type="button"
                                            className="booking-widget__calendar-btn"
                                            onClick={() => navigateMonth(1)}
                                            aria-label="Következő hónap"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M9 18l6-6-6-6" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="booking-widget__weekdays">
                                    {WEEKDAYS.map((day) => (
                                        <div key={day} className="booking-widget__weekday">
                                            {day}
                                        </div>
                                    ))}
                                </div>

                                <div className="booking-widget__days">
                                    {getDaysInMonth(currentMonth).map((day, index) => {
                                        if (day === null) {
                                            return (
                                                <div
                                                    key={`empty-${index}`}
                                                    className="booking-widget__day booking-widget__day--empty"
                                                />
                                            );
                                        }

                                        const dateKey = formatDateKey(
                                            currentMonth.getFullYear(),
                                            currentMonth.getMonth(),
                                            day
                                        );
                                        const hasSlots = availableDates.has(dateKey);
                                        const isToday = dateKey === todayStr;
                                        const isPast = new Date(dateKey) < new Date(todayStr);

                                        return (
                                            <button
                                                key={day}
                                                type="button"
                                                className={`booking-widget__day ${isToday ? 'booking-widget__day--today' : ''
                                                    } ${!hasSlots || isPast ? 'booking-widget__day--disabled' : ''
                                                    } ${hasSlots && !isPast ? 'booking-widget__day--has-slots' : ''}`}
                                                onClick={() => hasSlots && !isPast && handleDateSelect(day)}
                                                disabled={!hasSlots || isPast}
                                            >
                                                {day}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Navigation */}
                            {(availableServices.length > 1 || customerType === 'returning') && (
                                <div className="booking-widget__nav">
                                    <button
                                        type="button"
                                        className="booking-widget__button booking-widget__button--secondary"
                                        onClick={handleBack}
                                    >
                                        Vissza
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 3: Time Selection (Hour + Minute on ONE screen) */}
                    {step === 'time' && (
                        <div className="booking-widget__fade-in">
                            {/* Summary */}
                            <div className="booking-widget__selection-summary">
                                <span className="booking-widget__summary-text">
                                    🎯 {selectedServiceName} • {selectedDate && formatShortDate(selectedDate)}
                                    {selectedHour && selectedMinute && ` • ${selectedHour}:${selectedMinute}`}
                                </span>
                            </div>

                            {/* Hour Selection */}
                            <div className="booking-widget__time-section">
                                <label className="booking-widget__label booking-widget__label--step">
                                    <span className="booking-widget__step-number">1</span>
                                    Válasszon órát
                                </label>
                                <div className="booking-widget__time-grid">
                                    {availableHours.map((hour) => (
                                        <button
                                            key={hour}
                                            type="button"
                                            className={`booking-widget__time-btn ${selectedHour === hour ? 'booking-widget__time-btn--selected' : ''
                                                }`}
                                            onClick={() => handleHourSelect(hour)}
                                        >
                                            {hour}:00
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Minute Selection (appears after hour is selected) */}
                            {selectedHour && (
                                <div className="booking-widget__time-section booking-widget__fade-in">
                                    <label className="booking-widget__label booking-widget__label--step">
                                        <span className="booking-widget__step-number">2</span>
                                        Válasszon percet
                                    </label>
                                    <div className="booking-widget__time-grid">
                                        {availableMinutes.map((minute) => (
                                            <button
                                                key={minute}
                                                type="button"
                                                className={`booking-widget__time-btn ${selectedMinute === minute ? 'booking-widget__time-btn--selected' : ''
                                                    }`}
                                                onClick={() => handleMinuteSelect(minute)}
                                            >
                                                {selectedHour}:{minute}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Navigation */}
                            <div className="booking-widget__nav">
                                <button
                                    type="button"
                                    className="booking-widget__button booking-widget__button--secondary"
                                    onClick={handleBack}
                                >
                                    Vissza
                                </button>
                                <button
                                    type="button"
                                    className="booking-widget__button booking-widget__button--primary"
                                    onClick={handleContinueToForm}
                                    disabled={!selectedSlot}
                                >
                                    Tovább
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Form */}
                    {step === 'form' && (
                        <div className="booking-widget__fade-in">
                            {/* Selected Summary */}
                            <div className="booking-widget__selection-summary">
                                <span className="booking-widget__summary-text">
                                    🎯 {selectedServiceName} • {selectedDate && formatShortDate(selectedDate)} • {selectedHour}:{selectedMinute}
                                </span>
                            </div>

                            <form className="booking-widget__form" onSubmit={handleSubmit}>
                                <div className="booking-widget__field">
                                    <label className="booking-widget__label">
                                        Név <span className="booking-widget__required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="booking-widget__input"
                                        placeholder="Teljes név"
                                        value={formData.name}
                                        onChange={handleFormChange}
                                        required
                                    />
                                </div>

                                <div className="booking-widget__field">
                                    <label className="booking-widget__label">
                                        Email <span className="booking-widget__required">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className={`booking-widget__input ${formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? 'border-red-500' : ''}`}
                                        placeholder="pelda@email.com"
                                        value={formData.email}
                                        onChange={handleFormChange}
                                        required
                                    />
                                    {formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                                        <p className="text-xs text-red-500 mt-1">Kérjük, érvényes email címet adjon meg.</p>
                                    )}
                                </div>

                                <div className="booking-widget__field">
                                    <label className="booking-widget__label">
                                        Telefonszám <span className="booking-widget__required">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className="booking-widget__input"
                                        placeholder="+36 30 123 4567"
                                        value={formData.phone}
                                        onChange={handleFormChange}
                                        required
                                    />
                                </div>

                                <div className="booking-widget__field">
                                    <label className="booking-widget__label">Megjegyzés</label>
                                    <textarea
                                        name="notes"
                                        className="booking-widget__input booking-widget__textarea"
                                        placeholder="Opcionális megjegyzés..."
                                        value={formData.notes}
                                        onChange={handleFormChange}
                                    />
                                </div>

                                <div className="booking-widget__nav">
                                    <button
                                        type="button"
                                        className="booking-widget__button booking-widget__button--secondary"
                                        onClick={handleBack}
                                        disabled={submitting}
                                    >
                                        Vissza
                                    </button>
                                    <button
                                        type="submit"
                                        className="booking-widget__button booking-widget__button--cta"
                                        disabled={
                                            !formData.name ||
                                            !formData.email ||
                                            !formData.phone ||
                                            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ||
                                            submitting
                                        }
                                    >
                                        {submitting ? (
                                            <>
                                                <span className="booking-widget__spinner" />
                                                Küldés...
                                            </>
                                        ) : (
                                            'FOGLALÁS'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Success */}
                    {step === 'success' && bookingResult && (
                        <div className="booking-widget__fade-in">
                            <div className="booking-widget__success">
                                <div className="booking-widget__success-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                </div>
                                <h3 className="booking-widget__success-title">
                                    Sikeres foglalás!
                                </h3>
                                <p className="booking-widget__success-message">
                                    A foglalást sikeresen rögzítettük.
                                </p>

                                <div className="booking-widget__success-details">
                                    <div className="booking-widget__success-row">
                                        <span className="booking-widget__success-label">Szolgáltató</span>
                                        <span className="booking-widget__success-value">
                                            {bookingResult.accountName}
                                        </span>
                                    </div>
                                    <div className="booking-widget__success-row">
                                        <span className="booking-widget__success-label">Szolgáltatás</span>
                                        <span className="booking-widget__success-value">
                                            {bookingResult.service}
                                        </span>
                                    </div>
                                    {bookingResult.serviceDetails && (
                                        <div className="booking-widget__success-row">
                                            <span className="booking-widget__success-label">Ár</span>
                                            <span className="booking-widget__success-value">
                                                {bookingResult.serviceDetails.price} {bookingResult.serviceDetails.currency}
                                            </span>
                                        </div>
                                    )}
                                    <div className="booking-widget__success-row">
                                        <span className="booking-widget__success-label">Dátum</span>
                                        <span className="booking-widget__success-value">
                                            {formatDate(bookingResult.date)}
                                        </span>
                                    </div>
                                    <div className="booking-widget__success-row">
                                        <span className="booking-widget__success-label">Időpont</span>
                                        <span className="booking-widget__success-value">
                                            {bookingResult.time}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="booking-widget__button booking-widget__button--primary"
                                    onClick={handleReset}
                                >
                                    Új foglalás
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BookingWidget;
