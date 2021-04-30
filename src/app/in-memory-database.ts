import { InMemoryDbService } from "angular-in-memory-web-api";

import { CategoryModel } from './pages/categories/shared/category.model';

export class InMemoryDatabase implements InMemoryDbService {
    createDb() {
        const categories: CategoryModel[] = [
            { id: 1, name: 'Moradia', description: 'Pagamentos de Contas da Casa' },
        ];

        return { categories };
    }
}
