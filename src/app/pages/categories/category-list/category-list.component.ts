import { CategoryModel } from './../shared/category.model';
import { CategoryService } from './../shared/category.service';

import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';


@Component({
  selector: 'fs-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: CategoryModel[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories,
      error => alert('Erro ao carregar a lista')
    );
  }

  deleteCategory(category): void {
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if (mustDelete) {
      this.categoryService.delete(category.id).subscribe(
        () => this.categories = this.categories.filter(element => element !== category),
        () => alert('Erro ao tentar Excluir')
      );
    }
  }
}
