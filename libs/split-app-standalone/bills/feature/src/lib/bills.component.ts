import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { BillsStore } from './bills.store';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'snardev-sas-bills',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bills.component.html',
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
export class BillsComponent {
  vm$ = this.store.vm$;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private readonly store: BillsStore) {
    this.store.loadBills();
  }

  trackByBillId(index: number, bill: any) {
    return bill.id;
  }
}
