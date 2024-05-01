import { Component, Input } from '@angular/core';
import { Contact } from '../../interfaces/contact.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-singlecontact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './singlecontact.component.html',
  styleUrl: './singlecontact.component.scss'
})
export class SinglecontactComponent {

  @Input() contact: Contact = {
    badgecolor: '',
    name: '',
    email: '',
    phone: '',
    initials: '',
    register: '',
    selected: false
  }



}
