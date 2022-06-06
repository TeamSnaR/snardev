import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { SplitStore } from '@snardev/split-app/shared/data-access';
import { Addendum, Bill, BillItem, FormType } from '@snardev/split-app/domain';

@Component({
  selector: 'snardev-split-app-home-home',
  templateUrl: './home.component.html',
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
export class HomeComponent {
  readonly vm$ = this.splitStore.vm$;
  constructor(private readonly splitStore: SplitStore) {}

  createBill() {
    this.splitStore.openModal('bill');
  }

  editBill() {
    this.splitStore.openModal('bill');
  }

  resetBill() {
    this.splitStore.resetBill();
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

  toggleOptions() {
    this.splitStore.toggleOptions();
  }

  manageItem(id: string) {
    this.splitStore.openModal('item', id);
  }

  manageAddendum(id: string) {
    this.splitStore.openModal('charge', id);
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

  onRemoveItem(payload: { id: string; formType: FormType }) {
    this.splitStore.removeItem(payload);
  }

  trackByIndex(index: number, item: BillItem | Addendum) {
    return item.id;
  }
}
