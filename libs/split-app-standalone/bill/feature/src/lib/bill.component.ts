import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillStore } from './bill.store';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  BillGrandTotalPipe,
  BillSubtotalPipe,
  ItemChargePipe,
  ItemTotalPipe,
} from '@snardev/split-app-standalone/shared/utils-bill-pipes';

@Component({
  selector: 'snardev-sas-bill',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ItemTotalPipe,
    BillSubtotalPipe,
    BillGrandTotalPipe,
    ItemChargePipe,
  ],
  templateUrl: './bill.component.html',
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
export class BillComponent {
  vm$ = this.store.vm$;
  constructor(
    private readonly store: BillStore,
    private route: ActivatedRoute
  ) {
    this.store.initPage();
  }

  editBill() {
    console.log('edit bill');
  }

  addItem() {
    console.log('add item');
  }

  toggleOptions() {
    console.log('toggle options');
  }

  addExtraCharge() {
    console.log('add extra charge');
  }

  addDiscount() {
    console.log('add discount');
  }

  manageItem(id: string) {
    console.log(`manage item ${id}`);
  }

  manageAddendum(id: string) {
    console.log(`manage addendum ${id}`);
  }

  trackByBillItemId(index: number, item: any) {
    return item.id;
  }

  trackByAddendumId(index: number, item: any) {
    return item.id;
  }
}
