package com.enirisst.rso_api.controllers;


import com.enirisst.rso_api.models.AREA;
import com.enirisst.rso_api.models.O;
import com.enirisst.rso_api.repositories.DataRepository;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.json.JSONObject;
import java.sql.Struct;
import java.util.*;

@RestController
@CrossOrigin
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
        Collections.sort(location_list);//sort need fix
        HashMap<String, List<String>> locations = new HashMap<String, List<String>>();
        locations.put("locations",location_list);
        return locations;
    }

    @GetMapping(path="/retrieve_all_locations", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> retrieveLocations() {
        //List<String> nut_list=dataRepository.RetrieveLoc(0);
        //  List<String> kalmun_list=dataRepository.RetrieveLoc(1);
        //   List<String> pop_list=dataRepository.RetrieveLoc(2);
       // JSONObject obj = new JSONObject();
        //List<JSONObject>


        String[] labels = { "Περιφερειακές Ενότητες (NUTS3)","Δήμοι", "Οικισμοί","Επικράτεια"};
        JSONArray response = new JSONArray();
        JSONArray jsonloclist=new JSONArray();
        JSONObject obj = new JSONObject();
        List<String> locs=new ArrayList<String>();
        for (int i = 0; i < labels.length; i++) {
            obj = new JSONObject();
            obj.put("label", labels[i]);
            if (i!=3){
                locs=dataRepository.RetrieveLoc(i);
                System.out.println(locs.size());
                jsonloclist=dataRepository.transformloclist(locs,labels[i]);
            }
            else{
                jsonloclist=dataRepository.transformloclist( Arrays.asList("Επικράτεια"),labels[i]);
            }

            obj.put("options",jsonloclist);
            response.put(obj);
        }

        obj=new JSONObject();
        obj.put("response",response);
       // obj.put("num", 100);
       // obj.put("balance", 1000.21);
       // obj.put("is_vip", true);
        //jsArr.put(obj.toMap());
        // HashMap<String,HashMap<String,Object>>=new HashMap<~>();
        return new ResponseEntity<>(obj.toMap(), HttpStatus.OK);

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
