import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Semp} from '../../model/semp';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {SocieteempService} from '../../services/societeemp.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-societe-emp-edit',
  templateUrl: './societe-emp-edit.component.html',
  styleUrls: ['./societe-emp-edit.component.css']
})
export class SocieteEmpEditComponent implements OnInit {

  id: any;
  data: any;
  societeemp = new Semp();
  registerSocEmp: FormGroup;

  constructor( private route: ActivatedRoute, private fb: FormBuilder, private societeEmpService: SocieteempService) { }

  ngOnInit(): void {
    // console.log(this.route.snapshot.params.id);
    this.onInsertDate();
    this.id = this.route.snapshot.params.id;
    this.getData();
  }

  onInsertDate() {
    this.registerSocEmp = this.fb.group({
      id_emp: ['', Validators.required],
      id_soc: ['', Validators.required],
    });

  }

  getData() {
    this.societeEmpService.editSocieteEmpbyId(this.id).subscribe( res => {
      this.data = res;
      this.societeemp =  this.data;
    });
  }

  onSubmitSocEmp() {
    this.societeEmpService.updateSocieteEmpbyId(this.societeemp).subscribe( res => {
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
