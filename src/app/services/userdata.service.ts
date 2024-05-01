import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Firestore, collectionData, collection, doc, onSnapshot, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  firestore: Firestore = inject(Firestore);

  // users$;
  // users;

  unsubUsers;

  constructor() {

    this.unsubUsers = onSnapshot(this.getUserRef(), (userList) => {
      userList.forEach(user => {
        console.log(user.id);
        console.log(user.data());
      });
    })



    // this.users$ = collectionData(this.getUserRef());
    // this.users = this.users$.subscribe((userList) => {
    //   userList.forEach(user => {
    //     console.log(user);
    //   });
    // })
  }

  async addUser(user: User) {
    const docRef = await addDoc(this.getUserRef(), {
      name: user.name,
      email: user.email,
      password: user.password,
    });
    console.log("Document written with ID: ", docRef.id);
  }

  ngOnDestroy() {
    this.unsubUsers();
    // this.users.unsubscribe();
  }

  getUserRef() {
    return collection(this.firestore, 'users');
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }
}
