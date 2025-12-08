package com.contato.usuario.dtos;

public record ContatoResponse(
    Long id,
    String nome,
    String email,
    String telefone,
    String idade,
    String cidade,
    GrupoResponse grupo
) {}
