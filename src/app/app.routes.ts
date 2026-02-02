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
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/inventory/details/details').then((m) => m.Details),
          },
          {
            path: 'new',
            loadComponent: () => import('./pages/inventory/new/new').then((m) => m.New),
          },
          // {
          //   path: ':id',
          //   loadComponent: () =>
          //     import('./pages/inventory/details/details').then((m) => m.InventoryDetails),
          // },
        ],
      },
      {
        path: 'order',
        loadComponent: () => import('./pages/order/order').then((m) => m.Order),
      },
    ],
  },
  //   {
  //     path: 'auth',
  //     loadComponent: () => import('./auth/login.component'),
  //   },
];
