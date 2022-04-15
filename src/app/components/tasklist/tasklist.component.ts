import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { TaskList } from 'src/app/objects/tasklist';
import { Task } from 'src/app/objects/task';
import { TaskListService } from 'src/app/services/task-list.service';
import { Project } from 'src/app/objects/project';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss'],
})
export class TaskListComponent implements OnInit {
  @Input() project?: Project;
  @Input() taskList?: TaskList;
  @Input() creation: boolean = false;

  @Output() onTaskSelect = new EventEmitter<Task>();
  @Output() onListCreate = new EventEmitter<TaskList>();

  @ViewChild('nameinput') taskListNameInput?: ElementRef;
  @ViewChild('namesavebutton') nameSaveButton?: ElementRef;

  creationError = '';

  movingThisList: boolean = false;
  moveAmount: number = 0;

  deleting: boolean = false;

  editingTaskListName?: TaskList;
  newTaskListName: string = '';
  updatingTaskList = false;
  updatingNameError = '';

  constructor(
    public taskListService: TaskListService,
    private taskService: TaskService,
    private renderer: Renderer2
  ) {
    renderer.listen('window', 'click', (e: Event) => {
      if (
        e.target !== this.taskListNameInput?.nativeElement &&
        !e.target !== this.nameSaveButton?.nativeElement
      ) {
        this.stopEditingName();
      }
    });
  }

  ngOnInit(): void {
    let interval = setInterval(() => {
      if (this.taskList) {
        this.taskService.getTasks(this.taskList).subscribe({
          next: (tasks: Task[]) => {
            this.taskList!.tasks = tasks;
          },
        });

        clearInterval(interval);
      }
    }, 50);
  }

  moveTaskList(taskList: TaskList, amount: number) {
    if (this.movingThisList) return;

    this.movingThisList = true;
    this.moveAmount = amount;

    let oldPosition = taskList.position;
    let newPosition = taskList.position + amount;

    this.taskListService.moveTaskList(taskList, newPosition).subscribe({
      next: (taskList: TaskList) => {
        newPosition = taskList.position;

        if (this.project && this.project.taskLists) {
          if (amount > 0) {
            for (let otherList of this.project.taskLists!) {
              if (
                otherList.position > oldPosition &&
                otherList.position <= newPosition
              ) {
                otherList.position--;
              }
            }
          } else {
            for (let otherList of this.project.taskLists) {
              if (
                otherList.position < oldPosition &&
                otherList.position >= newPosition
              ) {
                otherList.position++;
              }
            }
          }

          let match = this.project.taskLists.find(
            (match) => match.id == taskList.id
          );
          match!.position = newPosition;

          this.project.taskLists = this.project.taskLists.sort((a, b) => {
            return a.position - b.position;
          });

          this.movingThisList = false;
          this.moveAmount = 0;
        }
      },
    });
  }

  deleteTaskList(taskList: TaskList) {
    let position = taskList.position;

    this.taskListService.deleteTaskList(taskList).subscribe({
      next: (success: boolean) => {
        if (!success) return;

        if (this.project && this.project.taskLists) {
          for (let otherList of this.project.taskLists!) {
            if (otherList.position > position) {
              otherList.position--;
            }
          }

          this.project.taskLists.splice(
            this.project.taskLists.indexOf(taskList)
          );

          this.project.taskLists = this.project.taskLists.sort((a, b) => {
            return a.position - b.position;
          });

          this.deleting = false;
        }
      },
    });
  }

  clickTaskListName(taskList: TaskList) {
    this.editingTaskListName = taskList;
    this.newTaskListName = taskList.name;
  }

  renameTaskList() {
    if (this.editingTaskListName) {
      this.updatingTaskList = true;
      let oldName = this.editingTaskListName.name;

      this.editingTaskListName.name = this.newTaskListName;

      this.taskListService
        .updateTaskList(this.editingTaskListName)
        .then((response) => {
          if (!response.state) {
            this.updatingNameError = response.message;
            return;
          }

          this.taskList!.name = response.value.name;
        })
        .catch((error) => {
          this.taskList!.name = oldName;
          this.updatingNameError = error.error.message;
        })
        .finally(() => {
          this.updatingTaskList = false;
        });
    }
  }

  stopEditingName() {
    this.editingTaskListName = undefined;
    this.newTaskListName = '';
    this.updatingNameError = '';
  }

  createList() {
    this.creationError = '';

    this.taskListService
      .createTaskList(this.taskList!)
      .then((response) => {
        this.onListCreate.emit(response.value);
      })
      .catch((error) => {
        this.creationError = error.error.message;
      });
  }

  disableAllButtons() {
    return this.deleting || this.movingThisList || this.updatingTaskList;
  }

  isMovingThisTaskList() {
    return this.movingThisList;
  }

  isMovingThisTaskListRight() {
    return this.movingThisList && this.moveAmount > 0;
  }

  isMovingThisTaskListLeft() {
    return this.movingThisList && this.moveAmount < 0;
  }

  isMovingTaskList() {
    return (
      this.taskList &&
      this.taskListService.isMovingTaskList(this.taskList.projectId)
    );
  }

  select(task: Task) {
    this.onTaskSelect.emit(task);
  }
}
