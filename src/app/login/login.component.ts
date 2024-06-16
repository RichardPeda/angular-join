import { CommonModule, Location } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
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
  query,
  getDocs,
  where,
} from '@angular/fire/firestore';
import { LogoAnimationMobileComponent } from '../logo-animation-mobile/logo-animation-mobile.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    LogoAnimationComponent,
    LogoAnimationMobileComponent,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  checkbox: boolean = false;
  checkboxColor: string = '#2a3647';
  userform: FormGroup;
  mobileMode = false;
  savedUsers = [];
  firestore: Firestore = inject(Firestore);
  currentEmail: string | null | undefined = undefined;
  currentPassword: string | null | undefined = undefined;

  constructor(
    public userService: UserdataService,
    private router: Router,
    private location: Location
  ) {
    this.userform = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.checkMobile();
    this.currentEmail = localStorage.getItem('email');
    this.currentPassword = localStorage.getItem('password');
    if (this.currentPassword && this.currentEmail) {
      this.userform.controls['email'].setValue(this.currentEmail);
      this.userform.controls['password'].setValue(this.currentPassword);
    }
  }

  rememberMe(email: string, password: string) {
    if (this.checkbox) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
    }
  }

  linkToSignUp() {
    console.log('signup');

    this.router.navigate(['signup/']);
  }

  async onSubmit() {
    let email = this.userform.controls['email'].value;
    let password = this.userform.controls['password'].value;
    const q = query(
      collection(this.firestore, 'users'),
      where('email', '==', email),
      where('password', '==', password)
    );
    let docId = undefined;
    let data;

    let snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      docId = doc.id;
      data = doc.data();
    });

    if (docId) {
      this.router.navigate(['summary/' + docId]);
      this.userService.saveIdInSessionStorage(docId);
      this.rememberMe(email, password);
    }
  }

  async addNewGuestUser() {
    let guest = new Guest('guest', 'demo@mail.com', 'G', '123456');
    guest.userinitials = 'G';

    const docRef = await addDoc(
      this.userService.getUserRef(),
      guest.toJSON()
    ).then((docInfo) => {
      console.log(docInfo);
      this.router.navigate(['summary/' + docInfo.id]);
      this.userService.saveIdInSessionStorage(docInfo.id);
      // this.userService.saveDataInSessionStorage('initials', 'G');
      this.userService.saveDataInSessionStorage('name', 'guest');
    });
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.checkMobile();
  }

  checkMobile() {
    let width = window.innerWidth;
    this.mobileMode = width <= 680 ? true : false;
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

  updateCheckbox(completed: boolean) {
    this.checkbox = completed;
  }
}
