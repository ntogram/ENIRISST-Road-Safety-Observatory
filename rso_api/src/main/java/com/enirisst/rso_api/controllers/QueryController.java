package com.enirisst.rso_api.controllers;
import com.enirisst.rso_api.models.*;
import com.enirisst.rso_api.repositories.QueriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
// use -1 value for null values indicator
@RestController
@RequestMapping("/api")
public class QueryController {
    @Autowired
    private QueriesRepository queryRepo;

    private String filter(String region_name,Integer start_year,Integer end_year, String selected_region){


        String where_clause="";
        if (start_year!=null && end_year!=null){
            where_clause="(TROX.YEAR_ID>="+String.valueOf(start_year)+" AND "+"TROX.YEAR_ID<="+String.valueOf(end_year)+")";
        }
        else if(start_year!=null && end_year==null){
                where_clause="(TROX.YEAR_ID="+String.valueOf(start_year)+")";
            }
        else if((start_year==null && end_year!=null)){

            where_clause="(TROX.YEAR_ID="+String.valueOf(end_year)+")";
        }
        else{
            where_clause="";
        }
       if (selected_region!=null){
           if (where_clause!=""){
               where_clause="WHERE "+where_clause +" AND "+region_name +"="+"'"+selected_region+"'";
           }
           else{
               where_clause="WHERE "+region_name +"="+"'"+selected_region+"'";
           }
       }
       else{
           if(where_clause!=""){
           where_clause="WHERE "+where_clause;}
       }


        return where_clause;
    }
    //Γεωγραφικό Επίπεδο NUTS3

    //Κατηγορία Πλήθος Ατυχημάτων
    //Αριθμός Ατυχημάτων

    @GetMapping(path={"/nut1","/nut1/{region}","/nut1/{region}/{start_year}","/nut1/{region}/{start_year}/{end_year}"})
    public List<Nut1> nut1Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("nuts3.nut",start_year,end_year,region);
        System.out.println(where_clause);
        List<Nut1> nut1_res = queryRepo.nut1_query(where_clause);
        //  nut1_res.forEach(System.out::println);
        return nut1_res;
    }

    // Κατηγορία Κοινωνικοοικονομικά Χαρακτηριστικά
    //Αριθμός Ατυχημάτων ανά 1,000,000 κατοίκους

    @GetMapping( path={"/nut2","/nut2/{region}","/nut2/{region}/{start_year}","/nut2/{region}/{start_year}/{end_year}"})
    public List<Nut2> nut2Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("nuts3.nut",start_year,end_year,region);
        String sql_query = "SELECT nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,(Count(*) * 1000000.000000)/nuts3.population AS indicator FROM TROX LEFT JOIN nuts3 ON (nuts3.year=TROX.YEAR_ID) AND (LEFT(TROX.GEOCODE_ACC_CL,2)=nuts3.code) "+where_clause+" GROUP BY nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,nuts3.population ORDER BY nuts3.nut,TROX.YEAR_ID";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Αριθμός νεκρών από ατυχήματα ανά 1,000,000 κατοίκους

    @GetMapping(path={"/nut3","/nut3/{region}","/nut3/{region}/{start_year}","/nut3/{region}/{start_year}/{end_year}"})
    public List<Nut2> nut3Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year){
        String where_clause=filter("nuts3.nut",start_year,end_year,region);
        String sql_query = "SELECT nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,(Sum(TROX.PATH_DEAD_NR) * 1000000.000000)/nuts3.population AS indicator FROM TROX LEFT JOIN nuts3 ON (nuts3.year=TROX.YEAR_ID) AND (LEFT(TROX.GEOCODE_ACC_CL,2)=nuts3.code) "+where_clause+" GROUP BY nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,nuts3.population ORDER BY nuts3.nut,TROX.YEAR_ID";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    // Αριθμός σοβαρά τραυματιών από ατυχήματα ανά 1,000,000 κατοίκους
    @GetMapping(path={"/nut4","/nut4/{region}","/nut4/{region}/{start_year}","/nut4/{region}/{start_year}/{end_year}"})
    public List<Nut2> nut4Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("nuts3.nut",start_year,end_year,region);
        String sql_query = "SELECT nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,(Sum(TROX.PATH_BAR_TRAYM_NR) * 1000000.000000)/nuts3.population AS indicator FROM TROX LEFT JOIN nuts3 ON (nuts3.year=TROX.YEAR_ID) AND (LEFT(TROX.GEOCODE_ACC_CL,2)=nuts3.code) "+where_clause+" GROUP BY nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,nuts3.population ORDER BY nuts3.nut,TROX.YEAR_ID";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Ατυχήματα ανά km δικτύου
    @GetMapping(path={"/nut8","/nut8/{region}","/nut8/{region}/{start_year}","/nut8/{region}/{start_year}/{end_year}"})
    public List<Nut2> nut8Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("nuts3.nut",start_year,end_year,region);
        String sql_query = "SELECT nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,(COUNT(*) * 1.000000)/nuts3.length AS indicator FROM TROX LEFT JOIN nuts3 ON (nuts3.year=TROX.YEAR_ID) AND (LEFT(TROX.GEOCODE_ACC_CL,2)=nuts3.code) "+where_clause+" GROUP BY nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,nuts3.length ORDER BY nuts3.nut,TROX.YEAR_ID";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, false, 2);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Ατυχήματα ανά km2
    @GetMapping(path={"/nut9","/nut9/{region}","/nut9/{region}/{start_year}","/nut9/{region}/{start_year}/{end_year}"})
    public List<Nut2> nut9Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("nuts3.nut",start_year,end_year,region);
        String sql_query = "SELECT nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,(COUNT(*) * 1.000000)/nuts3.area AS indicator FROM TROX LEFT JOIN nuts3 ON (nuts3.year=TROX.YEAR_ID) AND (LEFT(TROX.GEOCODE_ACC_CL,2)=nuts3.code) "+where_clause+" GROUP BY nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,nuts3.area ORDER BY nuts3.nut,TROX.YEAR_ID";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, false, 2);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Αριθμός νεκρών από ατυχήματα ανά 1,000,000 κατοίκους
    @GetMapping(path={"/nut29","/nut29/{region}","/nut29/{region}/{start_year}","/nut29/{region}/{start_year}/{end_year}"})
    public List<Nut2> nut29Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("nuts3.nut",start_year,end_year,region);
        String sql_query = "SELECT nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,Sum(TROX.PATH_DEAD_NR)*1000000/nuts3.population AS indicator FROM (TROX LEFT JOIN nuts3 ON (nuts3.year=TROX.YEAR_ID) AND (LEFT(TROX.GEOCODE_ACC_CL,2)=nuts3.code)) LEFT JOIN (SELECT TROX.YEAR_ID,((Sum(TROX.PATH_DEAD_NR)*1000000.000) / 10816286) AS indicator1 FROM TROX GROUP BY TROX.YEAR_ID ORDER BY TROX.YEAR_ID) AS Ε3 ON (Ε3.YEAR_ID =TROX.YEAR_ID) "+where_clause+" GROUP BY nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,nuts3.population,Ε3.indicator1 ORDER BY nuts3.nut,TROX.YEAR_ID";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, false, 3);
        List<E> e3_list = E3Query(null,null);
        Map<Integer, Double> map = new HashMap<Integer, Double>();
        for (E elem : e3_list) {
            map.put(elem.getYEAR_ID(), elem.getIndicator());
        }
        double ind = 0.0;
        for (Nut2 element : nut2_res) {
            ind = element.getIndicator() / map.get(element.getYEAR_ID());
            BigDecimal bd = new BigDecimal(ind).setScale(3, RoundingMode.HALF_UP);
            ind = bd.doubleValue();
            element.setIndicator(ind);
        }
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Αριθμός ατυχημάτων ανά 1,000 κυκλοφορούντα αυτοκίνητα
    //Ατυχήματα ανά km2
    @GetMapping(path={"/nut30_1","/nut30_1/{region}","/nut30_1/{region}/{start_year}","/nut30_1/{region}/{start_year}/{end_year}"})
    public List<Nut2> nut30_1Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("nuts3_veh.nut",start_year,end_year,region);
        String sql_query = "SELECT nuts3_veh.eu_code,nuts3_veh.nut,TROX.YEAR_ID,(COUNT(*) * 1000.000000)/(CAST(nuts3_veh.car AS int))  AS indicator FROM TROX LEFT JOIN nuts3_veh ON (nuts3_veh.year=TROX.YEAR_ID) AND (LEFT(TROX.GEOCODE_ACC_CL,2)=nuts3_veh.code) "+where_clause+" GROUP BY nuts3_veh.eu_code,nuts3_veh.nut,TROX.YEAR_ID,nuts3_veh.car ORDER BY nuts3_veh.nut,TROX.YEAR_ID";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, false, 2);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Αριθμός ατυχημάτων ανά 1,000 κυκλοφορούντα δίκυκλα
    @GetMapping(path={"/nut30_2","/nut30_2/{region}","/nut30_2/{region}/{start_year}","/nut30_2/{region}/{start_year}/{end_year}"})
    public List<Nut2> nut30_2Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("nuts3_veh.nut",start_year,end_year,region);
        String sql_query = "SELECT nuts3_veh.eu_code,nuts3_veh.nut,TROX.YEAR_ID,(COUNT(*) * 1000.000000)/(CAST(nuts3_veh.bike AS int))  AS indicator FROM TROX LEFT JOIN nuts3_veh ON (nuts3_veh.year=TROX.YEAR_ID) AND (LEFT(TROX.GEOCODE_ACC_CL,2)=nuts3_veh.code) "+where_clause+" GROUP BY nuts3_veh.eu_code,nuts3_veh.nut,TROX.YEAR_ID,nuts3_veh.bike ORDER BY nuts3_veh.nut,TROX.YEAR_ID";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, false, 2);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Αριθμός ατυχημάτων ανά 1,000 κυκλοφορούντα οχήματα
    @GetMapping(path={"/nut30_3","/nut30_3/{region}","/nut30_3/{region}/{start_year}","/nut30_3/{region}/{start_year}/{end_year}"})
    public List<Nut2> nut30_3Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("nuts3_veh.nut",start_year,end_year,region);
        String sql_query = "SELECT nuts3_veh.eu_code,nuts3_veh.nut,TROX.YEAR_ID,(COUNT(*) * 1000.000000)/nuts3_veh.total_vehicles  AS indicator FROM TROX LEFT JOIN nuts3_veh ON (nuts3_veh.year=TROX.YEAR_ID) AND (LEFT(TROX.GEOCODE_ACC_CL,2)=nuts3_veh.code) "+where_clause+" GROUP BY nuts3_veh.eu_code,nuts3_veh.nut,TROX.YEAR_ID,nuts3_veh.total_vehicles ORDER BY nuts3_veh.nut,TROX.YEAR_ID";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, false, 2);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Αριθμός ατυχημάτων προς το ΑΕΠ
    @GetMapping(path={"/nut31","/nut31/{region}","/nut31/{region}/{start_year}","/nut31/{region}/{start_year}/{end_year}"})
    public List<Nut2> nut31Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("nuts3.nut",start_year,end_year,region);
        String sql_query = "SELECT nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,(COUNT(*) * 1.000000)/nuts3.GDP  AS indicator FROM TROX LEFT JOIN nuts3 ON (nuts3.year=TROX.YEAR_ID) AND (LEFT(TROX.GEOCODE_ACC_CL,2)=nuts3.code) "+where_clause+" GROUP BY nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,nuts3.GDP ORDER BY nuts3.nut,TROX.YEAR_ID";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, false, 2);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Αριθμός ατυχημάτων προς τον αριθμό των ανέργων
    @GetMapping(path={"/nut32","/nut32/{region}","/nut32/{region}/{start_year}","/nut32/{region}/{start_year}/{end_year}"})
    public List<Map<String, Object>> nut32Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {//IIf(nuts3.unemployment Is Null Or ltrim(rtrim(nuts3.unemployment)) In ('NA',''),"Δεν υπάρχουν δεδομένα",(Count(*)/(CAST(nuts3.unemployment AS int)))
        String where_clause=filter("nuts3.nut",start_year,end_year,region);
        List<Nut32> nut32_res = queryRepo.nut32_query(where_clause);
        List<Map<String, Object>> nut32_res_map = new ArrayList<>();
        double uemp = 0;
        double ind = 0;
        String ue;
        for (Nut32 res : nut32_res) {


            try {
                ue = (res.getUnemployment()).replace(",", ".");
                uemp = Double.parseDouble(ue);
                ind = res.getCount() / uemp;
                BigDecimal bd = new BigDecimal(ind).setScale(4, RoundingMode.HALF_UP);
                ind = bd.doubleValue();
                res.setIndicator(String.valueOf(ind));
                //System.out.println("1");
            } catch (Exception e) {
                //System.out.println("0");
            }
            nut32_res_map.add(res.toMap());
        }

        return nut32_res_map;
        // return nut32_res;
    }

    //#Γεωγραφικό Επίπεδο NUTS
//#Κατηγορία Εμπλεκόμενοι
//Δείκτης 5
    @GetMapping(path={"/nut5","/nut5/{region}","/nut5/{region}/{start_year}","/nut5/{region}/{start_year}/{end_year}"})
    public List<Nut2> nut5Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("nuts3.nut",start_year,end_year,region);
        String sql_query = "SELECT nuts3.eu_code, nuts3.nut, TROX.YEAR_ID, 100.000*Count(EV.AA_ATICHIMATOS_ID)/COUNT(*) AS indicator FROM (TROX LEFT JOIN nuts3 ON (nuts3.code=Left(TROX.GEOCODE_ACC_CL,2)) AND (nuts3.year = TROX.YEAR_ID)) LEFT JOIN (SELECT TROX.YEAR_ID, TROX.MONTH_ID, TROX.AA_ATICHIMATOS_ID FROM (TROX LEFT JOIN PATHON ON (PATHON.YEAR_ID = TROX.YEAR_ID) AND (PATHON.MONTH_ID = TROX.MONTH_ID) AND (PATHON.AA_ATICHIMATOS_ID = TROX.AA_ATICHIMATOS_ID)) LEFT JOIN ochim ON (ochim.YEAR_ID = TROX.YEAR_ID) AND (ochim.MONTH_ID = TROX.MONTH_ID) AND (ochim.AA_ATICHIMATOS_ID = TROX.AA_ATICHIMATOS_ID) WHERE (PATHON.KATIG_PATHON_CL = '3' OR ochim.TYPE_OXHMATOS_CL = '21')  GROUP BY TROX.YEAR_ID, TROX.MONTH_ID, TROX.AA_ATICHIMATOS_ID)  AS EV ON (TROX.YEAR_ID = EV.YEAR_ID) AND (TROX.MONTH_ID = EV.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = EV.AA_ATICHIMATOS_ID) "+where_clause+" GROUP BY nuts3.eu_code, nuts3.nut, TROX.YEAR_ID ORDER BY nuts3.nut, TROX.YEAR_ID;";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Ποσοστό θανατηφόρων ατυχημάτων
    @GetMapping(path={"/nut15","/nut15/{region}","/nut15/{region}/{start_year}","/nut15/{region}/{start_year}/{end_year}"})
    public List<Nut2> nut15Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("nuts3.nut",start_year,end_year,region);
        String sql_query = "SELECT nuts3.eu_code, nuts3.nut, TROX.YEAR_ID, 100.000*SUM(CASE WHEN TROX.PATH_DEAD_NR>0 THEN 1 ELSE 0 END)/COUNT(*) AS indicator FROM (TROX LEFT JOIN nuts3 ON (nuts3.code=Left(TROX.GEOCODE_ACC_CL,2)) AND (nuts3.year = TROX.YEAR_ID)) "+where_clause+ " GROUP BY nuts3.eu_code, nuts3.nut, TROX.YEAR_ID ORDER BY nuts3.nut, TROX.YEAR_ID;";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Ποσοστό ατυχημάτων με σοβαρά τραυματίες
    @GetMapping(path={"/nut16","/nut16/{region}","/nut16/{region}/{start_year}","/nut16/{region}/{start_year}/{end_year}"})
    public List<Nut2> nut16Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("nuts3.nut",start_year,end_year,region);
        String sql_query = "SELECT nuts3.eu_code, nuts3.nut, TROX.YEAR_ID, 100.000*SUM(CASE WHEN TROX.PATH_BAR_TRAYM_NR>0 THEN 1 ELSE 0 END)/COUNT(*) AS indicator FROM (TROX LEFT JOIN nuts3 ON (nuts3.code=Left(TROX.GEOCODE_ACC_CL,2)) AND (nuts3.year = TROX.YEAR_ID)) "+where_clause+" GROUP BY nuts3.eu_code, nuts3.nut, TROX.YEAR_ID ORDER BY nuts3.nut, TROX.YEAR_ID;";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Ποσοστό ατυχημάτων με ελαφρά τραυματίες
    @GetMapping(path={"/nut17","/nut17/{region}","/nut17/{region}/{start_year}","/nut17/{region}/{start_year}/{end_year}"})
    public List<Nut2> nut17Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("nuts3.nut",start_year,end_year,region);
        String sql_query = "SELECT nuts3.eu_code, nuts3.nut, TROX.YEAR_ID, 100.000*SUM(CASE WHEN TROX.PATH_ELAF_TRAYM_NR>0 THEN 1 ELSE 0 END)/COUNT(*) AS indicator FROM (TROX LEFT JOIN nuts3 ON (nuts3.code=Left(TROX.GEOCODE_ACC_CL,2)) AND (nuts3.year = TROX.YEAR_ID)) "+where_clause+" GROUP BY nuts3.eu_code, nuts3.nut, TROX.YEAR_ID ORDER BY nuts3.nut, TROX.YEAR_ID;";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Ποσοστό ατυχημάτων με παράσυρση πεζού
    @GetMapping(path={"/nut26","/nut26/{region}","/nut26/{region}/{start_year}","/nut26/{region}/{start_year}/{end_year}"})
    public List<Nut2> nut26Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("nuts3.nut",start_year,end_year,region);
        String sql_query = "SELECT nuts3.eu_code, nuts3.nut, TROX.YEAR_ID, 100.000*SUM(CASE WHEN TROX.TIPOS_ATICHIM_CL='11' THEN 1 ELSE 0 END)/COUNT(*) AS indicator FROM (TROX LEFT JOIN nuts3 ON (nuts3.code=Left(TROX.GEOCODE_ACC_CL,2)) AND (nuts3.year = TROX.YEAR_ID)) "+where_clause+" GROUP BY nuts3.eu_code, nuts3.nut, TROX.YEAR_ID ORDER BY nuts3.nut, TROX.YEAR_ID;";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Αριθμός ατυχημάτων με παράσυρση πεζού
    @GetMapping(path={"/nut27","/nut27/{region}","/nut27/{region}/{start_year}","/nut27/{region}/{start_year}/{end_year}"})
    public List<Nut2> nut27Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("nuts3.nut",start_year,end_year,region);
        String sql_query = "SELECT nuts3.eu_code, nuts3.nut, TROX.YEAR_ID, SUM(CASE WHEN TROX.TIPOS_ATICHIM_CL='11' THEN 1 ELSE 0 END) AS indicator FROM (TROX LEFT JOIN nuts3 ON (nuts3.code=Left(TROX.GEOCODE_ACC_CL,2)) AND (nuts3.year = TROX.YEAR_ID)) LEFT JOIN (SELECT TROX.YEAR_ID, TROX.MONTH_ID, TROX.AA_ATICHIMATOS_ID FROM (TROX LEFT JOIN PATHON ON (PATHON.YEAR_ID = TROX.YEAR_ID) AND (PATHON.MONTH_ID = TROX.MONTH_ID) AND (PATHON.AA_ATICHIMATOS_ID = TROX.AA_ATICHIMATOS_ID)) LEFT JOIN ochim ON (ochim.YEAR_ID = TROX.YEAR_ID) AND (ochim.MONTH_ID = TROX.MONTH_ID) AND (ochim.AA_ATICHIMATOS_ID = TROX.AA_ATICHIMATOS_ID) WHERE (PATHON.KATIG_PATHON_CL = '3' OR ochim.TYPE_OXHMATOS_CL = '21')  GROUP BY TROX.YEAR_ID, TROX.MONTH_ID, TROX.AA_ATICHIMATOS_ID)  AS EV ON (TROX.YEAR_ID = EV.YEAR_ID) AND (TROX.MONTH_ID = EV.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = EV.AA_ATICHIMATOS_ID) "+where_clause+" GROUP BY nuts3.eu_code, nuts3.nut, TROX.YEAR_ID ORDER BY nuts3.nut, TROX.YEAR_ID;";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Γεωγραφικό Επίπεδο NUTS3
//Κατηγορία Παθόντες
//Ποσοστό παθόντων στην ηλικιακή ομάδα <29 ετών
    @GetMapping(path={"/nut18","/nut18/{region}","/nut18/{region}/{start_year}","/nut18/{region}/{start_year}/{end_year}"})
    public List<Nut2> nut18Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("nuts3.nut",start_year,end_year,region);
        String sql_query = "SELECT nuts3.eu_code, nuts3.nut, TROX.YEAR_ID,CASE WHEN SUM(CASE WHEN  (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)=0 THEN -1 ELSE (100.00*(SUM(CASE WHEN  ((PATHON.ILIKIA_PATHON_NR<29) AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END))/SUM(CASE WHEN (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)) END  AS indicator FROM (TROX LEFT JOIN nuts3 ON (nuts3.code=Left(TROX.GEOCODE_ACC_CL,2)) AND (nuts3.year = TROX.YEAR_ID)) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID) "+where_clause+" GROUP BY nuts3.eu_code, nuts3.nut, TROX.YEAR_ID ORDER BY nuts3.nut, TROX.YEAR_ID;";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Ποσοστό παθόντων στην ηλικιακή ομάδα >65 ετών
    @GetMapping(path={"/nut19","/nut19/{region}","/nut19/{region}/{start_year}","/nut19/{region}/{start_year}/{end_year}"})
    public List<Nut2> nut19Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("nuts3.nut",start_year,end_year,region);
        String sql_query = "SELECT nuts3.eu_code, nuts3.nut, TROX.YEAR_ID,CASE WHEN SUM(CASE WHEN  (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)=0 THEN -1 ELSE (100.00*(SUM(CASE WHEN  ((PATHON.ILIKIA_PATHON_NR>65) AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END))/SUM(CASE WHEN (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)) END  AS indicator FROM (TROX LEFT JOIN nuts3 ON (nuts3.code=Left(TROX.GEOCODE_ACC_CL,2)) AND (nuts3.year = TROX.YEAR_ID)) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID) "+where_clause+" GROUP BY nuts3.eu_code, nuts3.nut, TROX.YEAR_ID ORDER BY nuts3.nut, TROX.YEAR_ID;";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Αριθμός παθόντων στην ηλικιακή ομάδα <29 ετών
    @GetMapping(path={"/nut20","/nut20/{region}","/nut20/{region}/{start_year}","/nut20/{region}/{start_year}/{end_year}"})
    public List<Nut2> nut20Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("nuts3.nut",start_year,end_year,region);
        String sql_query = "SELECT nuts3.eu_code, nuts3.nut, TROX.YEAR_ID,SUM(CASE WHEN  ((PATHON.ILIKIA_PATHON_NR<29) AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END)  AS indicator FROM (TROX LEFT JOIN nuts3 ON (nuts3.code=Left(TROX.GEOCODE_ACC_CL,2)) AND (nuts3.year = TROX.YEAR_ID)) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID) "+where_clause+" GROUP BY nuts3.eu_code, nuts3.nut, TROX.YEAR_ID ORDER BY nuts3.nut, TROX.YEAR_ID;";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Αριθμός παθόντων στην ηλικιακή ομάδα >65 ετών
    @GetMapping(path={"/nut21","/nut21/{region}","/nut21/{region}/{start_year}","/nut21/{region}/{start_year}/{end_year}"})
    public List<Nut2> nut21Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("nuts3.nut",start_year,end_year,region);
        String sql_query = "SELECT nuts3.eu_code, nuts3.nut, TROX.YEAR_ID,SUM(CASE WHEN  ((PATHON.ILIKIA_PATHON_NR>65) AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END)  AS indicator FROM (TROX LEFT JOIN nuts3 ON (nuts3.code=Left(TROX.GEOCODE_ACC_CL,2)) AND (nuts3.year = TROX.YEAR_ID)) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID) "+where_clause+" GROUP BY nuts3.eu_code, nuts3.nut, TROX.YEAR_ID ORDER BY nuts3.nut, TROX.YEAR_ID;";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;

    }

    //Ποσοστό ανδρών παθόντων
    @GetMapping(path={"/nut22","/nut22/{region}","/nut22/{region}/{start_year}","/nut22/{region}/{start_year}/{end_year}"})
    public List<Nut2> nut22Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("nuts3.nut",start_year,end_year,region);
        String sql_query = "SELECT nuts3.eu_code, nuts3.nut, TROX.YEAR_ID,CASE WHEN SUM(CASE WHEN  (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)=0 THEN -1 ELSE (100.00*(SUM(CASE WHEN  ((PATHON.FILO_PATHON_CL='1') AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END))/SUM(CASE WHEN (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)) END  AS indicator FROM (TROX LEFT JOIN nuts3 ON (nuts3.code=Left(TROX.GEOCODE_ACC_CL,2)) AND (nuts3.year = TROX.YEAR_ID)) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID) "+where_clause+" GROUP BY nuts3.eu_code, nuts3.nut, TROX.YEAR_ID ORDER BY nuts3.nut, TROX.YEAR_ID;";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Ποσοστό γυναικών παθόντων
    @GetMapping(path={"/nut23","/nut23/{region}","/nut23/{region}/{start_year}","/nut23/{region}/{start_year}/{end_year}"})
    public List<Nut2> nut23Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("nuts3.nut",start_year,end_year,region);
        String sql_query = "SELECT nuts3.eu_code, nuts3.nut, TROX.YEAR_ID,CASE WHEN SUM(CASE WHEN  (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)=0 THEN -1 ELSE (100.00*(SUM(CASE WHEN  ((PATHON.FILO_PATHON_CL='2') AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END))/SUM(CASE WHEN (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)) END  AS indicator FROM (TROX LEFT JOIN nuts3 ON (nuts3.code=Left(TROX.GEOCODE_ACC_CL,2)) AND (nuts3.year = TROX.YEAR_ID)) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID) "+where_clause+" GROUP BY nuts3.eu_code, nuts3.nut, TROX.YEAR_ID ORDER BY nuts3.nut, TROX.YEAR_ID;";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    @GetMapping(path={"/nut24","/nut24/{region}","/nut24/{region}/{start_year}","/nut24/{region}/{start_year}/{end_year}"})
    public List<Nut2> nut24Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("nuts3.nut",start_year,end_year,region);
        String sql_query = "SELECT nuts3.eu_code, nuts3.nut, TROX.YEAR_ID,SUM(CASE WHEN  ((PATHON.FILO_PATHON_CL='1') AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END)  AS indicator FROM (TROX LEFT JOIN nuts3 ON (nuts3.code=Left(TROX.GEOCODE_ACC_CL,2)) AND (nuts3.year = TROX.YEAR_ID)) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID) "+where_clause+" GROUP BY nuts3.eu_code, nuts3.nut, TROX.YEAR_ID ORDER BY nuts3.nut, TROX.YEAR_ID;";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;

    }

    @GetMapping(path={"/nut25","/nut25/{region}","/nut25/{region}/{start_year}","/nut25/{region}/{start_year}/{end_year}"})
    public List<Nut2> nut25Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("nuts3.nut",start_year,end_year,region);
        String sql_query = "SELECT nuts3.eu_code, nuts3.nut, TROX.YEAR_ID,SUM(CASE WHEN  ((PATHON.FILO_PATHON_CL='2') AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END)  AS indicator FROM (TROX LEFT JOIN nuts3 ON (nuts3.code=Left(TROX.GEOCODE_ACC_CL,2)) AND (nuts3.year = TROX.YEAR_ID)) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID) "+where_clause+" GROUP BY nuts3.eu_code, nuts3.nut, TROX.YEAR_ID ORDER BY nuts3.nut, TROX.YEAR_ID;";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;

    }


    //Γεωγραφικό Επίπεδο NUTS3
//Κατηγορία Συνθήκες
// Ποσοστό ατυχημάτων μεταξύ 06 και 22
    @GetMapping(path={"/nut6","/nut6/{region}","/nut6/{region}/{start_year}","/nut6/{region}/{start_year}/{end_year}"})
    public List<Nut2> nut6Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("nuts3.nut",start_year,end_year,region);
        String sql_query = "SELECT nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,(100.00*SUM(CASE WHEN  (TROX.HOUR_ACC_NR<=6 Or TROX.HOUR_ACC_NR>=22) THEN 1 ELSE 0 END)/COUNT(*))  AS indicator FROM TROX LEFT JOIN nuts3 ON (nuts3.year=TROX.YEAR_ID) AND (LEFT(TROX.GEOCODE_ACC_CL,2)=nuts3.code) "+where_clause+" GROUP BY nuts3.eu_code,nuts3.nut,TROX.YEAR_ID ORDER BY nuts3.nut,TROX.YEAR_ID";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Ποσοστό ατυχημάτων κατά τις ώρες αιχμής
    @GetMapping(path={"/nut7","/nut7/{region}","/nut7/{region}/{start_year}","/nut7/{region}/{start_year}/{end_year}"})
    public List<Nut2> nut7Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("nuts3.nut",start_year,end_year,region);
        String sql_query = "SELECT nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,(100.00*SUM(CASE WHEN  (TROX.HOUR_ACC_NR Between 8 And 9 Or TROX.HOUR_ACC_NR Between 17 And 18) THEN 1 ELSE 0 END)/COUNT(*))  AS indicator FROM TROX LEFT JOIN nuts3 ON (nuts3.year=TROX.YEAR_ID) AND (LEFT(TROX.GEOCODE_ACC_CL,2)=nuts3.code) "+where_clause+" GROUP BY nuts3.eu_code,nuts3.nut,TROX.YEAR_ID ORDER BY nuts3.nut,TROX.YEAR_ID";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    // Ποσοστό ατυχημάτων κατά τους θερινούς μήνες
    @GetMapping(path={"/nut10","/nut10/{region}","/nut10/{region}/{start_year}","/nut10/{region}/{start_year}/{end_year}"})
    public List<Nut2> nut10Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("nuts3.nut",start_year,end_year,region);
        String sql_query = "SELECT nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,(100.00*SUM(CASE WHEN  (TROX.MONTH_ID Between 6 And 8) THEN 1 ELSE 0 END)/COUNT(*))  AS indicator FROM TROX LEFT JOIN nuts3 ON (nuts3.year=TROX.YEAR_ID) AND (LEFT(TROX.GEOCODE_ACC_CL,2)=nuts3.code) "+where_clause+" GROUP BY nuts3.eu_code,nuts3.nut,TROX.YEAR_ID ORDER BY nuts3.nut,TROX.YEAR_ID";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Ποσοστό ατυχημάτων υπό δυσμενείς καιρικές συνθήκες
    @GetMapping(path={"/nut11","/nut11/{region}","/nut11/{region}/{start_year}","/nut11/{region}/{start_year}/{end_year}"})
    public List<Nut2> nut11Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("nuts3.nut",start_year,end_year,region);
        String sql_query = "SELECT nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,(100.00*SUM(CASE WHEN  (TROX.ATMOSF_SINTHIKES_CL<>'1') THEN 1 ELSE 0 END)/COUNT(*))  AS indicator FROM TROX LEFT JOIN nuts3 ON (nuts3.year=TROX.YEAR_ID) AND (LEFT(TROX.GEOCODE_ACC_CL,2)=nuts3.code) "+where_clause+" GROUP BY nuts3.eu_code,nuts3.nut,TROX.YEAR_ID ORDER BY nuts3.nut,TROX.YEAR_ID";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Ποσοστό ατυχημάτων σε σημεία με κακή συντήρηση
    @GetMapping(path={"/nut12","/nut12/{region}","/nut12/{region}/{start_year}","/nut12/{region}/{start_year}/{end_year}"})
    public List<Nut2> nut12Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("nuts3.nut",start_year,end_year,region);
        String sql_query = "SELECT nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,(100.00*SUM(CASE WHEN  (TROX.STATUS_ODOSTR_CL<>'5') THEN 1 ELSE 0 END)/COUNT(*))  AS indicator FROM TROX LEFT JOIN nuts3 ON (nuts3.year=TROX.YEAR_ID) AND (LEFT(TROX.GEOCODE_ACC_CL,2)=nuts3.code) "+where_clause+" GROUP BY nuts3.eu_code,nuts3.nut,TROX.YEAR_ID ORDER BY nuts3.nut,TROX.YEAR_ID";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Ποσοστό ατυχημάτων υπό δυσμενείς καιρικές συνθήκες και συντήρηση
    @GetMapping(path={"/nut13","/nut13/{region}","/nut13/{region}/{start_year}","/nut13/{region}/{start_year}/{end_year}"})
    public List<Nut2> nut13Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("nuts3.nut",start_year,end_year,region);
        String sql_query = "SELECT nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,(100.00*SUM(CASE WHEN  (TROX.STATUS_ODOSTR_CL<>'5' And TROX.ATMOSF_SINTHIKES_CL<>'1') THEN 1 ELSE 0 END)/COUNT(*))  AS indicator FROM TROX LEFT JOIN nuts3 ON (nuts3.year=TROX.YEAR_ID) AND (LEFT(TROX.GEOCODE_ACC_CL,2)=nuts3.code) "+where_clause+" GROUP BY nuts3.eu_code,nuts3.nut,TROX.YEAR_ID ORDER BY nuts3.nut,TROX.YEAR_ID";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Ποσοστό ατυχημάτων σε σημεία με κακές συνθήκες φωτισμού
    @GetMapping(path={"/nut14","/nut14/{region}","/nut14/{region}/{start_year}","/nut14/{region}/{start_year}/{end_year}"})
    public List<Nut2> nut14Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("nuts3.nut",start_year,end_year,region);
        String sql_query = "SELECT nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,(100.00*SUM(CASE WHEN  (TROX.LIGHT_CL<>'1') THEN 1 ELSE 0 END)/COUNT(*))  AS indicator FROM TROX LEFT JOIN nuts3 ON (nuts3.year=TROX.YEAR_ID) AND (LEFT(TROX.GEOCODE_ACC_CL,2)=nuts3.code) "+where_clause+" GROUP BY nuts3.eu_code,nuts3.nut,TROX.YEAR_ID ORDER BY nuts3.nut,TROX.YEAR_ID";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Ποσοστό ατυχημάτων που συνέβησαν Σαββατοκύριακα
    @GetMapping(path={"/nut28","/nut28/{region}","/nut28/{region}/{start_year}","/nut28/{region}/{start_year}/{end_year}"})
    public List<Nut2> nut28Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("nuts3.nut",start_year,end_year,region);
        String sql_query = "SELECT nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,(100.00*SUM(CASE WHEN  (TROX.DATE_WEEK_ACC_NR=1 Or TROX.DATE_WEEK_ACC_NR=7) THEN 1 ELSE 0 END)/COUNT(*))  AS indicator FROM TROX LEFT JOIN nuts3 ON (nuts3.year=TROX.YEAR_ID) AND (LEFT(TROX.GEOCODE_ACC_CL,2)=nuts3.code) "+where_clause+" GROUP BY nuts3.eu_code,nuts3.nut,TROX.YEAR_ID ORDER BY nuts3.nut,TROX.YEAR_ID";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }


    //Γεωγραφικό Επίπεδο Επικράτειας
    //Κατηγορία Πλήθος Ατυχημάτων
    //Αριθμός Ατυχημάτων
    @GetMapping(path ={ "/E1","/E1/{start_year}/{end_year}","/E1/{start_year}"})
    public List<E> E1Query( @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("",start_year,end_year,null);
        System.out.println(where_clause);
        String sql_query = "SELECT TROX.YEAR_ID,COUNT(*) AS indicator FROM TROX "+where_clause+" GROUP BY TROX.YEAR_ID ORDER BY TROX.YEAR_ID";
        List<E> e_res = queryRepo.E_query(sql_query);
      //  e_res.forEach(System.out::println);
        return e_res;
    }

    //Κατηγορία Κοινωνικοοικονομικά Χαρακτηριστικά
    //Αριθμός Ατυχημάτων ανά 1,000,000 κατοίκους
    @GetMapping(path ={"/E2","/E2/{start_year}/{end_year}","/E2/{start_year}"})
    public List<E> E2Query(@PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("",start_year,end_year,null);
        String sql_query = "SELECT TROX.YEAR_ID,((COUNT(*)*1000000.000000) / 10816286) AS indicator FROM TROX "+where_clause+" GROUP BY TROX.YEAR_ID ORDER BY TROX.YEAR_ID";
        List<E> e_res = queryRepo.E_query(sql_query);
        //e_res.forEach(System.out::println);
        return e_res;
    }

    //Αριθμός νεκρών από ατυχήματα ανά 1,000,000 κατοίκους
    @GetMapping(path ={"/E3","/E3/{start_year}/{end_year}","/E3/{start_year}"})
    public List<E> E3Query(@PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("",start_year,end_year,null);
        String sql_query = "SELECT TROX.YEAR_ID,((Sum(TROX.PATH_DEAD_NR)*1000000.000000) / 10816286) AS indicator FROM TROX "+where_clause+" GROUP BY TROX.YEAR_ID ORDER BY TROX.YEAR_ID";
        List<E> e_res = queryRepo.E_query(sql_query);
        //e_res.forEach(System.out::println);
        return e_res;
    }

    //Αριθμός σοβαρά τραυματιών από ατυχήματα ανά 1,000,000 κατοίκους
    @GetMapping(path ={"/E4","/E4/{start_year}/{end_year}","/E4/{start_year}"})
    public List<E> E4Query(@PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("",start_year,end_year,null);
        String sql_query = "SELECT TROX.YEAR_ID,((Sum(TROX.PATH_BAR_TRAYM_NR)*1000000.000000) / 10816286) AS indicator FROM TROX LEFT JOIN POPULATION ON (TROX.GEOCODE_ACC_CL=POPULATION.Code) "+where_clause+" GROUP BY TROX.YEAR_ID ORDER BY TROX.YEAR_ID";
        List<E> e_res = queryRepo.E_query(sql_query);
       // e_res.forEach(System.out::println);
        return e_res;
    }

    //Γεωγραφικό Επίπεδο Καλλικρατικών Δήμων
//Κατηγορία Πλήθος Ατυχημάτων
//Αριθμός Ατυχημάτων
    @GetMapping(path={"/kd1","/kd1/{region}","/kd1/{region}/{start_year}","/kd1/{region}/{start_year}/{end_year}"})
    public List<Kd> kd1Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("KalMun.Muname",start_year,end_year,region);
        String sql_query = "SELECT KalMun.Code, KalMun.Muname,TROX.YEAR_ID, Count(*) as indicator FROM TROX LEFT JOIN KalMun ON Left(TROX.GEOCODE_ACC_CL,4)=KalMun.code "+where_clause+" GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID ORDER BY KalMun.Muname, TROX.YEAR_ID;";
        List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
        kd_res.forEach(System.out::println);
        return kd_res;
    }

    // Γεωγραφικό Επίπεδο Καλλικρατικών Δήμων
// Κατηγορία Κοινωνικοοικονομικά Χαρακτηριστικά
//Αριθμός Ατυχημάτων ανά 1,000,000 κατοίκους
    @GetMapping(path={"/kd2","/kd2/{region}","/kd2/{region}/{start_year}","/kd2/{region}/{start_year}/{end_year}"})
    public List<Kd> kd2Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("KalMun.Muname",start_year,end_year,region);
        String sql_query = "SELECT KalMun.Code, KalMun.Muname,TROX.YEAR_ID,Count(*) * 1000000.0 / POPULATION.[Μόνιμος Πληθυσμός]as indicator FROM (TROX LEFT JOIN POPULATION ON POPULATION.Code=Left(TROX.GEOCODE_ACC_CL,4)) LEFT JOIN Kalmun ON Kalmun.Code=Left(TROX.GEOCODE_ACC_CL,4) "+where_clause+" GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID,POPULATION.[Μόνιμος Πληθυσμός] ORDER BY KalMun.Muname, TROX.YEAR_ID;";
        List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
        kd_res.forEach(System.out::println);
        return kd_res;
    }

    //Αριθμός νεκρών από ατυχήματα ανά 1,000,000 κατοίκους
    @GetMapping(path={"/kd3","/kd3/{region}","/kd3/{region}/{start_year}","/kd3/{region}/{start_year}/{end_year}"})
    public List<Kd> kd3Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("KalMun.Muname",start_year,end_year,region);
        String sql_query = "SELECT KalMun.Code, KalMun.Muname,TROX.YEAR_ID,Sum(TROX.PATH_DEAD_NR) * 1000000.000 / POPULATION.[Μόνιμος Πληθυσμός] as indicator FROM (TROX LEFT JOIN POPULATION ON POPULATION.Code=Left(TROX.GEOCODE_ACC_CL,4)) LEFT JOIN Kalmun ON Kalmun.Code=Left(TROX.GEOCODE_ACC_CL,4) "+where_clause+" GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID,POPULATION.[Μόνιμος Πληθυσμός] ORDER BY KalMun.Muname, TROX.YEAR_ID;";
        List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
        kd_res.forEach(System.out::println);
        return kd_res;
    }

    //Αριθμός σοβαρά τραυματιών από ατυχήματα ανά 1,000,000 κατοίκου
    @GetMapping(path={"/kd4","/kd4/{region}","/kd4/{region}/{start_year}","/kd4/{region}/{start_year}/{end_year}"})
    public List<Kd> kd4Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("KalMun.Muname",start_year,end_year,region);
        String sql_query = "SELECT KalMun.Code, KalMun.Muname,TROX.YEAR_ID,Sum(TROX.PATH_BAR_TRAYM_NR) * 1000000.000 / POPULATION.[Μόνιμος Πληθυσμός] as indicator FROM (TROX LEFT JOIN POPULATION ON POPULATION.Code=Left(TROX.GEOCODE_ACC_CL,4)) LEFT JOIN Kalmun ON Kalmun.Code=Left(TROX.GEOCODE_ACC_CL,4) "+where_clause+" GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID,POPULATION.[Μόνιμος Πληθυσμός] ORDER BY KalMun.Muname, TROX.YEAR_ID;";
        List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
        kd_res.forEach(System.out::println);
        return kd_res;
    }

    //Ατυχήματα ανά km δικτύου
    @GetMapping(path={"/kd8","/kd8/{region}","/kd8/{region}/{start_year}","/kd8/{region}/{start_year}/{end_year}"})
    public List<Kd> kd8Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("KalMun.Muname",start_year,end_year,region);
        String sql_query = "SELECT KalMun.Code, KalMun.Muname,TROX.YEAR_ID,(COUNT(*)*1.000/LENGTH.LENGTH_KM) as indicator FROM (TROX LEFT JOIN LENGTH ON Left(TROX.GEOCODE_ACC_CL,4)=LENGTH.CODE_ELSTAT) LEFT JOIN Kalmun ON Left(TROX.GEOCODE_ACC_CL,4)=Kalmun.code "+where_clause+" GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID,LENGTH.LENGTH_KM ORDER BY KalMun.Muname, TROX.YEAR_ID;";
        List<Kd> kd_res = queryRepo.kd_query(sql_query, false, 2);
        kd_res.forEach(System.out::println);
        return kd_res;
    }

    //Ατυχήματα ανά km2
    @GetMapping(path={"/kd9","/kd9/{region}","/kd9/{region}/{start_year}","/kd9/{region}/{start_year}/{end_year}"})
    public List<Kd> kd9Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("KalMun.Muname",start_year,end_year,region);
        String sql_query = "SELECT KalMun.Code, KalMun.Muname,TROX.YEAR_ID,(COUNT(*)*1.000/AREA.AREA_KM2) as indicator FROM (TROX LEFT JOIN AREA  ON Left(TROX.GEOCODE_ACC_CL,4)=AREA.CODE_ELSTAT) LEFT JOIN Kalmun ON Left(TROX.GEOCODE_ACC_CL,4)=Kalmun.code "+where_clause+" GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID,AREA.AREA_KM2 ORDER BY KalMun.Muname, TROX.YEAR_ID;";
        List<Kd> kd_res = queryRepo.kd_query(sql_query, false, 2);
        kd_res.forEach(System.out::println);
        return kd_res;
    }

    //Αριθμός νεκρών από ατυχήματα ανά 1,000,000 κατοίκους
    @GetMapping(path={"/kd29","/kd29/{region}","/kd29/{region}/{start_year}","/kd29/{region}/{start_year}/{end_year}"})
    public List<Kd> kd29Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("KalMun.Muname",start_year,end_year,region);
        String sql_query = "SELECT KalMun.Code, KalMun.Muname , TROX.YEAR_ID, (Sum(TROX.PATH_DEAD_NR) * 1000000) / POPULATION.[Μόνιμος Πληθυσμός]  AS indicator FROM ((TROX LEFT JOIN POPULATION ON POPULATION.Code=Left(TROX.GEOCODE_ACC_CL,4)) LEFT JOIN Kalmun ON Kalmun.Code=Left(TROX.GEOCODE_ACC_CL,4)) LEFT JOIN (SELECT TROX.YEAR_ID,((Sum(TROX.PATH_DEAD_NR)*1000000.000) / 10816286) AS indicator1 FROM TROX GROUP BY TROX.YEAR_ID ORDER BY TROX.YEAR_ID) AS Ε3 ON (Ε3.YEAR_ID = TROX.YEAR_ID) "+where_clause+" GROUP BY Kalmun.Code, Kalmun.Muname, TROX.YEAR_ID, POPULATION.[Μόνιμος Πληθυσμός],indicator1 ORDER BY Kalmun.Muname, TROX.YEAR_ID;";

        List<Kd> Kd_res = queryRepo.kd_query(sql_query, true, 0);
        List<E> e3_list = E3Query(null,null);
        Map<Integer, Double> map = new HashMap<Integer, Double>();
        for (E elem : e3_list) {
            map.put(elem.getYEAR_ID(), elem.getIndicator());
        }
        double ind = 0.0;
        for (Kd element : Kd_res) {
            ind = element.getIndicator() / map.get(element.getYEAR_ID());
            BigDecimal bd = new BigDecimal(ind).setScale(7, RoundingMode.HALF_UP);
            ind = bd.doubleValue();
            element.setIndicator(ind);
        }
        Kd_res.forEach(System.out::println);
        return Kd_res;


    }
//Γεωγραφικό Επίπεδο Καλλικρατικών Δήμων
//Κατηγορία Εμπλεκόμενοι
// Δείκτης 5
@GetMapping(path={"/kd5","/kd5/{region}","/kd5/{region}/{start_year}","/kd5/{region}/{start_year}/{end_year}"})
public List<Kd> kd5Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
    String where_clause=filter("KalMun.Muname",start_year,end_year,region);
    String sql_query = "SELECT KalMun.Code, KalMun.Muname, TROX.YEAR_ID, 100.000*Count(EV.AA_ATICHIMATOS_ID)/COUNT(*) AS indicator FROM (TROX LEFT JOIN KalMun  ON (Left(TROX.GEOCODE_ACC_CL,4)=Kalmun.code)) LEFT JOIN (SELECT TROX.YEAR_ID, TROX.MONTH_ID, TROX.AA_ATICHIMATOS_ID FROM (TROX LEFT JOIN PATHON ON (PATHON.YEAR_ID = TROX.YEAR_ID) AND (PATHON.MONTH_ID = TROX.MONTH_ID) AND (PATHON.AA_ATICHIMATOS_ID = TROX.AA_ATICHIMATOS_ID)) LEFT JOIN ochim ON (ochim.YEAR_ID = TROX.YEAR_ID) AND (ochim.MONTH_ID = TROX.MONTH_ID) AND (ochim.AA_ATICHIMATOS_ID = TROX.AA_ATICHIMATOS_ID) WHERE (PATHON.KATIG_PATHON_CL = '3' OR ochim.TYPE_OXHMATOS_CL = '21') GROUP BY TROX.YEAR_ID, TROX.MONTH_ID, TROX.AA_ATICHIMATOS_ID)  AS EV ON (TROX.YEAR_ID = EV.YEAR_ID) AND (TROX.MONTH_ID = EV.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = EV.AA_ATICHIMATOS_ID) "+where_clause+" GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID ORDER BY KalMun.Muname, TROX.YEAR_ID;";
    List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
    kd_res.forEach(System.out::println);
    return kd_res;
}
//Ποσοστό θανατηφόρων ατυχημάτων
@GetMapping(path={"/kd15","/kd15/{region}","/kd15/{region}/{start_year}","/kd15/{region}/{start_year}/{end_year}"})
public List<Kd> kd15Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("KalMun.Muname",start_year,end_year,region);
        String sql_query = "SELECT KalMun.Code, KalMun.Muname,TROX.YEAR_ID,(SUM(CASE WHEN (TROX.PATH_DEAD_NR>0) THEN 1 ELSE 0 END)*100.000/COUNT(*)) as indicator FROM (TROX LEFT JOIN Kalmun ON Left(TROX.GEOCODE_ACC_CL,4)=Kalmun.code) "+where_clause+" GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID ORDER BY KalMun.Muname, TROX.YEAR_ID;";
        List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
        kd_res.forEach(System.out::println);
        return kd_res;
    }



//Ποσοστό ατυχημάτων με σοβαρά τραυματίες
@GetMapping(path={"/kd16","/kd16/{region}","/kd16/{region}/{start_year}","/kd16/{region}/{start_year}/{end_year}"})
public List<Kd> kd16Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("KalMun.Muname",start_year,end_year,region);
        String sql_query = "SELECT KalMun.Code, KalMun.Muname,TROX.YEAR_ID,(SUM(CASE WHEN (TROX.PATH_BAR_TRAYM_NR>0) THEN 1 ELSE 0 END)*100.000/COUNT(*)) as indicator FROM (TROX LEFT JOIN Kalmun ON Left(TROX.GEOCODE_ACC_CL,4)=Kalmun.code) "+where_clause+" GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID ORDER BY KalMun.Muname, TROX.YEAR_ID;";
        List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
        kd_res.forEach(System.out::println);
        return kd_res;
    }
//Ποσοστό ατυχημάτων με ελαφρά τραυματίες
@GetMapping(path={"/kd17","/kd17/{region}","/kd17/{region}/{start_year}","/kd17/{region}/{start_year}/{end_year}"})
public List<Kd> kd17Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
    String where_clause=filter("KalMun.Muname",start_year,end_year,region);
    String sql_query = "SELECT KalMun.Code, KalMun.Muname,TROX.YEAR_ID,(SUM(CASE WHEN (TROX.PATH_ELAF_TRAYM_NR>0) THEN 1 ELSE 0 END)*100.000/COUNT(*)) as indicator FROM (TROX LEFT JOIN Kalmun ON Left(TROX.GEOCODE_ACC_CL,4)=Kalmun.code) "+where_clause+" GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID ORDER BY KalMun.Muname, TROX.YEAR_ID;";
    List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
    kd_res.forEach(System.out::println);
    return kd_res;
}

//Ποσοστό ατυχημάτων με παράσυρση πεζού
@GetMapping(path={"/kd26","/kd26/{region}","/kd26/{region}/{start_year}","/kd26/{region}/{start_year}/{end_year}"})
public List<Kd> kd26Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("KalMun.Muname",start_year,end_year,region);
        String sql_query = "SELECT KalMun.Code, KalMun.Muname,TROX.YEAR_ID,(SUM(CASE WHEN (TROX.TIPOS_ATICHIM_CL='11') THEN 1 ELSE 0 END)*100.000/COUNT(*)) as indicator FROM (TROX LEFT JOIN Kalmun ON Left(TROX.GEOCODE_ACC_CL,4)=Kalmun.code) "+where_clause+" GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID ORDER BY KalMun.Muname, TROX.YEAR_ID;";
        List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
        kd_res.forEach(System.out::println);
        return kd_res;
    }
@GetMapping(path={"/kd27","/kd27/{region}","/kd27/{region}/{start_year}","/kd27/{region}/{start_year}/{end_year}"})
public List<Kd> kd27Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("KalMun.Muname",start_year,end_year,region);
        String sql_query = "SELECT KalMun.Code, KalMun.Muname,TROX.YEAR_ID,(SUM(CASE WHEN (TROX.TIPOS_ATICHIM_CL='11') THEN 1 ELSE 0 END)) as indicator FROM (TROX LEFT JOIN Kalmun ON Left(TROX.GEOCODE_ACC_CL,4)=Kalmun.code) "+where_clause+"  GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID ORDER BY KalMun.Muname, TROX.YEAR_ID;";
        List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
        kd_res.forEach(System.out::println);
        return kd_res;
    }


//Γεωγραφικό Επίπεδο Καλλικρατικών Δήμων
//Κατηγορία Παθόντες
//Ποσοστό παθόντων στην ηλικιακή ομάδα <29 ετών
@GetMapping(path={"/kd18","/kd18/{region}","/kd18/{region}/{start_year}","/kd18/{region}/{start_year}/{end_year}"})
public List<Kd> kd18Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
    String where_clause=filter("KalMun.Muname",start_year,end_year,region);
    String sql_query = "SELECT KalMun.Code, KalMun.Muname, TROX.YEAR_ID,CASE WHEN SUM(CASE WHEN  (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)=0 THEN -1 ELSE (100.00*(SUM(CASE WHEN  ((PATHON.ILIKIA_PATHON_NR<29) AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END))/SUM(CASE WHEN (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)) END  AS indicator FROM (TROX LEFT JOIN Kalmun  ON (Kalmun.code=Left(TROX.GEOCODE_ACC_CL,4)) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID)) "+where_clause+"  GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID ORDER BY KalMun.Muname, TROX.YEAR_ID;";
    List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
    kd_res.forEach(System.out::println);
    return kd_res;
}

//Ποσοστό παθόντων στην ηλικιακή ομάδα >65 ετών
@GetMapping(path={"/kd19","/kd19/{region}","/kd19/{region}/{start_year}","/kd19/{region}/{start_year}/{end_year}"})
public List<Kd> kd19Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("KalMun.Muname",start_year,end_year,region);
        String sql_query = "SELECT KalMun.Code, KalMun.Muname, TROX.YEAR_ID,CASE WHEN SUM(CASE WHEN  (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)=0 THEN -1 ELSE (100.00*(SUM(CASE WHEN  ((PATHON.ILIKIA_PATHON_NR>65) AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END))/SUM(CASE WHEN (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)) END  AS indicator FROM (TROX LEFT JOIN Kalmun  ON (Kalmun.code=Left(TROX.GEOCODE_ACC_CL,4)) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID)) "+where_clause+" GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID ORDER BY KalMun.Muname, TROX.YEAR_ID;";
        List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
        kd_res.forEach(System.out::println);
        return kd_res;
    }

//Αριθμός παθόντων στην ηλικιακή ομάδα <29 ετών
@GetMapping(path={"/kd20","/kd20/{region}","/kd20/{region}/{start_year}","/kd20/{region}/{start_year}/{end_year}"})
public List<Kd> kd20Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
    String where_clause=filter("KalMun.Muname",start_year,end_year,region);
    String sql_query = "SELECT KalMun.Code, KalMun.Muname, TROX.YEAR_ID,CASE WHEN SUM(CASE WHEN  (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)=0 THEN NULL ELSE ((SUM(CASE WHEN  ((PATHON.ILIKIA_PATHON_NR<29) AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END))) END  AS indicator FROM (TROX LEFT JOIN Kalmun  ON (Kalmun.code=Left(TROX.GEOCODE_ACC_CL,4)) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID)) "+where_clause+" GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID ORDER BY KalMun.Muname, TROX.YEAR_ID;";
    List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
    kd_res.forEach(System.out::println);
    return kd_res;
}
//Αριθμός παθόντων στην ηλικιακή ομάδα >65 ετών
@GetMapping(path={"/kd21","/kd21/{region}","/kd21/{region}/{start_year}","/kd21/{region}/{start_year}/{end_year}"})
public List<Kd> kd21Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
    String where_clause=filter("KalMun.Muname",start_year,end_year,region);
    String sql_query = "SELECT KalMun.Code, KalMun.Muname, TROX.YEAR_ID,CASE WHEN SUM(CASE WHEN  (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)=0 THEN NULL ELSE ((SUM(CASE WHEN  ((PATHON.ILIKIA_PATHON_NR>65) AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END))) END  AS indicator FROM (TROX LEFT JOIN Kalmun  ON (Kalmun.code=Left(TROX.GEOCODE_ACC_CL,4)) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID)) "+where_clause+" GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID ORDER BY KalMun.Muname, TROX.YEAR_ID;";
    List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
    kd_res.forEach(System.out::println);
    return kd_res;
}
//Ποσοστό ανδρών παθόντων
 @GetMapping(path={"/kd22","/kd22/{region}","/kd22/{region}/{start_year}","/kd22/{region}/{start_year}/{end_year}"})
 public List<Kd> kd22Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("KalMun.Muname",start_year,end_year,region);
        String sql_query = "SELECT KalMun.Code, KalMun.Muname, TROX.YEAR_ID,CASE WHEN SUM(CASE WHEN  (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)=0 THEN -1 ELSE (100.00*(SUM(CASE WHEN  (PATHON.FILO_PATHON_CL='1' AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END))/SUM(CASE WHEN (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)) END  AS indicator FROM (TROX LEFT JOIN Kalmun  ON (Kalmun.code=Left(TROX.GEOCODE_ACC_CL,4)) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID)) "+where_clause+" GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID ORDER BY KalMun.Muname, TROX.YEAR_ID;";
        List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
        kd_res.forEach(System.out::println);
        return kd_res;
    }

//Ποσοστό γυναικών παθόντων
@GetMapping(path={"/kd23","/kd23/{region}","/kd23/{region}/{start_year}","/kd23/{region}/{start_year}/{end_year}"})
    public List<Kd> kd23Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("KalMun.Muname",start_year,end_year,region);
        String sql_query = "SELECT KalMun.Code, KalMun.Muname, TROX.YEAR_ID,CASE WHEN SUM(CASE WHEN  (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)=0 THEN -1 ELSE (100.00*(SUM(CASE WHEN  (PATHON.FILO_PATHON_CL='2' AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END))/SUM(CASE WHEN (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)) END  AS indicator FROM (TROX LEFT JOIN Kalmun  ON (Kalmun.code=Left(TROX.GEOCODE_ACC_CL,4)) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID)) "+where_clause+" GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID ORDER BY KalMun.Muname, TROX.YEAR_ID;";
        List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
        kd_res.forEach(System.out::println);
        return kd_res;
    }
//Αριθμός ανδρών παθόντων
@GetMapping(path={"/kd24","/kd24/{region}","/kd24/{region}/{start_year}","/kd24/{region}/{start_year}/{end_year}"})
public List<Kd> kd24Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("KalMun.Muname",start_year,end_year,region);
        String sql_query = "SELECT KalMun.Code, KalMun.Muname, TROX.YEAR_ID,CASE WHEN SUM(CASE WHEN  (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)=0 THEN NULL ELSE ((SUM(CASE WHEN  ((PATHON.FILO_PATHON_CL='1') AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END))) END  AS indicator FROM (TROX LEFT JOIN Kalmun  ON (Kalmun.code=Left(TROX.GEOCODE_ACC_CL,4)) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID)) "+where_clause+" GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID ORDER BY KalMun.Muname, TROX.YEAR_ID;";
        List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
        kd_res.forEach(System.out::println);
        return kd_res;
    }
//Αριθμός γυναικών παθόντων
@GetMapping(path={"/kd25","/kd25/{region}","/kd25/{region}/{start_year}","/kd25/{region}/{start_year}/{end_year}"})
public List<Kd> kd25Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("KalMun.Muname",start_year,end_year,region);
        String sql_query = "SELECT KalMun.Code, KalMun.Muname, TROX.YEAR_ID,CASE WHEN SUM(CASE WHEN  (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)=0 THEN NULL ELSE ((SUM(CASE WHEN  ((PATHON.FILO_PATHON_CL='2') AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END))) END  AS indicator FROM (TROX LEFT JOIN Kalmun  ON (Kalmun.code=Left(TROX.GEOCODE_ACC_CL,4)) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID)) "+where_clause+" GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID ORDER BY KalMun.Muname, TROX.YEAR_ID;";
        List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
        kd_res.forEach(System.out::println);
        return kd_res;
    }
//Γεωγραφικό Επίπεδο Καλλικρατικών Δήμων
//Κατηγορία Συνθήκες
// Ποσοστό ατυχημάτων μεταξύ 06 και 22
@GetMapping(path={"/kd6","/kd6/{region}","/kd6/{region}/{start_year}","/kd6/{region}/{start_year}/{end_year}"})
public List<Kd> kd6Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
    String where_clause=filter("KalMun.Muname",start_year,end_year,region);
    String sql_query = "SELECT KalMun.Code, KalMun.Muname,TROX.YEAR_ID,(100.00*SUM(CASE WHEN  (TROX.HOUR_ACC_NR<=6 Or TROX.HOUR_ACC_NR>=22) THEN 1 ELSE 0 END)/COUNT(*))  AS indicator FROM TROX LEFT JOIN Kalmun  ON (LEFT(TROX.GEOCODE_ACC_CL,4)=KalMun.Code) "+where_clause+" GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID ORDER BY KalMun.Muname, TROX.YEAR_ID;";
    List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
    kd_res.forEach(System.out::println);
    return kd_res;
}
//Ποσοστό ατυχημάτων κατά τις ώρες αιχμής
@GetMapping(path={"/kd7","/kd7/{region}","/kd7/{region}/{start_year}","/kd7/{region}/{start_year}/{end_year}"})
public List<Kd> kd7Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
    String where_clause=filter("KalMun.Muname",start_year,end_year,region);
    String sql_query = "SELECT KalMun.Code, KalMun.Muname,TROX.YEAR_ID,(100.00*SUM(CASE WHEN  (TROX.HOUR_ACC_NR Between 8 And 9 Or TROX.HOUR_ACC_NR Between 17 And 18) THEN 1 ELSE 0 END)/COUNT(*))  AS indicator FROM TROX LEFT JOIN Kalmun  ON (LEFT(TROX.GEOCODE_ACC_CL,4)=KalMun.Code) "+where_clause+" GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID ORDER BY KalMun.Muname, TROX.YEAR_ID;";
    List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
    kd_res.forEach(System.out::println);
    return kd_res;
}

//Ποσοστό ατυχημάτων κατά τους θερινούς μήνες
@GetMapping(path={"/kd10","/kd10/{region}","/kd10/{region}/{start_year}","/kd10/{region}/{start_year}/{end_year}"})
public List<Kd> kd10Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
    String where_clause=filter("KalMun.Muname",start_year,end_year,region);
    String sql_query = "SELECT KalMun.Code, KalMun.Muname,TROX.YEAR_ID,(100.00*SUM(CASE WHEN  (TROX.MONTH_ID Between 6 And 8) THEN 1 ELSE 0 END)/COUNT(*))  AS indicator FROM TROX LEFT JOIN Kalmun  ON (LEFT(TROX.GEOCODE_ACC_CL,4)=KalMun.Code) "+where_clause+" GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID ORDER BY KalMun.Muname, TROX.YEAR_ID;";
    List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
    kd_res.forEach(System.out::println);
    return kd_res;
}
//Ποσοστό ατυχημάτων υπό δυσμενείς καιρικές συνθήκες
@GetMapping(path={"/kd11","/kd11/{region}","/kd11/{region}/{start_year}","/kd11/{region}/{start_year}/{end_year}"})
public List<Kd> kd11Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
    String where_clause=filter("KalMun.Muname",start_year,end_year,region);
    String sql_query = "SELECT KalMun.Code, KalMun.Muname,TROX.YEAR_ID,(100.00*SUM(CASE WHEN  (TROX.ATMOSF_SINTHIKES_CL<>'1') THEN 1 ELSE 0 END)/COUNT(*))  AS indicator FROM TROX LEFT JOIN Kalmun  ON (LEFT(TROX.GEOCODE_ACC_CL,4)=KalMun.Code) "+where_clause+" GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID ORDER BY KalMun.Muname, TROX.YEAR_ID;";
    List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
    kd_res.forEach(System.out::println);
    return kd_res;
}

//Ποσοστό ατυχημάτων σε σημεία με κακή συντήρηση
@GetMapping(path={"/kd12","/kd12/{region}","/kd12/{region}/{start_year}","/kd12/{region}/{start_year}/{end_year}"})
public List<Kd> kd12Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("KalMun.Muname",start_year,end_year,region);
        String sql_query = "SELECT KalMun.Code, KalMun.Muname,TROX.YEAR_ID,(100.00*SUM(CASE WHEN  (TROX.STATUS_ODOSTR_CL<>'5') THEN 1 ELSE 0 END)/COUNT(*))  AS indicator FROM TROX LEFT JOIN Kalmun  ON (LEFT(TROX.GEOCODE_ACC_CL,4)=KalMun.Code) "+where_clause+" GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID ORDER BY KalMun.Muname, TROX.YEAR_ID;";
        List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
        kd_res.forEach(System.out::println);
        return kd_res;
    }
//Ποσοστό ατυχημάτων υπό δυσμενείς καιρικές συνθήκες και κακή συντήρηση
@GetMapping(path={"/kd13","/kd13/{region}","/kd13/{region}/{start_year}","/kd13/{region}/{start_year}/{end_year}"})
public List<Kd> kd13Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
    String where_clause=filter("KalMun.Muname",start_year,end_year,region);
    String sql_query = "SELECT KalMun.Code, KalMun.Muname,TROX.YEAR_ID,(100.00*SUM(CASE WHEN  ( (TROX.STATUS_ODOSTR_CL<>'5') AND (TROX.ATMOSF_SINTHIKES_CL<>'1')) THEN 1 ELSE 0 END)/COUNT(*))  AS indicator FROM TROX LEFT JOIN Kalmun  ON (LEFT(TROX.GEOCODE_ACC_CL,4)=KalMun.Code) "+where_clause+" GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID ORDER BY KalMun.Muname, TROX.YEAR_ID;";
    List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
    kd_res.forEach(System.out::println);
    return kd_res;
}
//Ποσοστό ατυχημάτων σε σημεία με κακές συνθήκες φωτισμού
@GetMapping(path={"/kd14","/kd14/{region}","/kd14/{region}/{start_year}","/kd14/{region}/{start_year}/{end_year}"})
public List<Kd> kd14Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
    String where_clause=filter("KalMun.Muname",start_year,end_year,region);
    String sql_query = "SELECT KalMun.Code, KalMun.Muname,TROX.YEAR_ID,(100.00*SUM(CASE WHEN  (TROX.LIGHT_CL<>'1') THEN 1 ELSE 0 END)/COUNT(*))  AS indicator FROM TROX LEFT JOIN Kalmun  ON (LEFT(TROX.GEOCODE_ACC_CL,4)=KalMun.Code) "+where_clause+" GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID ORDER BY KalMun.Muname, TROX.YEAR_ID;";
    List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
    kd_res.forEach(System.out::println);
    return kd_res;
}
//Ποσοστό ατυχημάτων που συνέβησαν Σαββατοκύριακα
@GetMapping(path={"/kd28","/kd28/{region}","/kd28/{region}/{start_year}","/kd28/{region}/{start_year}/{end_year}"})
public List<Kd> kd28Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
    String where_clause=filter("KalMun.Muname",start_year,end_year,region);
    String sql_query = "SELECT KalMun.Code, KalMun.Muname,TROX.YEAR_ID,(100.00*SUM(CASE WHEN  (TROX.DATE_WEEK_ACC_NR=1 Or TROX.DATE_WEEK_ACC_NR=7) THEN 1 ELSE 0 END)/COUNT(*))  AS indicator FROM TROX LEFT JOIN Kalmun  ON (LEFT(TROX.GEOCODE_ACC_CL,4)=KalMun.Code) "+where_clause+" GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID ORDER BY KalMun.Muname, TROX.YEAR_ID;";
    List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
    kd_res.forEach(System.out::println);
    return kd_res;
}
//Γεωγραφικό Επίπεδο Οικισμών
//Κατηγορία Πλήθος Ατυχημάτων
// Αριθμός Ατυχημάτων
@GetMapping(path={"/o1","/o1/{region}","/o1/{region}/{start_year}","/o1/{region}/{start_year}/{end_year}"})
public List<O> o1Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
    String where_clause=filter("oikismos",start_year,end_year,region);
    String sql_query = "SELECT TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή] AS oikismos, TROX.YEAR_ID, Count(*) AS indicator FROM TROX LEFT JOIN POPULATION ON TROX.GEOCODE_ACC_CL=POPULATION.Code "+where_clause+" GROUP BY TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή], TROX.YEAR_ID ORDER BY TROX.GEOCODE_ACC_CL, TROX.YEAR_ID";
    List<O> o_res = queryRepo.O_query(sql_query, true, 0);
    o_res.forEach(System.out::println);
    return o_res;
}
//Αριθμός νεκρών από ατυχήματα ανά 1,000,000 κατοίκους
//-1 when population=0 (μηδενικός πληθυσμός)
@GetMapping(path={"/o2","/o2/{region}","/o2/{region}/{start_year}","/o2/{region}/{start_year}/{end_year}"})
public List<O> o2Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
    String where_clause=filter("oikismos",start_year,end_year,region);
    String sql_query = "SELECT TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή] AS oikismos, TROX.YEAR_ID,((CASE WHEN POPULATION.[Μόνιμος Πληθυσμός]=0 THEN -1 ELSE Count(*)*1000000.000/POPULATION.[Μόνιμος Πληθυσμός] END)) AS indicator FROM TROX LEFT JOIN POPULATION ON TROX.GEOCODE_ACC_CL=POPULATION.Code "+where_clause+" GROUP BY TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή], TROX.YEAR_ID, POPULATION.[Μόνιμος Πληθυσμός] ORDER BY TROX.GEOCODE_ACC_CL, TROX.YEAR_ID";
    List<O> o_res = queryRepo.O_query(sql_query, true, 0);
    o_res.forEach(System.out::println);
    return o_res;
}
//Αριθμός νεκρών από ατυχήματα ανά 1,000,000 κατοίκους
@GetMapping(path={"/o3","/o3/{region}","/o3/{region}/{start_year}","/o3/{region}/{start_year}/{end_year}"})
public List<O> o3Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
    String where_clause=filter("oikismos",start_year,end_year,region);
    String sql_query = "SELECT TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή] AS oikismos,TROX.YEAR_ID,(CASE WHEN POPULATION.[Μόνιμος Πληθυσμός]=0 THEN -1 ELSE SUM(TROX.PATH_DEAD_NR)*1000000.000/POPULATION.[Μόνιμος Πληθυσμός] END) AS indicator FROM TROX LEFT JOIN POPULATION ON TROX.GEOCODE_ACC_CL=POPULATION.Code "+where_clause+" GROUP BY TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή], TROX.YEAR_ID, POPULATION.[Μόνιμος Πληθυσμός] ORDER BY TROX.GEOCODE_ACC_CL, TROX.YEAR_ID";
    List<O> o_res = queryRepo.O_query(sql_query, true, 0);
    o_res.forEach(System.out::println);
    return o_res;
}
//Αριθμός σοβαρά τραυματιών από ατυχήματα ανά 1,000,000 κατοίκους
@GetMapping(path={"/o4","/o4/{region}","/o4/{region}/{start_year}","/o4/{region}/{start_year}/{end_year}"})
public List<O> o4Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
    String where_clause=filter("oikismos",start_year,end_year,region);
    String sql_query = "SELECT TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή] AS oikismos,TROX.YEAR_ID,(CASE WHEN POPULATION.[Μόνιμος Πληθυσμός]=0 THEN -1 ELSE SUM(TROX.PATH_BAR_TRAYM_NR)*1000000.000/POPULATION.[Μόνιμος Πληθυσμός] END) AS indicator FROM TROX LEFT JOIN POPULATION ON TROX.GEOCODE_ACC_CL=POPULATION.Code "+where_clause+" GROUP BY TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή], TROX.YEAR_ID, POPULATION.[Μόνιμος Πληθυσμός] ORDER BY TROX.GEOCODE_ACC_CL, TROX.YEAR_ID";
    List<O> o_res = queryRepo.O_query(sql_query, true, 0);
    o_res.forEach(System.out::println);
    return o_res;
}
//Δείκτης 5
@GetMapping(path={"/o5","/o5/{region}","/o5/{region}/{start_year}","/o5/{region}/{start_year}/{end_year}"})
public List<O> o5Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
    String where_clause=filter("oikismos",start_year,end_year,region);
    String sql_query = "SELECT TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή] AS oikismos, TROX.YEAR_ID,Count(EV.AA_ATICHIMATOS_ID)*100.00/Count(*) AS indicator FROM (TROX LEFT JOIN POPULATION ON POPULATION.Code=TROX.GEOCODE_ACC_CL) LEFT JOIN (SELECT TROX.YEAR_ID, TROX.MONTH_ID, TROX.AA_ATICHIMATOS_ID FROM (TROX LEFT JOIN PATHON  ON (PATHON.YEAR_ID = TROX.YEAR_ID) AND (PATHON.MONTH_ID = TROX.MONTH_ID) AND (PATHON.AA_ATICHIMATOS_ID = TROX.AA_ATICHIMATOS_ID)) LEFT JOIN ochim  ON (ochim.YEAR_ID = TROX.YEAR_ID) AND (ochim.MONTH_ID = TROX.MONTH_ID) AND (ochim.AA_ATICHIMATOS_ID = TROX.AA_ATICHIMATOS_ID) WHERE (PATHON.KATIG_PATHON_CL = '3' OR ochim.TYPE_OXHMATOS_CL = '21') GROUP BY TROX.YEAR_ID, TROX.MONTH_ID, TROX.AA_ATICHIMATOS_ID)  AS EV ON (TROX.AA_ATICHIMATOS_ID = EV.AA_ATICHIMATOS_ID) AND (TROX.MONTH_ID = EV.MONTH_ID) AND (TROX.YEAR_ID = EV.YEAR_ID) "+where_clause+"GROUP BY TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή], TROX.YEAR_ID ORDER BY TROX.GEOCODE_ACC_CL, TROX.YEAR_ID;" ;
    List<O> o_res = queryRepo.O_query(sql_query, true, 0);
    o_res.forEach(System.out::println);
    return o_res;
}
//Ποσοστό θανατηφόρων ατυχημάτων
@GetMapping(path={"/o13","/o13/{region}","/o13/{region}/{start_year}","/o13/{region}/{start_year}/{end_year}"})
public List<O> o13Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
    String where_clause=filter("oikismos",start_year,end_year,region);
    String sql_query = "SELECT TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή] AS oikismos,TROX.YEAR_ID,(100.00*(SUM(CASE WHEN TROX.PATH_DEAD_NR>0 THEN 1 ELSE 0 END))/COUNT(*))  AS indicator FROM TROX LEFT JOIN POPULATION ON TROX.GEOCODE_ACC_CL=POPULATION.Code "+where_clause+" GROUP BY TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή], TROX.YEAR_ID, POPULATION.[Μόνιμος Πληθυσμός] ORDER BY TROX.GEOCODE_ACC_CL, TROX.YEAR_ID";
    List<O> o_res = queryRepo.O_query(sql_query, true, 0);
    o_res.forEach(System.out::println);
    return o_res;
}
//Ποσοστό ατυχημάτων με σοβαρά τραυματίες
@GetMapping(path={"/o14","/o14/{region}","/o14/{region}/{start_year}","/o14/{region}/{start_year}/{end_year}"})
public List<O> o14Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
    String where_clause=filter("oikismos",start_year,end_year,region);
    String sql_query = "SELECT TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή] AS oikismos,TROX.YEAR_ID,(100.00*(SUM(CASE WHEN TROX.PATH_BAR_TRAYM_NR>0 THEN 1 ELSE 0 END))/COUNT(*))  AS indicator FROM TROX LEFT JOIN POPULATION ON TROX.GEOCODE_ACC_CL=POPULATION.Code "+where_clause+" GROUP BY TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή], TROX.YEAR_ID, POPULATION.[Μόνιμος Πληθυσμός] ORDER BY TROX.GEOCODE_ACC_CL, TROX.YEAR_ID";
    List<O> o_res = queryRepo.O_query(sql_query, true, 0);
    o_res.forEach(System.out::println);
    return o_res;
}

//Ποσοστό ατυχημάτων με σοβαρά τραυματίες
@GetMapping(path={"/o15","/o15/{region}","/o15/{region}/{start_year}","/o15/{region}/{start_year}/{end_year}"})
public List<O> o15Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("oikismos",start_year,end_year,region);
        String sql_query = "SELECT TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή] AS oikismos,TROX.YEAR_ID,(100.00*(SUM(CASE WHEN TROX.PATH_ELAF_TRAYM_NR>0 THEN 1 ELSE 0 END))/COUNT(*))  AS indicator FROM TROX LEFT JOIN POPULATION ON TROX.GEOCODE_ACC_CL=POPULATION.Code "+where_clause+" GROUP BY TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή], TROX.YEAR_ID, POPULATION.[Μόνιμος Πληθυσμός] ORDER BY TROX.GEOCODE_ACC_CL, TROX.YEAR_ID";
        List<O> o_res = queryRepo.O_query(sql_query, true, 0);
        o_res.forEach(System.out::println);
        return o_res;
    }
//Ποσοστό ατυχημάτων με παράσυρση πεζού
@GetMapping(path={"/o24","/o24/{region}","/o24/{region}/{start_year}","/o24/{region}/{start_year}/{end_year}"})
public List<O> o24Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
    String where_clause=filter("oikismos",start_year,end_year,region);
    String sql_query = "SELECT TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή] AS oikismos,TROX.YEAR_ID,(100.00*(SUM(CASE WHEN TROX.TIPOS_ATICHIM_CL='11' THEN 1 ELSE 0 END))/COUNT(*))  AS indicator FROM TROX LEFT JOIN POPULATION ON TROX.GEOCODE_ACC_CL=POPULATION.Code "+where_clause+" GROUP BY TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή], TROX.YEAR_ID, POPULATION.[Μόνιμος Πληθυσμός] ORDER BY TROX.GEOCODE_ACC_CL, TROX.YEAR_ID";
    List<O> o_res = queryRepo.O_query(sql_query, true, 0);
    o_res.forEach(System.out::println);
    return o_res;
}

//Αριθμός ατυχημάτων με παράσυρση πεζού
@GetMapping(path={"/o25","/o25/{region}","/o25/{region}/{start_year}","/o25/{region}/{start_year}/{end_year}"})
public List<O> o25Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
    String where_clause=filter("oikismos",start_year,end_year,region);
    String sql_query = "SELECT TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή] AS oikismos,TROX.YEAR_ID,((SUM(CASE WHEN TROX.TIPOS_ATICHIM_CL='11' THEN 1 ELSE 0 END)))  AS indicator FROM TROX LEFT JOIN POPULATION ON TROX.GEOCODE_ACC_CL=POPULATION.Code "+where_clause+" GROUP BY TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή], TROX.YEAR_ID, POPULATION.[Μόνιμος Πληθυσμός] ORDER BY TROX.GEOCODE_ACC_CL, TROX.YEAR_ID";
    List<O> o_res = queryRepo.O_query(sql_query, true, 0);
    o_res.forEach(System.out::println);
    return o_res;
}
//Γεωγραφικό Επίπεδο Οικισμών
//Κατηγορία Παθόντες
// Ποσοστό παθόντων στην ηλικιακή ομάδα <29 ετών
@GetMapping(path={"/o16","/o16/{region}","/o16/{region}/{start_year}","/o16/{region}/{start_year}/{end_year}"})
public List<O> o16Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
    String where_clause=filter("oikismos",start_year,end_year,region);
    String sql_query = "SELECT TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή] AS oikismos,TROX.YEAR_ID,CASE WHEN SUM(CASE WHEN  (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)=0 THEN -1 ELSE (100.00*(SUM(CASE WHEN  ((PATHON.ILIKIA_PATHON_NR<29) AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END))/(SUM(CASE WHEN  ((PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END))) END  AS indicator FROM (TROX LEFT JOIN POPULATION   ON (TROX.GEOCODE_ACC_CL=POPULATION.Code) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID)) "+where_clause+"GROUP BY TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή], TROX.YEAR_ID, POPULATION.[Μόνιμος Πληθυσμός] ORDER BY TROX.GEOCODE_ACC_CL, TROX.YEAR_ID";
    List<O> o_res = queryRepo.O_query(sql_query, true, 0);
    o_res.forEach(System.out::println);
    return o_res;
}
//Ποσοστό παθόντων στην ηλικιακή ομάδα >65 ετών
@GetMapping(path={"/o17","/o17/{region}","/o17/{region}/{start_year}","/o17/{region}/{start_year}/{end_year}"})
public List<O> o17Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
    String where_clause=filter("oikismos",start_year,end_year,region);
    String sql_query = "SELECT TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή] AS oikismos,TROX.YEAR_ID,CASE WHEN SUM(CASE WHEN  (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)=0 THEN -1 ELSE (100.00*(SUM(CASE WHEN  ((PATHON.ILIKIA_PATHON_NR>65) AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END))/(SUM(CASE WHEN  ((PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END))) END  AS indicator FROM (TROX LEFT JOIN POPULATION   ON (TROX.GEOCODE_ACC_CL=POPULATION.Code) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID)) "+where_clause+"GROUP BY TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή], TROX.YEAR_ID, POPULATION.[Μόνιμος Πληθυσμός] ORDER BY TROX.GEOCODE_ACC_CL, TROX.YEAR_ID";
    List<O> o_res = queryRepo.O_query(sql_query, true, 0);
    o_res.forEach(System.out::println);
    return o_res;
}




//Αριθμός παθόντων στην ηλικιακή ομάδα <29 ετών
@GetMapping(path={"/o18","/o18/{region}","/o18/{region}/{start_year}","/o18/{region}/{start_year}/{end_year}"})
public List<O> o18Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
    String where_clause=filter("oikismos",start_year,end_year,region);
    String sql_query = "SELECT TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή] AS oikismos,TROX.YEAR_ID,CASE WHEN SUM(CASE WHEN  (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)=0 THEN NULL ELSE ((SUM(CASE WHEN  ((PATHON.ILIKIA_PATHON_NR<29) AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END))) END  AS indicator FROM (TROX LEFT JOIN POPULATION   ON (TROX.GEOCODE_ACC_CL=POPULATION.Code) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID)) "+where_clause+"GROUP BY TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή], TROX.YEAR_ID, POPULATION.[Μόνιμος Πληθυσμός] ORDER BY TROX.GEOCODE_ACC_CL, TROX.YEAR_ID";
    List<O> o_res = queryRepo.O_query(sql_query, true, 0);
    o_res.forEach(System.out::println);
    return o_res;
}
//Αριθμός παθόντων στην ηλικιακή ομάδα >65 ετών
//need check
@GetMapping(path={"/o19","/o19/{region}","/o19/{region}/{start_year}","/o19/{region}/{start_year}/{end_year}"})
public List<O> o19Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
    String where_clause=filter("oikismos",start_year,end_year,region);
    String sql_query = "SELECT TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή] AS oikismos,TROX.YEAR_ID,CASE WHEN SUM(CASE WHEN  (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)=0 THEN NULL ELSE ((SUM(CASE WHEN  ((PATHON.ILIKIA_PATHON_NR>65) AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END))) END  AS indicator FROM (TROX LEFT JOIN POPULATION   ON (TROX.GEOCODE_ACC_CL=POPULATION.Code) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID)) "+where_clause+" GROUP BY TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή], TROX.YEAR_ID, POPULATION.[Μόνιμος Πληθυσμός] ORDER BY TROX.GEOCODE_ACC_CL, TROX.YEAR_ID";
    List<O> o_res = queryRepo.O_query(sql_query, true, 0);
    o_res.forEach(System.out::println);
    return o_res;
}


//Ποσοστό ανδρών παθόντων
@GetMapping(path={"/o20","/o20/{region}","/o20/{region}/{start_year}","/o20/{region}/{start_year}/{end_year}"})
public List<O> o20Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
    String where_clause=filter("oikismos",start_year,end_year,region);
    String sql_query = "SELECT TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή] AS oikismos,TROX.YEAR_ID,CASE WHEN SUM(CASE WHEN  (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)=0 THEN -1 ELSE (100.00*(SUM(CASE WHEN  ((PATHON.FILO_PATHON_CL='1') AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END))/(SUM(CASE WHEN  ((PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END))) END  AS indicator FROM (TROX LEFT JOIN POPULATION   ON (TROX.GEOCODE_ACC_CL=POPULATION.Code) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID)) "+where_clause+" GROUP BY TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή], TROX.YEAR_ID, POPULATION.[Μόνιμος Πληθυσμός] ORDER BY TROX.GEOCODE_ACC_CL, TROX.YEAR_ID";
    List<O> o_res = queryRepo.O_query(sql_query, true, 0);
    o_res.forEach(System.out::println);
    return o_res;
}

//Ποσοστό γυναικών παθόντων
    //change
@GetMapping(path={"/o21","/o21/{region}","/o21/{region}/{start_year}","/o21/{region}/{start_year}/{end_year}"})
public List<O> o21Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("oikismos",start_year,end_year,region);
        String sql_query = "SELECT TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή] AS oikismos,TROX.YEAR_ID,CASE WHEN SUM(CASE WHEN  (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)=0 THEN -1 ELSE (100.00*(SUM(CASE WHEN  ((PATHON.FILO_PATHON_CL='2') AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END))/(SUM(CASE WHEN  ((PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END))) END  AS indicator FROM (TROX LEFT JOIN POPULATION   ON (TROX.GEOCODE_ACC_CL=POPULATION.Code) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID)) "+where_clause+" GROUP BY TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή], TROX.YEAR_ID, POPULATION.[Μόνιμος Πληθυσμός] ORDER BY TROX.GEOCODE_ACC_CL, TROX.YEAR_ID";
        List<O> o_res = queryRepo.O_query(sql_query, true, 0);
        o_res.forEach(System.out::println);
        return o_res;
    }

//Αριθμός ανδρών παθόντων
@GetMapping(path={"/o22","/o22/{region}","/o22/{region}/{start_year}","/o22/{region}/{start_year}/{end_year}"})
public List<O> o22Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
    String where_clause=filter("oikismos",start_year,end_year,region);
    String sql_query = "SELECT TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή] AS oikismos,TROX.YEAR_ID,CASE WHEN SUM(CASE WHEN  (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)=0 THEN NULL ELSE ((SUM(CASE WHEN  ((PATHON.FILO_PATHON_CL='1') AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END))) END  AS indicator FROM (TROX LEFT JOIN POPULATION   ON (TROX.GEOCODE_ACC_CL=POPULATION.Code) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID)) "+where_clause+" GROUP BY TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή], TROX.YEAR_ID, POPULATION.[Μόνιμος Πληθυσμός] ORDER BY TROX.GEOCODE_ACC_CL, TROX.YEAR_ID";
    List<O> o_res = queryRepo.O_query(sql_query, true, 0);
    o_res.forEach(System.out::println);
    return o_res;
}
@GetMapping(path={"/o23","/o23/{region}","/o23/{region}/{start_year}","/o23/{region}/{start_year}/{end_year}"})
public List<O> o23Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("oikismos",start_year,end_year,region);
        String sql_query = "SELECT TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή] AS oikismos,TROX.YEAR_ID,CASE WHEN SUM(CASE WHEN  (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)=0 THEN NULL ELSE ((SUM(CASE WHEN  ((PATHON.FILO_PATHON_CL='2') AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END))) END  AS indicator FROM (TROX LEFT JOIN POPULATION   ON (TROX.GEOCODE_ACC_CL=POPULATION.Code) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID)) "+where_clause+" GROUP BY TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή], TROX.YEAR_ID, POPULATION.[Μόνιμος Πληθυσμός] ORDER BY TROX.GEOCODE_ACC_CL, TROX.YEAR_ID";
        List<O> o_res = queryRepo.O_query(sql_query, true, 0);
        o_res.forEach(System.out::println);
        return o_res;
    }

//Γεωγραφικό Επίπεδο Οικισμών
//Κατηγορία Συνθήκες
//Ποσοστό ατυχημάτων μεταξύ 22 και 06
@GetMapping(path={"/o6","/o6/{region}","/o6/{region}/{start_year}","/o6/{region}/{start_year}/{end_year}"})
public List<O> o6Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
    String where_clause=filter("oikismos",start_year,end_year,region);
    String sql_query = "SELECT TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή] AS oikismos,TROX.YEAR_ID,(100.00*SUM(CASE WHEN  (TROX.HOUR_ACC_NR<=6 Or TROX.HOUR_ACC_NR>=22) THEN 1 ELSE 0 END)/COUNT(*)) AS indicator FROM (TROX LEFT JOIN POPULATION   ON (TROX.GEOCODE_ACC_CL=POPULATION.Code)) "+where_clause+" GROUP BY TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή], TROX.YEAR_ID, POPULATION.[Μόνιμος Πληθυσμός] ORDER BY TROX.GEOCODE_ACC_CL, TROX.YEAR_ID";
    List<O> o_res = queryRepo.O_query(sql_query, true, 0);
    o_res.forEach(System.out::println);
    return o_res;
}
//Ποσοστό ατυχημάτων κατά τις ώρες αιχμής
@GetMapping(path={"/o7","/o7/{region}","/o7/{region}/{start_year}","/o7/{region}/{start_year}/{end_year}"})
public List<O> o7Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
    String where_clause=filter("oikismos",start_year,end_year,region);
    String sql_query = "SELECT TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή] AS oikismos,TROX.YEAR_ID,(100.00*SUM(CASE WHEN  (TROX.HOUR_ACC_NR Between 8 And 9 Or TROX.HOUR_ACC_NR Between 17 And 18) THEN 1 ELSE 0 END)/COUNT(*)) AS indicator FROM (TROX LEFT JOIN POPULATION   ON (TROX.GEOCODE_ACC_CL=POPULATION.Code)) "+where_clause+" GROUP BY TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή], TROX.YEAR_ID, POPULATION.[Μόνιμος Πληθυσμός] ORDER BY TROX.GEOCODE_ACC_CL, TROX.YEAR_ID";
    List<O> o_res = queryRepo.O_query(sql_query, true, 0);
    o_res.forEach(System.out::println);
    return o_res;
}
//Ποσοστό ατυχημάτων κατά τους θερινούς μήνες
@GetMapping(path={"/o8","/o8/{region}","/o8/{region}/{start_year}","/o8/{region}/{start_year}/{end_year}"})
public List<O> o8Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
    String where_clause=filter("oikismos",start_year,end_year,region);
    String sql_query = "SELECT TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή] AS oikismos,TROX.YEAR_ID,(100.00*SUM(CASE WHEN  (TROX.MONTH_ID Between 6 And 8) THEN 1 ELSE 0 END)/COUNT(*)) AS indicator FROM (TROX LEFT JOIN POPULATION   ON (TROX.GEOCODE_ACC_CL=POPULATION.Code)) "+where_clause+" GROUP BY TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή], TROX.YEAR_ID, POPULATION.[Μόνιμος Πληθυσμός] ORDER BY TROX.GEOCODE_ACC_CL, TROX.YEAR_ID";
    List<O> o_res = queryRepo.O_query(sql_query, true, 0);
    o_res.forEach(System.out::println);
    return o_res;
}
//Ποσοστό ατυχημάτων υπό δυσμενείς καιρικές συνθήκες
@GetMapping(path={"/o9","/o9/{region}","/o9/{region}/{start_year}","/o9/{region}/{start_year}/{end_year}"})
public List<O> o9Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
    String where_clause=filter("oikismos",start_year,end_year,region);
    String sql_query = "SELECT TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή] AS oikismos,TROX.YEAR_ID,(100.00*SUM(CASE WHEN  (TROX.ATMOSF_SINTHIKES_CL<>'1') THEN 1 ELSE 0 END)/COUNT(*)) AS indicator FROM (TROX LEFT JOIN POPULATION   ON (TROX.GEOCODE_ACC_CL=POPULATION.Code)) "+where_clause+" GROUP BY TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή], TROX.YEAR_ID, POPULATION.[Μόνιμος Πληθυσμός] ORDER BY TROX.GEOCODE_ACC_CL, TROX.YEAR_ID";
    List<O> o_res = queryRepo.O_query(sql_query, true, 0);
    o_res.forEach(System.out::println);
    return o_res;
}

//Ποσοστό ατυχημάτων σε σημεία με κακή συντήρηση
@GetMapping(path={"/o10","/o10/{region}","/o10/{region}/{start_year}","/o10/{region}/{start_year}/{end_year}"})
public List<O> o10Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
        String where_clause=filter("oikismos",start_year,end_year,region);
        String sql_query = "SELECT TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή] AS oikismos,TROX.YEAR_ID,(100.00*SUM(CASE WHEN  (TROX.STATUS_ODOSTR_CL<>'5') THEN 1 ELSE 0 END)/COUNT(*)) AS indicator FROM (TROX LEFT JOIN POPULATION   ON (TROX.GEOCODE_ACC_CL=POPULATION.Code)) "+where_clause+"  GROUP BY TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή], TROX.YEAR_ID, POPULATION.[Μόνιμος Πληθυσμός] ORDER BY TROX.GEOCODE_ACC_CL, TROX.YEAR_ID";
        List<O> o_res = queryRepo.O_query(sql_query, true, 0);
        o_res.forEach(System.out::println);
        return o_res;
    }
//Ποσοστό ατυχημάτων υπό δυσμενείς καιρικές συνθήκες και συντήρηση
@GetMapping(path={"/o11","/o11/{region}","/o11/{region}/{start_year}","/o11/{region}/{start_year}/{end_year}"})
public List<O> o11Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
    String where_clause=filter("oikismos",start_year,end_year,region);
    String sql_query = "SELECT TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή] AS oikismos,TROX.YEAR_ID,(100.00*SUM(CASE WHEN  (TROX.STATUS_ODOSTR_CL<>'5' And TROX.ATMOSF_SINTHIKES_CL<>'1') THEN 1 ELSE 0 END)/COUNT(*)) AS indicator FROM (TROX LEFT JOIN POPULATION   ON (TROX.GEOCODE_ACC_CL=POPULATION.Code)) "+where_clause+" GROUP BY TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή], TROX.YEAR_ID, POPULATION.[Μόνιμος Πληθυσμός] ORDER BY TROX.GEOCODE_ACC_CL, TROX.YEAR_ID";
    List<O> o_res = queryRepo.O_query(sql_query, true, 0);
    o_res.forEach(System.out::println);
    return o_res;
}
//Ποσοστό ατυχημάτων σε σημεία με κακές συνθήκες φωτισμού
@GetMapping(path={"/o12","/o12/{region}","/o12/{region}/{start_year}","/o12/{region}/{start_year}/{end_year}"})
public List<O> o12Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
    String where_clause=filter("oikismos",start_year,end_year,region);
    String sql_query = "SELECT TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή] AS oikismos,TROX.YEAR_ID,(100.00*SUM(CASE WHEN  (TROX.LIGHT_CL<>'1') THEN 1 ELSE 0 END)/COUNT(*)) AS indicator FROM (TROX LEFT JOIN POPULATION   ON (TROX.GEOCODE_ACC_CL=POPULATION.Code)) "+where_clause+" GROUP BY TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή], TROX.YEAR_ID, POPULATION.[Μόνιμος Πληθυσμός] ORDER BY TROX.GEOCODE_ACC_CL, TROX.YEAR_ID";
    List<O> o_res = queryRepo.O_query(sql_query, true, 0);
    o_res.forEach(System.out::println);
    return o_res;
}
//Ποσοστό ατυχημάτων που συνέβησαν Σαββατοκύριακα
@GetMapping(path={"/o26","/o26/{region}","/o26/{region}/{start_year}","/o26/{region}/{start_year}/{end_year}"})
public List<O> o26Query(@PathVariable(name="region",required = false) String region, @PathVariable(name="start_year",required = false) Integer start_year, @PathVariable(name="end_year",required = false) Integer end_year) {
    String where_clause=filter("oikismos",start_year,end_year,region);
    String sql_query = "SELECT TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή] AS oikismos,TROX.YEAR_ID,(100.00*SUM(CASE WHEN  (TROX.DATE_WEEK_ACC_NR=1 Or TROX.DATE_WEEK_ACC_NR=7) THEN 1 ELSE 0 END)/COUNT(*)) AS indicator FROM (TROX LEFT JOIN POPULATION   ON (TROX.GEOCODE_ACC_CL=POPULATION.Code)) "+where_clause+" GROUP BY TROX.GEOCODE_ACC_CL, POPULATION.[Περιγραφή], TROX.YEAR_ID, POPULATION.[Μόνιμος Πληθυσμός] ORDER BY TROX.GEOCODE_ACC_CL, TROX.YEAR_ID";
    List<O> o_res = queryRepo.O_query(sql_query, true, 0);
    o_res.forEach(System.out::println);
    return o_res;
}

}
