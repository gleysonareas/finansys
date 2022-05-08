import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { CategoryService } from './../shared/category.service';
import { CategoryModel } from '../shared/category.model';
import { BaseResourceFormComponent } from '../../../../shared/components/base-resource-form/base-resource.component';

@Component({
  selector: 'fs-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent extends BaseResourceFormComponent<CategoryModel> {

  constructor(
    protected categoryService: CategoryService,
    protected injector: Injector
  ) {
    super(injector, categoryService, CategoryModel.fromJson, new CategoryModel())
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    });
  }

  protected creatingPageTitle(): string {
    return "Cadastro de nova categoria";
  }

  protected editionPageTitle(): string {
    const categoryName = this.resource.name || "";
    return "Editando categoria: " + categoryName;
  }
}
