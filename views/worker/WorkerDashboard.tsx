import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../App';
import { WorkerJob, BankDetails } from '../../types';

const JobCard: React.FC<{ job: WorkerJob; onAccept: () => void; onDecline: () => void; onComplete: () => void; }> = ({ job, onAccept, onDecline, onComplete }) => {
    const { bookingDetails, status } = job;
    const { service, date, timeSlot, address, totalPrice, serviceDetails } = bookingDetails;
    
    return (
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-bold text-gray-800">{service.type}</h3>
                    <p className="text-gray-500">{date.toLocaleDateString()} @ {timeSlot}</p>
                    <p className="text-sm text-gray-500 mt-1">{address.street}, {address.city}</p>
                </div>
                <div className="text-right">
                    <p className="text-lg font-bold text-green-600">₦{totalPrice.toLocaleString()}</p>
                    <span className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        status === 'NEW' ? 'bg-blue-100 text-blue-800' :
                        status === 'ACCEPTED' ? 'bg-green-100 text-green-800' :
                        status === 'DECLINED' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                    }`}>
                        {status}
                    </span>
                </div>
            </div>
            {serviceDetails && (
                <div className="mt-4 pt-4 border-t">
                    <h4 className="text-sm font-semibold text-gray-700">Job Details:</h4>
                    <p className="mt-1 text-sm text-gray-600 whitespace-pre-wrap">{serviceDetails}</p>
                </div>
            )}
            <div className="mt-6 flex space-x-3">
                {status === 'NEW' && (
                    <>
                        <button onClick={onAccept} className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">Accept</button>
                        <button onClick={onDecline} className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Decline</button>
                    </>
                )}
                {status === 'ACCEPTED' && (
                    <button onClick={onComplete} className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">Mark as Complete</button>
                )}
            </div>
        </div>
    );
};

const ProfileSection: React.FC = () => {
    const { workerJob, setWorkerJob } = useContext(AppContext);
    const worker = workerJob?.bookingDetails?.worker;
    
    const [bankDetails, setBankDetails] = useState<BankDetails>(worker?.bankDetails || { bankName: 'OPay', accountNumber: '', accountName: '' });
    const [whatsappNumber, setWhatsappNumber] = useState(worker?.whatsappNumber || '');
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (worker) {
            setBankDetails(worker.bankDetails || { bankName: 'OPay', accountNumber: '', accountName: '' });
            setWhatsappNumber(worker.whatsappNumber || '');
        }
    }, [worker]);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (workerJob && worker) {
            const updatedWorker = { ...worker, bankDetails, whatsappNumber };
            const updatedJob = {
                ...workerJob,
                bookingDetails: {
                    ...workerJob.bookingDetails,
                    worker: updatedWorker,
                }
            };
            setWorkerJob(updatedJob);
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 2000);
        }
    };

    if (!worker) return null;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-bold text-gray-800 border-b pb-3 mb-4">My Profile</h3>
            <form onSubmit={handleSave} className="space-y-4">
                <div>
                    <h4 className="font-semibold text-gray-700">Payment Details (for Bank Transfer)</h4>
                    <div className="mt-2 space-y-3">
                        <div>
                            <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">Bank Name</label>
                            <input type="text" id="bankName" value="OPay" readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 p-2"/>
                        </div>
                        <div>
                            <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">Account/Phone Number</label>
                            <input type="text" id="accountNumber" value={bankDetails.accountNumber} onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" required/>
                        </div>
                         <div>
                            <label htmlFor="accountName" className="block text-sm font-medium text-gray-700">Account Name</label>
                            <input type="text" id="accountName" value={bankDetails.accountName} onChange={(e) => setBankDetails({...bankDetails, accountName: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" required/>
                        </div>
                    </div>
                </div>
                 <div>
                    <h4 className="font-semibold text-gray-700">Contact Details</h4>
                     <div className="mt-2">
                        <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700">WhatsApp Number</label>
                        <input type="text" id="whatsappNumber" value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} placeholder="+234..." className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" required/>
                    </div>
                </div>
                <div className="flex justify-end items-center">
                    {isSaved && <p className="text-green-600 mr-4">Saved!</p>}
                    <button type="submit" className="py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">Save Details</button>
                </div>
            </form>
        </div>
    );
};

const WorkerDashboard: React.FC = () => {
    const { workerJob, setWorkerJob } = useContext(AppContext);

    const handleUpdateJobStatus = (status: 'ACCEPTED' | 'DECLINED' | 'COMPLETED') => {
        if (workerJob) {
            setWorkerJob({ ...workerJob, status });
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Worker Dashboard</h2>
            
            <ProfileSection />

            <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Jobs</h3>
            {workerJob ? (
                <div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-4">{workerJob.status === 'NEW' ? 'New Job Request' : 'Active Job'}</h4>
                    <JobCard 
                        job={workerJob} 
                        onAccept={() => handleUpdateJobStatus('ACCEPTED')}
                        onDecline={() => handleUpdateJobStatus('DECLINED')}
                        onComplete={() => handleUpdateJobStatus('COMPLETED')}
                    />
                </div>
            ) : (
                <div className="text-center bg-white p-8 rounded-lg shadow">
                    <h3 className="text-xl font-semibold text-gray-800">No jobs available</h3>
                    <p className="text-gray-500 mt-2">You will be notified when a new job matches your profile.</p>
                </div>
            )}

            {workerJob?.status === 'DECLINED' && (
                <p className="text-center text-red-600 mt-4">You have declined this job.</p>
            )}
            {workerJob?.status === 'COMPLETED' && (
                <p className="text-center text-green-600 mt-4">Job completed. Well done!</p>
            )}

        </div>
    );
};

export default WorkerDashboard;