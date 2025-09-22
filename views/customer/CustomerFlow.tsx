import React, { useState, useContext } from 'react';
// FIX: Import the 'Booking' type to resolve type errors.
import { Service, Booking, BookingStatus } from '../../types';
import { MOCK_WORKER } from '../../constants';
import { AppContext } from '../../App';
import ServiceSelection from './ServiceSelection';
import BookingDetails from './BookingDetails';
import OrderSummary from './OrderSummary';
import BookingConfirmation from './BookingConfirmation';

type Step = 'SERVICE' | 'DETAILS' | 'SUMMARY' | 'CONFIRMATION';

const CustomerFlow: React.FC = () => {
    const { setGlobalBooking } = useContext(AppContext);
    const [step, setStep] = useState<Step>('SERVICE');
    const [booking, setBooking] = useState<Partial<Booking>>({});

    const handleServiceSelect = (service: Service) => {
        setBooking({ service });
        setStep('DETAILS');
    };

    const handleDetailsSubmit = (details: Partial<Booking>) => {
        setBooking(prev => ({ ...prev, ...details }));
        setStep('SUMMARY');
    };
    
    const handleConfirmBooking = (paymentMethod: string) => {
        const finalBooking: Booking = {
            id: `booking-${Date.now()}`,
            service: booking.service!,
            bedrooms: booking.bedrooms || 0,
            bathrooms: booking.bathrooms || 0,
            date: booking.date!,
            timeSlot: booking.timeSlot!,
            address: booking.address!,
            totalPrice: booking.totalPrice!,
            status: BookingStatus.PENDING,
            paymentMethod: paymentMethod,
            serviceDetails: booking.serviceDetails,
        };
        setGlobalBooking(finalBooking);
        setStep('CONFIRMATION');
    };

    const handleBack = () => {
        if (step === 'DETAILS') setStep('SERVICE');
        if (step === 'SUMMARY') setStep('DETAILS');
    };

    const renderStep = () => {
        switch (step) {
            case 'SERVICE':
                return <ServiceSelection onServiceSelect={handleServiceSelect} />;
            case 'DETAILS':
                return <BookingDetails booking={booking} onSubmit={handleDetailsSubmit} onBack={handleBack} />;
            case 'SUMMARY':
                return <OrderSummary booking={booking} onConfirm={handleConfirmBooking} onBack={handleBack} />;
            case 'CONFIRMATION':
                return <BookingConfirmation />;
            default:
                return <ServiceSelection onServiceSelect={handleServiceSelect} />;
        }
    };

    return <div>{renderStep()}</div>;
};

export default CustomerFlow;