import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormArray } from '@angular/forms';
import { SplitFormPresenter } from './split-form.presenter';

@Component({
  selector: 'snardev-split-form-ui',
  templateUrl: './split-form-ui.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [SplitFormPresenter],
})
export class SplitFormUiComponent {
  get billForm() {
    return this.splitFormPresenter.splitForm;
  }

  get billItems() {
    return this.billForm.controls['items'] as FormArray;
  }
  constructor(private readonly splitFormPresenter: SplitFormPresenter) {}

  addItem() {
    this.splitFormPresenter.addItem();
  }

  removeItem(index: number) {
    this.splitFormPresenter.removeItem(index);
  }

  onSubmit() {
    const billData = this.splitFormPresenter.save();
    console.log(billData);
  }
}
