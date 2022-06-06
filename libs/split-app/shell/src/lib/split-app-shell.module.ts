import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { LayoutPageComponent } from './layout-page.component';

export const splitAppShellRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@snardev/split-app/home').then(
            (module) => module.SplitAppHomeModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(splitAppShellRoutes)],
  declarations: [LayoutComponent, LayoutPageComponent],
  exports: [RouterModule],
})
export class SplitAppShellModule {}
