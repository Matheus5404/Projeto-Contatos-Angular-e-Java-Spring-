import { Familia } from './familia.model';

export interface Contato {
  id?: number;
  nome: string;
  email: string;
  telefone: string;
  idade: string;
  cidade: string;
  familia?: Familia;
}

export interface ContatoRequest {
  nome: string;
  email: string;
  telefone: string;
  idade: string;
  cidade: string;
  familiaId?: number | null;
}
