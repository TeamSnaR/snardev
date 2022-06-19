import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { filter, map, concatMap, tap } from 'rxjs';

interface AppLayoutState {
  pageHeading: string;
}

const DEFAULT_STATE: AppLayoutState = {
  pageHeading: '',
};
@Injectable({ providedIn: 'root' })
export class LayoutStore extends ComponentStore<AppLayoutState> {
  pageHeading$ = this.select((s) => s.pageHeading);
  constructor(private router: Router) {
    super(DEFAULT_STATE);
  }

  initPage = this.effect<void>(
    concatMap(() =>
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route: ActivatedRoute = this.router.routerState.root;
          let title = '';
          while (route?.firstChild) {
            route = route.firstChild;
          }
          const routeTitle =
            route.snapshot.data[
              Object.getOwnPropertySymbols(route.snapshot.data)[0]
            ];
          if (routeTitle) {
            title = routeTitle;
          }
          return title;
        }),
        tap((pageHeading) => this.patchState({ pageHeading }))
      )
    )
  );
}
