import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContatoService } from '../../services/contato.service';
import { FamiliaService } from '../../services/familia.service';
import { Familia } from '../../models/familia.model';
import { ContatoRequest } from '../../models/contato.model';

@Component({
  selector: 'app-contato-form',
  standalone: false,
  templateUrl: './contato-form.component.html',
  styleUrls: ['./contato-form.component.css'],
})
export class ContatoFormComponent implements OnInit {
  form!: FormGroup;
  familias: Familia[] = [];
  isEdicao = false;
  contatoId?: number;
  loading = false;
  erro = '';
  sucesso = '';

  constructor(
    private fb: FormBuilder,
    private contatoService: ContatoService,
    private familiaService: FamiliaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.inicializarForm();
    this.carregarFamilias();

    // Verificar se é edição
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdicao = true;
      this.contatoId = +id;
      this.carregarContato();
    }
  }

  inicializarForm(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      idade: ['', [Validators.required, Validators.min(0), Validators.max(150)]],
      cidade: ['', [Validators.required]],
      familiaId: [null],
    });
  }

  carregarFamilias(): void {
    this.familiaService.listar().subscribe({
      next: (data) => {
        this.familias = data;
      },
      error: (err) => {
        console.error('Erro ao carregar famílias:', err);
      },
    });
  }

  carregarContato(): void {
    this.loading = true;
    this.contatoService.buscarPorId(this.contatoId!).subscribe({
      next: (contato) => {
        this.form.patchValue({
          nome: contato.nome,
          email: contato.email,
          telefone: contato.telefone,
          idade: contato.idade,
          cidade: contato.cidade,
          familiaId: contato.familia?.id || null,
        });
        this.loading = false;
      },
      error: (err) => {
        this.erro = 'Erro ao carregar contato.';
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

    const contato: ContatoRequest = {
      nome: this.form.value.nome,
      email: this.form.value.email,
      telefone: this.form.value.telefone,
      idade: String(this.form.value.idade),
      cidade: this.form.value.cidade,
      familiaId: this.form.value.familiaId || null,
    };

    if (this.isEdicao) {
      this.contatoService.atualizar(this.contatoId!, contato).subscribe({
        next: () => {
          this.sucesso = 'Contato atualizado com sucesso!';
          this.loading = false;
          setTimeout(() => this.router.navigate(['/contatos']), 1500);
        },
        error: (err) => {
          this.erro = 'Erro ao atualizar contato.';
          this.loading = false;
          console.error('Erro:', err);
        },
      });
    } else {
      this.contatoService.criar(contato).subscribe({
        next: () => {
          this.sucesso = 'Contato criado com sucesso!';
          this.loading = false;
          setTimeout(() => this.router.navigate(['/contatos']), 1500);
        },
        error: (err) => {
          this.erro = 'Erro ao criar contato.';
          this.loading = false;
          console.error('Erro:', err);
        },
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/contatos']);
  }

  // Getters para validação
  get nome() {
    return this.form.get('nome');
  }
  get email() {
    return this.form.get('email');
  }
  get telefone() {
    return this.form.get('telefone');
  }
  get idade() {
    return this.form.get('idade');
  }
  get cidade() {
    return this.form.get('cidade');
  }
}
