import { Service, ServiceType, Booking, BookingStatus, Worker, WorkerJob } from './types';
import { HomeIcon, SparklesIcon, WrenchScrewdriverIcon, SunIcon, CircleStackIcon } from './components/icons/Icons';

export const SERVICES: Service[] = [
  {
    id: 's1',
    type: ServiceType.HOME_CLEANING,
    description: 'Standard cleaning for homes and apartments. Keep your space fresh.',
    icon: HomeIcon,
    basePrice: 5000,
  },
  {
    id: 's2',
    type: ServiceType.DEEP_CLEAN,
    description: 'A thorough cleaning for a spotless home from top to bottom.',
    icon: SparklesIcon,
    basePrice: 15000,
  },
  {
    id: 's3',
    type: ServiceType.HANDYMAN,
    description: 'General repairs, installations, and assembly tasks.',
    icon: WrenchScrewdriverIcon,
    basePrice: 7500,
  },
  {
    id: 's4',
    type: ServiceType.AC_REPAIR,
    description: 'Servicing and repair for all types of air conditioning units.',
    icon: SunIcon,
    basePrice: 10000,
  },
  {
    id: 's5',
    type: ServiceType.PLUMBING,
    description: 'Fixing leaks, clogs, and other plumbing issues.',
    icon: CircleStackIcon,
    basePrice: 8000,
  },
];

export const TIME_SLOTS = [
  '08:00 AM - 10:00 AM',
  '10:00 AM - 12:00 PM',
  '12:00 PM - 02:00 PM',
  '02:00 PM - 04:00 PM',
  '04:00 PM - 06:00 PM',
];

export const MOCK_WORKER: Worker = {
    id: 'w1',
    name: 'Adekunle Gold',
    rating: 4.8,
    avatarUrl: 'https://picsum.photos/seed/worker1/100/100',
    specialties: [ServiceType.HOME_CLEANING, ServiceType.HANDYMAN],
    bankDetails: {
        bankName: 'OPay',
        accountNumber: '08012345678',
        accountName: 'Adekunle Gold Services'
    },
    whatsappNumber: '+2348012345678'
};


export const MOCK_BOOKING: Booking = {
    id: 'b123',
    service: SERVICES[0],
    bedrooms: 2,
    bathrooms: 2,
    date: new Date(),
    timeSlot: '10:00 AM - 12:00 PM',
    address: {
        street: '123, Allen Avenue',
        city: 'Lagos',
        state: 'Lagos'
    },
    totalPrice: 12000,
    status: BookingStatus.PENDING,
    worker: MOCK_WORKER,
    serviceDetails: "Please use eco-friendly cleaning products if possible. We have a small dog."
};


export const MOCK_WORKER_JOB: WorkerJob = {
    bookingDetails: {
        id: 'b124',
        service: SERVICES[2],
        bedrooms: 0,
        bathrooms: 0,
        date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // Tomorrow
        timeSlot: '02:00 PM - 04:00 PM',
        address: {
            street: '45, Wuse II',
            city: 'Abuja',
            state: 'FCT'
        },
        totalPrice: 7500,
        status: BookingStatus.PENDING,
        worker: MOCK_WORKER,
        serviceDetails: "The client needs help assembling a new flat-pack wardrobe from IKEA. All parts are on site."
    },
    status: 'NEW'
};