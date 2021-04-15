package com.github.ckdgus08.controller;

import lombok.Builder;
import lombok.ToString;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @PostMapping("/api/test")
    public String apiTest(
            @RequestParam(value = "time", defaultValue = "0") String time,
            @RequestParam(value = "uuid", defaultValue = "0") String uuid,
            @RequestParam(value = "value", defaultValue = "0") String value
    ) {
        return TestDto.builder()
                .time(time)
                .uuid(uuid)
                .value(value)
                .build().toString();
    }

    @ToString(of = {"time", "uuid", "value"})
    @Builder
    static class TestDto {
        String time;
        String uuid;
        String value;
    }

}
