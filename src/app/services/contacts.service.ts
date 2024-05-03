import { Injectable } from '@angular/core';
import { Contact } from '../interfaces/contact.interface';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  showSlider = false;
  slideInMode = 'add' || 'edit';

  constructor() {}

  contacts: Contact[] = [
    {
      badgecolor: '#1FD7C1',
      initials: 'RS',
      register: 'R',
      name: 'Rainer Sonnenschein',
      email: 'sonnenschein@draussen.de',
      phone: '+49 30 5678 9456',
      selected: false,
    },
    {
      badgecolor: '#00BEE8',
      initials: 'PN',
      register: 'P',
      name: 'Pia Nist',
      email: 'musikerin@mitherz.de',
      phone: '+49 221 3456412',
      selected: false,
    },
    {
      badgecolor: '#FFA35E',
      initials: 'AF',
      register: 'A',
      name: 'Arne Fröhlich',
      email: 'fröhlich@24-7.com',
      phone: '+49 815 79183212',
      selected: false,
    },
    {
      badgecolor: '#FFA35E',
      initials: 'KE',
      register: 'K',
      name: 'Karl Ender',
      email: 'karlender@datum.com',
      phone: '+49 711 3652987',
      selected: false,
    },
    {
      badgecolor: '#FF745E',
      initials: 'KH',
      register: 'K',
      name: 'Klara Himmel',
      email: 'gerne@sommer.de',
      phone: '+49 123 456 789',
      selected: false,
    },
    {
      badgecolor: '#00BEE8',
      initials: 'CK',
      register: 'C',
      name: 'Christiane Krise',
      email: 'krise@serveranbindung.de',
      phone: '+49 221 3456413',
      selected: false,
    },
    {
      badgecolor: '#FF7A00',
      initials: 'JD',
      register: 'J',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '835769376',
      selected: false,
    },
    {
      badgecolor: '#FF5EB3',
      initials: 'AS',
      register: 'A',
      name: 'Alice Smith',
      email: 'alice.smith@example.com',
      phone: '835769377',
      selected: false,
    },
    {
      badgecolor: '#6E52FF',
      initials: 'MP',
      register: 'M',
      name: 'Michael Phillips',
      email: 'michael.phillips@example.com',
      phone: '835769378',
      selected: false,
    },
    {
      badgecolor: '#9327FF',
      initials: 'EK',
      register: 'E',
      name: 'Emily King',
      email: 'emily.king@example.com',
      phone: '835769379',
      selected: false,
    },
  ];

  selectedContact: Contact = {
    badgecolor: '#FFA35E',
    initials: 'AF',
    register: 'A',
    name: 'Arne Fröhlich',
    email: 'fröhlich@24-7.com',
    phone: '+49 815 79183212',
    selected: false,
  };

  emptyContact: Contact = {
    badgecolor: '',
    name: '',
    email: '',
    phone: '',
    initials: '',
    register: '',
    selected: false,
  };

  showContactDetails(currentContact: Contact) {
    this.selectedContact = currentContact;
  }

  editContact(currentContact: Contact) {
    this.selectedContact = currentContact;
    this.slideInMode = 'edit';
    this.slideInPopup();
  }

  addPopup() {
    this.slideInMode = 'add';
    this.slideInPopup();
  }

  slideInPopup() {
    this.showSlider = true;
  }
  slideOutPopup(value: boolean) {
    setTimeout(() => {
      this.showSlider = value;
    }, 1000);
  }
}
