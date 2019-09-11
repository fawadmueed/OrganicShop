import { Injectable, Input } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
// import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})


export class TestAuthGuard implements CanActivate {
  constructor(public servi: AuthService,public router:Router,public auth: AuthService){ }
  @Input() isLogin; 
  
  
  canActivate() 
  {
    //using map operator instead of subscribe
    //canActivate methods should return boolean or observable or promise 
    //map will return user$ as a boolean
    //map operator --> observable of FirebaseUser to observable of boolean
    
      this.auth.user$.subscribe(user =>{
      if(user) return true;
      this.router.navigate(['/login']);      
      return false;
    }); 
    return true;
  }

}
