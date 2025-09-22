import React, { useState } from 'react';
import { Booking } from '../../types';

interface OrderSummaryProps {
  booking: Partial<Booking>;
  onConfirm: (paymentMethod: string) => void;
  onBack: () => void;
}

const SummaryItem: React.FC<{ label: string; value: string | undefined }> = ({ label, value }) => (
  <div className="flex justify-between py-2">
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="text-sm text-gray-900">{value}</dd>
  </div>
);


const OrderSummary: React.FC<OrderSummaryProps> = ({ booking, onConfirm, onBack }) => {
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleConfirm = () => {
    if (!paymentMethod) {
        alert("Please select a payment method.");
        return;
    }
    onConfirm(paymentMethod);
  };
  
  const isCleaning = booking.service?.type === 'Home Cleaning' || booking.service?.type === 'Deep Clean';

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Review Your Order</h2>
      
      <div className="border-t border-b border-gray-200 divide-y divide-gray-200">
        <SummaryItem label="Service" value={booking.service?.type} />
        {isCleaning && <SummaryItem label="Bedrooms" value={String(booking.bedrooms)} />}
        {isCleaning && <SummaryItem label="Bathrooms" value={String(booking.bathrooms)} />}
        <SummaryItem label="Date" value={booking.date?.toLocaleDateString()} />
        <SummaryItem label="Time" value={booking.timeSlot} />
        <SummaryItem label="Address" value={`${booking.address?.street}, ${booking.address?.city}`} />
        {booking.serviceDetails && (
            <div className="py-3">
                <dt className="text-sm font-medium text-gray-500">Service Details</dt>
                <dd className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-md whitespace-pre-wrap">{booking.serviceDetails}</dd>
            </div>
        )}
      </div>

      <div className="flex justify-between items-center mt-6 pt-4 border-t-2 border-gray-200">
        <p className="text-lg font-semibold text-gray-900">Total</p>
        <p className="text-2xl font-bold text-blue-600">₦{booking.totalPrice?.toLocaleString()}</p>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Payment Method</h3>
        <div className="space-y-3">
          {['Pay with Card', 'Bank Transfer', 'Pay on Delivery'].map((method) => (
            <label key={method} className="flex items-center p-4 border rounded-md cursor-pointer has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500">
              <input 
                type="radio" 
                name="paymentMethod" 
                value={method}
                checked={paymentMethod === method}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-3 font-medium text-gray-700">{method}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-8">
        <button type="button" onClick={onBack} className="px-6 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Back</button>
        <button onClick={handleConfirm} className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
          Confirm & Book Service
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;