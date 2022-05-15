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
import { Addendum, BillItem, BillItemFormModel, FormType } from './models';
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
  private _formShow = false;
  @Input()
  set formShow(value: boolean) {
    this._formShow = value;
    this.splitFormPresenter.resetForm(this.formType);
  }

  get formShow() {
    return this._formShow;
  }

  private _formType!: FormType;
  @Input()
  set formType(value: FormType) {
    this._formType = value;

    this.splitFormPresenter.createForm(this._formType);
  }
  get formType() {
    return this._formType;
  }
  @Output()
  formClose = new EventEmitter<BillItem | Addendum | null>();

  get splitForm() {
    return this.splitFormPresenter.splitForm;
  }

  constructor(private readonly splitFormPresenter: SplitFormPresenter) {}
  onSubmit() {
    const formData = this.splitFormPresenter.saveForm(this.formType);
    if (formData) {
      this.formClose.emit(formData);
    } else {
      return;
    }
  }

  onCancel() {
    this.formClose.emit();
  }
}
