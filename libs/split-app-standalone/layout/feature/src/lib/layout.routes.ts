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
    path: 'bills/:id',
    title: 'Bill',
    loadComponent: () =>
      import('@snardev/split-app-standalone/bill/feature').then(
        (m) => m.BillComponent
      ),
  },
  {
    path: '',
    redirectTo: 'bills',
    pathMatch: 'full',
  },
];
