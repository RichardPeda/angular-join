import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent {
  submitBtnClicked = false;

  constructor(private _formbuilder: FormBuilder) {}

  taskForm = this._formbuilder.group({
    title: ['', Validators.required],
    description: [''],
    date: ['', Validators.required],
    priority: ['medium', Validators.required],
    category: ['', Validators.required],
  });

  createTask() {
    if (this.taskForm.valid) {
      console.log('task create');
    }
  }

  btnIsClicked() {
    this.submitBtnClicked = true;
    
  }

  validateRequiredFormMessage(form: FormControl) {
    let showTitleMessage = false;
    if (form.errors && (form.touched || form.dirty)) {
      showTitleMessage = true;
    }
    return showTitleMessage;
  }

  showAllRequiredMessages(form: FormControl) {
    let showTitleMessage = false;
    if (form.errors && this.submitBtnClicked) {
      showTitleMessage = true;
    }
    return showTitleMessage;
  }
}
