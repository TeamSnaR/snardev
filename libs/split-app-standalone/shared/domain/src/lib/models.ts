export type AmountType = 'fixed' | 'percent';
export type AddendumType = 'charge' | 'discount';
export interface BillItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
  currency: string;
}

export interface Addendum {
  id: string;
  description: string;
  rate: number;
  currency: string;
  amount: number;
  amountType: AmountType;
  type: AddendumType;
}
export interface Bill {
  id: string;
  description: string;
  currency: string;
  location: string;
  date: Date;
  billItems: BillItem[];
  addendums: Addendum[];
}
