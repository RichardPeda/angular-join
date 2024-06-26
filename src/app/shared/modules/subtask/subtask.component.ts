import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Subtask } from '../../../interfaces/subtask.interface';
import { ClickOutsideDirective } from '../../click-outside.directive';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-subtask',
  standalone: true,
  imports: [FormsModule, ClickOutsideDirective],
  templateUrl: './subtask.component.html',
  styleUrl: './subtask.component.scss',
})
export class SubtaskComponent {
  @Input() title: string = '';
  @Output() updatedTitle = new EventEmitter<string>();

  inputData = '';
  constructor() {}

  inEditMode = false;

  @ViewChild('inputRef')
  inputRef!: ElementRef;

  ngOnInit() {
    this.inputData = this.title;
    // this.form.controls['title'].setValue(this.title);
    // this.form.controls['title'].disable();
  }

  enableSubtask() {
    this.inEditMode = true;
  }

  disableSubtask() {
    this.inEditMode = false;
  }

  editSubtask() {
    // this.form.controls['title'].enable();
    console.log('edit');
    
    this.enableSubtask();
    this.inputRef.nativeElement.focus();
  }

  changeTitle() {
    if (this.inputData) this.updatedTitle.emit(this.inputData);
    this.disableSubtask()
  }

  deleteSubtask() {
    this.updatedTitle.emit('');
  }
}
