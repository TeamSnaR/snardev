import { Addendum, Bill } from './models';
import { v4 as uuidv4 } from 'uuid';
export function createBill(
  description: string,
  billDate: Date,
  currency: string,
  location: string,
  id?: string
): Bill {
  return {
    id: id ?? uuidv4(),
    description,
    date: billDate,
    currency,
    location,
    billItems: [],
    addendums: [],
  };
}

export function createBillItem(
  description: string,
  currency: string,
  price = 0,
  quantity = 1,
  id?: string
) {
  return {
    id: id ?? uuidv4(),
    description,
    currency,
    price,
    quantity,
  };
}

function createDiscount(
  description: string,
  currency: string,
  amount = 0
): Addendum {
  return {
    id: '',
    description: `${description} (${amount}%)`,
    amount: amount * -1,
    amountType: 'percent',
    type: 'discount',
    currency,
  };
}

export function createPercentDiscount(
  description: string,
  currency: string,
  amount = 0,
  id?: string
): Addendum {
  return {
    ...createDiscount(description, currency, amount / 100),
    id: id ?? uuidv4(),
    amountType: 'percent',
  };
}
export function createFixedDiscount(
  description: string,
  currency: string,
  amount = 0,
  id?: string
): Addendum {
  return {
    ...createDiscount(description, currency, amount),
    id: id ?? uuidv4(),
    amountType: 'fixed',
  };
}

function createCharge(
  description: string,
  currency: string,
  amount = 0
): Addendum {
  return {
    id: '',
    description: `${description} (${amount}%)`,
    amount: amount * -1,
    amountType: 'percent',
    type: 'charge',
    currency,
  };
}

export function createPercentCharge(
  description: string,
  currency: string,
  amount = 0,
  id?: string
): Addendum {
  return {
    ...createCharge(description, currency, amount / 100),
    id: id ?? uuidv4(),
    amountType: 'percent',
  };
}

export function createFixedCharge(
  description: string,
  currency: string,
  amount = 0,
  id?: string
): Addendum {
  return {
    ...createCharge(description, currency, amount),
    id: id ?? uuidv4(),
    amountType: 'fixed',
  };
}
