import { Component, Renderer2 } from '@angular/core';
import { Contact } from '../interfaces/contact.interface';
import { SinglecontactComponent } from './singlecontact/singlecontact.component';
import { CommonModule } from '@angular/common';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { HeaderComponent } from '../shared/modules/header/header.component';
import { NavbarComponent } from '../shared/modules/navbar/navbar.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ContactsService } from '../services/contacts.service';

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
 

  selectedContact: Contact = {
    badgecolor: '#FFA35E',
    initials: 'AF',
    register: 'A',
    name: 'Arne Fröhlich',
    email: 'fröhlich@24-7.com',
    phone: '+49 815 79183212',
    selected: false,
  };
  registerLetters: string[] = [];

  

  constructor(private _renderer: Renderer2, public contactService : ContactsService) {
    this.getRegisterLetters();
    this.contactService.contacts.sort(this.compare);
  }

  ngOnInit() {
    this._renderer.setStyle(document.body, 'overflow-x', 'hidden');
  }

  getRegisterLetters() {
    this.contactService.contacts.forEach((contact) => {
      if (!this.registerLetters.includes(contact.register)) {
        this.registerLetters.push(contact.register);
      }
    });
    this.registerLetters.sort();
  }

  compare(a: Contact, b: Contact) {
    if (a.register < b.register) {
      return -1;
    }
    if (a.register > b.register) {
      return 1;
    }
    return 0;
  }

  showContactDetails(currentContact: Contact) {
    this.selectedContact = currentContact;
  }

  
}
