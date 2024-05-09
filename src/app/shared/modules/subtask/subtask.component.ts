import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subtask } from '../../../interfaces/subtask.interface';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-subtask',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './subtask.component.html',
  styleUrl: './subtask.component.scss',
})
export class SubtaskComponent {
  @Input() title: string = '';
  @Output() updatedTitle = new EventEmitter<string>();

  form = this._formbuilder.group({
    title: ['', Validators.required],
  });
  constructor(private _formbuilder: FormBuilder) {}

  ngOnInit() {
    this.form.controls['title'].setValue(this.title);
  }

  changeTitle() {
    if (this.form.controls['title'].value)
      this.updatedTitle.emit(this.form.controls['title'].value);
  }

  deleteSubtask() {
    this.updatedTitle.emit('');
  }
}
