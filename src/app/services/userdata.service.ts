import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
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
  query,
  where,
  getDocs,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserdataService {
  firestore: Firestore = inject(Firestore);

  currentUser: User = {
    id: '',
    name: '',
    userinitials: '',
    email: '',
    password: '',
    contacts: [],
    tasks: [],
  };

  userId = '';

  allUsers: User[] = [];
  unsubUsers;

  constructor(private route: ActivatedRoute) {
    this.unsubUsers = onSnapshot(this.getUserRef(), (userList) => {
      userList.forEach((user) => {
        let data = user.data();
        this.allUsers.push(this.getCurrentUserData(user.id, data));
      });
    });
  }

  getCurrentUserName(name: string, user: any) {
    if (user.name == name) {
      return user;
    }
  }

  getCurrentUserData(id: string, user: DocumentData): User {
    let currentuser: User = {
      id: id,
      name: user?.['name'],
      email: user?.['email'],
      userinitials: user?.['userinitials'],
      password: user?.['password'],
      contacts: user?.['contacts'],
      tasks: user?.['tasks'],
    };
    return currentuser;
  }

  async addUser(user: User) {
    const docRef = await addDoc(this.getUserRef(), {
      name: user.name,
      email: user.email,
      password: user.password,
      contacts: [
        {
          id: '1',
          badgecolor: '#1FD7C1',
          initials: 'RS',
          register: 'R',
          name: 'Rainer Sonnenschein',
          email: 'sonnenschein@draussen.de',
          phone: '+49 30 5678 9456',
          selected: false,
        },
        {
          id: '2',
          badgecolor: '#00BEE8',
          initials: 'PN',
          register: 'P',
          name: 'Pia Nist',
          email: 'musikerin@mitherz.de',
          phone: '+49 221 3456412',
          selected: false,
        },
        {
          id: '3',
          badgecolor: '#FFA35E',
          initials: 'AF',
          register: 'A',
          name: 'Arne Fröhlich',
          email: 'fröhlich@24-7.com',
          phone: '+49 815 79183212',
          selected: false,
        },
        {
          id: '4',
          badgecolor: '#FFA35E',
          initials: 'KE',
          register: 'K',
          name: 'Karl Ender',
          email: 'karlender@datum.com',
          phone: '+49 711 3652987',
          selected: false,
        },
        {
          id: '5',
          badgecolor: '#FF745E',
          initials: 'KH',
          register: 'K',
          name: 'Klara Himmel',
          email: 'gerne@sommer.de',
          phone: '+49 123 456 789',
          selected: false,
        },
        {
          id: '6',
          badgecolor: '#00BEE8',
          initials: 'CK',
          register: 'C',
          name: 'Christiane Krise',
          email: 'krise@serveranbindung.de',
          phone: '+49 221 3456413',
          selected: false,
        },
        {
          id: '7',
          badgecolor: '#FF7A00',
          initials: 'JD',
          register: 'J',
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '835769376',
          selected: false,
        },
        {
          id: '8',
          badgecolor: '#FF5EB3',
          initials: 'AS',
          register: 'A',
          name: 'Alice Smith',
          email: 'alice.smith@example.com',
          phone: '835769377',
          selected: false,
        },
        {
          id: '9',
          badgecolor: '#6E52FF',
          initials: 'MP',
          register: 'M',
          name: 'Michael Phillips',
          email: 'michael.phillips@example.com',
          phone: '835769378',
          selected: false,
        },
        {
          id: '10',
          badgecolor: '#9327FF',
          initials: 'EK',
          register: 'E',
          name: 'Emily King',
          email: 'emily.king@example.com',
          phone: '835769379',
          selected: false,
        },
      ],
    });
  }

  loginAsGuest() {
    this.allUsers.forEach((user) => {
      if (user.name == 'guest') {
        this.currentUser = user;
        this.saveIdInSessionStorage(user.id!);
        this.route.params.subscribe((params) => {});
      }
    });
  }

  saveIdInSessionStorage(id: string) {
    sessionStorage.setItem('userId', id);
  }

  saveDataInSessionStorage(key: string, data: string) {
    sessionStorage.setItem(key, data);
  }
  deleteDataInSessionStorage(key: string) {
    sessionStorage.removeItem(key);
  }

  loadIdFromSessionStorage(): string {
    let id = sessionStorage.getItem('userId');
    if (id) return id;
    else return '';
  }

  loadDataFromSessionStoarage(key: string): string {
    let dataString = sessionStorage.getItem(key);
    if (dataString) return dataString;
    else return '';
  }

  async getUserData(docId: string) {
    const docRef = doc(this.getUserRef(), docId);
    const docSnap = await getDoc(docRef);
    this.currentUser = this.getCurrentUserData(docId, docSnap);
  }

  ngOnDestroy() {
    this.unsubUsers();
    // this.unsubGuest();
    // this.users.unsubscribe();
  }

  getUserRef() {
    return collection(this.firestore, 'users');
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

  async checkIfUserDontExists(name: string, email: string): Promise<boolean> {
    const q = query(
      collection(this.firestore, 'users'),

      where('email', '==', email)
    );

    let snapshot = await getDocs(q);

    return snapshot.size > 0 ? false : true;
  }
}
