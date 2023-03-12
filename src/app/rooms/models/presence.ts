export interface Presence {
  uid: string;
  state: 'online' | 'offline';
  last_changed: number;
  name: string;
}
