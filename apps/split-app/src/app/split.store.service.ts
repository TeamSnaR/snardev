import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, pipe, tap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Addendum, BillItem, BillState, FormType } from './models';
import { getBillSubtotal, getBillGrandTotal, getPerItemRate } from './utils';

export interface SplitState {
  bill: BillState;
  error: string;
  showModal: boolean;
  formType: FormType;
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
    // getPercentCharge('Service charge', 10),
    // getPercentCharge('SST', 6),
    // getFixedDiscount('Voucher', 2),
    // getFixedCharge('Delivery charge', 3),
    // getFixedCharge('Sys rounding', 0.01),
  ],
};

const DEFAULT_STATE: SplitState = {
  bill: DEFAULT_BILL_STATE,
  error: '',
  showModal: false,
  formType: 'item',
};

@Injectable({
  providedIn: 'any',
})
export class SplitStore extends ComponentStore<SplitState> {
  readonly subTotal$ = this.select((state) => getBillSubtotal(state.bill));
  readonly addendums$ = this.select(
    this.state$,
    this.subTotal$,
    (state, subTotal) => {
      return state.bill.addendums
        .reduce((acc, addendum) => {
          if (addendum.type === 'charge') {
            addendum.amount =
              addendum.amountType === 'percent'
                ? subTotal * (addendum.rate / 100)
                : addendum.rate;
            acc.push(addendum);
          } else if (addendum.type === 'discount') {
            addendum.amount =
              (addendum.amountType === 'percent'
                ? subTotal * (addendum.rate / 100)
                : addendum.rate) * -1;
            acc.push(addendum);
          }

          return acc;
        }, [] as Addendum[])
        .sort((a, b) => b.amount - a.amount);
    }
  );
  readonly grandTotal$ = this.select(
    this.state$,
    this.addendums$,
    (state, addendums) => getBillGrandTotal(state.bill, addendums)
  );
  readonly perItemRate$ = this.select(
    this.state$,
    this.addendums$,
    (state, addendums) => getPerItemRate(state.bill, addendums)
  );
  readonly calculations$ = this.select(
    this.subTotal$,
    this.grandTotal$,
    this.perItemRate$,
    (subTotal, grandTotal, perItemRate) => ({
      subTotal,
      grandTotal,
      perItemRate,
    })
  );
  readonly bill$: Observable<
    BillState & { grandTotal: number; subTotal: number; perItemRate: number }
  > = this.select(
    this.state$,
    this.addendums$,
    this.calculations$,
    (state, addendums, calculations) => ({
      ...state.bill,
      addendums,
      grandTotal: calculations.grandTotal,
      subTotal: calculations.subTotal,
      perItemRate: calculations.perItemRate,
    })
  );

  readonly error$ = this.select((state) => state.error);
  vm$ = this.select(
    this.state$,
    this.bill$,
    this.error$,
    (state, bill, error) => ({
      bill,
      error,
      showModal: state.showModal,
      formType: state.formType,
    })
  );
  constructor() {
    super(DEFAULT_STATE);
  }
  saveBillItem = this.effect<BillItem>(
    pipe(
      tap(() => this.closeModal()),
      tap((billItem) => {
        const { bill } = this.get();
        billItem.id = uuidv4();
        this.patchState({
          bill: {
            ...bill,
            items: [...bill.items, billItem],
          },
        });
      })
    )
  );

  saveAddendum = this.effect<Addendum>(
    pipe(
      tap((addendum) => {
        const { bill } = this.get();
        this.patchState({
          bill: {
            ...bill,
            addendums: [...bill.addendums, addendum],
          },
        });
      }),
      tap(() => this.closeModal())
    )
  );

  openModal(formType: FormType = 'item') {
    this.patchState({
      showModal: true,
      formType,
    });
  }

  closeModal() {
    this.patchState({ showModal: false });
  }
}
