package com.contato.usuario.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.contato.usuario.dtos.GrupoRequest;
import com.contato.usuario.dtos.GrupoResponse;
import com.contato.usuario.entities.Contato;
import com.contato.usuario.entities.Grupo;
import com.contato.usuario.mappers.GrupoMapper;
import com.contato.usuario.repositories.ContatoRepository;
import com.contato.usuario.repositories.GrupoRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class GrupoService {

    @Autowired
    private ContatoRepository contatoRepository;

    @Autowired
    private GrupoRepository repository;

    public List<GrupoResponse> getAllGrupos() {
        return repository.findAll()
                .stream()
                .map(GrupoMapper::toResponse)
                .toList();
    }

    public GrupoResponse getGrupoById(Long id) {
        return repository.findById(id)
                .map(GrupoMapper::toResponse)
                .orElseThrow(() -> new EntityNotFoundException("Grupo não encontrado"));
    }

    public GrupoResponse createGrupo(GrupoRequest request) {
        Grupo grupo = GrupoMapper.toEntity(request);
        Grupo savedGrupo = repository.save(grupo);
        return GrupoMapper.toResponse(savedGrupo);
    }

    public GrupoResponse updateGrupo(Long id, GrupoRequest request) {
        Grupo grupo = repository.getReferenceById(id);
        grupo.setNome(request.nome());
        Grupo savedGrupo = repository.save(grupo);
        return GrupoMapper.toResponse(savedGrupo);
    }

    @Transactional
    public void deleteGrupo(Long id) {

        Grupo grupo = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Grupo não encontrado"));

        List<Contato> contatos = contatoRepository.findByGrupoId(id);

        for (Contato c : contatos) {
            c.setGrupo(null);
        }
        contatoRepository.saveAll(contatos);

        repository.delete(grupo);
    }

}
