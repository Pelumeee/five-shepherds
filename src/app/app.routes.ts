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
            path: 'product',
            loadComponent: () => import('./pages/inventory/product/product').then((m) => m.Product),
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
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/settings-layout/settings-layout').then((m) => m.SettingsLayout),
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/settings-layout/account/account').then((m) => m.Account),
          },
          {
            path: 'team',
            loadComponent: () => import('./pages/settings-layout/team/team').then((m) => m.Team),
          },
          {
            path: 'preferences',
            loadComponent: () => import('./pages/settings-layout/preferences/preferences').then((m) => m.Preferences),
          },
        ],
      },
    ],
  },
  //   {
  //     path: 'auth',
  //     loadComponent: () => import('./auth/login.component'),
  //   },
];
