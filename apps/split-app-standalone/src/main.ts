import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule, TitleStrategy } from '@angular/router';
import { TemplatePageTitleStrategy } from '@snardev/split-app-standalone/layout/feature';

import { SplitAppComponent } from './app/split-app.component';
import { environment } from './environments/environment';

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
        { initialNavigation: 'enabledBlocking' }
      )
    ),
    {
      provide: TitleStrategy,
      useClass: TemplatePageTitleStrategy,
    },
  ],
}).catch((err) => console.error(err));
