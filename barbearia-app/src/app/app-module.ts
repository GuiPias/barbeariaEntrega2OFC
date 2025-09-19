import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app';
import { PagInicialComponent } from './pages/pag-inicial/pag-inicial';
import { ClientesComponent } from './pages/clientes/clientes';
import { AgendamentosComponent } from './pages/agendamentos/agendamentos';

@NgModule({
  declarations: [
    AppComponent,
    PagInicialComponent,
    ClientesComponent,
    AgendamentosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
