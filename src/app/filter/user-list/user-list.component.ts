import { Component, Input, OnChanges } from '@angular/core';
import { Filter } from '../filter.model';
import { FilterService } from '../filter.service';
import { User } from './user/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnChanges {

  @Input() searchValue = '';

  isUserSearch = false;
  error = false;

  userPages: number; 
  currentPage: number;
  users: User[] = [];

  private _usersResult:User[] = [];
  private _pageRate: number;
  private _pageInit: number;

  constructor(private _filterService: FilterService) { }

  ngOnChanges(): void {
    this.searchUsers(1);
  }

  searchUsers(currentPage: number): void{
    this.isUserSearch = true;
    this.error = false; 

    this._filterService.searchUser(this.searchValue, currentPage.toString()).subscribe((result: Filter) => {
      this.userPages = result.total_count;
      this._pageRate = result.page_rate;
      this._pageInit = currentPage;
      this._usersResult = result.items;

      this.updateScreenUsers(currentPage);
      this.isUserSearch = false;
    }, error => {
      this.error = true;
      this.isUserSearch = false;
    });
  }

  updateScreenUsers(page: number):void {
    this.users = this._usersResult.filter((user, index) => {
      var currentPage = this._pageRate - (this._pageRate + this._pageInit - page -1);
      //currentPage is the page within da data. Example: the code is at page 10, with a page rate of 5, 
      //then the code is at the fith data page, so looking at the calculations above: 5 - 5 + 6 - 10 -1 = 5

      if(index >= (currentPage-1) * this._pageRate && index < currentPage * this._pageRate){          
        return user; 
      }
    });

    this.currentPage = page;
  }

  selectPage(page: number): void {
    if(page >= this._pageInit && page < this._pageRate + this._pageInit && page <= this.userPages){
      this.updateScreenUsers(page);
    }else{
      this.searchUsers(page);
    }
  }
}
