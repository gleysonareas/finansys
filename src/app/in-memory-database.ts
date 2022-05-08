import { InMemoryDbService } from "angular-in-memory-web-api";
import { CategoryModel } from './pages/categories/shared/category.model';
import { EntryModel } from "./pages/entries/shared/entry.model";

export class InMemoryDatabase implements InMemoryDbService {
    createDb() {
        const categories: CategoryModel[] = [
            {
                id: 1,
                name: 'Moradia',
                description: 'Pagamentos de Contas da Casa'
            },
            {
                id: 2,
                name: 'Saúde',
                description: 'Plano de saúde e Remédios'
            },
            {
                id: 3,
                name: 'Lazer',
                description: 'Cinema, parques, praia, etc'
            },
            {
                id: 4,
                name: 'Salário',
                description: 'Recebimento salário'
            },
            {
                id: 5,
                name: 'Freelas',
                description: 'Trabalhos como freelancer'
            },
        ];

        const entries: EntryModel[] = [
            {
                id: 1,
                name: 'Gás de Cozinha',
                categoryId: categories[0].id,
                category: categories[0],
                paid: true,
                date: '14/10/2018',
                amount: '70,80',
                type: 'revenue',
                description: 'test description',
            } as EntryModel,
            {
                id: 2,
                name: 'Academia',
                categoryId: categories[1].id,
                category: categories[1],
                paid: true,
                date: '14/10/2018',
                amount: '70,80',
                type: 'expense',
                description: '',
            } as EntryModel,
            {
                id: 3,
                name: 'Colégio',
                categoryId: categories[2].id,
                category: categories[2],
                paid: true,
                date: '14/10/2018',
                amount: '70,80',
                type: 'expense',
                description: '',
            } as EntryModel,
            {
                id: 4,
                name: 'Combustivel',
                categoryId: categories[3].id,
                category: categories[3],
                paid: true,
                date: '14/10/2018',
                amount: '70,80',
                type: 'expense',
                description: '',
            } as EntryModel,
            {
                id: 5,
                name: 'Plano de Saúde',
                categoryId: categories[4].id,
                category: categories[4],
                paid: true,
                date: '14/10/2018',
                amount: '70,80',
                type: 'expense',
                description: '',
            } as EntryModel,
        ];

        return { categories, entries };
    }
}
