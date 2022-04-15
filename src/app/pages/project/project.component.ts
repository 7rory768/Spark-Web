import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { Project } from 'src/app/objects/project';
import { Task } from 'src/app/objects/task';
import { TaskList } from 'src/app/objects/tasklist';
import { Team } from 'src/app/objects/team';
import { ProjectService } from 'src/app/services/project.service';
import { TaskListService } from 'src/app/services/task-list.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  project?: Project;
  @Input() selectedTask?: Task;

  draggedTaskList?: TaskList;

  addListView = false;
  newList: TaskList = {
    id: -1,
    projectId: -1,
    name: '',
    position: -1,
  };

  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private taskListService: TaskListService,
    private teamService: TeamService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params: ParamMap) => {
        let projectId = parseInt(params.get('project-id')!);

        this.userService.getUserSubject().subscribe({
          next: () => {
            this.project = this.projectService.getFromCache(projectId);

            if (!this.project) {
              this.projectService.get(projectId).subscribe({
                next: (project) => {
                  this.project = project;
                  this.onLoadedProject();
                },
              });
            } else {
              this.onLoadedProject();
            }
          },
        });
      },
    });
  }

  onLoadedProject() {
    this.loadTaskLists();

    this.teamService.attemptGetAll().subscribe({
      next: (result: Team[]) => {
        this.project!.team = result.find(
          (team) => team.id === this.project!.teamId
        );
      },
    });

    this.newList.projectId = this.project!.id;
  }

  loadTaskLists() {
    this.taskListService.getTaskLists(this.project!).subscribe({
      next: (taskLists: TaskList[]) => {
        this.project!.taskLists = taskLists;

        this.newList.position = this.project?.taskLists
          ? this.project?.taskLists?.length
          : 0;
      },
    });
  }

  onSelectTask(task: Task) {
    this.selectedTask = task;
    console.log('selectedTask:', task);
  }

  onListCreate(taskList: TaskList) {
    this.addListView = false;
    this.project!.taskLists?.push(taskList);

    this.newList = {
      id: -1,
      projectId: this.project!.id,
      name: '',
      position: this.project!.taskLists!.length,
    };
  }

  onListDelete(taskList: TaskList) {}

  // TODO: goes to a floating page to invite others
  manageProject() {
    this.router.navigateByUrl("/project/" + this.project?.id + "/manageProject");
  }

  // TODO: adds another list to the project
  addList() {
    this.addListView = true;
  }
}
