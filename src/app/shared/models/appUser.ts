import { Timestamp } from 'firebase/firestore';

export interface AppUser {
  createdAt: Timestamp;
  uid: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}
