import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {EmployeService} from '../../services/employe.service';
import {Employe} from '../../model/employe';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employe-edit',
  templateUrl: './employe-edit.component.html',
  styleUrls: ['./employe-edit.component.css']
})
export class EmployeEditComponent implements OnInit {

  id: any;
  data: any;
  employ = new Employe();
  registerEmp: FormGroup;

  constructor( private route: ActivatedRoute, private fb: FormBuilder, private employeService: EmployeService) { }

  ngOnInit(): void {
    // console.log(this.route.snapshot.params.id);
    this.onInsertDate();
    this.id = this.route.snapshot.params.id;
    this.getData();
  }

  onInsertDate() {
    this.registerEmp = this.fb.group({
      Name: ['', Validators.required],
      Prenom: ['', Validators.required],
      Salaire: ['', Validators.required],
    });

  }

  getData() {
    this.employeService.editEmployebyId(this.id).subscribe( res => {
      this.data = res;
      this.employ =  this.data;
    });
  }

  onSubmitEmp() {
this.employeService.updateEmployebyId(this.employ).subscribe( res => {
Swal.fire({
      title: 'Information',
      text: 'Modification effectuée avec success',
      icon: 'success',
      showCancelButton: true,
    });
  }, error1 => {
  console.log(error1);
});
}

}
