package com.contato.usuario.services;

import java.util.HashSet;
import java.util.List;
import java.util.Locale.Category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.contato.usuario.dtos.ContatoRequest;
import com.contato.usuario.dtos.ContatoResponse;
import com.contato.usuario.entities.Contato;
import com.contato.usuario.entities.Familia;
import com.contato.usuario.mappers.ContatoMapper;
import com.contato.usuario.repositories.ContatoRepository;
import com.contato.usuario.repositories.FamiliaRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ContatoService {
    
    @Autowired
    private ContatoRepository repository;

    @Autowired
    private FamiliaRepository familiaRepository;

    public List<ContatoResponse> getContatos() {
        return repository.findAll()
                         .stream()
                         .map(ContatoMapper::toDTO)
                         .toList();   
    }

    public ContatoResponse getContatoById(long id) {
        return repository.findById(id)
                         .map(ContatoMapper::toDTO)
                         .orElseThrow(() -> new EntityNotFoundException("Contato não cadastrado"));   
    }

    public void deleteContatoById(long id) {
        if(repository.existsById(id)) 
            repository.deleteById(id);
        else 
            throw new EntityNotFoundException("Contato não existe");
        
    }

    public ContatoResponse saveContato(ContatoRequest request) {
        Contato contato = ContatoMapper.toEntity(request);

        if (request.familiaId() != null) {
            Familia familia = familiaRepository.findById(request.familiaId())
                .orElseThrow(() -> new EntityNotFoundException("Grupo Familia não encontrada"));
            contato.setFamilia(familia);
        }
        
        Contato savedContato = repository.save(contato);
        return ContatoMapper.toDTO(savedContato);
    }

    public void updateContato(ContatoRequest request, long id) {
        Contato contato = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Contato não encontrado"));

        contato.setNome(request.nome());
        contato.setEmail(request.email());
        contato.setTelefone(request.telefone());
        contato.setIdade(request.idade());
        contato.setCidade(request.cidade());

        if (request.familiaId() != null) {
            Familia familia = familiaRepository.findById(request.familiaId())
                .orElseThrow(() -> new EntityNotFoundException("Grupo Familia não encontrada")); 
            contato.setFamilia(familia);
        } else {
            contato.setFamilia(null);
        }
        
        repository.save(contato);
    }

    public List<ContatoResponse> getContatosByFamilia(long familiaId) {
        return repository.findByFamiliaId(familiaId)
                .stream()
                .map(ContatoMapper::toDTO)
                .toList();
    }
}
