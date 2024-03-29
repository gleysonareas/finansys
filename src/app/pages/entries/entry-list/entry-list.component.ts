import { EntryModel } from './../shared/entry.model';
import { EntryService } from './../shared/entry.service';

import { Component } from '@angular/core';
import { BaseResourceListComponent } from '../../../../shared/components/base-resource-list/base-resource-list.component';


@Component({
  selector: 'fs-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent extends BaseResourceListComponent<EntryModel> {

  constructor(protected _entryService: EntryService) {
    super(_entryService)
  }
}
