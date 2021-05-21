package com.github.ckdgus08.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@RestController
public class DataApiController {

    @GetMapping("/api/data")
    public List<String> getData() throws IOException {

        File file = new File("/Users/cch/project/optical_fiber/src/main/resources/static/sample_data/temp.txt");
        List<String> list = Files.readAllLines(Paths.get(file.getAbsolutePath()), StandardCharsets.UTF_8);

        return list;
    }

}
