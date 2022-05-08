import { BaseResourceModel } from "../../../../shared/models/base-resource.model";

export class CategoryModel extends BaseResourceModel {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string
    ) {
        // essa function super sempre vai ser necessário adicionar em casos onde estamos extendendo uma class,
        // para que ela referencie o constructor da class a qual extend.
        super();
    }

    static fromJson(jsonData: any): CategoryModel {
        return Object.assign(new CategoryModel(), jsonData);
      }
}
