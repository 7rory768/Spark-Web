import { TemplateLiteral } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UrlSegment } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Checklist } from 'src/app/objects/checklist';
import { Project } from 'src/app/objects/project';
import { Task } from 'src/app/objects/task';
import { TaskList } from 'src/app/objects/tasklist';
import { Team } from 'src/app/objects/team';
import { User } from 'src/app/objects/user';
import { TaskService } from 'src/app/services/task.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import { cloneDeep } from 'lodash';
import { ChecklistItem } from 'src/app/objects/checklistItem';

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

  editTask?: Task;

  @Output() updatedTask: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() onHide = new EventEmitter();

  user?: User;
  team?: Team;

  teamUsers: UserOption[] = [];

  saving = false;
  deleting = false;
  errorMessage = '';

  newChecklist?: Checklist;

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

    this.editTask = cloneDeep(this.task);

    if (this.project) {
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
    if (this.editTask) {
      this.saving = true;
      this.errorMessage = '';

      this.taskService
        .createTask(this.editTask)
        .then((response: any) => {
          console.log('response', response);
          if (response.state) {
            this.task = response.value;
            this.editTask = cloneDeep(this.task);

            if (this.task && this.taskList && this.taskList.tasks) {
              let taskIndex = this.taskList.tasks.findIndex(
                (otherTask) => otherTask.id === this.task?.id
              );
              this.taskList.tasks.splice(taskIndex, 1);
              this.taskList.tasks.push(this.task);
              this.taskList.tasks = this.taskList.tasks.sort(
                (a, b) => a.priority! - b.priority!
              );
            }

            this.creatingTask = false;
          } else {
            this.errorMessage = response.message;
          }
        })
        .catch((error) => {
          console.log('error', error);
          this.errorMessage = error.error.message
            ? error.error.message
            : error.error;
        })
        .finally(() => {
          this.saving = false;
          if (this.errorMessage && this.errorMessage !== '')
            this.confirmError();
        });
    }
  }

  createChecklist() {
    if (this.editTask) {
      this.newChecklist = {
        id: -1,
        taskId: this.editTask.id,
        title:
          'New Checklist ' +
          (this.editTask.checklists ? this.editTask.checklists?.length + 1 : 1),
        items: [],
      };
    }
  }

  confirmNewChecklist() {
    if (this.editTask && this.newChecklist) {
      if (!this.editTask.checklists) this.editTask.checklists = [];

      let checklists = this.editTask.checklists;

      checklists.push(this.newChecklist);

      this.newChecklist = undefined;

      this.editTask.checklists = checklists;
      console.log('checklists', checklists);
    }
  }

  saveTask() {
    if (this.editTask) {
      this.saving = true;
      this.errorMessage = '';

      this.taskService
        .updateTask(this.editTask)
        .then((response: any) => {
          console.log('response', response);
          if (response.state) {
            this.task = response.value;
            this.updatedTask.emit(this.task);
            this.editTask = cloneDeep(this.task);
            this.creatingTask = false;
          } else {
            this.errorMessage = response.message;
          }
        })
        .catch((error) => {
          console.log('error', error);
          this.errorMessage = error.error.message
            ? error.error.message
            : error.error;
        })
        .finally(() => {
          this.saving = false;
          if (this.errorMessage && this.errorMessage !== '')
            this.confirmError();
        });
    }
  }

  deleteTask() {
    if (this.editTask) {
      this.deleting = true;
      this.errorMessage = '';

      let priority = this.editTask.priority!;

      this.taskService
        .deleteTask(this.editTask)
        .then((response: any) => {
          console.log('response', response);
          if (response.state) {
            if (this.taskList && this.taskList.tasks) {
              this.taskList.tasks.splice(
                this.taskList.tasks.findIndex(
                  (old) => old.id === this.editTask?.id
                ),
                1
              );

              for (let otherList of this.taskList.tasks) {
                if (otherList.priority! > priority) {
                  otherList.priority!--;
                }
              }

              this.taskList.tasks = this.taskList.tasks.sort((a, b) => {
                return a.priority! - b.priority!;
              });
            }

            this.deleting = false;
            this.task = undefined;
          } else {
            this.errorMessage = response.message;
          }
        })
        .catch((error) => {
          console.log('error', error);
          this.errorMessage = error.error.message
            ? error.error.message
            : error.error;
        })
        .finally(() => {
          this.saving = false;
          if (this.errorMessage && this.errorMessage !== '')
            this.confirmError();
        });
    }
  }

  deleteChecklist(checklist: Checklist) {
    if (this.editTask && this.editTask.checklists) {
      this.editTask.checklists.splice(
        this.editTask.checklists.indexOf(checklist),
        1
      );
    }
  }

  deleteChecklistItem(checklist: Checklist, item: ChecklistItem) {
    if (checklist.items) {
      checklist.items?.splice(checklist.items?.indexOf(item), 1);
    }
  }

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
