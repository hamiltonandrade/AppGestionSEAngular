import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {SocieteempService} from '../../services/societeemp.service';
import {Semp} from '../../model/semp';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import Swal from "sweetalert2";


@Component({
  selector: 'app-societe-emp',
  templateUrl: './societe-emp.component.html',
  styleUrls: ['./societe-emp.component.css']
})
export class SocieteEmpComponent implements OnInit {

  societeemploye: any;
  user: any;
  registerSocEmp: FormGroup;
  societeEmp = new Semp();
  DataTable: any;

  constructor(public auth: AuthService, private fb: FormBuilder, private societeEmpService: SocieteempService,
              private http: HttpClient) {
  }
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  // dtOptions: DataTables.Settings = {};
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();


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
    // Methods
    this.getSocieteEmpData();
    this.onInsertDate();
    this.Onconnecte();
  }

  // Recevoir le data, et le mettre dans la table

  getSocieteEmpData(): void {
    this.societeEmpService.getSocieteEmp().subscribe(res => {
      this.societeemploye = res;
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
    this.registerSocEmp = this.fb.group({
      id_emp: ['', Validators.required],
      id_soc: ['', Validators.required],
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
    this.societeEmpService.supprimerSocieteEmp(id).subscribe( res =>  {
      Swal.fire(
        'Supprimer!',
        'La suppression effectuté avec success.',
        'success'
      );
      this.getSocieteEmpData();

    }, error1 => {
      console.log(error1);
    });
      }
    });
  }


  onSubmitSocEmp(): void {
    if (this.registerSocEmp.invalid) {
      return;
    } else {
      this.societeEmpService.inserSocieteEmp(this.societeEmp).subscribe(res => {
        Swal.fire({
          title: 'Information',
          text: 'Insertion effectuée avec success',
          icon: 'success',
          showCancelButton: true,
        });
      });
      this.getSocieteEmpData();
    }
  }

}





