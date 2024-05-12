import { Component, Inject } from '@angular/core';
import { Task } from '../interfaces/task.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SessiondataService } from '../services/sessiondata.service';
import { Contact } from '../interfaces/contact.interface';
import { Subtask } from '../interfaces/subtask.interface';
import { User } from '../interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { ContactSelectionComponent } from '../shared/modules/contact-selection/contact-selection.component';
import { ClickOutsideDirective } from '../shared/click-outside.directive';
import { SubtaskComponent } from '../shared/modules/subtask/subtask.component';
import { ProfileBadgeComponent } from '../shared/modules/profile-badge/profile-badge.component';
import { PrioritySelectionComponent } from '../shared/modules/priority-selection/priority-selection.component';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContactSelectionComponent,
    ClickOutsideDirective,
    SubtaskComponent,
    ProfileBadgeComponent,
    PrioritySelectionComponent,
  ],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss',
})
export class EditTaskComponent {
  localData: Task = {
    taskID: '',
    title: '',
    description: '',
    assignedContacts: [],
    priority: 'medium',
    category: 'Technical Task',
    dueDate: '',
    status: 'toDo',
    subtasks: [],
  };

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

  priority: 'medium' | 'urgent' | 'low' = 'medium';

  constructor(
    private _formbuilder: FormBuilder,
    private sessionDataService: SessiondataService,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    public dialogRef: MatDialogRef<EditTaskComponent>
  ) {
    this.localData = { ...data };
    this.localUser = this.sessionDataService.user;
    this.filteredContacts = this.localUser.contacts;
    // this.filteredContacts = this.localUser.contacts;
    // this.filteredContacts = this.localData.assignedContacts!;
  }

  taskForm = this._formbuilder.group({
    title: [this.localData.title, Validators.required],
    description: [this.localData.description],
    contactField: [''],
    date: [this.localData.dueDate, Validators.required],
    category: [this.localData.category, Validators.required],
    subtask: [''],
  });

  ngOnInit() {
    this._subscriptionUser = this.sessionDataService.userSubject.subscribe(
      (user: User) => {
        this.localUser = user;
      }
    );
    this.joinContacts();
    this.priority = this.localData.priority;
    this.subTasks = this.localData.subtasks;
    this.taskForm.controls['title'].setValue(this.localData.title);
    this.taskForm.controls['description'].setValue(this.localData.description);
    this.taskForm.controls['date'].setValue(this.localData.dueDate);
    this.taskForm.controls['category'].setValue(this.localData.category);
  }

  joinContacts() {
    this.filteredContacts = this.localUser.contacts;

    this.filteredContacts.forEach((contact) => {
      this.localData.assignedContacts?.forEach((assigned) => {
        if (contact.contactID == assigned.contactID) {
          contact.selected = true;
        }
      });
    });
  }

  ngOnDestroy() {
    this._subscriptionUser.unsubscribe();
  }

  findselectedContacts() {
    this.selectedContacts = [];
    this.localUser.contacts.forEach((c) => {
      if (c.selected) this.selectedContacts.push(c);
    });
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
    this.priority = 'medium';
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

  selectCategory(category: 'Technical Task' | 'User Story') {
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
      let subtask: Subtask = {
        title: this.taskForm.controls['subtask'].value!,
        done: false,
      };
      this.subTasks.push(subtask);
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
