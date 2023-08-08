import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ServicesService } from '../services.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UsuarioModel } from '../models/usuario.model';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css']
})
export class OperationComponent implements OnInit{
  formularioOperacion : FormGroup;
  //operacion: operation[] = [];
  usuario: UsuarioModel = new UsuarioModel();
  today = new Date();
  username = 'admin';
  password = 'admin';
  balance=1000;
  current_balance:number=0;
  operation_response= new Boolean;
  value1:number=0;
  value2:number=0;
  resultado:number=0;
  opcion:string='';
  aleatorios:string='';
  temp:number=0;

  constructor( private OperationServices: ServicesService, private router:Router){
   /* this.formularioOperacion = new FormGroup({
      id : new FormControl(),
      username: new FormControl(),
      password: new FormControl(), 
      status: new FormControl()
    })*/

    this.aleatorios= this.StringsRandom();

    this.formularioOperacion = new FormGroup({
      value1: new FormControl(),
      value2: new FormControl(),
      selectOption: new FormControl(),
      current_Date: new FormControl(this.today),
      amount: new FormControl(this.balance),
      operationId: new FormControl(this.idOperationRandom()),
      aleatorioString: new FormControl(this.aleatorios)
    })

  }
  async ngSubmit(){
    console.log(this.formularioOperacion.value);
    const response = this.OperationServices.addRecords(this.formularioOperacion.value);
    console.log(response);
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  salir(){
    this.OperationServices.logout();
    this.router.navigateByUrl('../login');

  }
  OperationProcess(){
    let addition = 100;
    let multiplication = 200;
    let square_root = 250;
    //let string_generator = 500;
    let substraction = 150;
    let division = 320;
    this.value1 = this.formularioOperacion.value.value1;
    this.value2 = this.formularioOperacion.value.value2;
    switch(this.opcion)
    {
      case 'addition':
        if(this.balance < addition){
          console.log('cannot process request');
          Swal.fire({
            icon: 'error',
            text:'Insuficient founds in your balance'
          })
        }else{
          this.resultado = (this.value1 + this.value2);
          this.current_balance= this.balance-addition;
          console.log(this.resultado);
          console.log(this.current_balance);
        }
        break;
      case 'multiplication':
        if(this.balance < multiplication){
          console.log('cannot process request');
          Swal.fire({
            icon: 'error',
            text:'Insuficient founds in your balance'
          })
        }else{
          this.resultado = this.value1 * this.value2;
          this.current_balance= this.balance-multiplication;
          console.log(this.resultado);
          console.log(this.current_balance);
        }
        break;
      case 'substraction':
        if(this.balance < substraction){
          console.log('cannot process request');
          Swal.fire({
            icon: 'error',
            text:'Insuficient founds in your balance'
          })
        }else{
          this.resultado = this.value1 - this.value2;
          this.current_balance= this.balance-substraction;
          console.log(this.resultado);
          console.log(this.current_balance);
        }
        break;
        case 'division':
          if(this.balance < division){
            console.log('cannot process request');
            Swal.fire({
              icon: 'error',
              text:'Insuficient founds in your balance'
            })
          }else{
            if((this.value1/this.value2)%2 !=0){
              this.resultado = this.value1 / this.value2;
              this.current_balance= this.balance-division;
              console.log(this.resultado);
              console.log(this.current_balance);
              break;
            }else{
              Swal.fire({
                icon: 'error',
                text: 'Unable to divide'
              })
            }
            break;
            
          }
          break;
          case 'square':
            if(this.balance < square_root){
              console.log('cannot process request');
              Swal.fire({
                icon: 'error',
                text:'Insuficient founds in your balance'
              })
            }else{
              this.resultado = Math.sqrt(this.value1);
              this.current_balance= this.balance-square_root;
              console.log(this.resultado);
          console.log(this.current_balance);
            }
            break;
    }

    //return this.current_balance;
    
  }

  showModal() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: 'This action cannot be revert it',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar ',
      cancelButtonText: ' Cancelar ',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Delete!',
          'Register deleted',
          'success'
        );
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancel',
          'Register not deleted...',
          'error'
        );
      }
    });

  }

  // funcion que manda los valores a guardar en firebase
 /* async onSubmit(){
    console.log(this.formularioOperacion.value);
    const resp= await this.OperationServices.addRecord(this.formularioOperacion.value);
    console.log(resp);
  }*/

  idOperationRandom():number{
    let random;
    random=  Math.floor(Math.random() * 1000);
    console.log(random);
    return random;
   
  }

  StringsRandom() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < charactersLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
  
}
