import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormType, BillItem, Addendum, Bill } from '@snardev/split-app/domain';
import { SplitFormPresenter } from './split-form.presenter';

@Component({
  selector: 'snardev-split-app-home-split-form',
  templateUrl: './split-form.component.html',
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
export class SplitFormComponent {
  @Input()
  currency!: string;
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
  }
  get formType() {
    return this._formType;
  }
  private _formData: BillItem | Addendum | Bill | null = null;
  @Input()
  set formData(value: BillItem | Addendum | Bill | null) {
    this._formData = value;

    this.splitFormPresenter.createForm(this._formType, value);
  }
  get formData() {
    return this._formData;
  }
  @Output()
  formClose = new EventEmitter<BillItem | Addendum | Bill | null>();
  @Output()
  removeItem = new EventEmitter<{ id: string; formType: FormType }>();
  get splitForm() {
    return this.splitFormPresenter.splitForm;
  }

  get currencies() {
    return this.splitFormPresenter.currencies;
  }

  constructor(private readonly splitFormPresenter: SplitFormPresenter) {}
  onRemoveItem() {
    if (this.formData) {
      this.removeItem.emit({ id: this.formData.id, formType: this.formType });
    }
  }
  onSubmit() {
    const formData = this.splitFormPresenter.saveForm(
      this.formType,
      this.formData
    );
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
