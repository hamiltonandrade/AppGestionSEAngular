import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Societe} from '../../model/societe';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {SocieteService} from '../../services/societe.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-societe-edit',
  templateUrl: './societe-edit.component.html',
  styleUrls: ['./societe-edit.component.css']
})
export class SocieteEditComponent implements OnInit {

  id: any;
  data: any;
  societe = new Societe();
  registerSoc: FormGroup;

  constructor( private route: ActivatedRoute, private fb: FormBuilder, private societeService: SocieteService) { }

  ngOnInit(): void {
    // console.log(this.route.snapshot.params.id);
    this.onInsertDate();
    this.id = this.route.snapshot.params.id;
    this.getData();
  }

  onInsertDate() {
    this.registerSoc = this.fb.group({
      Name: ['', Validators.required],
      Logo: ['', Validators.required],
      Adresse: ['', Validators.required],
    });

  }

  getData() {
    this.societeService.editSocietebyId(this.id).subscribe( res => {
      this.data = res;
      this.societe =  this.data;
    });
  }

  onSubmitSoc() {
    this.societeService.updateSocietebyId(this.societe).subscribe( res => {
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
