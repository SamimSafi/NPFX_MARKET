export interface IPropertyType {
  id?: number;
  categoryId?: number;
  category?: string;
  name: string;
  details: string;
  model: string;
  price?: number;
  conditionId?: number;
  employeeId?: number;
  userId?: string;
  usageStartDate?: string; // You can use Date instead of string if you plan to work with Date objects.
  amountPaid?: number;
  paymentDate?: string; // Similarly, consider using Date instead of string if needed.
  startDate?: string;
  endDate?: string;
  remarks?: string;
  afterSubmit?: string;
}

export interface PropertyRental {
  id?: number;
  propertyId?: number;
  employeeId?: number;
  startDate?: string;
  endDate?: string;
  remarks?: string;
  afterSubmit?: string;
}

export interface Payment {
  propertyId?: number;
  amountPaid?: number;
  paymentDate?: string; // Use Date instead of string if handling Date objects directly.
  remainingBalance?: number;
  userId?: string;

  // These fields are for the update
  id?: number;
  status?: string;
  employeeId?: number;
  employeeName?: string;
}

export interface IPropertyParams {
  pageIndex: number;
  pageSize: number;
  searchBy?: string;
}

export interface Assignment {
  id?: number;
  employeeId?: number;
  employeeName?: string;
  remarks?: string;
  startDate: string; // ISO date format
  endDate?: string;
}

export interface Maintenance {
  id: number;
  date: string; // ISO date format
  description: string;
  payedAmountInUSD: number;
}

export interface PropertyDetails {
  id: number;
  categoryId: number;
  name: string;
  model: string;
  details: string;
  price: number;
  conditionId: number;
  employeeId: number;
  category: string;
  condition: string;
  assignments: Assignment[];
  maintenances: Maintenance[]; // Add fields to this interface if needed
  payments: Payment[];
}
