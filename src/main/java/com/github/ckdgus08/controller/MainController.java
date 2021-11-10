package com.github.ckdgus08.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping("index")
    public String main() {
        return "index";
    }

    @GetMapping("color")
    public String color() {
        return "color";
    }

}
