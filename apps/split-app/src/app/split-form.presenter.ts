import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BillItem, BillItemFormModel } from './models';

const DEFAULT_STATE = {
  description: '',
  quantity: 1,
  price: 0,
};

@Injectable()
export class SplitFormPresenter {
  billItemForm = this.formBuilder.group({
    description: [DEFAULT_STATE.description, [Validators.required]],
    quantity: [
      DEFAULT_STATE.quantity,
      [Validators.required, Validators.min(1)],
    ],
    price: [DEFAULT_STATE.price, [Validators.required]],
  });
  constructor(private readonly formBuilder: FormBuilder) {}

  save(): BillItem | null {
    this.billItemForm.markAllAsTouched();
    if (this.billItemForm.valid) {
      const billItem = this.mapFrom(this.billItemForm.value);
      this.reset();
      return billItem;
    } else {
      return null;
    }
  }

  reset() {
    this.billItemForm.reset(DEFAULT_STATE);
  }

  private mapFrom(formData: BillItemFormModel): BillItem {
    return {
      id: '',
      description: formData.description,
      quantity: +formData.quantity,
      price: +formData.price,
    };
  }
}
