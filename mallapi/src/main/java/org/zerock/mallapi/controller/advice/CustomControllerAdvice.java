package org.zerock.mallapi.controller.advice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.zerock.mallapi.util.CustomJWTException;

import java.util.Map;
import java.util.NoSuchElementException;

@RestController
public class CustomControllerAdvice {

    @ExceptionHandler(NoSuchElementException.class)
    protected ResponseEntity<?> noExist(NoSuchElementException e) {
        String msg = e.getMessage();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("msg",msg));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    protected ResponseEntity<?> handleIllgalArgumentException(MethodArgumentNotValidException e) {
        String msg = e.getMessage();
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Map.of("msg",msg));
    }

    @ExceptionHandler(CustomJWTException.class)
    protected ResponseEntity<Map<String, String>> handleJWTException(CustomJWTException e) {
        return ResponseEntity.ok().body(Map.of("error", String.valueOf(e.getMessage())));
    }
}
