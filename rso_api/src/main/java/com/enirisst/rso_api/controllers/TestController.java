package com.enirisst.rso_api.controllers;


import com.enirisst.rso_api.models.AREA;
import com.enirisst.rso_api.repositories.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.DrbgParameters;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @GetMapping(path="/kli/{cities}")
    @ResponseBody
    public Map <String, String> sayHi(@PathVariable List<String> cities){
        HashMap<String, String> capitalCities = new HashMap<String, String>();
        //System.out.println(cities.get(0));
        capitalCities.put("England",cities.get(0));
        capitalCities.put("Germany", cities.get(1));
        capitalCities.put("Norway", cities.get(2));
        capitalCities.put("USA", cities.get(3));
        return capitalCities;
    }





}
