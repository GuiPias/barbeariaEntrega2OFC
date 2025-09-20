import { Component } from '@angular/core';

@Component({
  selector: 'app-produtos',
  standalone: false,
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent {
  mostrarFormulario = false;
  editandoProduto = false;
  produtoEditandoIndex = -1;
  
  produto = {
    nome: '',
    descricao: '',
    preco: null,
    quantidadeEstoque: null
  };
  
  produtos: any[] = [];
  
  cadastrarProduto() {
    if (this.produto.nome && this.produto.descricao && this.produto.preco && this.produto.quantidadeEstoque) {
      if (this.editandoProduto) {
        this.produtos[this.produtoEditandoIndex] = { ...this.produto };
        this.editandoProduto = false;
        this.produtoEditandoIndex = -1;
        alert('Produto atualizado com sucesso!');
      } else {
        this.produtos.push({ ...this.produto });
        alert('Produto cadastrado com sucesso!');
      }
      this.produto = { nome: '', descricao: '', preco: null, quantidadeEstoque: null };
      this.mostrarFormulario = false;
    } else {
      alert('Por favor, preencha todos os campos obrigatórios!');
    }
  }
  
  editarProduto(index: number) {
    this.produto = { ...this.produtos[index] };
    this.editandoProduto = true;
    this.produtoEditandoIndex = index;
    this.mostrarFormulario = true;
  }
  
  deletarProduto(index: number) {
    if (confirm('Tem certeza que deseja deletar este produto?')) {
      this.produtos.splice(index, 1);
      alert('Produto deletado com sucesso!');
    }
  }
  
  cancelarEdicao() {
    this.editandoProduto = false;
    this.produtoEditandoIndex = -1;
    this.produto = { nome: '', descricao: '', preco: null, quantidadeEstoque: null };
    this.mostrarFormulario = false;
  }
}