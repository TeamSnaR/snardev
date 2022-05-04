import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
  ],
  exports: [RouterModule],
})
export class FoodieAppShellModule {}
