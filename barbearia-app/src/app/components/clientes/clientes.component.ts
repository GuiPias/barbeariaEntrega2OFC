import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente/cliente.service';
import { Cliente } from '../../model/clientes/cliente.model';

@Component({
  selector: 'app-clientes',
  standalone: false,
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  mostrarFormulario = false;
  editandoCliente = false;
  clienteEditandoId?: number;
  
  cliente: Cliente = {
    nome: '',
    celular: '',
    email: '',
    idade: 0
  };
  
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) {}
  
  ngOnInit() {
    this.carregarClientes();
  }

  carregarClientes() {
    this.clienteService.findAll().subscribe({
      next: (clientes) => this.clientes = clientes,
      error: (error) => console.error('Erro ao carregar clientes:', error)
    });
  }

  cadastrarCliente() {
    if (this.cliente.nome && this.cliente.celular && this.cliente.email && this.cliente.idade) {
      if (this.editandoCliente && this.clienteEditandoId) {
        this.clienteService.update(this.clienteEditandoId, this.cliente).subscribe({
          next: () => {
            alert('Cliente atualizado com sucesso!');
            this.resetForm();
            this.carregarClientes();
          },
          error: (error) => {
            console.error('Erro ao atualizar cliente:', error);
            alert('Erro ao atualizar cliente!');
          }
        });
      } else {
        this.clienteService.save(this.cliente).subscribe({
          next: () => {
            alert('Cliente cadastrado com sucesso!');
            this.resetForm();
            this.carregarClientes();
          },
          error: (error) => {
            console.error('Erro ao cadastrar cliente:', error);
            alert('Erro ao cadastrar cliente!');
          }
        });
      }
    }
  }
  
  editarCliente(cliente: Cliente) {
    this.cliente = { ...cliente };
    this.editandoCliente = true;
    this.clienteEditandoId = cliente.id_cliente;
    this.mostrarFormulario = true;
  }
  
  deletarCliente(cliente: Cliente) {
    if (confirm('Tem certeza que deseja deletar este cliente?') && cliente.id_cliente) {
      this.clienteService.deleteById(cliente.id_cliente).subscribe({
        next: () => {
          alert('Cliente deletado com sucesso!');
          this.carregarClientes();
        },
        error: (error) => {
          console.error('Erro ao deletar cliente:', error);
          alert('Erro ao deletar cliente!');
        }
      });
    }
  }
  
  cancelarEdicao() {
    this.resetForm();
  }

  private resetForm() {
    this.editandoCliente = false;
    this.clienteEditandoId = undefined;
    this.cliente = { nome: '', celular: '', email: '', idade: 0 };
    this.mostrarFormulario = false;
  }
}