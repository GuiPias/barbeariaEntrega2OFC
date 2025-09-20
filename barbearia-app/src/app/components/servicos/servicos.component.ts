import { Component } from '@angular/core';

@Component({
  selector: 'app-servicos',
  standalone: false,
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.css']
})
export class ServicosComponent {
  mostrarFormulario = false;
  
  servico = {
    nome: '',
    descricao: '',
    preco: null,
    duracaoMinutos: null
  };
  
  servicos: any[] = [];
  
  cadastrarServico() {
    if (this.servico.nome && this.servico.descricao && this.servico.preco) {
      this.servicos.push({ ...this.servico });
      this.servico = { nome: '', descricao: '', preco: null, duracaoMinutos: null };
      this.mostrarFormulario = false;
      alert('Serviço cadastrado com sucesso!');
    }
  }
}