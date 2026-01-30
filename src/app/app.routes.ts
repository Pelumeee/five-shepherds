import { Routes } from '@angular/router';
import { Layout } from './pages/layout/layout';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'inventory',
        loadComponent: () => import('./pages/inventory/inventory').then((m) => m.Inventory),
      },
    ],
  },
  //   {
  //     path: 'auth',
  //     loadComponent: () => import('./auth/login.component'),
  //   },
];
