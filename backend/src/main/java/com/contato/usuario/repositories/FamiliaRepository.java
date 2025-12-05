package com.contato.usuario.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.contato.usuario.entities.Familia;

@Repository
public interface FamiliaRepository extends JpaRepository<Familia, Long> {
    
}
