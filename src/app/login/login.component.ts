import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;

  constructor(private auth: ServicesService, private router: Router){}

  ngOnInit() {
    
  }

  login(form: NgForm){
    if(form.invalid){return;}
    console.log(form);


    this.auth.login(this.usuario).subscribe( resp=>{
      console.log(resp);//contiene el token

    }, (err) =>{
      console.log(err.error.error.message);
    });

  }

}
