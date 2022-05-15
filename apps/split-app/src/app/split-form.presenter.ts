import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Addendum,
  AddendumFormModel,
  BillItem,
  BillItemFormModel,
  FormType,
} from './models';
import {
  createBillItem,
  createFixedCharge,
  createFixedDiscount,
  createPercentCharge,
  createPercentDiscount,
} from './utils';

const DEFAULT_BILL_ITEM_STATE = {
  description: '',
  quantity: 1,
  price: '',
};

const DEFAULT_ADDENDUM_STATE = {
  description: '',
  rate: '',
  amountType: 'percent',
};

@Injectable()
export class SplitFormPresenter {
  splitForm!: FormGroup;
  constructor(private readonly formBuilder: FormBuilder) {}

  createForm(formType: FormType): FormGroup {
    if (formType === 'item') {
      this.splitForm = this.createBillItemForm();
    } else {
      this.splitForm = this.createAddendumForm();
    }

    return this.splitForm;
  }

  saveForm(formType: FormType): BillItem | Addendum | null {
    this.splitForm.markAllAsTouched();

    if (this.splitForm.valid) {
      if (formType === 'item') {
        return this.mapToBillItem(this.splitForm.value);
      } else if (formType === 'charge' || formType === 'discount') {
        return this.mapToAddendum(formType, this.splitForm.value);
      }
    }

    return null;
  }

  resetForm(formType: FormType = 'item') {
    if (formType === 'item') {
      this.splitForm?.reset(DEFAULT_BILL_ITEM_STATE);
    } else {
      this.splitForm?.reset(DEFAULT_ADDENDUM_STATE);
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

  private createAddendumForm(): FormGroup {
    return this.formBuilder.group({
      description: [DEFAULT_ADDENDUM_STATE.description, [Validators.required]],
      rate: [DEFAULT_ADDENDUM_STATE.rate, [Validators.required]],
      amountType: [DEFAULT_ADDENDUM_STATE.amountType, [Validators.required]],
    });
  }

  private createBillItemForm(): FormGroup {
    return this.formBuilder.group(
      {
        description: [
          DEFAULT_BILL_ITEM_STATE.description,
          [Validators.required],
        ],
        quantity: [
          DEFAULT_BILL_ITEM_STATE.quantity,
          [Validators.required, Validators.min(1)],
        ],
        price: [DEFAULT_BILL_ITEM_STATE.price, [Validators.required]],
      },
      { updateOn: 'blur' }
    );
  }
}
