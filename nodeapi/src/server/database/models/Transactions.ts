export interface ITransactions{
  id: string;
  user_id: string;
  type: string;
  description: string;
  value: number;
  date: Date;
  created_at: Date;
  updated_at: Date;
}