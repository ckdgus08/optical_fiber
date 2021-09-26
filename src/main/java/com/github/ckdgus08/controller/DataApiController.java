package com.github.ckdgus08.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.List;

@RestController
public class DataApiController {

    @GetMapping("/api/singleData")
    public List<String> getSingleData() throws IOException {
        File file = new File("C:\\optical_fiber-main\\src\\main\\resources\\static\\sample_data\\data.txt");
        List<String> list = Files.readAllLines(Paths.get(file.getAbsolutePath()), StandardCharsets.UTF_8);

        if(list.size() > 0) {
            return Collections.singletonList(list.get(0));
        } else {
            return Collections.singletonList("0");
        }
    }

}
