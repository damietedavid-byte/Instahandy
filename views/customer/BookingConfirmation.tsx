import React, { useState, useEffect, useContext } from 'react';
import { BookingStatus } from '../../types';
import { AppContext } from '../../App';
import { MOCK_WORKER } from '../../constants';
import { WhatsappIcon } from '../../components/icons/Icons';

const StatusStep: React.FC<{ title: string; isCompleted: boolean; isLast?: boolean }> = ({ title, isCompleted, isLast }) => (
  <div className="flex items-center">
    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`}>
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
    </div>
    <div className="ml-4">
      <h4 className={`font-semibold ${isCompleted ? 'text-gray-800' : 'text-gray-500'}`}>{title}</h4>
    </div>
    {!isLast && <div className={`flex-auto border-t-2 mx-4 ${isCompleted ? 'border-green-500' : 'border-gray-300'}`}></div>}
  </div>
);


const BookingConfirmation: React.FC = () => {
    const { globalBooking, setGlobalBooking } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            if(globalBooking) {
                setGlobalBooking({
                    ...globalBooking,
                    status: BookingStatus.WORKER_ASSIGNED,
                    worker: MOCK_WORKER
                });
            }
        }, 3000);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const statusSteps = [
        { title: 'Booking Confirmed', status: BookingStatus.PENDING },
        { title: 'Worker Assigned', status: BookingStatus.WORKER_ASSIGNED },
        { title: 'In Progress', status: BookingStatus.IN_PROGRESS },
        { title: 'Completed', status: BookingStatus.COMPLETED },
    ];
    
    const currentStatusIndex = statusSteps.findIndex(s => s.status === globalBooking?.status);

    return (
        <div className="max-w-2xl mx-auto text-center">
            {isLoading ? (
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800">Booking Confirmed!</h2>
                    <p className="text-gray-600 mt-2">We are finding the best professional for your job.</p>
                    <div className="flex justify-center items-center my-8">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
                    </div>
                </div>
            ) : (
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-green-600">Professional Assigned!</h2>
                    <p className="text-gray-600 mt-2">Your booking is in good hands.</p>
                    
                    <div className="my-8 p-6 bg-gray-50 rounded-lg border">
                        <img src={globalBooking?.worker?.avatarUrl} alt={globalBooking?.worker?.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-md"/>
                        <h3 className="text-xl font-semibold">{globalBooking?.worker?.name}</h3>
                        <div className="text-yellow-500 mt-1">{'★'.repeat(Math.round(globalBooking?.worker?.rating || 0))}{'☆'.repeat(5 - Math.round(globalBooking?.worker?.rating || 0))} ({globalBooking?.worker?.rating})</div>
                    </div>
                    
                    {globalBooking?.paymentMethod === 'Bank Transfer' && globalBooking.worker?.bankDetails && (
                        <div className="my-8 p-6 bg-blue-50 border border-blue-200 rounded-lg text-left">
                            <h3 className="text-xl font-semibold mb-4 text-center text-blue-800">Payment Instructions</h3>
                            <p className="text-center text-gray-700 mb-4">Please transfer the total amount of <span className="font-bold">₦{globalBooking.totalPrice?.toLocaleString()}</span> to the OPay account below:</p>
                            <div className="space-y-2 text-gray-800 bg-white p-4 rounded-md">
                                <p><strong>Bank:</strong> {globalBooking.worker.bankDetails.bankName}</p>
                                <p><strong>Account Number:</strong> {globalBooking.worker.bankDetails.accountNumber}</p>
                                <p><strong>Account Name:</strong> {globalBooking.worker.bankDetails.accountName}</p>
                            </div>
                             <div className="mt-4 text-center">
                                <p className="text-gray-700">After payment, please send your receipt to the provider on WhatsApp for confirmation.</p>
                                <a href={`https://wa.me/${globalBooking.worker.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center justify-center px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition">
                                    <WhatsappIcon className="w-5 h-5 mr-2" />
                                    Contact on WhatsApp
                                </a>
                            </div>
                        </div>
                    )}

                    <div className="mt-8 text-left">
                        <h3 className="text-xl font-semibold mb-4 text-center">Service Status</h3>
                        <div className="flex justify-between">
                            {statusSteps.map((step, index) => (
                                <StatusStep key={step.title} title={step.title} isCompleted={index <= currentStatusIndex} isLast={index === statusSteps.length - 1} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingConfirmation;