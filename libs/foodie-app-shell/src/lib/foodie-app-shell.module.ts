import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { LayoutPageComponent } from './layout-page.component';

const appRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('@snardev/home/feature-shell').then(
            (module) => module.HomeFeatureShellModule
          ),
        data: { title: 'Home' },
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
    ],
  },
];

const routingSettings: ExtraOptions = {
  initialNavigation: 'enabledBlocking',
  scrollPositionRestoration: 'top',
  paramsInheritanceStrategy: 'always',
};

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(appRoutes, routingSettings)],
  exports: [RouterModule],
  declarations: [LayoutComponent, LayoutPageComponent],
})
export class FoodieAppShellModule {}
