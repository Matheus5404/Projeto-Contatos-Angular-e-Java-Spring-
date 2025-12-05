package com.contato.usuario.mappers;

import com.contato.usuario.dtos.ContatoRequest;
import com.contato.usuario.dtos.ContatoResponse;
import com.contato.usuario.entities.Contato;

public class ContatoMapper {
    
    public static Contato toEntity(ContatoRequest request) {
        Contato c = new Contato();
        c.setNome(request.nome());
        c.setEmail(request.email());
        c.setTelefone(request.telefone());
        c.setIdade(request.idade());
        c.setCidade(request.cidade());
        return c;
    }

    public static ContatoResponse toDTO(Contato contato) {
        return new ContatoResponse(
            contato.getId(),
            contato.getNome(),
            contato.getEmail(),
            contato.getTelefone(),
            contato.getIdade(),
            contato.getCidade(),
            contato.getFamilia() != null ? FamiliaMapper.toResponse(contato.getFamilia()) : null
        );
    }
}
