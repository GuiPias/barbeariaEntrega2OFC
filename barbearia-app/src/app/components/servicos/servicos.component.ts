import { Component } from '@angular/core';

@Component({
  selector: 'app-servicos',
  standalone: false,
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.css']
})
export class ServicosComponent {
  mostrarFormulario = false;
  editandoServico = false;
  servicoEditandoIndex = -1;
  
  servico = {
    nome: '',
    descricao: '',
    preco: null,
    duracaoMinutos: null
  };
  
  servicos: any[] = [];
  
  cadastrarServico() {
    if (this.servico.nome && this.servico.descricao && this.servico.preco) {
      if (this.editandoServico) {
        this.servicos[this.servicoEditandoIndex] = { ...this.servico };
        this.editandoServico = false;
        this.servicoEditandoIndex = -1;
        alert('Serviço atualizado com sucesso!');
      } else {
        this.servicos.push({ ...this.servico });
        alert('Serviço cadastrado com sucesso!');
      }
      this.servico = { nome: '', descricao: '', preco: null, duracaoMinutos: null };
      this.mostrarFormulario = false;
    } else {
      alert('Por favor, preencha todos os campos obrigatórios!');
    }
  }
  
  editarServico(index: number) {
    this.servico = { ...this.servicos[index] };
    this.editandoServico = true;
    this.servicoEditandoIndex = index;
    this.mostrarFormulario = true;
  }
  
  deletarServico(index: number) {
    if (confirm('Tem certeza que deseja deletar este serviço?')) {
      this.servicos.splice(index, 1);
      alert('Serviço deletado com sucesso!');
    }
  }
  
  cancelarEdicao() {
    this.editandoServico = false;
    this.servicoEditandoIndex = -1;
    this.servico = { nome: '', descricao: '', preco: null, duracaoMinutos: null };
    this.mostrarFormulario = false;
  }
}