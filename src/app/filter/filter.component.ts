import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  isSearched = false;
  searchValue = '';
  
  constructor() { }

  ngOnInit(): void {
  }

  search(f: NgForm): void{   
    this.searchValue = f.value.search; 
    this.isSearched = true;
  }

}
