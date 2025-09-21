import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../../services/funcionario/funcionario.service';
import { Funcionario } from '../../model/funcionarios/funcionario.model';

@Component({
  selector: 'app-funcionarios',
  standalone: false,
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit {
  mostrarFormulario = false;
  editandoFuncionario = false;
  funcionarioEditandoId?: number;
  
  funcionario: Funcionario = {
    nome: '',
    telefone: '',
    endereco: ''
  };
  
  funcionarios: Funcionario[] = [];
  erros: { [key: string]: string } = {};

  constructor(private funcionarioService: FuncionarioService) {}
  
  ngOnInit() {
    this.carregarFuncionarios();
  }

  carregarFuncionarios() {
    this.funcionarioService.findAll().subscribe({
      next: (funcionarios) => this.funcionarios = funcionarios,
      error: (error) => console.error('Erro ao carregar funcionários:', error)
    });
  }
  
  validarFormulario(): boolean {
    this.erros = {};
    let valido = true;

    if (!this.funcionario.nome || this.funcionario.nome.trim().length < 3) {
      this.erros['nome'] = 'Nome deve ter pelo menos 3 caracteres';
      valido = false;
    }

    const telefoneLimpo = this.funcionario.telefone.replace(/\D/g, '');
    if (!this.funcionario.telefone) {
      this.erros['telefone'] = 'Telefone é obrigatório';
      valido = false;
    } else if (telefoneLimpo.length !== 11) {
      this.erros['telefone'] = 'Telefone deve ter 11 dígitos (XX-XXXXXXXXX)';
      valido = false;
    }

    return valido;
  }

  formatarTelefone() {
    let telefone = this.funcionario.telefone.replace(/\D/g, '');
    if (telefone.length <= 11) {
      telefone = telefone.replace(/(\d{2})(\d{5})(\d{4})/, '$1-$2$3');
      this.funcionario.telefone = telefone;
    }
  }

  cadastrarFuncionario() {
    if (this.validarFormulario() && this.funcionario.endereco) {
      if (this.editandoFuncionario && this.funcionarioEditandoId) {
        this.funcionarioService.update(this.funcionarioEditandoId, this.funcionario).subscribe({
          next: () => {
            alert('Funcionário atualizado com sucesso!');
            this.resetForm();
            this.carregarFuncionarios();
          },
          error: (error) => {
            console.error('Erro ao atualizar funcionário:', error);
            alert('Erro ao atualizar funcionário!');
          }
        });
      } else {
        this.funcionarioService.save(this.funcionario).subscribe({
          next: () => {
            alert('Funcionário cadastrado com sucesso!');
            this.resetForm();
            this.carregarFuncionarios();
          },
          error: (error) => {
            console.error('Erro ao cadastrar funcionário:', error);
            alert('Erro ao cadastrar funcionário!');
          }
        });
      }
    }
  }
  
  editarFuncionario(funcionario: Funcionario) {
    this.funcionario = { ...funcionario };
    this.editandoFuncionario = true;
    this.funcionarioEditandoId = funcionario.id_funcionario;
    this.mostrarFormulario = true;
  }
  
  deletarFuncionario(funcionario: Funcionario) {
    if (confirm('Tem certeza que deseja deletar este funcionário?') && funcionario.id_funcionario) {
      this.funcionarioService.delete(funcionario.id_funcionario).subscribe({
        next: () => {
          alert('Funcionário deletado com sucesso!');
          this.carregarFuncionarios();
        },
        error: (error) => {
          console.error('Erro ao deletar funcionário:', error);
          alert('Erro ao deletar funcionário!');
        }
      });
    }
  }
  
  cancelarEdicao() {
    this.resetForm();
  }

  private resetForm() {
    this.editandoFuncionario = false;
    this.funcionarioEditandoId = undefined;
    this.funcionario = { nome: '', telefone: '', endereco: '' };
    this.erros = {};
    this.mostrarFormulario = false;
  }
}