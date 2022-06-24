import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'snardev-sas-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="py-10">
      <header>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ng-container
            [ngTemplateOutlet]="pageHeadingRef"
            [ngTemplateOutletContext]="{ $implicit: heading }"
          >
          </ng-container>
        </div>
      </header>
      <main>
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div class="px-4 py-8 sm:px-0">
            <ng-content select="[slot=main]"></ng-content>
          </div>
        </div>
      </main>
    </div>
  `,
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
export class PageComponent {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('pageHeading')
  pageHeadingRef!: TemplateRef<any>;
  @Input() heading = '';
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
