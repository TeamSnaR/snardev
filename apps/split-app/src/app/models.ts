export type AmountType = 'fixed' | 'percent';
export type AddendumType = 'add' | 'deduct';

export type FormType = 'item' | 'charge' | 'discount';

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

export interface BillState {
  id: string;
  description: string;
  currency: string;
  items: BillItem[];
  addendums: Addendum[];
}

export interface BillItemFormModel {
  id: string;
  description: string;
  price: number;
  quantity: number;
}
