import React, { useContext } from 'react';
import { AppContext } from '../App';
import { UserRole, AppView } from '../types';
import { BriefcaseIcon, UserIcon, WrenchIcon, ArrowLeftOnRectangleIcon } from './icons/Icons';

interface HeaderProps {
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
    const { userRole, setView } = useContext(AppContext);

    const getRoleInfo = () => {
        switch (userRole) {
            case UserRole.ADMIN:
                return { text: 'Admin Panel', icon: <BriefcaseIcon className="w-5 h-5" /> };
            case UserRole.WORKER:
                return { text: 'Worker Dashboard', icon: <WrenchIcon className="w-5 h-5" /> };
            case UserRole.CUSTOMER:
            default:
                return { text: 'Customer Portal', icon: <UserIcon className="w-5 h-5" /> };
        }
    };

    const roleInfo = getRoleInfo();

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <button onClick={() => setView(AppView.LANDING)} aria-label="Go to homepage" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md">
                            <h1 className="text-2xl font-bold text-blue-600">Instahandy</h1>
                        </button>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 text-gray-600">
                            {roleInfo.icon}
                            <span className="hidden md:inline text-sm font-medium">{roleInfo.text}</span>
                        </div>
                         <button
                            onClick={onLogout}
                            className="flex items-center space-x-2 px-3 py-2 border border-transparent text-sm font-medium rounded-md text-red-600 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition"
                            aria-label="Logout"
                        >
                            <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                            <span className="hidden md:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;