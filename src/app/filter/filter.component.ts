import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Filter } from './filter.model';
import { FilterService } from './filter.service';
import { Issue } from './issue/issue.model';
import { Repository } from './repository/repository.model';
import { User } from './user/user.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  isSearched = false;
  isUserSearch = false;
  isRepositorySearch = false;
  isIssueSearch = false;

  value = '';
  userResult:User[] = [];
  repositoryResult: Repository[] = [];
  issueResult: Issue[] = [];

  userPages: number; 
  repositoryPages: number; 
  issuePages:number;
  
  constructor(private _filterService: FilterService) { }

  ngOnInit(): void {
  }

  search(f: NgForm): void{   
    this.value = f.value.search; 
    this.isSearched = true;

    this.searchIssues(1);
    this.searchRepositories(1);
    this.searchUsers(1);
  }

  searchRepositories(currentPage: number): void{
    this.isRepositorySearch = true;
    this._filterService.searchRepository(this.value, currentPage.toString()).subscribe((result: Filter) => {
      this.repositoryPages = result.total_count;
      this.repositoryResult = result.items;
    });

    this.isRepositorySearch = false;
  }

  searchIssues(currentPage: number): void{
    this.isIssueSearch = true;
    this._filterService.searchIssue(this.value, currentPage.toString()).subscribe((result: Filter) => {
      this.issuePages = result.total_count;
      this.issueResult = result.items;
    });

    this.isIssueSearch = false;
  }

  searchUsers(currentPage: number): void{
    this.isUserSearch = true;
    this._filterService.searchUser(this.value, currentPage.toString()).subscribe((result: Filter) => {
      this.userPages = result.total_count;
      this.userResult = result.items;
    });

    this.isUserSearch = false;
  }

}
