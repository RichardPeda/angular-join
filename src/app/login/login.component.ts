import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LogoAnimationComponent } from '../logo-animation/logo-animation.component';
import { UserdataService } from '../services/userdata.service';
import { RouterModule, Router } from '@angular/router';
import { Guest } from '../shared/models/guestUser.model';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  onSnapshot,
  addDoc,
  QuerySnapshot,
  DocumentData,
  getDoc,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    LogoAnimationComponent,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  checkbox: boolean = false;
  checkboxColor: string = '#2a3647';
  userform: FormGroup;

  firestore: Firestore = inject(Firestore);

  constructor(public userService: UserdataService, private router: Router) {
    this.userform = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  guestLogin() {
    console.log('login');
  }

  rememberMe() {
    console.log('remember');
  }

  onSubmit() {
    console.log('submit');
  }

  // logInAsGuest() {
  //   // this.userService.addNewGuestUser();
  //   this.userService.loginAsGuest();
  //   this.router.navigate(['summary']);
  // }

  async addNewGuestUser() {
    let guest = new Guest();

    const docRef = await addDoc(this.userService.getUserRef(), guest.toJSON())
    .then((docInfo) =>{
      console.log(docInfo)
      this.router.navigate(['summary/' + docInfo.id ]);
      this.userService.saveIdInSessionStorage(docInfo.id)
    });
  }
}
