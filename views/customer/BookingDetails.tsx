

import React, { useState, useEffect } from 'react';
import { Booking, ServiceType } from '../../types';
import { TIME_SLOTS } from '../../constants';

interface BookingDetailsProps {
    booking: Partial<Booking>;
    onSubmit: (details: Partial<Booking>) => void;
    onBack: () => void;
}

const Counter: React.FC<{ label: string; value: number; onchange: (value: number) => void }> = ({ label, value, onchange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <div className="mt-1 flex items-center space-x-3">
            <button type="button" onClick={() => onchange(Math.max(0, value - 1))} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">-</button>
            <span className="w-10 text-center font-semibold text-gray-900">{value}</span>
            <button type="button" onClick={() => onchange(value + 1)} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">+</button>
        </div>
    </div>
);

const BookingDetails: React.FC<BookingDetailsProps> = ({ booking, onSubmit, onBack }) => {
    const [bedrooms, setBedrooms] = useState(booking.bedrooms || 1);
    const [bathrooms, setBathrooms] = useState(booking.bathrooms || 1);
    const [date, setDate] = useState<Date>(booking.date || new Date());
    const [timeSlot, setTimeSlot] = useState(booking.timeSlot || '');
    const [street, setStreet] = useState(booking.address?.street || '');
    const [city, setCity] = useState<'Lagos' | 'Abuja' | 'Port Harcourt'>(booking.address?.city || 'Lagos');
    const [totalPrice, setTotalPrice] = useState(0);
    const [serviceDetails, setServiceDetails] = useState(booking.serviceDetails || '');

    useEffect(() => {
        const calculatePrice = () => {
            if (!booking.service) return 0;
            if (booking.service.type === ServiceType.HOME_CLEANING || booking.service.type === ServiceType.DEEP_CLEAN) {
                const bedroomPrice = bedrooms * 1500;
                const bathroomPrice = bathrooms * 1000;
                return booking.service.basePrice + bedroomPrice + bathroomPrice;
            }
            return booking.service.basePrice;
        };
        setTotalPrice(calculatePrice());
    }, [bedrooms, bathrooms, booking.service]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            bedrooms,
            bathrooms,
            date,
            timeSlot,
            address: { street, city, state: city },
            totalPrice,
            serviceDetails,
        });
    };

    const isCleaning = booking.service?.type === ServiceType.HOME_CLEANING || booking.service?.type === ServiceType.DEEP_CLEAN;

    const getDetailsLabel = () => {
        switch(booking.service?.type) {
            case ServiceType.HANDYMAN:
            case ServiceType.AC_REPAIR:
            case ServiceType.PLUMBING:
                return "Please describe the issue or task in detail";
            default:
                return "Any special instructions? (optional)";
        }
    };

    const getDetailsPlaceholder = () => {
        switch(booking.service?.type) {
            case ServiceType.HANDYMAN:
                return "e.g., 'I need to assemble a new wardrobe and mount a TV on the wall.'";
            case ServiceType.AC_REPAIR:
                return "e.g., 'My AC is not cooling and is making a strange noise.'";
            case ServiceType.PLUMBING:
                return "e.g., 'The kitchen sink is leaking from the pipe underneath.'";
            case ServiceType.HOME_CLEANING:
            case ServiceType.DEEP_CLEAN:
                return "e.g., 'Please pay special attention to the kitchen area.'";
            default:
                return "Add any relevant details here...";
        }
    };


    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Complete Your Booking for <span className="text-blue-600">{booking.service?.type}</span></h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {isCleaning && (
                    <div className="p-4 border rounded-md">
                        <h3 className="font-semibold text-lg mb-4">Property Size</h3>
                        <div className="flex space-x-8">
                            <Counter label="Bedrooms" value={bedrooms} onchange={setBedrooms} />
                            <Counter label="Bathrooms" value={bathrooms} onchange={setBathrooms} />
                        </div>
                    </div>
                )}

                <div className="p-4 border rounded-md">
                    <h3 className="font-semibold text-lg mb-4">Schedule</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                            <input type="date" id="date" value={date.toISOString().split('T')[0]} onChange={e => setDate(new Date(e.target.value))} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"/>
                        </div>
                        <div>
                            <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time Slot</label>
                            <select id="time" value={timeSlot} onChange={e => setTimeSlot(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2">
                                <option value="" disabled>Select a time</option>
                                {TIME_SLOTS.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="p-4 border rounded-md">
                    <h3 className="font-semibold text-lg mb-4">Service Details</h3>
                    <div>
                        <label htmlFor="serviceDetails" className="block text-sm font-medium text-gray-700">{getDetailsLabel()}</label>
                        <textarea
                            id="serviceDetails"
                            rows={4}
                            value={serviceDetails}
                            onChange={e => setServiceDetails(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                            placeholder={getDetailsPlaceholder()}
                        />
                    </div>
                </div>

                <div className="p-4 border rounded-md">
                    <h3 className="font-semibold text-lg mb-4">Address</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                           <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street Address</label>
                           <input type="text" id="street" value={street} onChange={e => setStreet(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2" placeholder="e.g., 123 Allen Avenue"/>
                        </div>
                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                            <select id="city" value={city} onChange={e => setCity(e.target.value as any)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2">
                                <option>Lagos</option>
                                <option>Abuja</option>
                                <option>Port Harcourt</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-4 p-4 bg-gray-100 rounded-md text-center text-gray-500">
                        <p>Mock Map Integration Placeholder</p>
                        <img src="https://picsum.photos/seed/map/600/200" alt="Map placeholder" className="mt-2 rounded-md mx-auto" />
                    </div>
                </div>
                
                <div className="flex items-center justify-between mt-8">
                    <button type="button" onClick={onBack} className="px-6 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Back</button>
                    <div className="text-right">
                         <p className="text-sm text-gray-500">Estimated Total</p>
                         <p className="text-2xl font-bold text-gray-800">₦{totalPrice.toLocaleString()}</p>
                    </div>
                    <button type="submit" className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">Proceed to Summary</button>
                </div>
            </form>
        </div>
    );
};

export default BookingDetails;