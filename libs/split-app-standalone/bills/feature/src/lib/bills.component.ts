import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'snardev-sas-bills',
  standalone: true,
  imports: [CommonModule],
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
export class BillsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
