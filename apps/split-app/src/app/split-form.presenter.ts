import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { BillItem, BillItemFormModel } from './models';

@Injectable()
export class SplitFormPresenter {
  billItemForm = this.formBuilder.group({
    description: ['', [Validators.required]],
    quantity: [1, [Validators.required, Validators.min(1)]],
    price: [0, [Validators.required]],
  });
  constructor(private readonly formBuilder: FormBuilder) {}

  save(): BillItem | null {
    this.billItemForm.markAllAsTouched();
    if (this.billItemForm.valid) {
      const billItemData = this.billItemForm.value as BillItemFormModel;
      // validate
      // cleanup
      const billItem = {
        description: billItemData.description,
        quantity: +billItemData.quantity,
        price: +billItemData.price,
      } as BillItem;

      return billItem;
    } else {
      return null;
    }
  }
}
