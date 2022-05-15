export type AmountType = 'fixed' | 'percent';
export type AddendumType = 'charge' | 'discount';

export type FormType = 'item' | 'charge' | 'discount' | 'bill';

export interface BillItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

export interface Addendum {
  id: string;
  description: string;
  rate: number;
  amount: number;
  amountType: AmountType;
  type: AddendumType;
}

export interface Bill {
  id: string;
  description: string;
  currency: string;
  items: BillItem[];
  addendums: Addendum[];
  billDate: Date;
}

export interface BillItemFormModel {
  description: string;
  price: number;
  quantity: number;
}

export interface AddendumFormModel {
  description: string;
  rate: number;
  amountType: AmountType;
}

export interface BillFormModel {
  description: string;
  billDate: Date;
  currency: string;
}
