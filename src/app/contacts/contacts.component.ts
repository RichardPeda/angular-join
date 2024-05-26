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
export class ContactsComponent {
  _subscriptionUser: any;
  _subscriptionLetters: any;
  _subscriptionContact: any;
  registerletters = [''];
  localUser: User = {
    id: '',
    name: '',
    email: '',
    password: '',
    contacts: [
      {
        badgecolor: '',
        email: '',
        contactID: '',
        initials: '',
        name: '',
        phone: '',
        register: '',
        selected: false,
      },
    ],
    tasks: [],
  };

  selcontact: Contact = {
    contactID: '3',
    badgecolor: '#FFA35E',
    initials: 'AF',
    register: 'A',
    name: 'Arne Fröhlich',
    email: 'fröhlich@24-7.com',
    phone: '+49 815 79183212',
    selected: false,
  };

  constructor(
    private _renderer: Renderer2,
    public contactService: ContactsService,
    public userService: UserdataService,
    public sessionDataService: SessiondataService,
    public activatedroute: ActivatedRoute
  ) {
    this.localUser = this.sessionDataService.user;
    // this.selcontact = this.contactService.selectedContact;
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
    this._subscriptionContact = this.contactService._selectedContact.subscribe(
      (contact: Contact) => {
        this.selcontact = contact;
      }
    );
  }

  ngOnDestroy() {
    this._subscriptionUser.unsubscribe();
    this._subscriptionLetters.unsubscribe();
    this._subscriptionContact.unsubscribe();
  }
}
