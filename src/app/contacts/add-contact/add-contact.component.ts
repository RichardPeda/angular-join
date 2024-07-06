import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
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
import { FormsModule, NgForm } from '@angular/forms';
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

  preparedcontact: Contact = {
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
  @Output() showNotification = new EventEmitter<boolean>();

  constructor(
    public contactService: ContactsService,
    public sessionService: SessiondataService
  ) {}
  timeout = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['slideIn'] && changes['slideIn'].currentValue == true) {
      this.createTimeout();
      if (this.contactService.slideInMode == 'edit') {
        this.preparedcontact = {...this.contact}
      }
    }
  }

  createTimeout() {
    this.timeout = true;
    setTimeout(() => {
      this.timeout = false;
    }, 500);
  }

  /**
   * Close the contact popup with slideout anmitation
   */
  closePopup() {
    if (!this.timeout) {
      this.slideIn = false;
      this.isClosed.emit(this.slideIn);
    }
  }

  /**
   * Submit the form with two different modes. Add contact and edit contact.
   */
  formSubmitted(ngForm: NgForm) {
    if (ngForm.valid && ngForm.submitted) {
      if (this.contactService.slideInMode === 'add') this.addNewContact();
      else this.editContact();

      ngForm.resetForm();
    }
  }

  /**
   * Edit the selected contact (contactID found). Emit to update, reset the form and close popup.
   */
  editContact() {
    let update = false;
    let saveContact;
    let newContacts: Contact[] = this.sessionService.user.contacts;
    newContacts.forEach((contact) => {
      if (contact.contactID === this.preparedcontact.contactID) {
        contact.name = this.preparedcontact.name;
        contact.email = this.preparedcontact.email;
        contact.phone = this.preparedcontact.phone;
        contact.initials = this.sessionService.getInitials(this.preparedcontact.name);
        (contact.register = this.sessionService
          .getInitials(this.preparedcontact.name)
          .charAt(0)),
          (update = true);

        console.log(this.preparedcontact);
      }
    });
    if (update) {
      this.sessionService.setContact(newContacts);
      //  this.contactService.selectContact(this.contact.contactID)
      // this.contactService.getFirstContact()
      console.log('add-contact', saveContact);

      this.sessionService.showContactDetails(this.contact);
    }

    this.listUpdate.emit(update);
    update = false;
    this.closePopup();
  }

  /**
   * Add new contact. Generates a random contactID and a random badgecolor. Reset form and clos popup.
   */
  async addNewContact() {
    let contact: Contact = {
      contactID: Math.floor(100000 + Math.random() * 900000).toString(),
      name: this.preparedcontact.name,
      email: this.preparedcontact.email,
      badgecolor: this.sessionService.getRandomBadgeColor(),
      phone: this.preparedcontact.phone,
      initials: this.sessionService.getInitials(this.preparedcontact.name),
      register: this.sessionService.getInitials(this.preparedcontact.name).charAt(0),
      selected: false,
    };

    let newContacts: Contact[] = this.sessionService.user.contacts;
    newContacts.push(contact);

    await this.sessionService.setContact(newContacts);
    this.showNotification.emit(true);
    this.closePopup();
  }
}
