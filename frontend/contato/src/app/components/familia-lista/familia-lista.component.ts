import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Grupo } from '../../models/grupo.model';
import { GrupoService } from '../../services/grupo.service';

@Component({
  selector: 'app-grupo-lista',
  standalone: false,
  templateUrl: './familia-lista.component.html',
  styleUrls: ['./familia-lista.component.css'],
})
export class GrupoListaComponent implements OnInit {
  grupos: Grupo[] = [];
  loading = false;
  erro = '';
  sucesso = '';

  constructor(private grupoService: GrupoService, private router: Router) {}

  ngOnInit(): void {
    this.carregarGrupos();
  }

  carregarGrupos(): void {
    this.loading = true;
    this.erro = '';

    this.grupoService.listar().subscribe({
      next: (data) => {
        this.grupos = data;
        this.loading = false;
      },
      error: (err) => {
        this.erro = 'Erro ao carregar grupos. Verifique se o servidor está rodando.';
        this.loading = false;
        console.error('Erro:', err);
      },
    });
  }

  novoGrupo(): void {
    this.router.navigate(['/grupos/novo']);
  }

  editarGrupo(id: number): void {
    this.router.navigate(['/grupos', id, 'editar']);
  }

  deletarGrupo(id: number): void {
    if (
      !confirm(
        'Tem certeza que deseja excluir este grupo? Os contatos associados ficarão sem grupo.'
      )
    ) {
      return;
    }

    this.loading = true;
    this.erro = '';
    this.sucesso = '';

    this.grupoService
      .deletar(id)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this.grupos = this.grupos.filter((g) => g.id !== id);
          this.sucesso = 'Grupo excluido com sucesso.';
          this.erro = '';
        },
        error: (err) => {
          this.erro = 'Erro ao excluir grupo.';
          console.error('Erro:', err);
        },
      });
  }
}
