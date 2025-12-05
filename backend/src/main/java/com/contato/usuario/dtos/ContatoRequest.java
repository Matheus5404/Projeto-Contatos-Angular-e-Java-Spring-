package com.contato.usuario.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContatoRequest(
    @NotBlank(message = "Nome com caractere insuficiente")
    @Size(min = 3, max = 100, message = "Nome tem que ser de 3 até 100 caracteres")
    String nome,

    @NotBlank(message = "Email com caractere insuficiente")
    @Size(min = 20, max = 100, message = "Email tem que ser de 20 até 100 caracteres")
    String email,

    @NotBlank(message = "Telefone com 11 números")
    @Size(min = 11, max = 13, message = "Telefone pode colocar parenteses : opcional")
    String telefone,

    @NotBlank(message = "Idade com caractere um ou mais números")
    @Size(min = 1, max = 120, message = "Idade tem que ser de 1 até 120 anos")
    String idade,

    @NotBlank(message = "Cidade com caractere insuficiente")
    @Size(min = 4, max = 100, message = "Cidade tem que ser de 4 até 100 caracteres")
    String cidade,

    Long familiaId
) {}
