import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterComponent } from './filter/filter.component';
import { FilterListComponent } from './filter/filter-list/filter-list.component';
import { UserComponent } from './filter/user/user.component';
import { RepositoryComponent } from './filter/repository/repository.component';
import { IssueComponent } from './filter/issue/issue.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TruncateTextPipe } from './shared/truncate-text/truncate-text.pipe';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { HeaderComponent } from './header/header.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    FilterListComponent,
    UserComponent,
    RepositoryComponent,
    IssueComponent,
    TruncateTextPipe,
    PaginationComponent,
    HeaderComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
