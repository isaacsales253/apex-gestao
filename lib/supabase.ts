import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper types
export type Transaction = {
  id: string;
  description: string;
  category: string;
  amount: number;
  due_date: string;
  status: 'pendente' | 'pago' | 'atrasado';
  type: 'payable' | 'receivable';
  entity_name: string;
  created_at?: string;
};

export type Category = {
  id: string;
  name: string;
  type: 'payable' | 'receivable';
};
