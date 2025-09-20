import { Component } from '@angular/core';

@Component({
  selector: 'app-funcionarios',
  standalone: false,
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent {
  mostrarFormulario = false;
  
  funcionario = {
    nome: '',
    telefone: '',
    endereco: ''
  };
  
  funcionarios: any[] = [];
  
  cadastrarFuncionario() {
    if (this.funcionario.nome && this.funcionario.telefone && this.funcionario.endereco) {
      this.funcionarios.push({ ...this.funcionario });
      this.funcionario = { nome: '', telefone: '', endereco: '' };
      this.mostrarFormulario = false;
      alert('Funcionário cadastrado com sucesso!');
    }
  }
}