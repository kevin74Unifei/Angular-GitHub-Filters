import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Filter } from './filter.model';
import { Issue } from './issue-list/issue/issue.model';
import { Repository } from './repository-list/repository/repository.model';
import { User } from './user-list/user/user.model';

const GITHUB_API_URL = 'https://api.github.com/search';
const GITHUB_USERS_PATH = '/users';
const GITHUB_REPOSITORIES_PATH = '/repositories';
const GITHUB_ISSUES_PATH = '/issues';
const ITEM_PER_PAGE = 6;
const PAGE_RATE = 6; //page rate is a variable that will set how many pages are taken per request;
@Injectable({
  providedIn: 'root'
})

export class FilterService {

  constructor(private _http: HttpClient) { }

  private getPages(resultPages: number){
    var pages: number = Math.round(resultPages/ITEM_PER_PAGE);
    if(pages * ITEM_PER_PAGE > 1000) //GitHub search api allows only to get the first 1000 results
      pages = 1000/ITEM_PER_PAGE

    return pages;
  }

  private search(query: string, page: string, path: string) {
    var params = new HttpParams()
      .set("q", query.replace(/ /g, '+'))//github api uses + instead of blank space in the query
      .set("page", page)
      .set("per_page", (PAGE_RATE * ITEM_PER_PAGE).toString());

    return this._http.get<Filter>(GITHUB_API_URL + path, {
      params: params
    }).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse){
    return throwError(error);
  }

  searchUser(query: string, page: string){
    return this.search(query, page, GITHUB_USERS_PATH).pipe(map((result)=>{
      var users: User[] = [];
      result.items.forEach((value) => {
        users.push(
          new User(
            value.login, 
            value.avatar_url, 
            value.type, 
            value.html_url));
      });

      return new Filter(
        PAGE_RATE,
        this.getPages(result.total_count),
        users);
    }));
  }

  searchRepository(query: string, page: string){
    return this.search(query, page, GITHUB_REPOSITORIES_PATH).pipe(map((result)=>{
      var repositories: Repository[] = [];
      result.items.forEach((value) => {        
        repositories.push(
          new Repository(
            value.name, 
            value.private, 
            new User(
              value.owner.login, 
              value.owner.avatar_url, 
              value.owner.type, 
              value.owner.html_url),
            value.html_url,
            value.type,
            value.description,
            value.language,
            value.default_branch,
            value.created_at,
            value.updated_at)
          );
        });

      return new Filter(
        PAGE_RATE,
        this.getPages(result.total_count),
        repositories);
    }));
  }

  searchIssue(query: string, page: string){
    return this.search(query, page, GITHUB_ISSUES_PATH).pipe(map((result)=>{
      var issues: Issue[] = [];
      result.items.forEach((value) => {        
        issues.push(
          new Issue(
            value.title, 
            value.state,
            value.html_url,
            value.locked,
            value.created_at,
            value.updated_at,
            new User(
              value.user.login, 
              value.user.avatar_url, 
              value.user.type, 
              value.user.html_url))
          );
        });

      return new Filter(
        PAGE_RATE,
        this.getPages(result.total_count),
        issues);
    }));
  }
}
