import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  constructor( private http: HttpClient) { }

  getEmploye() {
    return this.http.get<any>(`${environment.api_url}/Employes`);

  }

  insertEmploye(data) {
    return this.http.post<any>(`${environment.api_url}/EmployeAdd`, data);
  }

  supprimerEmploye(id) {
    return this.http.get<any>(`${environment.api_url}/EmployeDelete/` + id);
  }
  editEmployebyId(id) {
    return this.http.get<any>(`${environment.api_url}/EmployeEdit/` + id);
  }
  updateEmployebyId(data) {
    return this.http.post<any>(`${environment.api_url}/EmployeUpdate/`, data);
  }
}
