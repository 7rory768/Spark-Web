import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskList } from 'src/app/objects/tasklist';
import { Task } from 'src/app/objects/task';
import { TaskListService } from 'src/app/services/task-list.service';
import { Project } from 'src/app/objects/project';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss'],
})
export class TaskListComponent implements OnInit {
  @Input() taskList?: TaskList;
  @Output() onTaskSelect = new EventEmitter<Task>();
  @Output() onListCreate = new EventEmitter<TaskList>();
  @Input() creation: boolean = false;

  constructor(private taskListService: TaskListService) {}

  ngOnInit(): void {}

  select(task: Task) {
    this.onTaskSelect.emit(task);
  }

  createList() {
    this.taskListService.createTaskList(this.taskList!).subscribe({
      next: (taskList) => {
        this.onListCreate.emit(taskList);
      },
    });
  }
}
