import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { LayoutPageComponent } from './layout-page.component';

const appRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    data: { title: 'Foodie Fixins' },
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('@snardev/home/feature-shell').then(
            (module) => module.HomeFeatureShellModule
          ),
        data: { title: 'Foodie Fixins - Home' },
      },
      {
        path: 'recipes',
        loadChildren: () =>
          import('@snardev/recipes/feature-shell').then(
            (module) => module.RecipesFeatureShellModule
          ),
        data: { title: 'Foodie Fixins - Recipes' },
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
