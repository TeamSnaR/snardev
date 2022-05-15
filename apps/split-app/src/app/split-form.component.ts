import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Addendum, BillItem, BillItemFormModel } from './models';
import { SplitStore } from './split.store.service';

@Component({
  selector: 'snardev-split-form',
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
})
export class SplitFormComponent {
  readonly vm$ = this.splitStore.vm$;
  constructor(private readonly splitStore: SplitStore) {}

  addItem() {
    this.splitStore.openModal();
  }

  addExtraCharge() {
    this.splitStore.openModal('charge');
  }

  addDiscount() {
    this.splitStore.openModal('discount');
  }

  onCloseModal(payload: BillItem | Addendum | null) {
    if (!payload) {
      this.splitStore.closeModal();
    } else {
      if ((payload as BillItem).price !== undefined) {
        this.splitStore.saveBillItem(payload as BillItem);
      } else if ((payload as Addendum).rate !== undefined) {
        this.splitStore.saveAddendum(payload as Addendum);
      }
    }
  }
}
