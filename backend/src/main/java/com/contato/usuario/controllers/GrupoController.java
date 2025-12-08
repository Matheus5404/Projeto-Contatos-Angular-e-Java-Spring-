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

import com.contato.usuario.dtos.GrupoRequest;
import com.contato.usuario.dtos.GrupoResponse;
import com.contato.usuario.services.GrupoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/grupos")
@CrossOrigin
public class GrupoController {
    
    @Autowired
    private GrupoService service;
    
    @GetMapping
    public ResponseEntity<List<GrupoResponse>> getAllGrupos() {
        List<GrupoResponse> grupos = service.getAllGrupos();
        return ResponseEntity.ok(grupos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GrupoResponse> getGrupoById(@PathVariable Long id) {
        GrupoResponse grupo = service.getGrupoById(id);
        return ResponseEntity.ok(grupo);
    }

    @PostMapping
    public ResponseEntity<GrupoResponse> createGrupo(@Valid @RequestBody GrupoRequest request) {
        GrupoResponse grupo = service.createGrupo(request);
        URI location = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(grupo.id())
            .toUri();
        return ResponseEntity.created(location).body(grupo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GrupoResponse> updateGrupo(@PathVariable Long id, @Valid @RequestBody GrupoRequest request) {
        GrupoResponse grupo = service.updateGrupo(id, request);
        return ResponseEntity.ok(grupo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGrupo(@PathVariable Long id) {
        service.deleteGrupo(id);
        return ResponseEntity.noContent().build();
    }
}
