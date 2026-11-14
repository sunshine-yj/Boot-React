package org.zerock.mallapi.repository;

import java.time.LocalDate;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.*;
import org.zerock.mallapi.domain.Todo;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
@TestMethodOrder(MethodOrderer.OrderAnnotation.class) // @Order 숫자 순서대로 실행
class TodoRepositoryTests {

    @Autowired
    private TodoRepository todoRepository;

    @Test
    void testExists() {
        log.info("repository = {}", todoRepository);
    }

    @Test
    void testInsert() {
        for (int i = 1; i <= 100; i++) {
            Todo todo = Todo.builder()
                    .title("Title..." + i)
                    .writer("user00")
                    .dueDate(LocalDate.of(2025, 12, 31))
                    .build();

            todoRepository.save(todo);
        };
    }

    @Test
    void testRead() {
        java.util.Optional<Todo> result = todoRepository.findById(33L);
        Todo todo = result.orElseThrow();
        log.info(todo);
    }

    @Test
    void testModify() {
        Todo todo = todoRepository.findById(33L).orElseThrow();
        todo.changeTitle("Modified 33...");
        todo.changeComplete(true);
        todo.changeDueDate(LocalDate.of(2025, 10, 10));
        todoRepository.save(todo);
    }

    @Test
    void testPaging() {
        Pageable pageable = PageRequest.of(0, 10, Sort.by("tno").descending());
        Page<Todo> result = todoRepository.findAll(pageable);

        log.info("total = {}", result.getTotalElements());
        result.getContent().forEach(log::info);
    }

    @Test
    void testDelete() {
        todoRepository.deleteById(1L);
    }
}