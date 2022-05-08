import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const ROUTES: Routes = [
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module')
      .then(m => m.CategoriesModule)
  },
  {
    path: 'entries',
    loadChildren: () => import('./pages/entries/entries.module')
      .then(m => m.EntriesModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./pages/reports/reports.module')
      .then(m => m.ReportsModule)
  },

  { path: '', redirectTo: '/reports', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }