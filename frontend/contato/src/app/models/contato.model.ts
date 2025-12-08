import { Grupo } from './grupo.model';

export interface Contato {
  id?: number;
  nome: string;
  email: string;
  telefone: string;
  idade: string;
  cidade: string;
  grupo?: Grupo;
}

export interface ContatoRequest {
  nome: string;
  email: string;
  telefone: string;
  idade: string;
  cidade: string;
  grupoId?: number | null;
}
