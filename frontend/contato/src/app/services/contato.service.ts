import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contato, ContatoRequest } from '../models/contato.model';

@Injectable({
  providedIn: 'root',
})
export class ContatoService {
  private apiUrl = 'http://localhost:8080/contato';

  constructor(private http: HttpClient) {}

  listar(): Observable<Contato[]> {
    return this.http.get<Contato[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Contato> {
    return this.http.get<Contato>(`${this.apiUrl}/${id}`);
  }

  buscarPorFamilia(familiaId: number): Observable<Contato[]> {
    return this.http.get<Contato[]>(`${this.apiUrl}/familia/${familiaId}`);
  }

  criar(contato: ContatoRequest): Observable<Contato> {
    return this.http.post<Contato>(this.apiUrl, contato);
  }

  atualizar(id: number, contato: ContatoRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, contato);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
