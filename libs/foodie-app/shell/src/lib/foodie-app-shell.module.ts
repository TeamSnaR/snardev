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
          import('@snardev/foodie-app-home-feature-shell').then(
            (module) => module.FoodieAppHomeFeatureShellModule
          ),
        data: { title: 'Foodie Fixins - Home' },
      },
      {
        path: 'recipes',
        loadChildren: () =>
          import('@snardev/foodie-app-recipes-feature-shell').then(
            (module) => module.FoodieAppRecipesFeatureShellModule
          ),
        data: { title: 'Foodie Fixins - Recipes' },
      },
      {
        path: 'shopping-list',
        loadChildren: () =>
          import('@snardev/foodie-app-shopping-list-feature-shell').then(
            (module) => module.FoodieAppShoppingListFeatureShellModule
          ),
        data: { title: 'Foodie Fixins - Shopping List' },
      },
      {
        path: 'favorites',
        loadChildren: () =>
          import('@snardev/favorites/feature-shell').then(
            (module) => module.FavoritesFeatureShellModule
          ),
        data: { title: 'Foodie Fixins - Favorites' },
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
