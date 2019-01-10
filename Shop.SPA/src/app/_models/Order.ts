import { User } from './User';

export interface Order {
  items?: string;
  totalPrice?: number;
  address?: string;
  city?: string;
  state?: string;
  reference?: string;
  phoneNumber?: string;
  phoneNumber2?: string;
}
export interface OrderForListAdmin {
  totalPrice?: number;
  orderDate?: Date;
  isShipped?: boolean;
  reference?: string;
}
export interface OrderViewAdmin {
  id: number;
  user: User;
  orderDate?: Date;
  isShipped?: boolean;
  items?: string;
  totalPrice?: number;
  address?: string;
  city?: string;
  state?: string;
  reference?: string;
  phoneNumber?: string;
  phoneNumber2?: string;
}
