import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { LayoutPageStore } from './layout-page.store';

@Component({
  selector: 'snardev-layout-page',
  template: `
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <h1 class="text-lg leading-6 font-semibold text-gray-900">
          {{ pageTitle$ | async }}
        </h1>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Replace with your content -->
        <div class="px-4 py-4 sm:px-0">
          <ng-content></ng-content>
        </div>
        <!-- /End replace -->
      </div>
    </main>
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
export class LayoutPageComponent {
  public pageTitle$ = this.layoutPageStore.pageTitle$;

  constructor(private readonly layoutPageStore: LayoutPageStore) {
    this.layoutPageStore.getPageTitle();
  }
}
