import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { BillItem, BillItemFormModel } from './models';
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
    this.splitStore.addItem();
  }

  onCloseModal(payload: BillItem | null) {
    if (!payload) {
      this.splitStore.closeModal();
    } else {
      this.splitStore.saveBillItem(payload);
    }
  }
}
