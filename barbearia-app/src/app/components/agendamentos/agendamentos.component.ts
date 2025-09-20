import { Component } from '@angular/core';

@Component({
  selector: 'app-agendamentos',
  standalone: false,
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.css']
})
export class AgendamentosComponent {
  mostrarFormulario = false;
  editandoAgendamento = false;
  agendamentoEditandoIndex = -1;
  
  agendamento = {
    cliente: '',
    servico: '',
    data: '',
    horario: ''
  };
  
  agendamentos: any[] = [];
  
  cadastrarAgendamento() {
    console.log('Dados do agendamento:', this.agendamento);
    
    if (this.agendamento.cliente && this.agendamento.servico && this.agendamento.data && this.agendamento.horario) {
      if (this.editandoAgendamento) {
        this.agendamentos[this.agendamentoEditandoIndex] = { ...this.agendamento };
        this.editandoAgendamento = false;
        this.agendamentoEditandoIndex = -1;
        alert('Agendamento atualizado com sucesso!');
      } else {
        this.agendamentos.push({ ...this.agendamento });
        alert('Agendamento cadastrado com sucesso!');
      }
      this.agendamento = { cliente: '', servico: '', data: '', horario: '' };
      this.mostrarFormulario = false;
    } else {
      alert('Por favor, preencha todos os campos obrigatórios!');
    }
  }
  
  editarAgendamento(index: number) {
    this.agendamento = { ...this.agendamentos[index] };
    this.editandoAgendamento = true;
    this.agendamentoEditandoIndex = index;
    this.mostrarFormulario = true;
  }
  
  deletarAgendamento(index: number) {
    if (confirm('Tem certeza que deseja deletar este agendamento?')) {
      this.agendamentos.splice(index, 1);
      alert('Agendamento deletado com sucesso!');
    }
  }
  
  cancelarEdicao() {
    this.editandoAgendamento = false;
    this.agendamentoEditandoIndex = -1;
    this.agendamento = { cliente: '', servico: '', data: '', horario: '' };
    this.mostrarFormulario = false;
  }
}
