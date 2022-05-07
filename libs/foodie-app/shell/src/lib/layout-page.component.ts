import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { routeSlideInAnimation } from '@snardev/shared/utils/route-slide-in-animation';
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
    <main class="h-screen">
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-4 sm:px-0">
          <div [@routeAnimation]="getAnimationData()">
            <ng-content></ng-content>
          </div>
        </div>
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
  animations: [routeSlideInAnimation],
})
export class LayoutPageComponent {
  public pageTitle$ = this.layoutPageStore.pageTitle$;

  constructor(
    private readonly layoutPageStore: LayoutPageStore,
    private readonly contexts: ChildrenOutletContexts
  ) {
    this.layoutPageStore.getPageTitle();
  }

  getAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }
}
