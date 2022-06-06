import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, pipe, tap } from 'rxjs';
import { Addendum, BillItem, Bill, FormType } from '@snardev/split-app/domain';
import {
  getBillSubtotal,
  getBillGrandTotal,
  getPerItemRate,
  CURRENCIES,
  createBillItem,
  createPercentDiscount,
  createPercentCharge,
  createBill,
  createFixedDiscount,
} from '@snardev/split-app/shared/utils/common';

export interface SplitState {
  bill: Bill;
  error: string;
  showModal: boolean;
  formType: FormType;
  formData: Bill | Addendum | BillItem | null;
  showOptions: boolean;
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

const MOCK_BILL_STATE: Bill = {
  ...createBill('Turkish store', DEFAULT_CURRENCY, new Date()),
  items: [
    createBillItem('Red wine', 15),
    createBillItem('item x', 15, 2),
    createBillItem('item a', 25, 1),
    createBillItem('item b', 20, 1),
    createBillItem('item c', 39, 3),
  ],
  addendums: [
    createPercentCharge('service charge', 10),
    createFixedDiscount('loyalty', 5),
  ],
};

const DEFAULT_STATE: SplitState = {
  bill: DEFAULT_BILL_STATE,
  error: '',
  showModal: false,
  formType: 'item',
  formData: null,
  showOptions: false,
};

@Injectable({
  providedIn: 'root',
})
export class SplitStore extends ComponentStore<SplitState> {
  readonly subTotal$ = this.select((state) =>
    getBillSubtotal(state.bill.items)
  );
  readonly addendums$ = this.select(
    this.state$,
    this.subTotal$,
    (state, subTotal) => {
      return state.bill.addendums
        .reduce((acc: Addendum[], addendum: Addendum) => {
          if (addendum.type === 'charge') {
            addendum.amount =
              addendum.amountType === 'percent'
                ? subTotal * (addendum.rate / 100)
                : addendum.rate;
            acc.push(addendum);
          } else if (addendum.type === 'discount') {
            addendum.amount =
              addendum.amountType === 'percent'
                ? subTotal * (addendum.rate / 100)
                : addendum.rate;
            acc.push(addendum);
          }

          return acc;
        }, [] as Addendum[])
        .sort((a: Addendum, b: Addendum) => b.amount - a.amount);
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
  readonly bill$: Observable<Bill> = this.select(
    this.state$,
    this.addendums$,
    (state, addendums) => ({
      ...state.bill,
      addendums,
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
      showOptions: state.showOptions,
      hasBill: state.bill.id !== '',
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
            items: [
              ...bill.items.filter((bi: BillItem) => bi.id !== billItem.id),
              billItem,
            ],
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
            addendums: [
              ...bill.addendums.filter((a: Addendum) => a.id !== addendum.id),
              addendum,
            ],
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
        this.patchState({
          bill: {
            ...oldBill,
            id: bill.id,
            description: bill.description,
            currency: bill.currency,
            billDate: bill.billDate,
          },
        });
      }),
      tap(() => this.closeModal())
    )
  );

  removeItem = this.effect<{ id: string; formType: FormType }>(
    pipe(
      tap((payload) => {
        const { bill } = this.get();
        if (payload.formType === 'item') {
          this.patchState({
            bill: {
              ...bill,
              items: bill.items.filter(
                (item: BillItem) => item.id !== payload.id
              ),
            },
          });
        } else if (
          payload.formType === 'charge' ||
          payload.formType === 'discount'
        ) {
          this.patchState({
            bill: {
              ...bill,
              addendums: bill.addendums.filter(
                (item: Addendum) => item.id !== payload.id
              ),
            },
          });
        }
      }),
      tap(() => this.closeModal())
    )
  );

  openModal(formType: FormType = 'item', id: string | null = null) {
    const { bill } = this.get();
    if (formType === 'item') {
      this.patchState({
        showModal: true,
        showOptions: false,
        formType,
        formData: {
          ...(bill.items.find((item: BillItem) => item.id === id) ??
            createBillItem('', 0, 1)),
        },
      });
    } else if (formType === 'charge' || formType === 'discount') {
      const addendum = bill.addendums.find((item: Addendum) => item.id === id);
      let formData: Addendum;
      if (addendum) {
        formData = { ...addendum };
      } else {
        formData = {
          ...(formType === 'charge'
            ? createPercentCharge('', 0)
            : createPercentDiscount('', 0)),
        };
      }
      this.patchState({
        showModal: true,
        showOptions: false,
        formType,
        formData,
      });
    } else if (formType === 'bill') {
      this.patchState({
        showModal: true,
        showOptions: false,
        formType,
        formData: { ...bill },
      });
    }
  }

  closeModal() {
    this.patchState({ showModal: false });
  }

  toggleOptions() {
    this.patchState({
      showOptions: !this.get().showOptions,
    });
  }

  resetBill() {
    this.patchState({ bill: DEFAULT_BILL_STATE });
  }
}
