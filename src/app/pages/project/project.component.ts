import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Project } from 'src/app/objects/project';
import { Task } from 'src/app/objects/task';
import { TaskList } from 'src/app/objects/tasklist';
import { ProjectService } from 'src/app/services/project.service';
import { TaskListService } from 'src/app/services/task-list.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  project?: Project;
  @Input() selectedTask?: Task;

  constructor(
    private projectService: ProjectService,
    private taskListService: TaskListService,
    private route: ActivatedRoute
  ) {
    route.paramMap.subscribe({
      next: (params: ParamMap) => {
        let projectId = parseInt(params.get('project-id')!);

        this.project = projectService.getFromCache(projectId);

        taskListService.getTaskLists(projectId).subscribe({
          next: (taskLists: TaskList[]) =>
            (this.project!.taskLists = taskLists),
        });
      },
    });
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
