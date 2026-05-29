import {Service} from './Service';

export interface Booking {

  id: number;
  userId: number;

  service: Service;

  bookingDate?: Date;

  status?: string; // PENDING, CONFIRMED, CANCELLED

  createdAt?: Date;

  updatedAt?: Date;

}
