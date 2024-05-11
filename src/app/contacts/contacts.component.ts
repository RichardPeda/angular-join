import { Component, OnInit, Renderer2 } from '@angular/core';
import { Contact } from '../interfaces/contact.interface';
import { SinglecontactComponent } from './singlecontact/singlecontact.component';
import { CommonModule } from '@angular/common';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { HeaderComponent } from '../shared/modules/header/header.component';
import { NavbarComponent } from '../shared/modules/navbar/navbar.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ContactsService } from '../services/contacts.service';
import { UserdataService } from '../services/userdata.service';
import { SessiondataService } from '../services/sessiondata.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    SinglecontactComponent,
    ContactDetailsComponent,
    CommonModule,
    HeaderComponent,
    NavbarComponent,
    AddContactComponent,
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent implements OnInit {
  _subscriptionUser: any;
  _subscriptionLetters: any;
  registerletters = [''];
  localUser: User = {
    id: '',
    name: '',
    email: '',
    password: '',
    contacts: [],
    tasks: [],
  };
  // localUser: User;

  constructor(
    private _renderer: Renderer2,
    public contactService: ContactsService,
    public userService: UserdataService,
    public sessionDataService: SessiondataService,
    public activatedroute: ActivatedRoute
  ) {
    this.localUser = this.sessionDataService.user;
        
    this.sessionDataService.getRegisterLetters(
      this.sessionDataService.user.contacts!
    );
    this.registerletters = this.sessionDataService.registerLetters;
    this.sessionDataService.user.contacts.sort(this.sessionDataService.compare);
  }

  async ngOnInit() {
    this._renderer.setStyle(document.body, 'overflow-x', 'hidden');
    this._subscriptionUser = this.sessionDataService.userSubject.subscribe(
      (user: User) => {
        this.localUser = user;
      }
    );
    this._subscriptionLetters =
      this.sessionDataService.registerLettersSubject.subscribe(
        (letters: string[]) => {
          this.registerletters = letters;
        }
      );
  }

  ngOnDestroy() {
    this._subscriptionUser.unsubscribe();
    this._subscriptionLetters.unsubscribe();
  }
}
