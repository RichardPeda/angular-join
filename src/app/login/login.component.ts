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
  }

  rememberMe() {
    console.log('remember');
  }

  async onSubmit() {
    const q = query(
      collection(this.firestore, 'users'),
      where('email', '==', this.userform.controls['email'].value),
      where('password', '==', this.userform.controls['password'].value),
    );

    let snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
    });
  }

  async addNewGuestUser() {
    let guest = new Guest();

    const docRef = await addDoc(
      this.userService.getUserRef(),
      guest.toJSON()
    ).then((docInfo) => {
      console.log(docInfo);
      this.router.navigate(['summary/' + docInfo.id]);
      this.userService.saveIdInSessionStorage(docInfo.id);
      this.userService.saveDataInSessionStorage('initials', 'G');
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
}
