package com.github.ckdgus08.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@RestController
public class DataApiController {

    @GetMapping("/api/data")
    public List<String> getData() throws IOException {

        File file = new File("C:\\Users\\ckdgu\\project\\optical_fiber\\src\\main\\resources\\static\\sample_data\\temp.txt");
        List<String> list = Files.readAllLines(Paths.get(file.getAbsolutePath()), StandardCharsets.UTF_8);

        return list;
    }

    @GetMapping("/api/singleData")
    public List<String> getSingleData() throws IOException {

//        File file = new File("C:\\Users\\ckdgu\\project\\optical_fiber\\src\\main\\resources\\static\\sample_data\\data.txt");
//        List<String> list = Files.readAllLines(Paths.get(file.getAbsolutePath()), StandardCharsets.UTF_8);
        int random = new Random().nextInt(4096);

        return Arrays.asList(String.valueOf(random));
//        return list;
    }


}
