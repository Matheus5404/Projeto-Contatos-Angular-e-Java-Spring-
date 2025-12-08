import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Contato } from '../../models/contato.model';
import { ContatoService } from '../../services/contato.service';

@Component({
  selector: 'app-contato-lista',
  standalone: false,
  templateUrl: './contato-lista.component.html',
  styleUrls: ['./contato-lista.component.css'],
})
export class ContatoListaComponent implements OnInit {
  contatos: Contato[] = [];
  loading = false;
  erro = '';
  sucesso = '';

  constructor(private contatoService: ContatoService, private router: Router) {}

  ngOnInit(): void {
    this.carregarContatos();
  }

  carregarContatos(): void {
    this.loading = true;
    this.erro = '';

    this.contatoService.listar().subscribe({
      next: (data) => {
        this.contatos = data;
        this.loading = false;
      },
      error: (err) => {
        this.erro = 'Erro ao carregar contatos. Verifique se o servidor está rodando.';
        this.loading = false;
        console.error('Erro:', err);
      },
    });
  }

  novoContato(): void {
    this.router.navigate(['/contatos/novo']);
  }

  editarContato(id: number): void {
    this.router.navigate(['/contatos', id, 'editar']);
  }

  deletarContato(id: number): void {
    if (!confirm('Tem certeza que deseja excluir este contato?')) {
      return;
    }

    this.loading = true;
    this.erro = '';
    this.sucesso = '';

    this.contatoService
      .deletar(id)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this.contatos = this.contatos.filter((c) => c.id !== id);
          this.sucesso = 'Contato excluido com sucesso.';
          this.erro = '';
        },
        error: (err) => {
          this.erro = 'Erro ao excluir contato.';
          console.error('Erro:', err);
        },
      });
  }
}
