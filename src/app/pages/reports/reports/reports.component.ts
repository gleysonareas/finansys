import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CategoryModel } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';
import { EntryModel } from '../../entries/shared/entry.model';
import { EntryService } from '../../entries/shared/entry.service';
import currencyFormatter from 'currency-formatter';

@Component({
  selector: 'fs-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  expenseTotal: any = 0;
  revenueTotal: any = 0;
  balance: any = 0;

  expenseChartData: any;
  revenueChartData: any;
  chartOptions = {
    scales: {
      yAxis: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  categories: CategoryModel[] = []
  entries: EntryModel[] = []

  @ViewChild('month')
  month: ElementRef = <ElementRef>{};

  @ViewChild('year')
  year: ElementRef = <ElementRef>{};


  constructor(
    private entryService: EntryService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.categoryService.getAll()
      .subscribe(categories => this.categories = categories);
  }

  public generateReports(): void {
    let month = this.month.nativeElement.value;
    let year = this.year.nativeElement.value;
    if (!month || !year) {
      alert('Você precisa selecionar o Mês e Ano para gerar os relatórios');
    } else {
      this.entryService.getByMonthAndYear(month, year).subscribe(this.setValues.bind(this));
    }
  }

  private setValues(entries: EntryModel[]) {
    this.entries = entries;
    this.calculateBalance();
    this.setChartData();
  }

  private calculateBalance() {
    let expenseTotal = 0;
    let revenueTotal = 0;

    this.entries.forEach(entry => {
      if (entry.type == 'revenue') {
        revenueTotal += currencyFormatter.unformat(entry.amount, { code: 'BRL' });
      }
      else {
        expenseTotal += currencyFormatter.unformat(entry.amount, { code: 'BRL' });
      }
    });
    this.expenseTotal = currencyFormatter.format(expenseTotal, { code: 'BRL' });
    this.revenueTotal = currencyFormatter.format(revenueTotal, { code: 'BRL' });
    this.balance = currencyFormatter.format(revenueTotal - expenseTotal, { code: 'BRL' });
  }

  private setChartData() {
    this.revenueChartData = this.getChartData('revenue', "Grafico de Receitas", "#9ccc65");
    this.expenseChartData = this.getChartData('expense', "Grafico de Despesas", "#e03131");
  }

  public getChartData(entryType: string, title: string, color: string) {
    let chartData: { categoryName: string | undefined; totalAmount: number; }[] = [];
    this.categories.forEach(category => {
      let filteredEntries = this.entries.filter(
        entry => ((entry.categoryId == category.id) && (entry.type == entryType)),
      );
      if (filteredEntries.length > 0) {
        let totalAmount = filteredEntries.reduce(
          (total, entry) => total + currencyFormatter.unformat(entry.amount, { code: 'BRL' }), 0
        );

        chartData.push({
          categoryName: category.name,
          totalAmount: totalAmount
        });
      }
    });

    return {
      labels: chartData.map(item => item.categoryName),
      datasets: [{
        label: title,
        backgroundColor: color,
        data: chartData.map(item => item.totalAmount)
      }],
    }
  }

}
