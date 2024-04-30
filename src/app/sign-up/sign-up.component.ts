import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

  newUserForm: FormGroup;

  constructor() {
    this.newUserForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password_1: new FormControl('', [Validators.required, Validators.minLength(5)]),
      password_2: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

}
