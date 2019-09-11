import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase  from 'firebase';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/Rx';
// import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  x: number;
  fawad: string;
  user$: Observable<firebase.User>;


  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute)  {
    this.user$ = afAuth.authState;
    // afAuth.authState.subscribe(x=> (console.log(x)))
  }

   login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/' ;
    localStorage.setItem( 'returnUrl' , returnUrl );
    console.log(returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
   }

   logout(){
     this.afAuth.auth.signOut();
  

   }

   authState(){
     this.afAuth.authState;
    
   }
}


