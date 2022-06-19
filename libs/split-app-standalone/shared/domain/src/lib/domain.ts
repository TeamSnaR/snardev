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
    id: id || uuidv4(),
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
    id: id || uuidv4(),
    description,
    currency,
    price,
    quantity,
  };
}

function createDiscount(
  description: string,
  currency: string,
  rate = 0
): Addendum {
  return {
    id: uuidv4(),
    description: `${description} (${rate}%)`,
    rate: rate * -1,
    amount: 0,
    amountType: 'percent',
    type: 'discount',
    currency,
  };
}

export function createPercentDiscount(
  description: string,
  currency: string,
  rate = 0
): Addendum {
  return {
    ...createDiscount(description, currency, rate),
    amountType: 'percent',
  };
}
export function createFixedDiscount(
  description: string,
  currency: string,
  rate = 0
): Addendum {
  return {
    ...createDiscount(description, currency, rate),
    amountType: 'fixed',
  };
}

function createCharge(
  description: string,
  currency: string,
  rate = 0
): Addendum {
  return {
    id: uuidv4(),
    description: `${description} (${rate}%)`,
    rate: rate * -1,
    amount: 0,
    amountType: 'percent',
    type: 'charge',
    currency,
  };
}

export function createPercentCharge(
  description: string,
  currency: string,
  rate = 0
): Addendum {
  return {
    ...createCharge(description, currency, rate),
    amountType: 'percent',
  };
}

export function createFixedCharge(
  description: string,
  currency: string,
  rate = 0
): Addendum {
  return {
    ...createCharge(description, currency, rate),
    amountType: 'fixed',
  };
}
