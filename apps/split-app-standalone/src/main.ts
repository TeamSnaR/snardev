import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

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
          },
        ],
        { initialNavigation: 'enabledBlocking' }
      )
    ),
  ],
}).catch((err) => console.error(err));
