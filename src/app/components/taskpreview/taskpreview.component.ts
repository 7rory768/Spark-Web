import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/objects/task';

@Component({
  selector: 'app-taskpreview',
  templateUrl: './taskpreview.component.html',
  styleUrls: ['./taskpreview.component.scss'],
})
export class TaskPreviewComponent implements OnInit {
  @Input('task') task?: Task;

  constructor() {}

  ngOnInit(): void {}
}
