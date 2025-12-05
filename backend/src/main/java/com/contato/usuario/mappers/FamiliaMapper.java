package com.contato.usuario.mappers;

import com.contato.usuario.dtos.FamiliaRequest;
import com.contato.usuario.dtos.FamiliaResponse;
import com.contato.usuario.entities.Familia;

public class FamiliaMapper {
    
    public static Familia toEntity(FamiliaRequest request) {
        Familia familia = new Familia();
        familia.setNome(request.nome());
        return familia;
    }

    public static FamiliaResponse toResponse(Familia familia) {
        return new FamiliaResponse(
            familia.getId(),
            familia.getNome()
        );
    }
}
