import { Injectable, inject } from '@angular/core';
import { UserdataService } from './userdata.service';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  onSnapshot,
  addDoc,
  QuerySnapshot,
  DocumentData,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { User } from '../interfaces/user.interface';
import { Contact } from '../interfaces/contact.interface';
import { Subject } from 'rxjs';
import { Task } from '../interfaces/task.interface';
@Injectable({
  providedIn: 'root',
})
export class SessiondataService {
  public userSubject = new Subject<User>(); 
  public registerLettersSubject = new Subject<string[]>(); 
  docId = '';
  unsubGuest: any;
  firestore: Firestore = inject(Firestore);
  user: User = {
    id: '',
    name: '',
    email: '',
    password: '',
    contacts: [],
    tasks: [],
  };
  contacts = [];
  tasks = [];
  profileBadgeColors = [
    '#FF7A00',
    '#FF5EB3',
    '#6E52FF',
    '#9327FF',
    '#00BEE8',
    '#1FD7C1',
    '#FF745E',
    '#FFA35E',
    '#FC71FF',
    '#FFC701',
    '#0038FF',
    '#C3FF2B',
    '#FFE62B',
    '#FF4646',
    '#FFBB2B',
  ];
  registerLetters: string[] = [];

  unsubUser;

  constructor(private userService: UserdataService) {
    this.docId = this.userService.loadIdFromSessionStorage();

    this.unsubUser = onSnapshot(
      this.userService.getSingleDocRef('users', this.docId),
      (doc) => {
        let data = doc.data();
        this.user = this.userService.getCurrentUserData(doc.id, data!);
        console.log('dieser user', this.user);
        this.userSubject.next(this.user)
      }
    );
  }

  ngOnDestroy() {
    this.unsubUser();
  }

  async getData(id: string) {
    let docRef = this.userService.getSingleDocRef('users', this.docId);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }

  async setContact(contact: Contact[]) {
    let docRef = this.userService.getSingleDocRef('users', this.docId);
    console.log('contact is set');
    await updateDoc(docRef, {
      contacts: contact,
    });
    this.getRegisterLetters(contact)
  }

  async setTask(task: Task[]){
    let docRef = this.userService.getSingleDocRef('users', this.docId);
    console.log('task is set');
    await updateDoc(docRef, {
      tasks: task,
    });
    
  }

  deleteContact(contact: Contact) {
    console.log('delete');
    
    let update = false;
    let newContacts: Contact[] = this.user.contacts;
    newContacts.forEach((newContact, index) => {
      if (newContact.contactID === contact.contactID) {
        newContacts.splice(index, 1);
        update = true;
      }
    });
    if (update) this.setContact(newContacts);
    update = false;
    this.getRegisterLetters(this.user.contacts)
  }

  getInitials(name: string) {
    let splitName = name.split(' ', 2);

    let name_1 =
      typeof splitName[0].charAt(0) == 'string'
        ? splitName[0].charAt(0).toUpperCase()
        : '';
    let name_2 =
      typeof splitName[1]?.charAt(0) == 'string'
        ? splitName[1].charAt(0).toUpperCase()
        : '';

    return name_1 + name_2;
  }

  getRandomBadgeColor() {
    return this.profileBadgeColors[
      Math.round(Math.random() * this.profileBadgeColors.length)
    ];
  }

  getRegisterLetters(contacts: Contact[]) {
    this.registerLetters = [];
    contacts.forEach((contact) => {
      if (!this.registerLetters.includes(contact.register)) {
        this.registerLetters.push(contact.register);
      }
    });
    this.registerLetters.sort();
    this.registerLettersSubject.next(this.registerLetters)
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
}
