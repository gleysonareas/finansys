import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

import { EntriesRoutingModule } from './entries-routing.module';
// import { ReactiveFormsModule } from '@angular/forms';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { CalendarModule } from 'primeng/calendar';
import { IMaskModule } from 'angular-imask';
import { SharedModule } from 'src/shared/shared.module';


@NgModule({
  declarations: [
    EntryListComponent,
    EntryFormComponent,
  ],
  imports: [
    SharedModule,
    EntriesRoutingModule,
    CalendarModule,
    IMaskModule
  ]
})
export class EntriesModule { }
