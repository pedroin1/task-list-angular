import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ITask } from '../../intefaces/task.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-list-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-list-item.component.html',
  styleUrl: './input-list-item.component.scss',
})
export class InputListItemComponent implements OnChanges {
  protected taskListPending: ITask[] = [];
  protected taskListConcluded: ITask[] = [];

  @Input({ required: true }) taskList: ITask[] = [];
  @Output() deleteTaskEvent = new EventEmitter<number>();
  @Output() changeTaskStateEvent = new EventEmitter<ITask>();
  @Output() changeTaskValueEvent = new EventEmitter<ITask>();

  public deleteTask(idTask: number): void {
    this.deleteTaskEvent.emit(idTask);
  }

  public changeTaskState(task: ITask): void {
    task.checked = !task.checked;
    this.changeTaskStateEvent.emit(task);
  }

  public changeTaskValue(task: ITask, newValue: string): void {
    task.value = newValue;
    this.changeTaskValueEvent.emit(task);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskList']) {
      this.taskListPending = this.taskList.filter((task) => !task.checked);
      this.taskListConcluded = this.taskList.filter((task) => task.checked);
    }
  }
}
