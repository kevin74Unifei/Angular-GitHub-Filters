import { Component, Input, OnChanges } from '@angular/core';
import { Filter } from '../filter.model';
import { FilterService } from '../filter.service';
import { Issue } from './issue/issue.model';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss']
})
export class IssueListComponent implements OnChanges {

  @Input() searchValue = '';

  isIssueSearch = false;
  error = false;
  issues: Issue[] = [];
  issuePages:number;
  currentPage: number;

  private _issuesResult:Issue[] = [];
  private _pageRate: number;
  private _pageInit: number;
  
  constructor(private _filterService: FilterService) { }

  ngOnChanges(): void {
    this.searchIssues(1);
  }

  searchIssues(currentPage: number): void{
    this.isIssueSearch = true;
    this.error = false;

    this._filterService.searchIssue(this.searchValue, currentPage.toString()).subscribe((result: Filter) => {
      this.issuePages = result.total_count;
      this._pageRate = result.page_rate;
      this._pageInit = currentPage;
      this._issuesResult = result.items;

      this.updateScreenIssues(currentPage);
      this.isIssueSearch = false;
    }, error => {
      this.error = true;
      this.isIssueSearch = false;
    });
  }

  updateScreenIssues(page: number):void {
    this.issues = this._issuesResult.filter((issue, index) => {
      var currentPage = this._pageRate - (this._pageRate + this._pageInit - page -1);
      //currentPage is the page within da data. Example: the code is at page 10, with a page rate of 5, 
      //then the code is at the fith data page, so looking at the calculations above: 5 - 5 + 6 - 10 -1 = 5

      if(index >= (currentPage-1) * this._pageRate && index < currentPage * this._pageRate){          
        return issue; 
      }
    });

    this.currentPage = page;
  }

  selectPage(page: number): void {
    if(page >= this._pageInit && page < this._pageRate + this._pageInit && page <= this.issuePages){
      this.updateScreenIssues(page);
    }else{
      this.searchIssues(page);
    }
  }
}
