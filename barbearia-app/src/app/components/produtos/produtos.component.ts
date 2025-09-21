import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../services/produto/produto.service';
import { Produto } from '../../model/produtos/produto.model';

@Component({
  selector: 'app-produtos',
  standalone: false,
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {
  mostrarFormulario = false;
  editandoProduto = false;
  produtoEditandoId?: number;
  
  produto: Produto = {
    nome: '',
    descricao: '',
    preco: 0,
    quantidadeEstoque: 0
  };
  
  produtos: Produto[] = [];

  constructor(private produtoService: ProdutoService) {}
  
  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtoService.findAll().subscribe({
      next: (produtos) => this.produtos = produtos,
      error: (error) => console.error('Erro ao carregar produtos:', error)
    });
  }
  
  cadastrarProduto() {
    if (this.produto.nome && this.produto.descricao && this.produto.preco && this.produto.quantidadeEstoque) {
      if (this.editandoProduto && this.produtoEditandoId) {
        this.produtoService.update(this.produtoEditandoId, this.produto).subscribe({
          next: () => {
            alert('Produto atualizado com sucesso!');
            this.resetForm();
            this.carregarProdutos();
          },
          error: (error) => {
            console.error('Erro ao atualizar produto:', error);
            alert('Erro ao atualizar produto!');
          }
        });
      } else {
        this.produtoService.save(this.produto).subscribe({
          next: () => {
            alert('Produto cadastrado com sucesso!');
            this.resetForm();
            this.carregarProdutos();
          },
          error: (error) => {
            console.error('Erro ao cadastrar produto:', error);
            alert('Erro ao cadastrar produto!');
          }
        });
      }
    }
  }
  
  editarProduto(produto: Produto) {
    this.produto = { ...produto };
    this.editandoProduto = true;
    this.produtoEditandoId = produto.id_produto;
    this.mostrarFormulario = true;
  }
  
  deletarProduto(produto: Produto) {
    if (confirm('Tem certeza que deseja deletar este produto?') && produto.id_produto) {
      this.produtoService.deleteById(produto.id_produto).subscribe({
        next: () => {
          alert('Produto deletado com sucesso!');
          this.carregarProdutos();
        },
        error: (error) => {
          console.error('Erro ao deletar produto:', error);
          alert('Erro ao deletar produto!');
        }
      });
    }
  }
  
  cancelarEdicao() {
    this.resetForm();
  }

  private resetForm() {
    this.editandoProduto = false;
    this.produtoEditandoId = undefined;
    this.produto = { nome: '', descricao: '', preco: 0, quantidadeEstoque: 0 };
    this.mostrarFormulario = false;
  }
}