import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagInicialComponent } from './pages/pag-inicial/pag-inicial';
import { ClientesComponent } from './pages/clientes/clientes';
import { AgendamentosComponent } from './pages/agendamentos/agendamentos';

const routes: Routes = [
  { path: '', component: PagInicialComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'agendamentos', component: AgendamentosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
