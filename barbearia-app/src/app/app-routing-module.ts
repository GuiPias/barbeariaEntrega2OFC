import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagInicialComponent } from './pages/pag-inicial/pag-inicial';
import { ClientesComponent } from './pages/clientes/clientes';
import { AgendamentosComponent } from './pages/agendamentos/agendamentos';
import { ServicosComponent } from './pages/servicos/servicos';
import { FuncionariosComponent } from './pages/funcionarios/funcionarios';
import { ProdutosComponent } from './pages/produtos/produtos';

const routes: Routes = [
  { path: '', component: PagInicialComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'agendamentos', component: AgendamentosComponent },
  { path: 'servicos', component: ServicosComponent },
  { path: 'funcionarios', component: FuncionariosComponent },
  { path: 'produtos', component: ProdutosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
