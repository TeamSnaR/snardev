import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecipesListComponent } from '@snardev/foodie-app/recipes/feature-list';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: RecipesListComponent },
    ]),
  ],
})
export class FoodieAppRecipesFeatureShellModule {}
