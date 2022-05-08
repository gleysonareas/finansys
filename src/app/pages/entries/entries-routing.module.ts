import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { EntryListComponent } from './entry-list/entry-list.component';

const entryRoutes: Routes = [
  {
    path: '',
    component: EntryListComponent
  },
  {
    path: 'new',
    component: EntryFormComponent
  },
  {
    path: ':id/edit',
    component: EntryFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(entryRoutes)],
  exports: [RouterModule]
})
export class EntriesRoutingModule { }
