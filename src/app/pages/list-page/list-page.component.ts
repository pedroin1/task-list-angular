import { Component, inject, OnInit, signal } from '@angular/core';
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { ITask } from '../../intefaces/task.interface';
import { ResponseAPI, TaskService } from '../../service/task.service';
import { NgClass } from '@angular/common';
import { InputListItemComponent } from '../../components/input-list-item/input-list-item.component';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [InputAddItemComponent, InputListItemComponent, NgClass],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss',
})
export class ListPageComponent implements OnInit {
  addItem = signal<boolean>(true);
  taskList: ITask[] = [];
  constructor(private readonly taskService: TaskService) {}

  public getTasks() {
    this.taskService.getTasks().subscribe((data: ITask[]) => {
      this.taskList = data;
    });
  }

  public createTask(newTask: ITask) {
    this.taskService.addTask(newTask).subscribe({
      next: (data: ResponseAPI) =>
        (this.taskList = [...this.taskList, data.data as ITask]),
      error: (error) => alert(`Error creating task: ${error.message}`),
    });
  }

  public updateTask(task: ITask) {
    this.taskService.updateTask(task).subscribe({
      next: (data: any) => {
        const updatedTask = data.data;
        this.taskList = this.taskList.map((item) => {
          if (item.id === updatedTask.id) {
            return { ...item, ...updatedTask };
          } else return item;
        });
      },
      error: (error) => alert(`Error updating task: ${error}`),
    });
  }

  public deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => this.getTasks(),
      error: (error) => {
        console.log(error);
      },
    });
  }

  public deleteAllTasks() {
    this.taskService.deleteAllTasks().subscribe({
      next: () => this.getTasks(),
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnInit(): void {
    this.getTasks();
  }
}
