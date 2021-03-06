import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { NoBillComponent } from './no-bill.component';
import { SplitFormComponent } from './split-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SplitAppPipesModule } from './per-item-total.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: HomeComponent },
    ]),
    SplitAppPipesModule,
  ],
  declarations: [HomeComponent, NoBillComponent, SplitFormComponent],
})
export class SplitAppHomeModule {}
