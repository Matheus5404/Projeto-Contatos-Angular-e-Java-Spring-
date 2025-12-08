package com.contato.usuario.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContatoRequest(
    @NotBlank(message = "Nome com caractere insuficiente")
    @Size(min = 3, max = 100, message = "Nome tem que ser de 3 até 100 caracteres")
    String nome,

    @NotBlank(message = "Email com caractere insuficiente")
    @Size(min = 10, max = 100, message = "Email tem que ser de 10 até 100 caracteres")
    String email,

    @NotBlank(message = "Telefone com 11 números")
    @Size(min = 8, max = 15, message = "Telefone deve ter de 8 até 15 caracteres")
    String telefone,

    @NotBlank(message = "Idade com caractere um ou mais números")
    @Size(min = 1, max = 3, message = "Idade tem que ser de 1 até 3 dígitos")
    String idade,

    @NotBlank(message = "Cidade com caractere insuficiente")
    @Size(min = 3, max = 100, message = "Cidade tem que ser de 3 até 100 caracteres")
    String cidade,

    Long grupoId
) {}
