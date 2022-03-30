import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/objects/project';
import { Task } from 'src/app/objects/task';
import { TaskList } from 'src/app/objects/tasklist';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  project: Project;

  constructor() {
    this.project = {
      id: 1,
      name: 'Project 1',
      taskLists: [],
    };

    let taskLists = this.project.taskLists;

    let taskId: number = 0;

    for (
      let taskListId = 1;
      taskListId <= Math.floor(Math.random() * (10 - 5 + 1)) + 5;
      taskListId++
    ) {
      let tasks: Task[] = [];
      for (
        let taskNum = 0;
        taskNum < Math.floor(Math.random() * (12 - 3 + 1)) + 3;
        taskNum++
      ) {
        tasks.push({ id: taskId, title: 'Task ' + taskId++ });
      }

      taskLists.push({
        id: taskListId,
        name: 'TaskList ' + taskListId,
        tasks,
      });
    }
  }

  ngOnInit(): void {}
}
