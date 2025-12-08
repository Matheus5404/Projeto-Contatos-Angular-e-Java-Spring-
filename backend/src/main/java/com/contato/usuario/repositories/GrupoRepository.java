package com.contato.usuario.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.contato.usuario.entities.Grupo;

@Repository
public interface GrupoRepository extends JpaRepository<Grupo, Long> {
    
}
