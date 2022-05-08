import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
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
  readonly billExtraCharges$ = this.splitStore.billExtraCharges$;
  constructor(private readonly splitStore: SplitStore) {}
}
