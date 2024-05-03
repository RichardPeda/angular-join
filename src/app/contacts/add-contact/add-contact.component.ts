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

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
  @Output() isClosed = new EventEmitter<boolean>();


  constructor(public contactService: ContactsService) {
  }

  closePopup() {
    this.slideIn = false;
    this.isClosed.emit(this.slideIn);
  }
}
