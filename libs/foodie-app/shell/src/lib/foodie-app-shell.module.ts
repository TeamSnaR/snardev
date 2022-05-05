import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { LayoutPageComponent } from './layout-page.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { SelectivePreloadingStrategyService } from '@snardev/shared/utils/selective-preloading-strategy';

const appRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    data: { title: 'Foodie Fixins' },
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@snardev/foodie-app/home/feature-shell').then(
            (module) => module.FoodieAppHomeFeatureShellModule
          ),
        data: { title: 'Foodie Fixins - Home' },
      },
      {
        path: 'recipes',
        loadChildren: () =>
          import('@snardev/foodie-app/recipes/feature-shell').then(
            (module) => module.FoodieAppRecipesFeatureShellModule
          ),
        data: { title: 'Foodie Fixins - Recipes', preload: true },
      },
      {
        path: 'shopping-list',
        loadChildren: () =>
          import('@snardev/foodie-app/shopping-list/feature-shell').then(
            (module) => module.FoodieAppShoppingListFeatureShellModule
          ),
        data: { title: 'Foodie Fixins - Shopping List' },
      },
      {
        path: 'favorites',
        loadChildren: () =>
          import('@snardev/foodie-app/favorites/feature-shell').then(
            (module) => module.FoodieAppFavoritesFeatureShellModule
          ),
        data: { title: 'Foodie Fixins - Favorites' },
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { title: 'Foodie Fixins - Page Not Found' },
  },
];

const routingSettings: ExtraOptions = {
  initialNavigation: 'enabledBlocking',
  scrollPositionRestoration: 'top',
  paramsInheritanceStrategy: 'always',
  preloadingStrategy: SelectivePreloadingStrategyService,
};

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(appRoutes, routingSettings)],
  exports: [RouterModule],
  declarations: [LayoutComponent, LayoutPageComponent, PageNotFoundComponent],
})
export class FoodieAppShellModule {}
