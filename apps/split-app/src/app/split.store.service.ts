import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { v4 as uuidv4 } from 'uuid';

export type AmountType = 'fixed' | 'percent';
export type AddendumType = 'add' | 'deduct';

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

export interface SplitState {
  bill: BillState;
  error: string;
}

const DEFAULT_CURRENCY = 'RM';

const DEFAULT_BILL_STATE: BillState = {
  id: '',
  description: 'Bo and Banker bill',
  currency: DEFAULT_CURRENCY,
  items: [
    {
      id: uuidv4(),
      description: 'HH GUINNESS PINT',
      quantity: 1,
      price: 25,
    },
    {
      id: uuidv4(),
      description: 'HH TIGER PINT',
      quantity: 1,
      price: 25,
    },
    {
      id: uuidv4(),
      description: 'DUO WAGYU BEEF CHEESE CRONUT',
      quantity: 1,
      price: 58,
    },
    {
      id: uuidv4(),
      description: "BO'S SIGNATURE TRUFFLE FRIES",
      quantity: 1,
      price: 28,
    },
    {
      id: uuidv4(),
      description: 'FRIED BABY SQUID',
      quantity: 3,
      price: 36,
    },
    {
      id: uuidv4(),
      description: "HH GORDON'S X2",
      quantity: 5,
      price: 36,
    },
  ],
  addendums: [
    // getPercentDiscount('Loyalty discount', 0.5),
    getPercentCharge('Service charge', 0.1),
    getPercentCharge('SST', 0.06),
    // getFixedDiscount('Voucher', 2),
    // getFixedCharge('Delivery charge', 3),
    getFixedCharge('Sys rounding', 0.01),
  ],
};

const DEFAULT_STATE: SplitState = {
  bill: DEFAULT_BILL_STATE,
  error: '',
};

export function getPercentDiscount(
  description: string,
  rate: number = 0
): Addendum {
  return {
    id: uuidv4(),
    description,
    rate,
    amount: 0,
    amountType: 'percent',
    type: 'deduct',
  };
}
export function getFixedDiscount(
  description: string,
  rate: number = 0
): Addendum {
  return {
    id: uuidv4(),
    description,
    rate,
    amount: 0,
    amountType: 'fixed',
    type: 'deduct',
  };
}

export function getPercentCharge(
  description: string,
  rate: number = 0
): Addendum {
  return {
    id: uuidv4(),
    description,
    rate,
    amount: 0,
    amountType: 'percent',
    type: 'add',
  };
}

export function getFixedCharge(
  description: string,
  rate: number = 0
): Addendum {
  return {
    id: uuidv4(),
    description,
    rate,
    amount: 0,
    amountType: 'fixed',
    type: 'add',
  };
}

export function getBillSubtotal(bill: BillState): number {
  return bill.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
}

@Injectable({
  providedIn: 'any',
})
export class SplitStore extends ComponentStore<SplitState> {
  readonly bill$ = this.select((state) => state.bill);
  readonly error$ = this.select((state) => state.error);
  readonly addendums$ = this.select((state) => {
    const subTotal = getBillSubtotal(state.bill);
    return state.bill.addendums.reduce((acc, addendum) => {
      // extra charge

      if (addendum.type === 'add') {
        addendum.amount =
          addendum.amountType === 'percent'
            ? subTotal * addendum.rate
            : addendum.rate;
        acc.push(addendum);
      } else if (addendum.type === 'deduct') {
        addendum.amount =
          (addendum.amountType === 'percent'
            ? subTotal * addendum.rate
            : addendum.rate) * -1;
        acc.push(addendum);
      }

      return acc;
    }, [] as Addendum[]);
  });
  readonly billDiscounts$ = this.select(this.addendums$, (addendums) => {
    const discounts = addendums.filter(
      (addendum) => addendum.type === 'deduct'
    );
    const total = discounts.reduce((acc, discount) => acc + discount.amount, 0);
    return {
      discounts,
      total,
    };
  });
  readonly billExtraCharges$ = this.select(this.addendums$, (addendums) => {
    const extraCharges = addendums.filter(
      (addendum) => addendum.type === 'add'
    );
    const total = extraCharges.reduce((acc, charge) => acc + charge.amount, 0);
    return {
      extraCharges,
      total,
    };
  });
  vm$ = this.select(
    this.bill$,
    this.error$,
    this.addendums$,
    (bill, error, addendums) => {
      const subTotal = getBillSubtotal(bill);
      return {
        bill,
        billItems: bill.items,
        addendums: addendums.sort((a, b) => b.amount - a.amount),
        subTotal,
        grandTotal: addendums.reduce(
          (acc, addendum) => acc + addendum.amount,
          subTotal
        ),
        error,
      };
    }
  );
  constructor() {
    super(DEFAULT_STATE);
  }
}
