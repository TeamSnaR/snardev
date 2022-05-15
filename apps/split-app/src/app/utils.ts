import { Addendum, BillState, BillItem } from './models';
import { v4 as uuidv4 } from 'uuid';

export function getPercentDiscount(
  description: string,
  rate: number = 0
): Addendum {
  return {
    id: uuidv4(),
    description: `${description} (${rate}%)`,
    rate,
    amount: 0,
    amountType: 'percent',
    type: 'discount',
  };
}
export function getFixedDiscount(
  description: string,
  rate: number = 0
): Addendum {
  return {
    id: uuidv4(),
    description: `${description} (${rate})`,
    rate,
    amount: 0,
    amountType: 'fixed',
    type: 'discount',
  };
}

export function getPercentCharge(
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

export function getFixedCharge(
  description: string,
  rate: number = 0
): Addendum {
  return {
    id: uuidv4(),
    description: `${description} (${rate})`,
    rate,
    amount: 0,
    amountType: 'fixed',
    type: 'charge',
  };
}

export function getBillSubtotal(bill: BillState): number {
  return bill.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
}

export function getBillGrandTotal(
  bill: BillState,
  addendums: Addendum[]
): number {
  const subTotal = getBillSubtotal(bill);
  return addendums.reduce((acc, addendum) => acc + addendum.amount, subTotal);
}

export function getPerItemRate(bill: BillState, addendums: Addendum[]): number {
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
