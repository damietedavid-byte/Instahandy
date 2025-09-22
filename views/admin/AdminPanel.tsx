import React, { useState } from 'react';
import { MOCK_WORKER } from '../../constants';
// FIX: Import 'ServiceType' to use enum values instead of strings.
import { Worker, ServiceType } from '../../types';

const AdminSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-bold text-gray-800 border-b pb-3 mb-4">{title}</h3>
        {children}
    </div>
);


const AdminPanel: React.FC = () => {
    const [workers, setWorkers] = useState<Worker[]>([
        MOCK_WORKER,
        // FIX: Use 'ServiceType' enum for worker specialties to match type definition.
        { 
            id: 'w2', 
            name: 'Chioma Nwosu', 
            rating: 4.5, 
            avatarUrl: 'https://picsum.photos/seed/worker2/100/100', 
            specialties: [ServiceType.AC_REPAIR],
            bankDetails: { bankName: 'OPay', accountNumber: '08023456789', accountName: 'Chioma Nwosu Coolers' },
            whatsappNumber: '+2348023456789'
        },
        { 
            id: 'w3', 
            name: 'Babatunde Adebayo', 
            rating: 4.9, 
            avatarUrl: 'https://picsum.photos/seed/worker3/100/100', 
            specialties: [ServiceType.PLUMBING, ServiceType.HANDYMAN],
            bankDetails: { bankName: 'OPay', accountNumber: '08034567890', accountName: 'Babatunde Fixes It' },
            whatsappNumber: '+2348034567890'
        }
    ]);
    const [prices, setPrices] = useState({
        'Home Cleaning': 5000,
        'Deep Clean': 15000,
        'Handyman Services': 7500,
        'AC Repair': 10000,
        'Plumbing': 8000
    });
    const [regions, setRegions] = useState(['Lagos', 'Abuja', 'Port Harcourt']);


    return (
        <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <AdminSection title="Manage Workers">
                        <div className="space-y-4">
                            {workers.map(worker => (
                                <div key={worker.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                    <div className="flex items-center">
                                        <img src={worker.avatarUrl} alt={worker.name} className="w-12 h-12 rounded-full" />
                                        <div className="ml-4">
                                            <p className="font-semibold text-gray-900">{worker.name}</p>
                                            <p className="text-sm text-gray-500">Rating: {worker.rating} ★</p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="px-3 py-1 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600">Approve</button>
                                        <button className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600">Decline</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AdminSection>
                </div>
                <div>
                    <AdminSection title="Manage Pricing">
                        <div className="space-y-3">
                            {Object.entries(prices).map(([service, price]) => (
                                <div key={service} className="flex items-center justify-between">
                                    <label htmlFor={service} className="text-gray-700">{service}</label>
                                    <div className="flex items-center">
                                        <span className="mr-2 text-gray-500">₦</span>
                                        <input type="number" id={service} value={price} onChange={(e) => setPrices({...prices, [service]: Number(e.target.value)})} className="w-28 p-1 border border-gray-300 rounded-md"/>
                                    </div>
                                </div>
                            ))}
                             <button className="w-full mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">Update Prices</button>
                        </div>
                    </AdminSection>

                    <AdminSection title="Service Regions">
                        <ul className="space-y-2">
                           {regions.map(region => (
                               <li key={region} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                                   <span>{region}</span>
                                   <button className="text-red-500 hover:text-red-700 text-sm">Remove</button>
                               </li>
                           ))}
                        </ul>
                         <button className="w-full mt-4 py-2 px-4 border border-dashed border-gray-400 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Add New Region</button>
                    </AdminSection>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;