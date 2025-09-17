package app.controller;

import app.entity.Agendamento;
import app.entity.Cliente;
import app.service.AgendamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/agendamento")
public class AgendamentoController {

    @Autowired
    private AgendamentoService agendamentoService;

    // MÉTODO POST - Criar Agendamento
    @PostMapping
    public ResponseEntity<Agendamento> createAgendamento(@RequestBody Agendamento agendamento) {
        Agendamento savedAgendamento = agendamentoService.save(agendamento);
        return new ResponseEntity<>(savedAgendamento, HttpStatus.CREATED);
    }

    // MÉTODO GET - Buscar todos os Agendamentos
    @GetMapping
    public ResponseEntity<List<Agendamento>> getAllAgendamentos() {
        List<Agendamento> agendamentos = agendamentoService.findAll();
        return new ResponseEntity<>(agendamentos, HttpStatus.OK);
    }

    @GetMapping("/by-cliente/{clienteId}")
    public ResponseEntity<List<Agendamento>> getByCliente(@PathVariable Long clienteId) {
    
        Cliente cliente = new Cliente();
        cliente.setId_cliente(clienteId);
        List<Agendamento> lista = agendamentoService.buscarPorCliente(cliente);
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/futuros")
    public ResponseEntity<List<Agendamento>> getFuturos(
            @RequestParam("dataHora")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dataHora
    ) {
        List<Agendamento> lista = agendamentoService.buscarAgendamentosFuturos(dataHora);
        return ResponseEntity.ok(lista);
    }

    // MÉTODO DELETE - Deletar Agendamento por ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteAgendamento(@PathVariable Long id) {
        agendamentoService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // MÉTODO PUT - Atualizar Agendamento por ID
    @PutMapping("/update/{id}")
    public ResponseEntity<Agendamento> updateAgendamento(@PathVariable Long id, @RequestBody Agendamento agendamentoDetails) {
        Agendamento updatedAgendamento = agendamentoService.update(id, agendamentoDetails);
        return new ResponseEntity<>(updatedAgendamento, HttpStatus.OK);
    }
}
