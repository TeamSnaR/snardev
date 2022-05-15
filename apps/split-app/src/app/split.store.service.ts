import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, pipe, tap } from 'rxjs';
import { Addendum, BillItem, Bill, FormType } from './models';
import {
  getBillSubtotal,
  getBillGrandTotal,
  getPerItemRate,
  CURRENCIES,
  createBillItem,
  createPercentDiscount,
  createPercentCharge,
  createBill,
} from './utils';

export interface SplitState {
  bill: Bill;
  error: string;
  showModal: boolean;
  formType: FormType;
  formData: Bill | Addendum | BillItem | null;
}

const DEFAULT_CURRENCY = CURRENCIES[0].value;

const DEFAULT_BILL_STATE: Bill = {
  id: '',
  description: 'Untitled',
  currency: DEFAULT_CURRENCY,
  items: [],
  addendums: [],
  billDate: new Date(),
};

const DEFAULT_STATE: SplitState = {
  bill: DEFAULT_BILL_STATE,
  error: '',
  showModal: false,
  formType: 'item',
  formData: null,
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
    Bill & { grandTotal: number; subTotal: number; perItemRate: number }
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
      hasItems: bill.items.length > 0,
      formData: state.formData,
    })
  );
  constructor() {
    super(DEFAULT_STATE);
  }
  saveBillItem = this.effect<BillItem>(
    pipe(
      tap((billItem) => {
        const { bill } = this.get();
        this.patchState({
          bill: {
            ...bill,
            items: [...bill.items, billItem],
          },
        });
      }),
      tap(() => this.closeModal())
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

  saveBill = this.effect<Bill>(
    pipe(
      tap((bill) => {
        const { bill: oldBill } = this.get();
        this.patchState({ bill: { ...oldBill, ...bill } });
      }),
      tap(() => this.closeModal())
    )
  );

  openModal(formType: FormType = 'item', id: string | null = null) {
    const { bill } = this.get();
    if (formType === 'item') {
      this.patchState({
        showModal: true,
        formType,
        formData:
          bill.items.find((item) => item.id === id) ?? createBillItem('', 0, 1),
      });
    } else if (formType === 'charge') {
      this.patchState({
        showModal: true,
        formType,
        formData:
          bill.addendums.find((item) => item.id === id) ??
          createPercentCharge(''),
      });
    } else if (formType === 'discount') {
      this.patchState({
        showModal: true,
        formType,
        formData:
          bill.addendums.find((item) => item.id === id) ??
          createPercentDiscount(''),
      });
    } else if (formType === 'bill') {
      this.patchState({
        showModal: true,
        formType,
        formData: !id
          ? bill
          : createBill(
              DEFAULT_BILL_STATE.description,
              DEFAULT_BILL_STATE.currency,
              DEFAULT_BILL_STATE.billDate
            ),
      });
    }
  }

  closeModal() {
    this.patchState({ showModal: false });
  }
}
