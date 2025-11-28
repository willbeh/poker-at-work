export interface Room {
  id?: string;
  name: string;
  owner: string;
  storyId: string;
  options: number[];
  allowUnsure?: boolean;
}
