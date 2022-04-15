import { TemplateLiteral } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UrlSegment } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Project } from 'src/app/objects/project';
import { Task } from 'src/app/objects/task';
import { TaskList } from 'src/app/objects/tasklist';
import { Team } from 'src/app/objects/team';
import { User } from 'src/app/objects/user';
import { TaskService } from 'src/app/services/task.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

class UserOption {
  constructor(user: User) {
    this.fullName = user.fName + ' ' + user.lName;
    this.user = user;
  }

  fullName: string;
  user: User;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() project?: Project;
  @Input() taskList?: TaskList;
  @Input() task?: Task;
  @Input() creatingTask: boolean = false;

  @Output() onHide = new EventEmitter();

  user?: User;
  team?: Team;

  teamUsers: UserOption[] = [];

  saving = false;
  errorMessage = '';

  constructor(
    private taskService: TaskService,
    private teamService: TeamService,
    private userService: UserService,
    private confirmService: ConfirmationService
  ) {
    this.userService.getUserSubject().subscribe({
      next: (user: User) => (this.user = user),
    });
  }

  ngOnInit(): void {
    if (this.creatingTask && this.taskList) {
      this.task = {
        id: -1,
        projectId: this.taskList.projectId,
        listId: this.taskList.id,
        name: '',
        description: '',
      };
    }

    if (this.project) {
      console.log('getting team members');
      this.teamService.attemptGetAllMembers(this.project.teamId).subscribe({
        next: (users: User[]) => {
          let teamUsers = [];

          for (let user of users) teamUsers.push(new UserOption(user));

          this.teamUsers = teamUsers;
          console.log('got users: ', this.teamUsers);
        },
      });
    }
  }

  isManager() {
    return (
      this.user &&
      this.project &&
      this.project.team &&
      this.project.team.mgrUsername === this.user.username
    );
  }

  createTask() {
    console.log('create task method');
    if (this.task) {
      this.saving = true;
      this.errorMessage = '';

      this.taskService
        .createTask(this.task)
        .then((response: any) => {
          console.log('response', response);
          if (response.state) {
            this.task = response.value;
            this.creatingTask = false;
            if (this.taskList) this.taskList.tasks?.push(this.task!);
          } else {
            this.errorMessage = response.message;
          }
        })
        .catch((error) => {
          console.log('error', error);
          this.errorMessage = error.error.message;
        })
        .finally(() => {
          this.saving = false;
          if (this.errorMessage && this.errorMessage !== '')
            this.confirmError();
        });
    }
  }

  saveTask() {}

  confirmError() {
    console.log('confirm error');
    this.confirmService.confirm({
      message: this.errorMessage,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //confirm action
      },
      reject: () => {
        //reject action
      },
    });
  }

  getInitials(user: User) {
    return User.getInitials(user);
  }
}
