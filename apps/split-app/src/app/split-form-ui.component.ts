import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormArray } from '@angular/forms';
import { BillItem, BillItemFormModel } from './models';
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
  private _formShow!: boolean;
  @Input()
  set formShow(value: boolean) {
    this._formShow = value;
    this.splitFormPresenter.reset();
  }
  get formShow() {
    return this._formShow;
  }
  @Output()
  formClose = new EventEmitter<BillItem | null>();
  get billItemForm() {
    return this.splitFormPresenter.billItemForm;
  }

  get billItems() {
    return this.billItemForm.controls['items'] as FormArray;
  }

  constructor(private readonly splitFormPresenter: SplitFormPresenter) {}
  onSubmit() {
    const billItem = this.splitFormPresenter.save();
    if (billItem) {
      this.formClose.emit(billItem);
    } else {
      return;
    }
  }

  onCancel() {
    this.formClose.emit();
  }
}
