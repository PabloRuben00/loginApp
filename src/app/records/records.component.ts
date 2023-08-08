import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Records from '../interfaces/records.interface';
import { ServicesService } from '../services.service';
import { OperationComponent} from '../operation/operation.component';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  //records_generados : FormGroup;
  //records: Records[];
  constructor(private recordServices: ServicesService){
    
  }

  ngOnInit(): void {
    
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  /*async onSubmit(){
    console.log(this.records_generados.value);
    const resp= await this.recordServices.addRecord(this.records_generados.value);
    console.log(resp); 

  }*/

}
