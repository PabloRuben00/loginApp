import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import {Injectable} from '@angular/core';
import { Observable} from 'rxjs';
import { ServicesService} from '../services.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth:ServicesService, private router:Router){

  }
  canActivate(): boolean{
    //throw new Error('Method not implemented.');
    console.log('Guard');
    if(this.auth.estaAutenticado()){
      return true;
    }else{
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}

