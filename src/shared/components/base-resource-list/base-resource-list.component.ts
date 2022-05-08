import { OnInit, Directive } from "@angular/core";
import { BaseResourceService } from "./../../services/base-resource.service"
import { BaseResourceModel } from "./../../models/base-resource.model"

@Directive()
export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

    resources: T[] = [];

    constructor(protected resourceService: BaseResourceService<T>) {
    }

    ngOnInit(): void {
        this.resourceService.getAll().subscribe(
            resources => this.resources = resources.sort((a, b) => b.id - a.id),
            error => alert('Erro ao carregar a lista')
        );
    }
    deleteResource(resource: T): void {
        const mustDelete = confirm('Deseja realmente excluir este item?');

        if (mustDelete) {
            this.resourceService.delete(resource.id as number).subscribe(
                () => this.resources = this.resources.filter(element => element !== resource),
                () => alert('Erro ao tentar Excluir')
            );
        }
    }
}