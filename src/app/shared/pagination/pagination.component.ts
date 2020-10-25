import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {

  @Output() currentPage = new EventEmitter<number>();
  @Input() lastPage: number; 
  @Input() active;

  firstPage = 1;
  paginationValues: number[] = []; 

  constructor() { }

  ngOnChanges(): void {
    this.fillPagination();
  }

  changePagination(page: number): void{
    
    if(page < this.firstPage || page > this.lastPage)
      return;

    this.active = page; 
    this.currentPage.emit(this.active);

    this.fillPagination();
  }

  fillPagination(): void{
    this.paginationValues = [];
    
    for(let i = this.active -2; i <= this.active + 2; i++)
      if(i >= this.firstPage && i <= this.lastPage)  
        this.paginationValues.push(i);
  }
}
