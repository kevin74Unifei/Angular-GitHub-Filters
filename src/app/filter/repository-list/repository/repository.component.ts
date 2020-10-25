import { Component, Input, OnInit } from '@angular/core';
import { Repository } from './repository.model';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {

  @Input() repository: Repository;
  photo: string; 
  constructor() { }

  ngOnInit(): void {
    this.getRandomPhoto();
  }

  getRandomPhoto(){
    var number = Math.floor((Math.random() * 12) + 1);
    this.photo = 'assets/img/' + number + '.jpg';
  }

}
