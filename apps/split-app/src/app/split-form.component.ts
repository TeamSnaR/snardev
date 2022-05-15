import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Addendum, Bill, BillItem } from './models';
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

  editBill() {
    this.splitStore.openModal('bill');
  }

  addItem() {
    this.splitStore.openModal();
  }

  addExtraCharge() {
    this.splitStore.openModal('charge');
  }

  addDiscount() {
    this.splitStore.openModal('discount');
  }

  onCloseModal(payload: BillItem | Addendum | Bill | null) {
    if (!payload) {
      this.splitStore.closeModal();
    } else {
      if ((payload as BillItem).price !== undefined) {
        this.splitStore.saveBillItem(payload as BillItem);
      } else if ((payload as Addendum).rate !== undefined) {
        this.splitStore.saveAddendum(payload as Addendum);
      } else if ((payload as Bill).items !== undefined) {
        this.splitStore.saveBill(payload as Bill);
      }
    }
  }
}
