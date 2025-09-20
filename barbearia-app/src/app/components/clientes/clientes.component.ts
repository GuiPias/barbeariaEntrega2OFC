import { Component } from '@angular/core';

@Component({
  selector: 'app-clientes',
  standalone: false,
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  mostrarFormulario = false;
  editandoCliente = false;
  clienteEditandoIndex = -1;
  
  cliente = {
    nome: '',
    celular: '',
    email: '',
    idade: null
  };
  
  clientes: any[] = [];
  
  cadastrarCliente() {
    if (this.cliente.nome && this.cliente.celular && this.cliente.email && this.cliente.idade) {
      if (this.editandoCliente) {
        this.clientes[this.clienteEditandoIndex] = { ...this.cliente };
        this.editandoCliente = false;
        this.clienteEditandoIndex = -1;
        alert('Cliente atualizado com sucesso!');
      } else {
        this.clientes.push({ ...this.cliente });
        alert('Cliente cadastrado com sucesso!');
      }
      this.cliente = { nome: '', celular: '', email: '', idade: null };
      this.mostrarFormulario = false;
    }
  }
  
  editarCliente(index: number) {
    this.cliente = { ...this.clientes[index] };
    this.editandoCliente = true;
    this.clienteEditandoIndex = index;
    this.mostrarFormulario = true;
  }
  
  deletarCliente(index: number) {
    if (confirm('Tem certeza que deseja deletar este cliente?')) {
      this.clientes.splice(index, 1);
      alert('Cliente deletado com sucesso!');
    }
  }
  
  cancelarEdicao() {
    this.editandoCliente = false;
    this.clienteEditandoIndex = -1;
    this.cliente = { nome: '', celular: '', email: '', idade: null };
    this.mostrarFormulario = false;
  }
}