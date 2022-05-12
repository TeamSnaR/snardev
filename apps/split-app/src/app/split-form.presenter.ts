import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class SplitFormPresenter {
  splitForm = this.formBuilder.group({
    items: this.formBuilder.array([
      this.formBuilder.group({
        description: ['', [Validators.required]],
        quantity: [1],
        price: [0],
      }),
    ]),
  });
  constructor(private readonly formBuilder: FormBuilder) {}

  addItem() {
    (this.splitForm.controls['items'] as FormArray).push(
      this.formBuilder.group({
        description: ['', [Validators.required]],
        quantity: [1],
        price: [0],
      })
    );
  }

  removeItem(index: number) {
    (this.splitForm.controls['items'] as FormArray).removeAt(index);
  }

  save() {
    const billData = this.splitForm.value;
    // validate
    // cleanup
    return billData;
  }
}
