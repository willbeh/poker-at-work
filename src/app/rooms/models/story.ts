export interface Story {
  id?: string;
  date: Date;
  roomId: string;
  status: 'active' | 'completed';
  votes?: { [key: string]: number };
  average?: number;
}
