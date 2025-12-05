import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FamiliaService } from '../../services/familia.service';
import { FamiliaRequest } from '../../models/familia.model';

@Component({
  selector: 'app-familia-form',
  standalone: false,
  templateUrl: './familia-form.component.html',
  styleUrls: ['./familia-form.component.css'],
})
export class FamiliaFormComponent implements OnInit {
  form!: FormGroup;
  isEdicao = false;
  familiaId?: number;
  loading = false;
  erro = '';
  sucesso = '';

  constructor(
    private fb: FormBuilder,
    private familiaService: FamiliaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.inicializarForm();

    // Verificar se é edição
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdicao = true;
      this.familiaId = +id;
      this.carregarFamilia();
    }
  }

  inicializarForm(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  carregarFamilia(): void {
    this.loading = true;
    this.familiaService.buscarPorId(this.familiaId!).subscribe({
      next: (familia) => {
        this.form.patchValue({
          nome: familia.nome,
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

    const familia: FamiliaRequest = {
      nome: this.form.value.nome,
    };

    if (this.isEdicao) {
      this.familiaService.atualizar(this.familiaId!, familia).subscribe({
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
      this.familiaService.criar(familia).subscribe({
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
