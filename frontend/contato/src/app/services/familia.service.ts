import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Familia, FamiliaRequest } from '../models/familia.model';

@Injectable({
  providedIn: 'root',
})
export class FamiliaService {
  private apiUrl = 'http://localhost:8080/familia';

  constructor(private http: HttpClient) {}

  listar(): Observable<Familia[]> {
    return this.http.get<Familia[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Familia> {
    return this.http.get<Familia>(`${this.apiUrl}/${id}`);
  }

  criar(familia: FamiliaRequest): Observable<Familia> {
    return this.http.post<Familia>(this.apiUrl, familia);
  }

  atualizar(id: number, familia: FamiliaRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, familia);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
