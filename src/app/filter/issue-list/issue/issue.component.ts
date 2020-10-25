import { Component, Input, OnInit } from '@angular/core';
import { Issue } from './issue.model';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {

  @Input() issue: Issue;
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
