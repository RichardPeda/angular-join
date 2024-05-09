import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { User } from '../interfaces/user.interface';
import { SessiondataService } from '../services/sessiondata.service';
import { ContactSelectionComponent } from '../shared/modules/contact-selection/contact-selection.component';
import { ClickOutsideDirective } from '../shared/click-outside.directive';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ContactSelectionComponent, ClickOutsideDirective],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent {
  _subscriptionUser: any;
  submitBtnClicked = false;
  localUser: User = {
    id: '',
    name: '',
    email: '',
    password: '',
    contacts: [],
    tasks: [],
  };

  dropdownContactsClose = true;

  constructor(
    private _formbuilder: FormBuilder,
    private sessionDataService: SessiondataService
  ) {
    this.localUser = this.sessionDataService.user;
  }

  ngOnInit() {
    this._subscriptionUser = this.sessionDataService.userSubject.subscribe(
      (user: User) => {
        this.localUser = user;
      }
    );
  }

  ngOnDestroy() {
    this._subscriptionUser.unsubscribe();
  }

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

  toggleDropdownContacts(){
    this.dropdownContactsClose = !this.dropdownContactsClose;
  };

  closeDropdownContacts(){
    this.dropdownContactsClose = true;
  };
}
