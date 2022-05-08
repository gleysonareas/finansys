import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';
import { ServerErrorMessageComponent } from './components/server-error-message/server-error-message.component';

export const sharedComponents = [
  BreadCrumbComponent,
  PageHeaderComponent,
  FormFieldErrorComponent,
  ServerErrorMessageComponent,
];

export const sharedExternalModules = [
  CommonModule,
  ReactiveFormsModule,
  RouterModule
];

@NgModule({
  declarations: [
    ...sharedComponents,
  ],
  imports: [
    ...sharedExternalModules,

  ],
  exports: [
    ...sharedExternalModules,
    ...sharedComponents,
  ]
})

export class SharedModule { }
