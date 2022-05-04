import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  BehaviorSubject,
  filter,
  interval,
  map,
  Observable,
  of,
  Subject,
  tap,
} from 'rxjs';

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
  routerEvent$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map(() => {
      let route: ActivatedRoute = this.router.routerState.root;

      let routeTitle = '';
      while (route?.firstChild) {
        route = route.firstChild;
      }
      if (route.snapshot.data['title']) {
        routeTitle = route?.snapshot.data['title'];
      }
      return routeTitle;
    })
  );
  public pageTitle$ = new BehaviorSubject<string>('');

  constructor(
    private readonly router: Router,
    private readonly titleService: Title
  ) {
    this.routerEvent$.subscribe((routeTitle) => {
      if (routeTitle) {
        this.titleService.setTitle(routeTitle);
        this.pageTitle$.next(routeTitle);
      }
    });
  }
}
