import { Component } from '@angular/core';

@Component({
  selector: 'app-funcionarios',
  standalone: false,
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent {
  mostrarFormulario = false;
  editandoFuncionario = false;
  funcionarioEditandoIndex = -1;
  
  funcionario = {
    nome: '',
    telefone: '',
    endereco: ''
  };
  
  funcionarios: any[] = [];
  
  cadastrarFuncionario() {
    if (this.funcionario.nome && this.funcionario.telefone && this.funcionario.endereco) {
      if (this.editandoFuncionario) {
        this.funcionarios[this.funcionarioEditandoIndex] = { ...this.funcionario };
        this.editandoFuncionario = false;
        this.funcionarioEditandoIndex = -1;
        alert('Funcionário atualizado com sucesso!');
      } else {
        this.funcionarios.push({ ...this.funcionario });
        alert('Funcionário cadastrado com sucesso!');
      }
      this.funcionario = { nome: '', telefone: '', endereco: '' };
      this.mostrarFormulario = false;
    } else {
      alert('Por favor, preencha todos os campos obrigatórios!');
    }
  }
  
  editarFuncionario(index: number) {
    this.funcionario = { ...this.funcionarios[index] };
    this.editandoFuncionario = true;
    this.funcionarioEditandoIndex = index;
    this.mostrarFormulario = true;
  }
  
  deletarFuncionario(index: number) {
    if (confirm('Tem certeza que deseja deletar este funcionário?')) {
      this.funcionarios.splice(index, 1);
      alert('Funcionário deletado com sucesso!');
    }
  }
  
  cancelarEdicao() {
    this.editandoFuncionario = false;
    this.funcionarioEditandoIndex = -1;
    this.funcionario = { nome: '', telefone: '', endereco: '' };
    this.mostrarFormulario = false;
  }
}