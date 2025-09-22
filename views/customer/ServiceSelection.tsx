
import React from 'react';
import { Service } from '../../types';
import { SERVICES } from '../../constants';

interface ServiceSelectionProps {
    onServiceSelect: (service: Service) => void;
}

const ServiceCard: React.FC<{ service: Service; onSelect: () => void }> = ({ service, onSelect }) => {
    const Icon = service.icon;
    return (
        <button
            onClick={onSelect}
            className="w-full text-left p-6 bg-white rounded-lg shadow-md hover:shadow-lg hover:border-blue-500 border-2 border-transparent transition-all duration-200"
        >
            <div className="flex items-center">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                    <Icon className="w-8 h-8" />
                </div>
                <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{service.type}</h3>
                    <p className="text-gray-600 text-sm mt-1">{service.description}</p>
                </div>
            </div>
        </button>
    );
};

const ServiceSelection: React.FC<ServiceSelectionProps> = ({ onServiceSelect }) => {
    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">What service do you need?</h2>
            <p className="text-center text-gray-500 mb-8">Choose a category to get started.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SERVICES.map(service => (
                    <ServiceCard key={service.id} service={service} onSelect={() => onServiceSelect(service)} />
                ))}
            </div>
        </div>
    );
};

export default ServiceSelection;
