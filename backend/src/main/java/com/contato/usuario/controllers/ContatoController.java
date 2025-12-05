package com.contato.usuario.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.contato.usuario.dtos.ContatoRequest;
import com.contato.usuario.dtos.ContatoResponse;
import com.contato.usuario.dtos.FamiliaResponse;
import com.contato.usuario.services.ContatoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("contato")
@CrossOrigin
public class ContatoController {

    @Autowired
    private ContatoService service;
    
    @GetMapping
    public ResponseEntity<List<ContatoResponse>> getContatos() {
        return ResponseEntity.ok(service.getContatos());
    }

    @GetMapping("{id}")
    public ResponseEntity<ContatoResponse> getContatoById(@PathVariable long id) {
        return ResponseEntity.ok(service.getContatoById(id));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteContatoById(@PathVariable long id){
        service.deleteContatoById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<ContatoResponse> saveContato(@Valid @RequestBody ContatoRequest contato) 
    {
        ContatoResponse response = service.saveContato(contato);

         URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(response.id())
                .toUri();
        return ResponseEntity.created(location)
                             .body(response);
    }

    @PutMapping("{id}")
    public ResponseEntity<Void> updateContato(@PathVariable long id, @Valid @RequestBody ContatoRequest contato)
    {
        service.updateContato(contato, id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("familia/{familiaId}")
    public ResponseEntity<List<ContatoResponse>> getContatosByFamilia(@PathVariable long familiaId) {
        return ResponseEntity.ok(service.getContatosByFamilia(familiaId));
    }

}   

