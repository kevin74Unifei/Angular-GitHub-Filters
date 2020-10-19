import { Component, Input, OnInit } from '@angular/core';
import { Repository } from './repository.model';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {

  @Input() repository: Repository;

  constructor() { }

  ngOnInit(): void {
  }

}
