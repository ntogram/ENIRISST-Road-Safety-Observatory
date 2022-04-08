package com.enirisst.rso_api.controllers;


import com.enirisst.rso_api.models.AREA;
import com.enirisst.rso_api.repositories.DataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/data")
public class DataController {
    @Autowired
    private DataRepository dataRepository;
    @GetMapping(path = "/hello")
    public List<AREA> sayHello() {
        List<AREA> areas= dataRepository.findAll();
        areas.forEach(System.out::println);
        return areas;
    }


    @GetMapping(path ="/retrieve_locations/{id}")
    public Map <String, List<String>> retrieveLocations(@PathVariable(name="id") Integer id){
       List<String> location_list=dataRepository.RetrieveLoc(id.intValue());
        HashMap<String, List<String>> locations = new HashMap<String, List<String>>();
        locations.put("locations",location_list);
        return locations;
    }



    @GetMapping(path={"/kli","/kli/{region}","/kli/{region}/{start_year}","/kli/{region}/{start_year}/{end_year}"})
    @ResponseBody
    public Map <String, String> sayHi(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year,@PathVariable(name="end_year",required = false) Integer end_year){
        HashMap<String, String> capitalCities = new HashMap<String, String>();
      //  System.out.println(cities);
        if (region!=null) {


            //System.out.println(cities.get(0));
            capitalCities.put("England", region);
            capitalCities.put("Germany", (start_year!=null)?String.valueOf(start_year):null);
            capitalCities.put("Norway",  (end_year!=null)?String.valueOf(end_year):null);
            capitalCities.put("USA", "DC Washingthon");
        }
        else{
            capitalCities.put("England", "London");
            capitalCities.put("Germany", "Berlin");
            capitalCities.put("Norway", "Oslo");
            capitalCities.put("USA", "Oslo");
        }
        return capitalCities;
    }





}
