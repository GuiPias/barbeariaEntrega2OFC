import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app';
import { PagInicialComponent } from './pages/pag-inicial/pag-inicial';
import { ClientesComponent } from './pages/clientes/clientes';
import { AgendamentosComponent } from './pages/agendamentos/agendamentos';
import { ServicosComponent } from './pages/servicos/servicos';
import { FuncionariosComponent } from './pages/funcionarios/funcionarios';
import { ProdutosComponent } from './pages/produtos/produtos';

@NgModule({
  declarations: [
    AppComponent,
    PagInicialComponent,
    AgendamentosComponent,
    ServicosComponent,
    FuncionariosComponent,
    ProdutosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ClientesComponent
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }