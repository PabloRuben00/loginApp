import { Component } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { NgForm } from '@angular/forms';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  usuario!: UsuarioModel;
  constructor(private auth:ServicesService){}
  ngOnInit() {
    this.usuario = new UsuarioModel();
    //this.usuario.email = 'pablo.rubenm14@gmail.com';
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
  onSubmit(form: NgForm){
    if(form.invalid){
      return;
    }
    /*console.log('formulario enviado');
    console.log(this.usuario);
    console.log(form);*/
    this.auth.nuevoUsuario( this.usuario).subscribe( resp =>{
      console.log(resp);
    }, (err) =>
    {
      console.log(err.error.error.message);
    });
  }

}
