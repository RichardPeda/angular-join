import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { passwordMatchValidator } from '../shared/passwordValid.directive';
import { Router, RouterModule } from '@angular/router';
import { UserdataService } from '../services/userdata.service';
import { User } from '../interfaces/user.interface';
import { Guest } from '../shared/models/guestUser.model';
import { addDoc, collection, query, where } from '@angular/fire/firestore';
import { PopupNotificationComponent } from '../shared/modules/popup-notification/popup-notification.component';
import { SessiondataService } from '../services/sessiondata.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCheckboxModule,
    FormsModule,
    CommonModule,
    RouterModule,
    PopupNotificationComponent,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  checkbox: boolean = false;
  newUserForm: FormGroup;
  user: User = {
    name: '',
    email: '',
    userinitials: '',
    password: '',
    contacts: [],
    tasks: [],
  };
  showNotification = false;
  notificationText = '';

  constructor(private userService: UserdataService, private router: Router) {
    this.newUserForm = new FormGroup(
      {
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password_1: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(10),
        ]),
        password_2: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(10),
        ]),
      },
      { validators: passwordMatchValidator }
    );
  }

  async onSubmit() {
    let name = this.newUserForm.get('name')?.value;
    let email = this.newUserForm.get('email')?.value;
    let password = this.newUserForm.get('password_1')?.value;

    if (await this.addNewUser(name, email, password)) {
      this.notificationText = 'You Signed Up successfully';
      this.showNotification = true;
      this.clearForm();
      setTimeout(() => {
        this.router.navigate(['']);
      }, 2500);
    } else {
      this.notificationText = 'This email is already registered';
      this.showNotification = true;
      this.clearForm();
      setTimeout(() => {
        this.showNotification = false;
      }, 2500);
    }
  }

  async addNewUser(name: string, email: string, password: string) {
    if (await this.userService.checkIfUserDontExists(name, email)) {
      let initials = this.getInitials(name);
      let guest = new Guest(name, email, initials, password);
      const docRef = await addDoc(
        this.userService.getUserRef(),
        guest.toJSON()
      );
      return true;
    } else {
      return false;
    }
  }

  clearForm() {
    this.newUserForm.patchValue({
      name: '',
      email: '',
      password_1: '',
      password_2: '',
    });
    this.newUserForm.markAsPristine();
    this.newUserForm.markAsUntouched();
    this.checkbox = false;
  }

  getInitials(name: string) {
    let splitName = name.split(' ', 2);

    let name_1 =
      typeof splitName[0].charAt(0) == 'string'
        ? splitName[0].charAt(0).toUpperCase()
        : '';
    let name_2 =
      typeof splitName[1]?.charAt(0) == 'string'
        ? splitName[1].charAt(0).toUpperCase()
        : '';

    return name_1 + name_2;
  }
}
