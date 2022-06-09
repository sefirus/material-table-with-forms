import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Procedure } from '../Procedure';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
  

@Injectable({
  providedIn: 'root'
})
export class ProcedureService {
    private apiUrl : string = 'http://localhost:5000/procedures';

  constructor(private   http: HttpClient) { }

  getProcedures(): Observable<Procedure[]>{
      return this.http?.get<Procedure[]>(this.apiUrl, httpOptions);
  }

  deleteProcedure(procedure : Procedure): Observable<Procedure>{
    const url = `${this.apiUrl}/${procedure.id}`;
    console.log(url);
    return this.http.delete<Procedure>(url);
  }

  deleteProcedureById(id: number): Observable<Procedure>{
    const url = `${this.apiUrl}/${id}`;
    console.log(url);
    return this.http.delete<Procedure>(url);
  }

  updateProcedure(procedure: Procedure): Observable<Procedure>{
    const url = `${this.apiUrl}/${procedure.id}`;
    return this.http.put<Procedure>(url, procedure, httpOptions);
  }

  addProcedure(procedure: Procedure): Observable<Procedure>{
    return this.http.post<Procedure>(this.apiUrl, procedure, httpOptions);
  }
}
