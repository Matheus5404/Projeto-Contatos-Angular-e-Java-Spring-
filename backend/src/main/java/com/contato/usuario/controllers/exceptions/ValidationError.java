package com.contato.usuario.controllers.exceptions;

import java.util.ArrayList;
import java.util.List;

class ValidationError extends StandardError {

    private List<String> errors = new ArrayList<>();

    public void addError(String error){
        this.errors.add(error);
    }

    public List<String> getErrors() {
        return errors;
    }
    
}