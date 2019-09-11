import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
                 
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route, state: RouterStateSnapshot ) 
  {
    //using map operator instead of subscribe
    //canActivate methods should return boolean or observable or promise 
    //map will return user$ as a boolean
    //map operator --> observable of FirebaseUser to observable of boolean
     
     return this.auth.user$.map(user=>{
      if(user) return true;
      this.router.navigate(['/login'], {queryParams: { returnUrl: state.url }});      
      return false;
    }); 
  }
}
