import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FilterComponent } from './filter/filter.component';
import { UserComponent } from './filter/user-list/user/user.component';
import { RepositoryComponent } from './filter/repository-list/repository/repository.component';
import { IssueComponent } from './filter/issue-list/issue/issue.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TruncateTextPipe } from './shared/truncate-text/truncate-text.pipe';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { HeaderComponent } from './header/header.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { UserListComponent } from './filter/user-list/user-list.component';
import { RepositoryListComponent } from './filter/repository-list/repository-list.component';
import { IssueListComponent } from './filter/issue-list/issue-list.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    UserComponent,
    RepositoryComponent,
    IssueComponent,
    TruncateTextPipe,
    PaginationComponent,
    HeaderComponent,
    SpinnerComponent,
    UserListComponent,
    RepositoryListComponent,
    IssueListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
