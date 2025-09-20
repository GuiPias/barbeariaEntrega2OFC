import { Component } from '@angular/core';

@Component({
  selector: 'app-clientes',
  standalone: false,
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  mostrarFormulario = false;
  
  cliente = {
    nome: '',
    celular: '',
    email: '',
    idade: null
  };
  
  clientes: any[] = [];
  
  cadastrarCliente() {
    if (this.cliente.nome && this.cliente.celular && this.cliente.email && this.cliente.idade) {
      this.clientes.push({ ...this.cliente });
      this.cliente = { nome: '', celular: '', email: '', idade: null };
      this.mostrarFormulario = false;
      alert('Cliente cadastrado com sucesso!');
    }
  }
}