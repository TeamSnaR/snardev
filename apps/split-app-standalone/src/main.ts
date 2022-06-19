import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule, TitleStrategy } from '@angular/router';
import { TemplatePageTitleStrategy } from '@snardev/split-app-standalone/layout/feature';

import { SplitAppComponent } from './app/split-app.component';
import { environment } from './environments/environment';

import { HttpClientModule } from '@angular/common/http';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(SplitAppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(
        [
          {
            path: '',
            loadComponent: () =>
              import('@snardev/split-app-standalone/layout/feature').then(
                (m) => m.LayoutComponent
              ),
            loadChildren: () =>
              import('@snardev/split-app-standalone/layout/feature').then(
                (m) => m.LAYOUT_ROUTES
              ),
          },
        ],
        { initialNavigation: 'enabledBlocking', onSameUrlNavigation: 'reload' }
      )
    ),
    {
      provide: TitleStrategy,
      useClass: TemplatePageTitleStrategy,
    },
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(
      StoreModule.forRoot({
        router: routerReducer,
      })
    ),
    importProvidersFrom(StoreRouterConnectingModule.forRoot()),
  ],
}).catch((err) => console.error(err));
