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
  
  cadastrarFuncionario() {
    if (this.funcionario.nome && this.funcionario.telefone && this.funcionario.endereco) {
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
    this.mostrarFormulario = false;
  }
}