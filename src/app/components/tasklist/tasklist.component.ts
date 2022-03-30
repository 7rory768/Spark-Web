import { Component, Input, OnInit } from '@angular/core';
import { TaskList } from 'src/app/objects/tasklist';
import { Task } from 'src/app/objects/task';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss'],
})
export class TaskListComponent implements OnInit {
  @Input() taskList?: TaskList;

  constructor() {}

  ngOnInit(): void {
    // TODO: Figure out how to pass task selection up to project?
  }
}
