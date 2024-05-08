import { Component, Input } from '@angular/core';
import { Contact } from '../../../interfaces/contact.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-selection.component.html',
  styleUrl: './contact-selection.component.scss'
})
export class ContactSelectionComponent {

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

}
