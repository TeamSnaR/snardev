import { Routes } from '@angular/router';

export const LAYOUT_ROUTES: Routes = [
  {
    path: 'bills',
    title: 'Bills',
    loadComponent: () =>
      import('@snardev/split-app-standalone/bills/feature').then(
        (m) => m.BillsComponent
      ),
  },
  {
    path: '',
    redirectTo: 'bills',
    pathMatch: 'full',
  },
];
