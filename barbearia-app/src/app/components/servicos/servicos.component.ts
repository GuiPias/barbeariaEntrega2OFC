import { Component, OnInit } from '@angular/core';
import { ServicoService } from '../../services/servico/servico.service';
import { Servico } from '../../model/servicos/servico.model';

@Component({
  selector: 'app-servicos',
  standalone: false,
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.css']
})
export class ServicosComponent implements OnInit {
  mostrarFormulario = false;
  editandoServico = false;
  servicoEditandoId?: number;
  
  servico: Servico = {
    nome: '',
    descricao: '',
    preco: 0,
    duracaoMinutos: 0
  };
  
  servicos: Servico[] = [];

  constructor(private servicoService: ServicoService) {}
  
  ngOnInit() {
    this.carregarServicos();
  }

  carregarServicos() {
    this.servicoService.findAll().subscribe({
      next: (servicos) => this.servicos = servicos,
      error: (error) => console.error('Erro ao carregar serviços:', error)
    });
  }
  
  cadastrarServico() {
    if (this.servico.nome && this.servico.descricao && this.servico.preco) {
      if (this.editandoServico && this.servicoEditandoId) {
        this.servicoService.update(this.servicoEditandoId, this.servico).subscribe({
          next: () => {
            alert('Serviço atualizado com sucesso!');
            this.resetForm();
            this.carregarServicos();
          },
          error: (error) => {
            console.error('Erro ao atualizar serviço:', error);
            alert('Erro ao atualizar serviço!');
          }
        });
      } else {
        this.servicoService.save(this.servico).subscribe({
          next: () => {
            alert('Serviço cadastrado com sucesso!');
            this.resetForm();
            this.carregarServicos();
          },
          error: (error) => {
            console.error('Erro ao cadastrar serviço:', error);
            alert('Erro ao cadastrar serviço!');
          }
        });
      }
    }
  }
  
  editarServico(servico: Servico) {
    this.servico = { ...servico };
    this.editandoServico = true;
    this.servicoEditandoId = servico.id_servico;
    this.mostrarFormulario = true;
  }
  
  deletarServico(servico: Servico) {
    if (confirm('Tem certeza que deseja deletar este serviço?') && servico.id_servico) {
      this.servicoService.deleteById(servico.id_servico).subscribe({
        next: () => {
          alert('Serviço deletado com sucesso!');
          this.carregarServicos();
        },
        error: (error) => {
          console.error('Erro ao deletar serviço:', error);
          alert('Erro ao deletar serviço!');
        }
      });
    }
  }
  
  cancelarEdicao() {
    this.resetForm();
  }

  private resetForm() {
    this.editandoServico = false;
    this.servicoEditandoId = undefined;
    this.servico = { nome: '', descricao: '', preco: 0, duracaoMinutos: 0 };
    this.mostrarFormulario = false;
  }
}