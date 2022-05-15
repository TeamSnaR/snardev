import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Addendum,
  AddendumFormModel,
  AmountType,
  Bill,
  BillFormModel,
  BillItem,
  BillItemFormModel,
  FormType,
} from './models';
import {
  createBill,
  createBillItem,
  createFixedCharge,
  createFixedDiscount,
  createPercentCharge,
  createPercentDiscount,
  CURRENCIES,
} from './utils';

const DEFAULT_BILL_ITEM_STATE = {
  description: '',
  quantity: 1,
  price: 0,
};

const DEFAULT_ADDENDUM_STATE = {
  description: '',
  rate: 0,
  amountType: 'percent' as AmountType,
};

const DEFAULT_BILL_STATE = {
  description: '',
  currency: CURRENCIES[0].value,
  billDate: new Date(),
};

@Injectable()
export class SplitFormPresenter {
  splitForm!: FormGroup;
  currencies = CURRENCIES;
  constructor(private readonly formBuilder: FormBuilder) {}

  createForm(
    formType: FormType,
    formData: Bill | Addendum | BillItem | null
  ): FormGroup {
    if (formType === 'item') {
      this.splitForm = this.createBillItemForm(
        (formData as BillItem) ?? DEFAULT_BILL_ITEM_STATE
      );
    } else if (formType === 'charge' || formType === 'discount') {
      this.splitForm = this.createAddendumForm(
        (formData as Addendum) ?? DEFAULT_ADDENDUM_STATE
      );
    } else if (formType === 'bill') {
      this.splitForm = this.createBillForm(
        (formData as Bill) ?? DEFAULT_BILL_STATE
      );
    }

    return this.splitForm;
  }

  saveForm(formType: FormType): BillItem | Addendum | Bill | null {
    this.splitForm.markAllAsTouched();

    if (this.splitForm.valid) {
      if (formType === 'item') {
        return this.mapToBillItem(this.splitForm.value);
      } else if (formType === 'charge' || formType === 'discount') {
        return this.mapToAddendum(formType, this.splitForm.value);
      } else if (formType === 'bill') {
        return this.mapToBill(this.splitForm.value);
      }
    }

    return null;
  }

  resetForm(formType: FormType = 'item') {
    if (formType === 'item') {
      this.splitForm?.reset(DEFAULT_BILL_ITEM_STATE);
    } else if (formType === 'charge' || formType === 'discount') {
      this.splitForm?.reset(DEFAULT_ADDENDUM_STATE);
    } else if (formType === 'bill') {
      this.splitForm?.reset(DEFAULT_BILL_STATE);
    }
  }

  private mapToBillItem(formData: BillItemFormModel): BillItem {
    return createBillItem(
      formData.description,
      +formData.price,
      +formData.quantity
    );
  }

  private mapToAddendum(
    formType: FormType,
    formData: AddendumFormModel
  ): Addendum {
    if (formType === 'charge') {
      return formData.amountType === 'percent'
        ? createPercentCharge(formData.description, +formData.rate)
        : createFixedCharge(formData.description, +formData.rate);
    } else {
      return formData.amountType === 'percent'
        ? createPercentDiscount(formData.description, +formData.rate)
        : createFixedDiscount(formData.description, +formData.rate);
    }
  }

  private mapToBill(formData: BillFormModel): Bill {
    return createBill(
      formData.description,
      formData.currency,
      formData.billDate
    );
  }

  private createAddendumForm(formData: Addendum): FormGroup {
    return this.formBuilder.group(
      {
        description: [
          formData.rate > 0 ? formData.description : '',
          [Validators.required],
        ],
        rate: [formData.rate, [Validators.required]],
        amountType: [formData.amountType, [Validators.required]],
      },
      { updateOn: 'blur' }
    );
  }

  private createBillItemForm(formData: BillItem): FormGroup {
    return this.formBuilder.group(
      {
        description: this.formBuilder.control(formData.description, {
          validators: [Validators.required],
        }),
        quantity: this.formBuilder.control(formData.quantity, {
          validators: [Validators.required, Validators.min(1)],
        }),
        price: this.formBuilder.control(formData.price, {
          validators: [Validators.required],
        }),
      },
      { updateOn: 'blur' }
    );
  }

  private createBillForm(formData: Bill): FormGroup {
    return this.formBuilder.group(
      {
        description: [formData.description, [Validators.required]],
        currency: [formData.currency, [Validators.required]],
        billDate: [formData.billDate, [Validators.required]],
      },
      { updateOn: 'blur' }
    );
  }
}
