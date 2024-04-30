import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Firestore, collectionData, collection, doc, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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
