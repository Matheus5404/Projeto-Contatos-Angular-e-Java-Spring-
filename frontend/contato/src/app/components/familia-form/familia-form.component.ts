import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GrupoService } from '../../services/grupo.service';
import { GrupoRequest } from '../../models/grupo.model';

@Component({
  selector: 'app-grupo-form',
  standalone: false,
  templateUrl: './familia-form.component.html',
  styleUrls: ['./familia-form.component.css'],
})
export class GrupoFormComponent implements OnInit {
  form!: FormGroup;
  isEdicao = false;
  grupoId?: number;
  loading = false;
  erro = '';
  sucesso = '';

  constructor(
    private fb: FormBuilder,
    private grupoService: GrupoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.inicializarForm();

    // Verificar se é edição
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdicao = true;
      this.grupoId = +id;
      this.carregarGrupo();
    }
  }

  inicializarForm(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  carregarGrupo(): void {
    this.loading = true;
    this.grupoService.buscarPorId(this.grupoId!).subscribe({
      next: (grupo) => {
        this.form.patchValue({
          nome: grupo.nome,
        });
        this.loading = false;
      },
      error: (err) => {
        this.erro = 'Erro ao carregar grupo.';
        this.loading = false;
        console.error('Erro:', err);
      },
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.erro = '';
    this.sucesso = '';

    const grupo: GrupoRequest = {
      nome: this.form.value.nome,
    };

    if (this.isEdicao) {
      this.grupoService.atualizar(this.grupoId!, grupo).subscribe({
        next: () => {
          this.sucesso = 'Grupo atualizado com sucesso!';
          this.loading = false;
          setTimeout(() => this.router.navigate(['/grupos']), 1500);
        },
        error: (err) => {
          this.erro = 'Erro ao atualizar grupo.';
          this.loading = false;
          console.error('Erro:', err);
        },
      });
    } else {
      this.grupoService.criar(grupo).subscribe({
        next: () => {
          this.sucesso = 'Grupo criado com sucesso!';
          this.loading = false;
          setTimeout(() => this.router.navigate(['/grupos']), 1500);
        },
        error: (err) => {
          this.erro = 'Erro ao criar grupo.';
          this.loading = false;
          console.error('Erro:', err);
        },
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/grupos']);
  }

  // Getter para validação
  get nome() {
    return this.form.get('nome');
  }
}
