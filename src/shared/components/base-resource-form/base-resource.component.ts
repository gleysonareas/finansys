
import { OnInit, AfterContentChecked, Injector, Directive } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { BaseResourceService } from 'src/shared/services/base-resource.service';
import { BaseResourceModel } from 'src/shared/models/base-resource.model';

@Directive()
export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

    protected route: ActivatedRoute
    protected router: Router
    protected formBuilder: FormBuilder

    public currentAction: string = '';
    public resourceForm: FormGroup = <FormGroup>{};
    public pageTitle: string = '';
    public serverErrorMessages: string[] = [];
    public submittingForm = false;

    constructor(
        protected injector: Injector,
        protected resourceService: BaseResourceService<T>,
        protected jsonDataToResourceFn: (jsonData: any) => T,
        public resource: T,
    ) {
        this.route = this.injector.get(ActivatedRoute);
        this.router = this.injector.get(Router);
        this.formBuilder = this.injector.get(FormBuilder);
    }

    public ngOnInit(): void {
        this.setCurrentAction();
        this.buildResourceForm();
        this.loadResource();
    }

    public ngAfterContentChecked() {
        this.setPageTitle();
    }

    public submitForm() {
        this.submittingForm = true;

        if (this.currentAction == 'new') {
            this.createResource();
        } else {
            this.updateResource();
        }
    }

    protected setCurrentAction() {
        if (this.route.snapshot.url[0].path == 'new') {
            this.currentAction = 'new';
        }
        else {
            this.currentAction = 'edit';
        }
    }

    protected loadResource() {
        if (this.currentAction == 'edit') {
            this.route.paramMap
                .pipe(
                    switchMap(params => this.resourceService
                        .getById(+params.get('id'))
                    )
                )
                .subscribe(
                    (resource) => {
                        this.resource = resource;
                        this.resourceForm.patchValue(resource);
                    },
                    (error) => alert('Ocorreu um erro no servidor, Por favor tente mais tarde'),
                );
        }
    }

    protected setPageTitle() {
        if (this.currentAction == 'new') {
            this.pageTitle = this.creationPageTitle();
        } else {
            this.pageTitle = this.editionPageTitle();
        }
    }

    protected creationPageTitle(): string {
        return 'Novo';
    }

    protected editionPageTitle(): string {
        return 'Edição';
    }

    protected createResource() {
        const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

        this.resourceService
            .create(resource)
            .subscribe(
                resource => this.actionsForSuccess(resource),
                error => this.actionsForError(error)
            );
    }

    protected updateResource() {
        const resource: T = this.jsonDataToResourceFn(this.resourceForm.value)
        this.resourceService
            .update(resource)
            .subscribe(
                resource => this.actionsForSuccess(resource),
                error => this.actionsForError(error)
            );
    }

    protected actionsForError(error: any) {
        // toastr.error('Ocorreu um erro ao processar a solicitação'); //Não está funcionando necessário verificar depois
        this.submittingForm = false;
        if (error.status == 422) {
            this.serverErrorMessages = JSON.parse(error._body).errors;
        } else {
            this.serverErrorMessages = ['Falha na comunicação com o servidor. Por Favor tente mais tarde.'];
        }
    }

    // Redirect and reaload component
    protected actionsForSuccess(resources: T) {
        // toastr.success('Solicitação processada com sucesso');
        const baseComponentPath: string = this.route.snapshot.parent!.url[0].path;
        this.router.navigateByUrl(baseComponentPath, { skipLocationChange: true })
            .then(() => this.router
                .navigate([baseComponentPath, resources.id, 'edit'])
            );
    }

    protected abstract buildResourceForm(): void;
}
