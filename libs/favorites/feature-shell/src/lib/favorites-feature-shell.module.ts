import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FavoritesListComponent } from '@snardev/favorites/feature-list';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: FavoritesListComponent },
    ]),
  ],
})
export class FavoritesFeatureShellModule {}
