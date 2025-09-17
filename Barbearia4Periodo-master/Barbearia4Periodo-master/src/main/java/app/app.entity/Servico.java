package app.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;



import java.math.BigDecimal;
import java.util.List;

@Entity
@Getter
@Setter
public class Servico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_servico;

    @NotBlank(message = "O campo nome é obrigatório")
    private String nome;

    @NotBlank(message = "O campo descrição é obrigatório")
    private String descricao;

    @NotNull(message = "O campo preço é obrigatório")
    private BigDecimal preco;

    private Integer duracaoMinutos;

    @ManyToMany(mappedBy = "servicos")
    @JsonIgnoreProperties("servicos")
    private List<Funcionario> funcionarios;

    @OneToMany(mappedBy = "servico")
    @JsonIgnoreProperties("servico")
    private List<Agendamento> agendamentos;
}
