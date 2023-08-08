import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import  Records from '../app/interfaces/records.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from './models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private url ='https://identitytoolkit.googleapis.com/v1';
  private apiKey ='AIzaSyB_cvH3SYWbwdBe57pvW9xI7Vd3_QOdvWw';
  userToken: string='';

  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private firestore: Firestore, private http: HttpClient) { }
  logout(){}


  login(usuario:UsuarioModel){
    const authData ={
      ...usuario,
      /*email: usuario.email,
      password:usuario.password,*/
      returnSecureToken: true
    };
    return this.http.post(
      `${this.url}/accounts:signInWithPassword?key=${ this.apiKey}`,
      authData
    );
  }


  nuevoUsuario(usuario:UsuarioModel){
    const authData ={
      ...usuario,
      /*email: usuario.email,
      password:usuario.password,*/
      returnSecureToken: true
    };
    return this.http.post(
      `${this.url}/accounts:signUp?key=${ this.apiKey}`,
      authData
    ).pipe(
      map( resp=> {
        //this.guardarToken( resp['idToken'] );
        return resp;
      })
    );
  }

  private guardarToken(idToken: string){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  leerToken(){
    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token') || '{}';
    }else{
      this.userToken='';
    }
    return this.userToken;
  }

}

export interface operation{
  valor1:number;
  valor2:number;
  operacion:string;
  id_record?:Number;

}
