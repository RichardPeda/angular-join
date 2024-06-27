import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../../interfaces/contact.interface';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { ContactsService } from '../../services/contacts.service';
import { FormsModule } from '@angular/forms';
import { SessiondataService } from '../../services/sessiondata.service';
import { ClickOutsideDirective } from '../../shared/click-outside.directive';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ClickOutsideDirective],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss',
  animations: [
    trigger('slideAnimation', [
      state(
        'outside',
        style({
          transform: 'translate(200%, -50%)',
        })
      ),
      state(
        'inside',
        style({
          transform: 'translate(-50%, -50%)',
        })
      ),
      transition('inside <=> outside', [animate('1s')]),
    ]),
  ],
})
export class AddContactComponent {
  @Input() contact: Contact = {
    contactID: '',
    badgecolor: '',
    name: '',
    email: '',
    phone: '',
    initials: '',
    register: '',
    selected: false,
  };
  rightBtnText = '';

  @Input() slideIn: boolean = false;
  @Input() mobile: boolean = false;
  @Output() isClosed = new EventEmitter<boolean>();
  @Output() listUpdate = new EventEmitter<boolean>();

  constructor(
    public contactService: ContactsService,
    public sessionService: SessiondataService
  ) {}

  /**
   * Close the contact popup with slideout anmitation
   */
  closePopup() {
    this.slideIn = false;
    this.isClosed.emit(this.slideIn);
  }

  /**
   * Submit the form with two different modes. Add contact and edit contact.
   */
  formSubmitted() {
    if (this.contactService.slideInMode === 'add') this.addNewContact();
    else this.editContact();
  }

  /**
   * Edit the selected contact (contactID found). Emit to update, reset the form and close popup.
   */
  editContact() {
    let update = false;
    let newContacts: Contact[] = this.sessionService.user.contacts;
    newContacts.forEach((contact) => {
      if (contact.contactID === this.contact.contactID) {
        contact.name = this.contact.name;
        contact.email = this.contact.email;
        contact.phone = this.contact.phone;
        contact.initials = this.sessionService.getInitials(this.contact.name);
        (contact.register = this.sessionService
          .getInitials(this.contact.name)
          .charAt(0)),
          (update = true);
      }
    });
    if (update) this.sessionService.setContact(newContacts);

    this.listUpdate.emit(update);
    update = false;
    this.resetInput();
    this.closePopup();
  }

  /**
   * Add new contact. Generates a random contactID and a random badgecolor. Reset form and clos popup.
   */
  async addNewContact() {
    let contact: Contact = {
      contactID: Math.floor(100000 + Math.random() * 900000).toString(),
      name: this.contact.name,
      email: this.contact.email,
      badgecolor: this.sessionService.getRandomBadgeColor(),
      phone: this.contact.phone,
      initials: this.sessionService.getInitials(this.contact.name),
      register: this.sessionService.getInitials(this.contact.name).charAt(0),
      selected: false,
    };

    let newContacts: Contact[] = this.sessionService.user.contacts;
    newContacts.push(contact);

    await this.sessionService.setContact(newContacts);
    this.resetInput();
    this.closePopup();
  }

  /**
   * Reset the form
   */
  resetInput() {
    this.contact.name = '';
    this.contact.email = '';
    this.contact.phone = '';
  }
}
