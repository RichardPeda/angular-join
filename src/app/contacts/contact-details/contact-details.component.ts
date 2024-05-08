import { Component, inject, Input } from '@angular/core';
import { Contact } from '../../interfaces/contact.interface';
import { CommonModule } from '@angular/common';
import { ContactsService } from '../../services/contacts.service';
import { SessiondataService } from '../../services/sessiondata.service';

@Component({
  selector: 'app-contact-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss',
})
export class ContactDetailsComponent {

  @Input() contact: Contact = {
    contactID : '',
    badgecolor: '',
    name: '',
    email: '',
    phone: '',
    initials: '',
    register: '',
    selected: false,
  };

  contactService : ContactsService = inject(ContactsService)
  sessionService : SessiondataService = inject(SessiondataService);

  constructor(){

  }
}
