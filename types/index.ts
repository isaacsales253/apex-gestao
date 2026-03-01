export type Company = {
  id: string;
  name: string;
  document?: string;
  created_at: string;
};

export type Item = {
  id: string;
  company_id: string;
  name: string;
  unit: string;
  current_stock: number;
  min_stock: number;
  unit_cost: number;
  category: string;
};

export type Supplier = {
  id: string;
  company_id: string;
  name: string;
  contact_name?: string;
  email?: string;
  phone?: string;
  category?: string;
};

export type Transaction = {
  id: string;
  company_id: string;
  description: string;
  amount: number;
  type: 'payable' | 'receivable';
  status: 'pending' | 'paid' | 'cancelled';
  due_date: string;
  payment_date?: string;
  category?: string;
  entity_name?: string;
};

export type Employee = {
  id: string;
  company_id: string;
  name: string;
  role: string;
  base_salary: number;
  status: 'active' | 'inactive';
};

export type LaborCost = {
  id: string;
  employee_id: string;
  charge_type: string;
  percentage?: number;
  fixed_amount: number;
};
