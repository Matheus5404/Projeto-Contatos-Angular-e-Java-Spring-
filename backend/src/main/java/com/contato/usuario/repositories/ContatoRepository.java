package com.contato.usuario.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.contato.usuario.entities.Contato;

public interface ContatoRepository extends JpaRepository<Contato, Long> {
    
    List<Contato> findByGrupoId(Long grupoId);

    long countByGrupoId(Long grupoId);

}
