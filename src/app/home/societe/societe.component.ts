import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Societe} from '../../model/societe';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {SocieteService} from '../../services/societe.service';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-societe',
  templateUrl: './societe.component.html',
  styleUrls: ['./societe.component.css']
})
export class SocieteComponent implements OnInit {

  societes: any;
  user: any;
  registerSoc: FormGroup;
  societe = new Societe();
  DataTable: any;

  constructor(public auth: AuthService, private fb: FormBuilder, private societeService: SocieteService,
              private http: HttpClient) {
  }


  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  // dtOptions: DataTables.Settings = {};
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

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

    this.getSocieteData();
    this.onInsertDate();
    this.Onconnecte();
  }

  // Recevoir le data, et le mettre dans la table

  getSocieteData(): void {
    this.societeService.getSociete().subscribe(res => {
      this.societes = res;
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
    this.registerSoc = this.fb.group({
      Name: ['', Validators.required],
      Logo: ['', Validators.required],
      Adresse: ['', Validators.required],
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
        this.societeService.supprimerSociete(id).subscribe(res => {
          Swal.fire(
            'Supprimer!',
            'La suppression effectuté avec success.',
            'success'
          );
          this.getSocieteData();

        }, error1 => {
          console.log(error1);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.registerSoc.invalid) {
      return;
    } else {
      this.societeService.inserSociete(this.societe).subscribe(res => {
        Swal.fire({
          title: 'Information',
          text: 'Insertion effectuée avec success',
          icon: 'success',
          showCancelButton: true,
        });
      });
      this.getSocieteData();
    }
  }
}
