import { CategoryService } from './../shared/category.service';
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { CategoryModel } from '../shared/category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { toastr } from 'toastr';

@Component({
  selector: 'fs-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  currentAction: string;
  categoryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm = false;
  category: CategoryModel = new CategoryModel();

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterContentChecked() {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;

    if (this.currentAction === 'new') {
      this.createCategory();
    } else {
      this.updateCategory();
    }
  }



  private setCurrentAction() {
    if (this.route.snapshot.url[0].path === 'new') {
      this.currentAction = 'new';
    }
    else {
      this.currentAction = 'edit';
    }
  }

  private buildCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    });
  }

  private loadCategory() {
    if (this.currentAction === 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.categoryService.getById(+params.get('id')))
      ).subscribe(
        (category) => {
          this.category = category;
          this.categoryForm.patchValue(category);
        },
        (error) => alert('Ocorreu um erro no servidor, Por favor tente mais tarde'),
      );
    }
  }

  private setPageTitle() {
    if (this.currentAction === 'new') {
      this.pageTitle = 'Cadastro de Nova Categoria';
    } else {
      const categoryName = this.category.name || '';
      this.pageTitle = 'Editando Categoria: ' + categoryName;
    }
  }


  private createCategory() {
    const category: CategoryModel = Object.assign(new CategoryModel(), this.categoryForm.value);

    this.categoryService.create(category)
      .subscribe(
        category => this.actionsForSuccess(category),
        error => this.actionsForError(error)
      );
  }

  private updateCategory() {
    const category: CategoryModel = Object.assign(new CategoryModel(), this.categoryForm.value);
    this.categoryService.update(category)
      .subscribe(
        category => this.actionsForSuccess(category),
        error => this.actionsForError(error)
      );
  }

  private actionsForError(error: any) {
    toastr.error('Ocorreu um erro ao processar a solicitação');

    this.submittingForm = false;

    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = ['Falha na comunicação com o servidor. Por Favor tente mais tarde.'];
    }
  }

  // Redirect and reaload component
  private actionsForSuccess(category: CategoryModel) {
    toastr.success('Solicitação processada com sucesso');

    this.router.navigateByUrl('categories', { skipLocationChange: true }).then(
      () => this.router.navigate(['categories', category.id, 'edit'])
    );
  }
}
