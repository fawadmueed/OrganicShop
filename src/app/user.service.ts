import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AppUser } from './model/app-user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private db: AngularFireDatabase) { }

  save(user: firebase.User){
    this.db.object('/users/'+user.uid ).update({
      name: user.displayName,
      email: user.email
    })
  }

  get(uid: string): FirebaseObjectObservable<AppUser>{
    return this.db.object('/users/'+uid);
    //will return our actual Acpplication user obect
    //return type of the function is firbaseObejctObservable<any>  , Type is any,
    //we will properly annotate this.. So to do this create an interface ( structure ) of the receiving object
    //done. clean implementation
  }
}
