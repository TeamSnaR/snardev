import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomepageComponent } from '@snardev/foodie-app/home/feature-homepage';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: HomepageComponent },
    ]),
  ],
})
export class FoodieAppHomeFeatureShellModule {}
