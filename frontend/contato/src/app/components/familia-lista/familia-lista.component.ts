import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Familia } from '../../models/familia.model';
import { FamiliaService } from '../../services/familia.service';

@Component({
  selector: 'app-familia-lista',
  standalone: false,
  templateUrl: './familia-lista.component.html',
  styleUrls: ['./familia-lista.component.css'],
})
export class FamiliaListaComponent implements OnInit {
  familias: Familia[] = [];
  loading = false;
  erro = '';

  constructor(private familiaService: FamiliaService, private router: Router) {}

  ngOnInit(): void {
    this.carregarFamilias();
  }

  carregarFamilias(): void {
    this.loading = true;
    this.erro = '';

    this.familiaService.listar().subscribe({
      next: (data) => {
        this.familias = data;
        this.loading = false;
      },
      error: (err) => {
        this.erro = 'Erro ao carregar grupos. Verifique se o servidor está rodando.';
        this.loading = false;
        console.error('Erro:', err);
      },
    });
  }

  novaFamilia(): void {
    this.router.navigate(['/grupos/novo']);
  }

  editarFamilia(id: number): void {
    this.router.navigate(['/grupos', id, 'editar']);
  }

  deletarFamilia(id: number): void {
    if (
      confirm(
        'Tem certeza que deseja excluir este grupo? Os contatos associados ficarão sem grupo.'
      )
    ) {
      this.familiaService.deletar(id).subscribe({
        next: () => {
          this.carregarFamilias();
        },
        error: (err) => {
          this.erro = 'Erro ao excluir grupo.';
          console.error('Erro:', err);
        },
      });
    }
  }
}
