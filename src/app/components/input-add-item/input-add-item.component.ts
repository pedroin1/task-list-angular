import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ITask } from '../../intefaces/task.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-input-add-item',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './input-add-item.component.html',
  styleUrl: './input-add-item.component.scss',
})
export class InputAddItemComponent {
  inputValue: string = '';

  @Input({ required: true }) taskList!: ITask[];
  @Output() onCreateNewTaskEvent = new EventEmitter<ITask>();
  @ViewChild('inputText') inputTextRef!: ElementRef;

  constructor(private cdr: ChangeDetectorRef) {}

  public onCreateNewTask(): void {
    this.cdr.detectChanges();
    this.inputTextRef.nativeElement.value = '';

    this.onCreateNewTaskEvent.emit({
      id: 0,
      value: this.inputValue,
      checked: false,
    });

    this.inputTextRef.nativeElement.focus();
  }
}
