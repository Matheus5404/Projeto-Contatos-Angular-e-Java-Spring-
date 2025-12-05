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

import com.contato.usuario.dtos.FamiliaRequest;
import com.contato.usuario.dtos.FamiliaResponse;
import com.contato.usuario.services.FamiliaService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/familia")
@CrossOrigin
public class FamiliaController {
    
    @Autowired
    private FamiliaService service;
    
    @GetMapping
    public ResponseEntity<List<FamiliaResponse>> getAllFamilias() {
        List<FamiliaResponse> familias = service.getAllFamilias();
        return ResponseEntity.ok(familias);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FamiliaResponse> getFamiliaById(@PathVariable Long id) {
        FamiliaResponse familia = service.getFamiliaById(id);
        return ResponseEntity.ok(familia);
    }

    @PostMapping
    public ResponseEntity<FamiliaResponse> createFamilia(@Valid @RequestBody FamiliaRequest request) {
        FamiliaResponse familia = service.createFamilia(request);
        URI location = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(familia.id())
            .toUri();
        return ResponseEntity.created(location).body(familia);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FamiliaResponse> updateFamilia(@PathVariable Long id, @Valid @RequestBody FamiliaRequest request) {
        FamiliaResponse familia = service.updateFamilia(id, request);
        return ResponseEntity.ok(familia);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFamilia(@PathVariable Long id) {
        service.deleteFamilia(id);
        return ResponseEntity.noContent().build();
    }
}
