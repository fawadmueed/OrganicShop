import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../../user.service';
import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


import 'rxjs/add/operator/switchMap';
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{
 
  constructor(private auth: AuthService, private userService: UserService) {  }
  
  // canActivate() : Observable<boolean>{
    canActivate(){
    // return this.auth.user$.pipe(
    // switchMap(user => {
    //   //this is a firbase user
    //   //1. Get firebase user ( it has email , uid ,display name etc) it doesnot have isAdmin:ture property etc 
    //   //2.  Get Application user which have ( isAdmin ) property
    //   return this.userService.get(user.uid);
    // })).pipe(map(appUser=> {
    //   return appUser.isAdmin}
    // ));
    
    // this.auth.user$
    // .switchMap(user=>this.userService.get(user.uid))
    // .map(appUser => { 
    //   console.log(appUser);
    //     appUser.isAdmin;
    //     return true;
    // });

    return this.auth.user$.switchMap(user => this.userService.get(user.uid)).map(appUser => {
      if(appUser.isAdmin)
      { 
        return true; 
      }
      else
      {
        return false;
      }
    
    });
    
  
  }


}
