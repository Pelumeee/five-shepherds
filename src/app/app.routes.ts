import { Routes } from '@angular/router';
import { Layout } from './pages/layout/layout';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    // children: [
    //   { path: '', loadComponent: () => import('./dashboard.component') },
    //   { path: 'inventory', loadChildren: () => import('./inventory.routes') },
    // ],
  },
//   {
//     path: 'auth',
//     loadComponent: () => import('./auth/login.component'),
//   },
];
