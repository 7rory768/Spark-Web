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
  @Input() selectedTask?: Task;

  constructor() {
    this.project = {
      id: 1,
      teamId: 1,
      name: 'Project 1',
      mgrUsername: 'rory',
      taskLists: [],
    };

    let taskLists: TaskList[] = this.project.taskLists!;

    let taskId: number = 1;

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
        tasks.push({
          projectId: 1,
          listName: 'TaskList' + taskListId,
          name: 'Task ' + taskId++,
          description: 'Description',
          priority: taskId,
        });
      }

      taskLists.push({
        projectId: 1,
        id: taskListId,
        name: 'TaskList ' + taskListId,
        tasks,
      });
    }
  }

  ngOnInit(): void {}

  onSelectTask(task: Task) {
    this.selectedTask = task;
    console.log('selectedTask:', task);
  }

  // TODO: goes to a floating page to invite others
  inviteMember() {}

  // TODO: adds another list to the project
  addList() {}
}
