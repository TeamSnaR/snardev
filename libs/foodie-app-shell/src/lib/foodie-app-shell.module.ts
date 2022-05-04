import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

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
  declarations: [LayoutComponent],
})
export class FoodieAppShellModule {}
