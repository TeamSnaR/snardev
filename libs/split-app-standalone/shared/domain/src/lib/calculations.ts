import { Addendum, Bill, BillItem } from './models';
import * as memoizee from 'memoizee';

const calculateBillSubtotal = memoizee((billItems: BillItem[]) => {
  return billItems.reduce(
    (acc: number, item: BillItem) => acc + item.price * item.quantity,
    0
  );
});

const calculateBillGrandTotal = memoizee(
  (bill: Bill, addendums: Addendum[]) => {
    const subTotal = calculateBillSubtotal(bill.billItems);
    return addendums.reduce((acc, addendum) => acc + addendum.amount, subTotal);
  }
);

const calculatePerItemChargeRates = memoizee(
  (bill: Bill, addendums: Addendum[]) => {
    const billTotal = calculateBillGrandTotal(bill, addendums);
    return addendums
      .filter((addendum) => addendum.type === 'charge')
      .reduce((acc, charge) => {
        const rate =
          charge.amountType === 'fixed'
            ? (charge.amount * 100) / billTotal
            : charge.amount / 100;

        return acc + rate;
      }, 0);
  }
);

const calculateBillItemAmountWithCharges = memoizee(
  (billItem: BillItem, perItemRate: number) => {
    return (billItem.price + billItem.price * perItemRate) * billItem.quantity;
  }
);

export {
  calculateBillSubtotal,
  calculatePerItemChargeRates,
  calculateBillItemAmountWithCharges,
  calculateBillGrandTotal,
};
