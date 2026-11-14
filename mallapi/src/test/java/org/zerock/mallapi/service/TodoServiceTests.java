package org.zerock.mallapi.service;

import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.zerock.mallapi.dto.TodoDTO;

import java.time.LocalDate;

@SpringBootTest
@Log4j2
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class TodoServiceTests {

    @Autowired
    private TodoService todoService;

    @Test
    @Order(1)
    void testRegister() {
        TodoDTO dto = TodoDTO.builder()
                .title("서비스 테스트")
                .writer("tester")
                .dueDate(LocalDate.of(2025, 10, 10))
                .build();
        log.info("TNO: {}", todoService.register(dto));
    }

    @Test
    @Order(2)
    void testGet() {
        log.info(todoService.get(101L));
    }
}