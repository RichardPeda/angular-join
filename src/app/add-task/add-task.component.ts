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

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContactSelectionComponent,
    ClickOutsideDirective,
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

  filteredContacts: Contact[];
  selectedContacts : Contact[];
  subTasks: Subtask[];

  dropdownContactsClose = true;
  dropdownCategoryClose = true;
  catergoryString: string = 'Technical task';

  taskForm = this._formbuilder.group({
    title: ['', Validators.required],
    description: [''],
    contactField: [''],
    date: ['', Validators.required],
    priority: ['medium', Validators.required],
    category: ['', Validators.required],
  });

  constructor(
    private _formbuilder: FormBuilder,
    private sessionDataService: SessiondataService
  ) {
    this.localUser = this.sessionDataService.user;
    this.filteredContacts = this.localUser.contacts;
    this.selectedContacts = this.localUser.contacts;
    this.subTasks = [];

    this.taskForm.controls['category'].disable();
  }

  ngOnInit() {
    this._subscriptionUser = this.sessionDataService.userSubject.subscribe(
      (user: User) => {
        this.localUser = user;
        this.filteredContacts = this.localUser.contacts;
      }
    );
  }

  ngOnDestroy() {
    this._subscriptionUser.unsubscribe();
  }

findselectedContacts(){
 this.selectedContacts = []
   this.localUser.contacts.forEach((c) => {
    if(c.selected) this.selectedContacts.push(c)
   })

  
  
}

  createTask() {
    if (this.taskForm.valid) {

      this.findselectedContacts()


      let task = new TaskObject(
        this.taskForm.controls['title'].value,
        this.taskForm.controls['description'].value,
        this.selectedContacts,
        this.taskForm.controls['priority'].value,
        this.taskForm.controls['category'].value,
        this.taskForm.controls['date'].value,
        'todo',
        this.subTasks
      );
      console.log(task);
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
}
