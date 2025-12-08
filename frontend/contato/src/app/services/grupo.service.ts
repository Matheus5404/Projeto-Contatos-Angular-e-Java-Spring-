import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grupo, GrupoRequest } from '../models/grupo.model';

@Injectable({
  providedIn: 'root',
})
export class GrupoService {
  private apiUrl = 'http://localhost:8080/grupos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Grupo> {
    return this.http.get<Grupo>(`${this.apiUrl}/${id}`);
  }

  criar(grupo: GrupoRequest): Observable<Grupo> {
    return this.http.post<Grupo>(this.apiUrl, grupo);
  }

  atualizar(id: number, grupo: GrupoRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, grupo);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
