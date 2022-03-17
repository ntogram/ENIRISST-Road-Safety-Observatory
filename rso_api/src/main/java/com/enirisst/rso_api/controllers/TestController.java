package com.enirisst.rso_api.controllers;


import com.enirisst.rso_api.models.AREA;
import com.enirisst.rso_api.repositories.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api1")
public class TestController {
    @Autowired
    private TestRepository testRepository;
    @GetMapping(path = "/hello")
    public List<AREA> sayHello() {
        List<AREA> areas=testRepository.findAll();
        areas.forEach(System.out::println);
        return areas;
    }





}
