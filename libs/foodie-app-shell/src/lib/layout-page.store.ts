import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { concatMapTo, filter, map, tap } from 'rxjs';

export interface LayoutPageState {
  pageTitle: string;
}

const DEFAULT_STATE = {
  pageTitle: '',
};

@Injectable({ providedIn: 'any' })
export class LayoutPageStore extends ComponentStore<LayoutPageState> {
  public readonly pageTitle$ = this.select((state) => state.pageTitle);
  constructor(
    private readonly titleService: Title,
    private readonly router: Router
  ) {
    super(DEFAULT_STATE);
  }

  public readonly getPageTitle = this.effect<void>(
    concatMapTo(
      this.router.events.pipe(
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
        }),
        tap({
          next: (pageTitle) => {
            this.titleService.setTitle(pageTitle);
            this.patchState({
              pageTitle: pageTitle.substring(pageTitle.indexOf('-') + 1),
            });
          },
          error: (err) => console.log(err),
        })
      )
    )
  );
}
