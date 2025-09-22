
import React, { useState, useCallback, useMemo } from 'react';
import { UserRole, AppView, Booking, WorkerJob } from './types';
import { MOCK_BOOKING, MOCK_WORKER_JOB } from './constants';
import Header from './components/Header';
import LandingView from './views/LandingView';
import CustomerFlow from './views/customer/CustomerFlow';
import WorkerDashboard from './views/worker/WorkerDashboard';
import AdminPanel from './views/admin/AdminPanel';

export const AppContext = React.createContext<{
  userRole: UserRole;
  currentView: AppView;
  setView: (view: AppView) => void;
  setRole: (role: UserRole) => void;
  globalBooking: Booking | null;
  setGlobalBooking: React.Dispatch<React.SetStateAction<Booking | null>>;
  workerJob: WorkerJob | null;
  setWorkerJob: React.Dispatch<React.SetStateAction<WorkerJob | null>>;
}>({
  userRole: UserRole.CUSTOMER,
  currentView: AppView.LANDING,
  setView: () => {},
  setRole: () => {},
  globalBooking: null,
  setGlobalBooking: () => {},
  workerJob: null,
  setWorkerJob: () => {},
});

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);
  const [userRole, setUserRole] = useState<UserRole>(UserRole.CUSTOMER);
  const [globalBooking, setGlobalBooking] = useState<Booking | null>(null);
  const [workerJob, setWorkerJob] = useState<WorkerJob | null>(null);

  const handleSetView = useCallback((view: AppView) => {
    setCurrentView(view);
  }, []);

  const handleSetRole = useCallback((role: UserRole) => {
    setUserRole(role);
    if (role === UserRole.CUSTOMER) {
      setCurrentView(AppView.CUSTOMER_BOOKING);
    } else if (role === UserRole.WORKER) {
      setWorkerJob(MOCK_WORKER_JOB); // Pre-populate with a job for demo
      setCurrentView(AppView.WORKER_DASHBOARD);
    } else if (role === UserRole.ADMIN) {
      setCurrentView(AppView.ADMIN_PANEL);
    }
  }, []);

  const handleLogout = () => {
    setCurrentView(AppView.LANDING);
    setGlobalBooking(null);
    setWorkerJob(null);
  };
  
  const appContextValue = useMemo(() => ({
    userRole,
    currentView,
    setView: handleSetView,
    setRole: handleSetRole,
    globalBooking,
    setGlobalBooking,
    workerJob,
    setWorkerJob,
  }), [userRole, currentView, handleSetView, handleSetRole, globalBooking, workerJob]);

  const renderView = () => {
    switch (currentView) {
      case AppView.CUSTOMER_BOOKING:
        return <CustomerFlow />;
      case AppView.WORKER_DASHBOARD:
        return <WorkerDashboard />;
      case AppView.ADMIN_PANEL:
        return <AdminPanel />;
      case AppView.LANDING:
      default:
        return <LandingView />;
    }
  };

  return (
    <AppContext.Provider value={appContextValue}>
      <div className="min-h-screen bg-gray-50 font-sans">
        {currentView !== AppView.LANDING && <Header onLogout={handleLogout} />}
        <main className="container mx-auto p-4 md:p-8">
          {renderView()}
        </main>
      </div>
    </AppContext.Provider>
  );
};

export default App;
