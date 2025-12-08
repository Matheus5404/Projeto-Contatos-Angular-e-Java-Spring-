package com.contato.usuario.mappers;

import com.contato.usuario.dtos.GrupoRequest;
import com.contato.usuario.dtos.GrupoResponse;
import com.contato.usuario.entities.Grupo;

public class GrupoMapper {
    
    public static Grupo toEntity(GrupoRequest request) {
        Grupo grupo = new Grupo();
        grupo.setNome(request.nome());
        return grupo;
    }

    public static GrupoResponse toResponse(Grupo grupo) {
        return new GrupoResponse(
            grupo.getId(),
            grupo.getNome()
        );
    }
}
