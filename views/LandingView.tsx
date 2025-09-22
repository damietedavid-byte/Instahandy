import React, { useContext } from 'react';
import { AppContext } from '../App';
import { UserRole } from '../types';
import { UserIcon, WrenchIcon, BriefcaseIcon } from '../components/icons/Icons';

const RoleCard: React.FC<{
  role: UserRole;
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: (role: UserRole) => void;
}> = ({ role, title, description, icon, onClick }) => (
  <button
    onClick={() => onClick(role)}
    className="w-full text-left p-6 bg-white rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 ease-in-out cursor-pointer border-2 border-transparent hover:border-blue-500"
  >
    <div className="flex items-center space-x-4">
      <div className="flex-shrink-0 bg-blue-100 text-blue-600 p-3 rounded-full">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <p className="text-gray-500 mt-1">{description}</p>
      </div>
    </div>
  </button>
);


const LandingView: React.FC = () => {
  const { setRole } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-blue-600">Instahandy</h1>
        <p className="mt-4 text-lg text-gray-600">Your trusted partner for home services in Nigeria.</p>
        <p className="mt-1 text-gray-500">Quick, reliable, and professional.</p>
      </div>

      <div className="mt-12 w-full max-w-2xl space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Continue as a...</h2>
        <RoleCard
          role={UserRole.CUSTOMER}
          title="Customer"
          description="Book a cleaning or handyman service in minutes."
          icon={<UserIcon className="w-8 h-8" />}
          onClick={setRole}
        />
        <RoleCard
          role={UserRole.WORKER}
          title="Service Professional"
          description="View and manage your job requests."
          icon={<WrenchIcon className="w-8 h-8" />}
          onClick={setRole}
        />
        <RoleCard
          role={UserRole.ADMIN}
          title="Administrator"
          description="Manage services, professionals, and operations."
          icon={<BriefcaseIcon className="w-8 h-8" />}
          onClick={setRole}
        />
      </div>
    </div>
  );
};

export default LandingView;
