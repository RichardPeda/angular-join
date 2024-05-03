import { Component, Input } from '@angular/core';
import { Contact } from '../../interfaces/contact.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss',
})
export class AddContactComponent {
  @Input() componentMode = 'add' || 'edit';
  @Input() contact: Contact = {
    badgecolor: '',
    name: '',
    email: '',
    phone: '',
    initials: '',
    register: '',
    selected: false,
  };
  headline = '';
  rightBtnText = '';

  constructor() {
    this.componentMode = 'edit';
    if (this.componentMode == 'edit') {
      this.headline = 'Edit contact';
      this.rightBtnText = 'Save';
    } else {
      this.headline = 'Add contact';
      this.rightBtnText = 'Create contact';
    }
  }
}
