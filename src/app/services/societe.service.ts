import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SocieteService {


  constructor( private http: HttpClient) { }

  getSociete() {
    return this.http.get<any>(`${environment.api_url}/Societes`);

  }

  inserSociete(data) {
    return this.http.post<any>(`${environment.api_url}/SocieteAdd`, data);
  }

  supprimerSociete(id) {
    return this.http.get<any>(`${environment.api_url}/SocieteDelete/` + id);
  }
  editSocietebyId(id) {
    return this.http.get<any>(`${environment.api_url}/SocieteEdit/` + id);
  }
  updateSocietebyId(data) {
    return this.http.post<any>(`${environment.api_url}/SocieteUpdate/`, data);
  }
}
