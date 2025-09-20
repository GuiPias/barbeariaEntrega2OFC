import { Component } from '@angular/core';

@Component({
  selector: 'app-agendamentos',
  standalone: false,
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.css']
})
export class AgendamentosComponent {
  mostrarFormulario = false;
  
  agendamento = {
    cliente: '',
    servico: '',
    data: '',
    horario: ''
  };
  
  agendamentos: any[] = [];
  
  cadastrarAgendamento() {
    if (this.agendamento.cliente && this.agendamento.servico && this.agendamento.data && this.agendamento.horario) {
      this.agendamentos.push({ ...this.agendamento });
      this.agendamento = { cliente: '', servico: '', data: '', horario: '' };
      this.mostrarFormulario = false;
      alert('Agendamento cadastrado com sucesso!');
    }
  }
}
