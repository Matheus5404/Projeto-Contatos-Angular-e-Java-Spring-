import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes de Contato
import { ContatoListaComponent } from './components/contato-lista/contato-lista.component';
import { ContatoFormComponent } from './components/contato-form/contato-form.component';

// Componentes de Família/Grupo
import { FamiliaListaComponent } from './components/familia-lista/familia-lista.component';
import { FamiliaFormComponent } from './components/familia-form/familia-form.component';

const routes: Routes = [
  // Rota padrão - redireciona para contatos
  { path: '', redirectTo: '/contatos', pathMatch: 'full' },

  // Rotas de Contatos
  { path: 'contatos', component: ContatoListaComponent },
  { path: 'contatos/novo', component: ContatoFormComponent },
  { path: 'contatos/:id/editar', component: ContatoFormComponent },

  // Rotas de Grupos/Famílias
  { path: 'grupos', component: FamiliaListaComponent },
  { path: 'grupos/novo', component: FamiliaFormComponent },
  { path: 'grupos/:id/editar', component: FamiliaFormComponent },

  // Rota curinga - redireciona para contatos
  { path: '**', redirectTo: '/contatos' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
