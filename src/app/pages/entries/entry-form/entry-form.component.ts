import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { EntryService } from './../shared/entry.service';
import { EntryModel } from '../shared/entry.model';
import { CategoryModel } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';
import { BaseResourceFormComponent } from '../../../../shared/components/base-resource-form/base-resource.component';

@Component({
  selector: 'fs-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})

export class EntryFormComponent extends BaseResourceFormComponent<EntryModel> implements OnInit {

  public categories: Array<CategoryModel>;
  public imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalmenteZeros: true,
    radix: ','
  };
  public ptBR = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
    dasNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dasNamesShortMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
    ],
    monthNamesShort: [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
    ],
    today: 'Hoje',
    clear: 'Limpar'
  };

  constructor(
    protected entryService: EntryService,
    protected categoryService: CategoryService,
    protected injector: Injector,
  ) {
    super(injector, entryService, EntryModel.fromJson, new EntryModel());
  }

  public ngOnInit(): void {
    this.loadCategories();
    super.ngOnInit();
  }

  public get typeOptions(): Array<any> {
    return Object.entries(EntryModel.types)
      .map(([value, text]) => {
        return {
          value: value,
          text: text
        }
      })
  }

  private loadCategories() {
    this.categoryService.getAll().subscribe(
      category => this.categories = category,
    );
  }

  protected creatingPageTitle(): string {
    return "Cadastro de novo lançamento";
  }

  protected editionPageTitle(): string {
    const resourceName = this.resource.name || "";
    return "Editando lançamento: " + resourceName;
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: ['expense', [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [true, [Validators.required]],
      categoryId: [null, [Validators.required]],
    });
  }
}
