package org.zerock.mallapi.util;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import jakarta.annotation.PostConstruct;
import lombok.extern.log4j.Log4j2;
import net.coobird.thumbnailator.Thumbnails;

@Component
@Log4j2
public class CustomFileUtil {

    @Value("${org.zerock.upload.path}")
    private String uploadPath;

    @PostConstruct
    public void init() {
        File folder = new File(uploadPath);
        if (!folder.exists()) folder.mkdirs();
        uploadPath = folder.getAbsolutePath();
        log.info("upload path = {}", uploadPath);
    }

    public List<String> saveFiles(List<MultipartFile> files) {
        List<String> savedNames = new ArrayList<>();
        if (files == null || files.isEmpty()) return savedNames;

        for (MultipartFile file : files) {
            if (file.isEmpty()) continue;

            String savedName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path savePath = Paths.get(uploadPath, savedName);

            try {
                Files.copy(file.getInputStream(), savePath);

                String type = file.getContentType();
                if (type != null && type.startsWith("image")) {
                    Path thumb = Paths.get(uploadPath, "s_" + savedName);
                    Thumbnails.of(savePath.toFile()).size(200, 200).toFile(thumb.toFile());
                }

                savedNames.add(savedName);

            } catch (IOException e) {
                throw new RuntimeException(e.getMessage());
            }

        }

        return savedNames;
    }

    public ResponseEntity<Resource> getFile(String fileName) {
        Resource resource = new FileSystemResource(Paths.get(uploadPath, fileName));
        if (!resource.exists()) {
            resource = new FileSystemResource(Paths.get(uploadPath, "default.jpeg"));
        }

        HttpHeaders headers = new HttpHeaders();
        try {
            headers.add("Content-Type", Files.probeContentType(resource.getFile().toPath()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }

        return ResponseEntity.ok().headers(headers).body(resource);
    }

    public void deleteFiles(List<String> fileNames) {
        if (fileNames == null || fileNames.isEmpty())
            return;

        for (String fileName : fileNames) {
            try {
                Files.deleteIfExists(Paths.get(uploadPath, fileName));
                Files.deleteIfExists(Paths.get(uploadPath, "s_" + fileName));
            } catch (IOException e) {
                throw new RuntimeException(e.getMessage());
            }

        }

    }
}