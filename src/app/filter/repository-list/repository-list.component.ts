import { Component, Input, OnChanges } from '@angular/core';
import { Filter } from '../filter.model';
import { FilterService } from '../filter.service';
import { Repository } from './repository/repository.model';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss']
})
export class RepositoryListComponent implements OnChanges {

  @Input() searchValue = '';
  
  isRepositorySearch = false;
  error = false;
  repositoryPages: number; 
  currentPage: number;
  repositories: Repository[] = [];
  
  private _repositoriesResult:Repository[] = [];
  private _pageRate: number;
  private _pageInit: number;

  constructor(private _filterService: FilterService) { }

  ngOnChanges(): void {
    this.searchRepositories(1);
  }

  searchRepositories(currentPage: number): void{
    this.isRepositorySearch = true;
    this.error = false;
    
    this._filterService.searchRepository(this.searchValue, currentPage.toString()).subscribe((result: Filter) => {
      this.repositoryPages = result.total_count;
      this._repositoriesResult = result.items;
      this._pageRate = result.page_rate;
      this._pageInit = currentPage;

      this.updateScreenRepositories(currentPage);
      this.isRepositorySearch = false;
    }, error => {
      this.error = true;
      this.isRepositorySearch = false;
    });
  }

  updateScreenRepositories(page: number):void {
    this.repositories = this._repositoriesResult.filter((repository, index) => {
      var currentPage = this._pageRate - (this._pageRate + this._pageInit - page -1);
      //currentPage is the page within da data. Example: the code is at page 10, with a page rate of 5, 
      //then the code is at the fith data page, so looking at the calculations above: 5 - 5 + 6 - 10 -1 = 5

      if(index >= (currentPage-1) * this._pageRate && index < currentPage * this._pageRate){          
        return repository; 
      }
    });

    this.currentPage = page;
  }

  selectPage(page: number): void {
    if(page >= this._pageInit && page < this._pageRate + this._pageInit && page <= this.repositoryPages){
      this.updateScreenRepositories(page);
    }else{
      this.searchRepositories(page);
    }
  }

}
