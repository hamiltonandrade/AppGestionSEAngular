import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {EmployeService} from '../../services/employe.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Employe} from '../../model/employe';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import * as $ from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent implements OnInit {

  employes: any;
  user: any;
  registerEmp: FormGroup;
  employ = new Employe();
  DataTable: any;


  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  // dtOptions: DataTables.Settings = {};
   dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(public auth: AuthService, private fb: FormBuilder, private employeService: EmployeService,
              private http: HttpClient) {
  }

  // Initialiser les methods

  ngOnInit(): void {

    // Datatables
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      dom: 'Bfrtip',
      language: {
        search: 'Chercher',
        paginate: {
          next: 'Suivant',
          previous: 'Precedent',
          first: 'Premier',
          last: 'Dernier'

        },
        info: 'Affichage de _START_ à _END_ de _TOTAL_ entrées',
        infoEmpty: 'Affichage de 0 à 0 entrées sur 0',
        infoFiltered: '(Filtrer de _MAX_ Entrées totales)'

      },
      lengthMenu: [
        [50, 75, 100, -1],
        ['50 Lignes', '75 Lignes', '100 Lignes', 'Afficher tout']
      ],
      // Configure the buttons
      buttons: [

      {
        extend: 'colvis',
        text: ' <i class="nav-icon fas fa-list"></i>',
        collectionLayout: 'fixed two-column',
        titleAttr: 'Colonnage'
      },
      {
        extend: 'print',
        text: ' <i class="nav-icon fas fa-file-pdf"></i>',
        titleAttr: 'PDF',
        exportOptions: {
          columns: [':visible:not(.not-export-col):not(.hidden)'],
        }
      },
      {
        extend: 'pageLength',
        text: ' <i class="nav-icon fas fa-list-ul"></i>',
        collectionLayout: 'fixed two-column',
        titleAttr: 'longueur de la page'
      }
    ],
    };

    // initialiser les methodes
    this.getEmployeData();
    this.onInsertDate();
    this.Onconnecte();
  }

  // Recevoir le data, et le mettre dans la table

  getEmployeData(): void {
    this.employeService.getEmploye().subscribe(res => {
      this.employes = res;
    });
  }

  // Verifier la connection du User
  Onconnecte(): void {
    this.http.get<any>(`${environment.api_url}/me`).subscribe(data => {
      this.user = data.user;
      // ADD THIS
      this.dtTrigger.next();

    }, (err) => {
      console.log('-----> err', err);
    });
  }

  onInsertDate() {
    this.registerEmp = this.fb.group({
      Name: ['', Validators.required],
      Prenom: ['', Validators.required],
      Salaire: ['', Validators.required],
    });

  }

  deleteData(id) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Voulez vous vraiment supprimer cette ligne?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.value) {
    this.employeService.supprimerEmploye(id).subscribe( res =>  {
      Swal.fire(
        'Supprimer!',
        'La suppression effectuté avec success.',
        'success'
      );
      this.getEmployeData();

    }, error1 => {
      console.log(error1);
    });
     }
    });
  }

  onSubmit(): void {
    if (this.registerEmp.invalid) {
      return;
    } else {
      this.employeService.insertEmploye(this.employ).subscribe(res => {
        Swal.fire({
          title: 'Information',
          text: 'Insertion effectuée avec success',
          icon: 'success',
          showCancelButton: true,
        });
      });
      this.getEmployeData();
    }
  }

}
