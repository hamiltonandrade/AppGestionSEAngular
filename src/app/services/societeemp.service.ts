import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SocieteempService {

  constructor( private http: HttpClient) { }

  getSocieteEmp() {
    return this.http.get<any>(`${environment.api_url}/SEmploye`);

  }

  inserSocieteEmp(data) {
    return this.http.post<any>(`${environment.api_url}/SEmployeAdd`, data);
  }

  supprimerSocieteEmp(id) {
    return this.http.get<any>(`${environment.api_url}/SEmployeDelete/` + id);
  }
  editSocieteEmpbyId(id) {
    return this.http.get<any>(`${environment.api_url}/SEmployeEdit/` + id);
  }
  updateSocieteEmpbyId(data) {
    return this.http.post<any>(`${environment.api_url}/SEmployeUpdate/`, data);
  }
}
