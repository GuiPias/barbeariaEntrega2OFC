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
  erros: { [key: string]: string } = {};
  Object = Object;

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

  validarFormulario(): boolean {
    this.erros = {};
    let valido = true;

    // Validação do nome
    if (!this.cliente.nome || this.cliente.nome.trim().length < 3) {
      this.erros['nome'] = 'Nome deve ter pelo menos 3 caracteres';
      valido = false;
    }

    // Validação do celular
    const celularLimpo = this.cliente.celular.replace(/\D/g, '');
    if (!this.cliente.celular) {
      this.erros['celular'] = 'Celular é obrigatório';
      valido = false;
    } else if (celularLimpo.length !== 11) {
      this.erros['celular'] = 'Celular deve ter 11 dígitos (XX-XXXXXXXXX)';
      valido = false;
    }

    // Validação do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.cliente.email) {
      this.erros['email'] = 'Email é obrigatório';
      valido = false;
    } else if (!emailRegex.test(this.cliente.email)) {
      this.erros['email'] = 'Email deve ter um formato válido';
      valido = false;
    }

    // Validação da idade
    if (!this.cliente.idade || this.cliente.idade < 1 || this.cliente.idade > 120) {
      this.erros['idade'] = 'Idade deve ser entre 1 e 120 anos';
      valido = false;
    }

    return valido;
  }

  formatarCelular() {
    let celular = this.cliente.celular.replace(/\D/g, '');
    if (celular.length <= 11) {
      celular = celular.replace(/(\d{2})(\d{5})(\d{4})/, '$1-$2$3');
      this.cliente.celular = celular;
    }
  }

  cadastrarCliente() {
    if (this.validarFormulario()) {
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
    this.erros = {};
    this.mostrarFormulario = false;
  }
}