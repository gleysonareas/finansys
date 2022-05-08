import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'fs-form-field-error',
  template: `
    <p class='text-danger'>
      {{errorMessage}}
    </p>
  `,
  styleUrls: ['./form-field-error.component.css']
})
export class FormFieldErrorComponent implements OnInit {

  @Input('form-control')
  public formControl: FormControl = <FormControl>{}

  public get errorMessage(): string | undefined {
    if (this.mustShowErrorMessage())
      return this.getErrorMessage();
    else
      return undefined;
  }

  constructor() { }

  ngOnInit(): void {
  }

  private mustShowErrorMessage(): boolean {
    return this.formControl.invalid && this.formControl.touched
  }

  private getErrorMessage(): string | any{
    if (this.formControl.errors!['required'])
      return "Dado obrigatório";

    else if (this.formControl.errors!['email'])
      return "Formato de email invalido";

    else if (this.formControl.errors!['minlength']) {
      const requiredLength = this.formControl.errors!['minlength'].requiredLength;
      return `Deve ter no minimo ${requiredLength} caracteres`;
    }

    else if (this.formControl.errors!['maxlength']) {
      const requiredLength = this.formControl.errors!['maxlength'].requiredLength;
      return `Deve ter no maximo ${requiredLength} caracteres`;
    }
  }

}
