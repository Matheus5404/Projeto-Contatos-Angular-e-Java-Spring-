import {
  NgModule,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

// Componentes de Contato
import { ContatoListaComponent } from './components/contato-lista/contato-lista.component';
import { ContatoFormComponent } from './components/contato-form/contato-form.component';

// Componentes de Grupo
import { GrupoListaComponent } from './components/familia-lista/familia-lista.component';
import { GrupoFormComponent } from './components/familia-form/familia-form.component';

@NgModule({
  declarations: [
    App,
    ContatoListaComponent,
    ContatoFormComponent,
    GrupoListaComponent,
    GrupoFormComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch()),
  ],
  bootstrap: [App],
})
export class AppModule {}
