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
import { Contact } from '../interfaces/contact.interface';
import { TaskObject } from '../shared/models/task.model';
import { Subtask } from '../interfaces/subtask.interface';
import { SubtaskComponent } from '../shared/modules/subtask/subtask.component';
import { ProfileBadgeComponent } from '../shared/modules/profile-badge/profile-badge.component';
import { PrioritySelectionComponent } from '../shared/modules/priority-selection/priority-selection.component';
import { Task } from '../interfaces/task.interface';
import { HeaderComponent } from '../shared/modules/header/header.component';
import { NavbarComponent } from '../shared/modules/navbar/navbar.component';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContactSelectionComponent,
    ClickOutsideDirective,
    SubtaskComponent,
    ProfileBadgeComponent,
    PrioritySelectionComponent,
    HeaderComponent,
    NavbarComponent,
  ],
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

  subtasks: string[] = [];

  filteredContacts: Contact[];
  selectedContacts: Contact[] = [];
  subTasks: Subtask[] = [];

  dropdownContactsClose = true;
  dropdownCategoryClose = true;
  subtaskInputDisable = true;
  catergoryString: string = 'Technical task';

  taskForm = this._formbuilder.group({
    title: ['', Validators.required],
    description: [''],
    contactField: [''],
    date: ['', Validators.required],
    category: ['', Validators.required],
    subtask: [''],
  });

  priority: 'medium' | 'urgent' | 'low' = 'medium';

  constructor(
    private _formbuilder: FormBuilder,
    private sessionDataService: SessiondataService
  ) {
    this.localUser = this.sessionDataService.user;
    this.filteredContacts = this.localUser.contacts;
    // this.selectedContacts = this.localUser.contacts;
  }

  ngOnInit() {
    this._subscriptionUser = this.sessionDataService.userSubject.subscribe(
      (user: User) => {
        this.localUser = user;
        this.filteredContacts = this.localUser.contacts;
        console.log('contacts from addTask', this.filteredContacts);
      }
    );
  }

  ngOnDestroy() {
    this._subscriptionUser.unsubscribe();
  }

  findselectedContacts() {
    this.selectedContacts = [];
    this.localUser.contacts.forEach((c) => {
      if (c.selected) this.selectedContacts.push(c);
    });
    console.log(this.selectedContacts);
  }

  checkValidPriority(value: string): boolean {
    if (value === 'medium') return true;
    else if (value === 'urgent') return true;
    else if (value === 'low') return true;
    else return false;
  }

  createTask() {
    if (this.taskForm.valid) {
      this.findselectedContacts();
      let newTasks = this.sessionDataService.user.tasks;

      if (
        (this.taskForm.controls['category'].value === 'User Story' ||
          this.taskForm.controls['category'].value === 'Technical Task') &&
        this.checkValidPriority(this.priority)
      ) {
        let task: Task = {
          title: this.taskForm.controls['title'].value!,
          taskID: Math.floor(100000 + Math.random() * 900000).toString(),
          description: this.taskForm.controls['description'].value!,
          assignedContacts: this.selectedContacts,
          priority: this.priority,
          category: this.taskForm.controls['category'].value!,
          dueDate: this.taskForm.controls['date'].value!,
          status: 'toDo',
          subtasks: this.subTasks,
        };
        newTasks.push(task);
        this.sessionDataService.setTask(newTasks);
        this.resetForm();
      }
    }
  }

  resetForm() {
    this.taskForm.clearValidators();
    this.taskForm.reset();
    this.submitBtnClicked = false;
    this.selectedContacts = [];
    this.subTasks = [];
  }

  setPriority(prio: 'medium' | 'urgent' | 'low') {
    this.priority = prio;
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

  toggleDropdownContacts() {
    this.dropdownContactsClose = !this.dropdownContactsClose;
  }

  closeDropdownContacts() {
    this.dropdownContactsClose = true;
    console.log('close is triggered');
  }

  openDropdownContacts(event: Event) {
    if (this.taskForm.get('contactField')?.value == '')
      this.dropdownContactsClose = true;
    else this.dropdownContactsClose = false;
  }

  toggleDropdownCategory() {
    this.dropdownCategoryClose = !this.dropdownCategoryClose;
  }

  closeDropdownCategory() {
    this.dropdownCategoryClose = true;
  }

  selectCategory(category: string) {
    this.taskForm.patchValue({
      category: category,
    });
    this.closeDropdownCategory();
  }

  updateSelected() {
    this.findselectedContacts();
  }

  filterContacts() {
    let compare: string | null | undefined =
      this.taskForm.controls['contactField']?.value?.toLowerCase();
    if (compare && compare.length > 0) {
      this.filteredContacts = [];
      this.localUser.contacts.forEach((contact) => {
        let lowContactName = contact.name.toLowerCase();
        if (lowContactName.includes(compare)) {
          this.filteredContacts.push(contact);
        }
      });
    } else {
      this.filteredContacts = this.localUser.contacts;
    }
  }

  createSubtask() {
    if (this.taskForm.controls['subtask'].valid) {
      // let subtask = new SubtaskObject(this.taskForm.controls['subtask'].value!);
      let subtask: Subtask = {
        title: this.taskForm.controls['subtask'].value!,
        done: false,
      };
      this.subTasks.push(subtask);
      console.log(this.subTasks);
    }
  }

  enableSubtaskInput() {
    this.subtaskInputDisable = false;
  }

  changeSubtaskTitle(title: string, index: number) {
    if (title === '') this.subTasks.splice(index, 1);
    else this.subTasks[index].title = title;
  }
}
