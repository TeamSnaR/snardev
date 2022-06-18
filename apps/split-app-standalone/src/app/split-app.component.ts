import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  selector: 'sas-split-app-root',
  standalone: true,
  imports: [CommonModule, NxWelcomeComponent],
  template: ` <sas-nx-welcome></sas-nx-welcome> `,
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
export class SplitAppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
