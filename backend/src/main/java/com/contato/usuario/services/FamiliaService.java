package com.contato.usuario.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.contato.usuario.dtos.FamiliaRequest;
import com.contato.usuario.dtos.FamiliaResponse;
import com.contato.usuario.entities.Familia;
import com.contato.usuario.mappers.FamiliaMapper;
import com.contato.usuario.repositories.FamiliaRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class FamiliaService {
    
    @Autowired
    private FamiliaRepository repository;
    
    public List<FamiliaResponse> getAllFamilias() {
        return repository.findAll()
            .stream()
            .map(FamiliaMapper::toResponse)
            .toList();
    }

    public FamiliaResponse getFamiliaById(Long id) {
        return repository.findById(id)
            .map(FamiliaMapper::toResponse)
            .orElseThrow(() -> new EntityNotFoundException("Família não encontrada"));
    }

    public FamiliaResponse createFamilia(FamiliaRequest request) {
        Familia familia = FamiliaMapper.toEntity(request);
        Familia savedFamilia = repository.save(familia);
        return FamiliaMapper.toResponse(savedFamilia);
    }

    public FamiliaResponse updateFamilia(Long id, FamiliaRequest request) {
        Familia familia = repository.getReferenceById(id);
        familia.setNome(request.nome());
        Familia savedFamilia = repository.save(familia);
        return FamiliaMapper.toResponse(savedFamilia);
    }

    public void deleteFamilia(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new EntityNotFoundException("Família não encontrada");
        }
    }
}
