import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShoppingListComponent } from '@snardev/foodie-app/shopping-list/feature-list';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ShoppingListComponent },
    ]),
  ],
})
export class FoodieAppShoppingListFeatureShellModule {}
