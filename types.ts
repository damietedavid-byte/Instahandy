export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  WORKER = 'WORKER',
  ADMIN = 'ADMIN',
}

export enum AppView {
  LANDING = 'LANDING',
  CUSTOMER_BOOKING = 'CUSTOMER_BOOKING',
  WORKER_DASHBOARD = 'WORKER_DASHBOARD',
  ADMIN_PANEL = 'ADMIN_PANEL',
}

export enum ServiceType {
  HOME_CLEANING = 'Home Cleaning',
  DEEP_CLEAN = 'Deep Clean',
  HANDYMAN = 'Handyman Services',
  AC_REPAIR = 'AC Repair',
  PLUMBING = 'Plumbing',
}

export enum BookingStatus {
  PENDING = 'Pending',
  WORKER_ASSIGNED = 'Worker Assigned',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  CANCELED = 'Canceled',
}

export interface Service {
  id: string;
  type: ServiceType;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  basePrice: number;
}

export interface Address {
  street: string;
  city: 'Lagos' | 'Abuja' | 'Port Harcourt';
  state: string;
}

export interface BankDetails {
    bankName: string;
    accountNumber: string;
    accountName: string;
}

export interface Booking {
  id: string;
  service: Service;
  bedrooms: number;
  bathrooms: number;
  date: Date;
  timeSlot: string;
  address: Address;
  totalPrice: number;
  status: BookingStatus;
  paymentMethod?: string;
  worker?: Worker;
  serviceDetails?: string;
}

export interface Worker {
  id: string;
  name: string;
  rating: number;
  avatarUrl: string;
  specialties: ServiceType[];
  bankDetails?: BankDetails;
  whatsappNumber?: string;
}

export interface WorkerJob {
  bookingDetails: Booking;
  status: 'NEW' | 'ACCEPTED' | 'DECLINED' | 'COMPLETED';
}