export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  userName?: string;
  password?: string;
  phoneNumber?: string;
  phoneNumber2?: string;
  address?: string;
  city?: string;
  items?: string;
  state?: string;
  hasDefaultAddress?: boolean;
}
export interface UserForList {
  id?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  lastActive?: string;
  roles?: string[];
}

export interface UserForDetailAdmin {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  userName?: string;
  password?: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  lastActive?: string;
  joinDate?: string;
  roles?: any;
  hasDefaultAddress?: boolean;
}
