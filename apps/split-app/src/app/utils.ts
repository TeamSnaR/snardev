import { Addendum, Bill, BillItem } from './models';
import { v4 as uuidv4 } from 'uuid';

export function createPercentDiscount(
  description: string,
  rate: number = 0
): Addendum {
  return {
    id: uuidv4(),
    description: `${description} (${rate}%)`,
    rate: rate * -1,
    amount: 0,
    amountType: 'percent',
    type: 'discount',
  };
}
export function createFixedDiscount(
  description: string,
  rate: number = 0
): Addendum {
  return {
    id: uuidv4(),
    description: `${description}`,
    rate: rate * -1,
    amount: 0,
    amountType: 'fixed',
    type: 'discount',
  };
}

export function createPercentCharge(
  description: string,
  rate: number = 0
): Addendum {
  return {
    id: uuidv4(),
    description: `${description} (${rate}%)`,
    rate,
    amount: 0,
    amountType: 'percent',
    type: 'charge',
  };
}

export function createFixedCharge(
  description: string,
  rate: number = 0
): Addendum {
  return {
    id: uuidv4(),
    description: `${description}`,
    rate,
    amount: 0,
    amountType: 'fixed',
    type: 'charge',
  };
}

export function getBillSubtotal(bill: Bill): number {
  return bill.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
}

export function getBillGrandTotal(bill: Bill, addendums: Addendum[]): number {
  const subTotal = getBillSubtotal(bill);
  return addendums.reduce((acc, addendum) => acc + addendum.amount, subTotal);
}

export function getPerItemRate(bill: Bill, addendums: Addendum[]): number {
  const billTotal = getBillGrandTotal(bill, addendums);
  return addendums
    .filter((addendum) => addendum.type === 'charge')
    .reduce((acc, charge) => {
      const rate =
        charge.amountType === 'fixed'
          ? (charge.rate * 100) / billTotal
          : charge.rate / 100;

      return acc + rate;
    }, 0);
}

export function getBillItemAmountWithCharges(
  billItem: BillItem,
  perItemRate: number
): number {
  return (billItem.price + billItem.price * perItemRate) * billItem.quantity;
}

export function createBillItem(
  description: string,
  price: number = 0,
  quantity: number = 1
) {
  return {
    id: uuidv4(),
    description,
    price,
    quantity,
  };
}

export function createBill(
  description: string,
  currency: string,
  billDate: Date
) {
  return {
    id: uuidv4(),
    description,
    currency,
    billDate,
    items: [],
    addendums: [],
  };
}

export const CURRENCIES = [
  {
    label: 'MYR',
    value: 'MYR',
  },
  {
    label: 'USD',
    value: 'USD',
  },
  {
    label: 'EUR',
    value: 'EUR',
  },
  {
    label: 'GBP',
    value: 'GBP',
  },
  {
    label: 'PHP',
    value: 'PHP',
  },
];
