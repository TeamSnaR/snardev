import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '@snardev/split-app-standalone/layout/feature';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'sas-split-app-root',
  standalone: true,
  imports: [CommonModule, LayoutComponent, RouterModule],
  template: ` <router-outlet></router-outlet> `,
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
export class SplitAppComponent {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
