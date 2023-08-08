import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
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
  addRecords(record:Records){
    const recordsRef = collection(this.firestore, 'registros');
    return addDoc(recordsRef, record);

  }
  getRecords(): Observable<Records[]>{
    const registroReference = collection(this.firestore, 'registros');
    return collectionData(registroReference, {idField:'id'}) as Observable<Records[]>;
    
  }

  deleteRecords(record : Records){
    const recordsReference = doc(this.firestore, `record/${record.id}`);
    return deleteDoc(recordsReference);
  }

  logout(){
    localStorage.removeItem('token');
  }

  login(usuario: UsuarioModel){
    const authData ={
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }/accounts:signInWithPassword?key=${this.apiKey}`,
      authData
    ).pipe(
      map(resp =>{
        console.log('entro en el mapas de rjx');
        //this.guardarToken(resp['idToken']);
        return resp;

      })
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

  private guardarToken(idToken:string){
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

  estaAutenticado(): boolean{
    return this.userToken.length > 2;
  }


}

