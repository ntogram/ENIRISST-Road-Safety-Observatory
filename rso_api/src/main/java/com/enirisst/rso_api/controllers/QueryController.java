package com.enirisst.rso_api.controllers;
import com.enirisst.rso_api.models.*;
import com.enirisst.rso_api.repositories.QueriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class QueryController {
    @Autowired
    private QueriesRepository queryRepo;

    //Γεωγραφικό Επίπεδο NUTS3

    //Κατηγορία Πλήθος Ατυχημάτων
    //Αριθμός Ατυχημάτων

    @GetMapping(path = "/nut1")
    public List<Nut1> nut1Query() {
        List<Nut1> nut1_res = queryRepo.nut1_query();
        //  nut1_res.forEach(System.out::println);
        return nut1_res;
    }

    // Κατηγορία Κοινωνικοοικονομικά Χαρακτηριστικά
    //Αριθμός Ατυχημάτων ανά 1,000,000 κατοίκους
    @GetMapping(path = "/nut2")
    public List<Nut2> nut2Query() {
        String sql_query = "SELECT nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,(Count(*) * 1000000.000000)/nuts3.population AS indicator FROM TROX LEFT JOIN nuts3 ON (nuts3.year=TROX.YEAR_ID) AND (LEFT(TROX.GEOCODE_ACC_CL,2)=nuts3.code) GROUP BY nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,nuts3.population ORDER BY nuts3.nut,TROX.YEAR_ID";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Αριθμός νεκρών από ατυχήματα ανά 1,000,000 κατοίκους
    @GetMapping(path = "/nut3")
    public List<Nut2> nut3Query() {
        String sql_query = "SELECT nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,(Sum(TROX.PATH_DEAD_NR) * 1000000.000000)/nuts3.population AS indicator FROM TROX LEFT JOIN nuts3 ON (nuts3.year=TROX.YEAR_ID) AND (LEFT(TROX.GEOCODE_ACC_CL,2)=nuts3.code) GROUP BY nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,nuts3.population ORDER BY nuts3.nut,TROX.YEAR_ID";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    // Αριθμός σοβαρά τραυματιών από ατυχήματα ανά 1,000,000 κατοίκους
    @GetMapping(path = "/nut4")
    public List<Nut2> nut4Query() {
        String sql_query = "SELECT nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,(Sum(TROX.PATH_BAR_TRAYM_NR) * 1000000.000000)/nuts3.population AS indicator FROM TROX LEFT JOIN nuts3 ON (nuts3.year=TROX.YEAR_ID) AND (LEFT(TROX.GEOCODE_ACC_CL,2)=nuts3.code) GROUP BY nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,nuts3.population ORDER BY nuts3.nut,TROX.YEAR_ID";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Ατυχήματα ανά km δικτύου
    @GetMapping(path = "/nut8")
    public List<Nut2> nut8Query() {
        String sql_query = "SELECT nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,(COUNT(*) * 1.000000)/nuts3.length AS indicator FROM TROX LEFT JOIN nuts3 ON (nuts3.year=TROX.YEAR_ID) AND (LEFT(TROX.GEOCODE_ACC_CL,2)=nuts3.code) GROUP BY nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,nuts3.length ORDER BY nuts3.nut,TROX.YEAR_ID";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, false, 2);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Ατυχήματα ανά km2
    @GetMapping(path = "/nut9")
    public List<Nut2> nut9Query() {
        String sql_query = "SELECT nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,(COUNT(*) * 1.000000)/nuts3.area AS indicator FROM TROX LEFT JOIN nuts3 ON (nuts3.year=TROX.YEAR_ID) AND (LEFT(TROX.GEOCODE_ACC_CL,2)=nuts3.code) GROUP BY nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,nuts3.area ORDER BY nuts3.nut,TROX.YEAR_ID";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, false, 2);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Αριθμός νεκρών από ατυχήματα ανά 1,000,000 κατοίκους
    @GetMapping(path = "/nut29")
    public List<Nut2> nut29Query() {
        String sql_query = "SELECT nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,Sum(TROX.PATH_DEAD_NR)*1000000/nuts3.population AS indicator FROM (TROX LEFT JOIN nuts3 ON (nuts3.year=TROX.YEAR_ID) AND (LEFT(TROX.GEOCODE_ACC_CL,2)=nuts3.code)) LEFT JOIN (SELECT TROX.YEAR_ID,((Sum(TROX.PATH_DEAD_NR)*1000000.000) / 10816286) AS indicator1 FROM TROX GROUP BY TROX.YEAR_ID ORDER BY TROX.YEAR_ID) AS Ε3 ON (Ε3.YEAR_ID =TROX.YEAR_ID) GROUP BY nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,nuts3.population,Ε3.indicator1 ORDER BY nuts3.nut,TROX.YEAR_ID";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, false, 3);
        List<E> e3_list = E3Query();
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
    @GetMapping(path = "/nut30_1")
    public List<Nut2> nut30_1Query() {
        String sql_query = "SELECT nuts3_veh.eu_code,nuts3_veh.nut,TROX.YEAR_ID,(COUNT(*) * 1000.000000)/(CAST(nuts3_veh.car AS int))  AS indicator FROM TROX LEFT JOIN nuts3_veh ON (nuts3_veh.year=TROX.YEAR_ID) AND (LEFT(TROX.GEOCODE_ACC_CL,2)=nuts3_veh.code) GROUP BY nuts3_veh.eu_code,nuts3_veh.nut,TROX.YEAR_ID,nuts3_veh.car ORDER BY nuts3_veh.nut,TROX.YEAR_ID";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, false, 2);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Αριθμός ατυχημάτων ανά 1,000 κυκλοφορούντα δίκυκλα
    @GetMapping(path = "/nut30_2")
    public List<Nut2> nut30_2Query() {
        String sql_query = "SELECT nuts3_veh.eu_code,nuts3_veh.nut,TROX.YEAR_ID,(COUNT(*) * 1000.000000)/(CAST(nuts3_veh.bike AS int))  AS indicator FROM TROX LEFT JOIN nuts3_veh ON (nuts3_veh.year=TROX.YEAR_ID) AND (LEFT(TROX.GEOCODE_ACC_CL,2)=nuts3_veh.code) GROUP BY nuts3_veh.eu_code,nuts3_veh.nut,TROX.YEAR_ID,nuts3_veh.bike ORDER BY nuts3_veh.nut,TROX.YEAR_ID";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, false, 2);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Αριθμός ατυχημάτων ανά 1,000 κυκλοφορούντα οχήματα
    @GetMapping(path = "/nut30_3")
    public List<Nut2> nut30_3Query() {
        String sql_query = "SELECT nuts3_veh.eu_code,nuts3_veh.nut,TROX.YEAR_ID,(COUNT(*) * 1000.000000)/nuts3_veh.total_vehicles  AS indicator FROM TROX LEFT JOIN nuts3_veh ON (nuts3_veh.year=TROX.YEAR_ID) AND (LEFT(TROX.GEOCODE_ACC_CL,2)=nuts3_veh.code) GROUP BY nuts3_veh.eu_code,nuts3_veh.nut,TROX.YEAR_ID,nuts3_veh.total_vehicles ORDER BY nuts3_veh.nut,TROX.YEAR_ID";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, false, 2);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Αριθμός ατυχημάτων προς το ΑΕΠ
    @GetMapping(path = "/nut31")
    public List<Nut2> nut31Query() {
        String sql_query = "SELECT nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,(COUNT(*) * 1.000000)/nuts3.GDP  AS indicator FROM TROX LEFT JOIN nuts3 ON (nuts3.year=TROX.YEAR_ID) AND (LEFT(TROX.GEOCODE_ACC_CL,2)=nuts3.code) GROUP BY nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,nuts3.GDP ORDER BY nuts3.nut,TROX.YEAR_ID";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, false, 2);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Αριθμός ατυχημάτων προς τον αριθμό των ανέργων
    @GetMapping(path = "/nut32")
    public List<Map<String, Object>> nut32Query() {//IIf(nuts3.unemployment Is Null Or ltrim(rtrim(nuts3.unemployment)) In ('NA',''),"Δεν υπάρχουν δεδομένα",(Count(*)/(CAST(nuts3.unemployment AS int)))
        List<Nut32> nut32_res = queryRepo.nut32_query();
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
    @GetMapping(path = "/nut5")
    public List<Nut2> nut5Query() {
        String sql_query = "SELECT nuts3.eu_code, nuts3.nut, TROX.YEAR_ID, 100.000*Count(EV.AA_ATICHIMATOS_ID)/COUNT(*) AS indicator FROM (TROX LEFT JOIN nuts3 ON (nuts3.code=Left(TROX.GEOCODE_ACC_CL,2)) AND (nuts3.year = TROX.YEAR_ID)) LEFT JOIN (SELECT TROX.YEAR_ID, TROX.MONTH_ID, TROX.AA_ATICHIMATOS_ID FROM (TROX LEFT JOIN PATHON ON (PATHON.YEAR_ID = TROX.YEAR_ID) AND (PATHON.MONTH_ID = TROX.MONTH_ID) AND (PATHON.AA_ATICHIMATOS_ID = TROX.AA_ATICHIMATOS_ID)) LEFT JOIN ochim ON (ochim.YEAR_ID = TROX.YEAR_ID) AND (ochim.MONTH_ID = TROX.MONTH_ID) AND (ochim.AA_ATICHIMATOS_ID = TROX.AA_ATICHIMATOS_ID) WHERE (PATHON.KATIG_PATHON_CL = '3' OR ochim.TYPE_OXHMATOS_CL = '21') GROUP BY TROX.YEAR_ID, TROX.MONTH_ID, TROX.AA_ATICHIMATOS_ID)  AS EV ON (TROX.YEAR_ID = EV.YEAR_ID) AND (TROX.MONTH_ID = EV.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = EV.AA_ATICHIMATOS_ID) GROUP BY nuts3.eu_code, nuts3.nut, TROX.YEAR_ID ORDER BY nuts3.nut, TROX.YEAR_ID;";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Ποσοστό θανατηφόρων ατυχημάτων
    @GetMapping(path = "/nut15")
    public List<Nut2> nut15Query() {
        String sql_query = "SELECT nuts3.eu_code, nuts3.nut, TROX.YEAR_ID, 100.000*SUM(CASE WHEN TROX.PATH_DEAD_NR>0 THEN 1 ELSE 0 END)/COUNT(*) AS indicator FROM (TROX LEFT JOIN nuts3 ON (nuts3.code=Left(TROX.GEOCODE_ACC_CL,2)) AND (nuts3.year = TROX.YEAR_ID))  GROUP BY nuts3.eu_code, nuts3.nut, TROX.YEAR_ID ORDER BY nuts3.nut, TROX.YEAR_ID;";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Ποσοστό ατυχημάτων με σοβαρά τραυματίες
    @GetMapping(path = "/nut16")
    public List<Nut2> nut16Query() {
        String sql_query = "SELECT nuts3.eu_code, nuts3.nut, TROX.YEAR_ID, 100.000*SUM(CASE WHEN TROX.PATH_BAR_TRAYM_NR>0 THEN 1 ELSE 0 END)/COUNT(*) AS indicator FROM (TROX LEFT JOIN nuts3 ON (nuts3.code=Left(TROX.GEOCODE_ACC_CL,2)) AND (nuts3.year = TROX.YEAR_ID)) GROUP BY nuts3.eu_code, nuts3.nut, TROX.YEAR_ID ORDER BY nuts3.nut, TROX.YEAR_ID;";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Ποσοστό ατυχημάτων με ελαφρά τραυματίες
    @GetMapping(path = "/nut17")
    public List<Nut2> nut17Query() {
        String sql_query = "SELECT nuts3.eu_code, nuts3.nut, TROX.YEAR_ID, 100.000*SUM(CASE WHEN TROX.PATH_ELAF_TRAYM_NR>0 THEN 1 ELSE 0 END)/COUNT(*) AS indicator FROM (TROX LEFT JOIN nuts3 ON (nuts3.code=Left(TROX.GEOCODE_ACC_CL,2)) AND (nuts3.year = TROX.YEAR_ID)) GROUP BY nuts3.eu_code, nuts3.nut, TROX.YEAR_ID ORDER BY nuts3.nut, TROX.YEAR_ID;";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Ποσοστό ατυχημάτων με παράσυρση πεζού
    @GetMapping(path = "/nut26")
    public List<Nut2> nut26Query() {
        String sql_query = "SELECT nuts3.eu_code, nuts3.nut, TROX.YEAR_ID, 100.000*SUM(CASE WHEN TROX.TIPOS_ATICHIM_CL='11' THEN 1 ELSE 0 END)/COUNT(*) AS indicator FROM (TROX LEFT JOIN nuts3 ON (nuts3.code=Left(TROX.GEOCODE_ACC_CL,2)) AND (nuts3.year = TROX.YEAR_ID)) GROUP BY nuts3.eu_code, nuts3.nut, TROX.YEAR_ID ORDER BY nuts3.nut, TROX.YEAR_ID;";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Αριθμός ατυχημάτων με παράσυρση πεζού
    @GetMapping(path = "/nut27")
    public List<Nut2> nut27Query() {
        String sql_query = "SELECT nuts3.eu_code, nuts3.nut, TROX.YEAR_ID, SUM(CASE WHEN TROX.TIPOS_ATICHIM_CL='11' THEN 1 ELSE 0 END) AS indicator FROM (TROX LEFT JOIN nuts3 ON (nuts3.code=Left(TROX.GEOCODE_ACC_CL,2)) AND (nuts3.year = TROX.YEAR_ID)) LEFT JOIN (SELECT TROX.YEAR_ID, TROX.MONTH_ID, TROX.AA_ATICHIMATOS_ID FROM (TROX LEFT JOIN PATHON ON (PATHON.YEAR_ID = TROX.YEAR_ID) AND (PATHON.MONTH_ID = TROX.MONTH_ID) AND (PATHON.AA_ATICHIMATOS_ID = TROX.AA_ATICHIMATOS_ID)) LEFT JOIN ochim ON (ochim.YEAR_ID = TROX.YEAR_ID) AND (ochim.MONTH_ID = TROX.MONTH_ID) AND (ochim.AA_ATICHIMATOS_ID = TROX.AA_ATICHIMATOS_ID) WHERE (PATHON.KATIG_PATHON_CL = '3' OR ochim.TYPE_OXHMATOS_CL = '21') GROUP BY TROX.YEAR_ID, TROX.MONTH_ID, TROX.AA_ATICHIMATOS_ID)  AS EV ON (TROX.YEAR_ID = EV.YEAR_ID) AND (TROX.MONTH_ID = EV.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = EV.AA_ATICHIMATOS_ID) GROUP BY nuts3.eu_code, nuts3.nut, TROX.YEAR_ID ORDER BY nuts3.nut, TROX.YEAR_ID;";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Γεωγραφικό Επίπεδο NUTS3
//Κατηγορία Παθόντες
//Ποσοστό παθόντων στην ηλικιακή ομάδα <29 ετών
    @GetMapping(path = "/nut18")
    public List<Nut2> nut18Query() {
        String sql_query = "SELECT nuts3.eu_code, nuts3.nut, TROX.YEAR_ID,CASE WHEN SUM(CASE WHEN  (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)=0 THEN NULL ELSE (100.00*(SUM(CASE WHEN  ((PATHON.ILIKIA_PATHON_NR<29) AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END))/SUM(CASE WHEN (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)) END  AS indicator FROM (TROX LEFT JOIN nuts3 ON (nuts3.code=Left(TROX.GEOCODE_ACC_CL,2)) AND (nuts3.year = TROX.YEAR_ID)) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID) GROUP BY nuts3.eu_code, nuts3.nut, TROX.YEAR_ID ORDER BY nuts3.nut, TROX.YEAR_ID;";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Ποσοστό παθόντων στην ηλικιακή ομάδα >65 ετών
    @GetMapping(path = "/nut19")
    public List<Nut2> nut19Query() {
        String sql_query = "SELECT nuts3.eu_code, nuts3.nut, TROX.YEAR_ID,CASE WHEN SUM(CASE WHEN  (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)=0 THEN NULL ELSE (100.00*(SUM(CASE WHEN  ((PATHON.ILIKIA_PATHON_NR>65) AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END))/SUM(CASE WHEN (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)) END  AS indicator FROM (TROX LEFT JOIN nuts3 ON (nuts3.code=Left(TROX.GEOCODE_ACC_CL,2)) AND (nuts3.year = TROX.YEAR_ID)) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID) GROUP BY nuts3.eu_code, nuts3.nut, TROX.YEAR_ID ORDER BY nuts3.nut, TROX.YEAR_ID;";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Αριθμός παθόντων στην ηλικιακή ομάδα <29 ετών
    @GetMapping(path = "/nut20")
    public List<Nut2> nut20Query() {
        String sql_query = "SELECT nuts3.eu_code, nuts3.nut, TROX.YEAR_ID,SUM(CASE WHEN  ((PATHON.ILIKIA_PATHON_NR<29) AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END)  AS indicator FROM (TROX LEFT JOIN nuts3 ON (nuts3.code=Left(TROX.GEOCODE_ACC_CL,2)) AND (nuts3.year = TROX.YEAR_ID)) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID) GROUP BY nuts3.eu_code, nuts3.nut, TROX.YEAR_ID ORDER BY nuts3.nut, TROX.YEAR_ID;";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Αριθμός παθόντων στην ηλικιακή ομάδα >65 ετών
    @GetMapping(path = "/nut21")
    public List<Nut2> nut21Query() {
        String sql_query = "SELECT nuts3.eu_code, nuts3.nut, TROX.YEAR_ID,SUM(CASE WHEN  ((PATHON.ILIKIA_PATHON_NR>65) AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END)  AS indicator FROM (TROX LEFT JOIN nuts3 ON (nuts3.code=Left(TROX.GEOCODE_ACC_CL,2)) AND (nuts3.year = TROX.YEAR_ID)) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID) GROUP BY nuts3.eu_code, nuts3.nut, TROX.YEAR_ID ORDER BY nuts3.nut, TROX.YEAR_ID;";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;

    }

    //Ποσοστό ανδρών παθόντων
    @GetMapping(path = "/nut22")
    public List<Nut2> nut22Query() {
        String sql_query = "SELECT nuts3.eu_code, nuts3.nut, TROX.YEAR_ID,CASE WHEN SUM(CASE WHEN  (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)=0 THEN NULL ELSE (100.00*(SUM(CASE WHEN  ((PATHON.FILO_PATHON_CL='1') AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END))/SUM(CASE WHEN (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)) END  AS indicator FROM (TROX LEFT JOIN nuts3 ON (nuts3.code=Left(TROX.GEOCODE_ACC_CL,2)) AND (nuts3.year = TROX.YEAR_ID)) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID) GROUP BY nuts3.eu_code, nuts3.nut, TROX.YEAR_ID ORDER BY nuts3.nut, TROX.YEAR_ID;";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Ποσοστό γυναικών παθόντων
    @GetMapping(path = "/nut23")
    public List<Nut2> nut23Query() {
        String sql_query = "SELECT nuts3.eu_code, nuts3.nut, TROX.YEAR_ID,CASE WHEN SUM(CASE WHEN  (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)=0 THEN NULL ELSE (100.00*(SUM(CASE WHEN  ((PATHON.FILO_PATHON_CL='2') AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END))/SUM(CASE WHEN (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)) END  AS indicator FROM (TROX LEFT JOIN nuts3 ON (nuts3.code=Left(TROX.GEOCODE_ACC_CL,2)) AND (nuts3.year = TROX.YEAR_ID)) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID) GROUP BY nuts3.eu_code, nuts3.nut, TROX.YEAR_ID ORDER BY nuts3.nut, TROX.YEAR_ID;";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    @GetMapping(path = "/nut24")
    public List<Nut2> nut24Query() {
        String sql_query = "SELECT nuts3.eu_code, nuts3.nut, TROX.YEAR_ID,SUM(CASE WHEN  ((PATHON.FILO_PATHON_CL='1') AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END)  AS indicator FROM (TROX LEFT JOIN nuts3 ON (nuts3.code=Left(TROX.GEOCODE_ACC_CL,2)) AND (nuts3.year = TROX.YEAR_ID)) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID) GROUP BY nuts3.eu_code, nuts3.nut, TROX.YEAR_ID ORDER BY nuts3.nut, TROX.YEAR_ID;";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;

    }

    @GetMapping(path = "/nut25")
    public List<Nut2> nut25Query() {
        String sql_query = "SELECT nuts3.eu_code, nuts3.nut, TROX.YEAR_ID,SUM(CASE WHEN  ((PATHON.FILO_PATHON_CL='2') AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END)  AS indicator FROM (TROX LEFT JOIN nuts3 ON (nuts3.code=Left(TROX.GEOCODE_ACC_CL,2)) AND (nuts3.year = TROX.YEAR_ID)) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID) GROUP BY nuts3.eu_code, nuts3.nut, TROX.YEAR_ID ORDER BY nuts3.nut, TROX.YEAR_ID;";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;

    }


    //Γεωγραφικό Επίπεδο NUTS3
//Κατηγορία Συνθήκες
// Ποσοστό ατυχημάτων μεταξύ 06 και 22
    @GetMapping(path = "/nut6")
    public List<Nut2> nut6Query() {
        String sql_query = "SELECT nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,(100.00*SUM(CASE WHEN  (TROX.HOUR_ACC_NR<=6 Or TROX.HOUR_ACC_NR>=22) THEN 1 ELSE 0 END)/COUNT(*))  AS indicator FROM TROX LEFT JOIN nuts3 ON (nuts3.year=TROX.YEAR_ID) AND (LEFT(TROX.GEOCODE_ACC_CL,2)=nuts3.code) GROUP BY nuts3.eu_code,nuts3.nut,TROX.YEAR_ID ORDER BY nuts3.nut,TROX.YEAR_ID";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Ποσοστό ατυχημάτων κατά τις ώρες αιχμής
    @GetMapping(path = "/nut7")
    public List<Nut2> nut7Query() {
        String sql_query = "SELECT nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,(100.00*SUM(CASE WHEN  (TROX.HOUR_ACC_NR Between 8 And 9 Or TROX.HOUR_ACC_NR Between 17 And 18) THEN 1 ELSE 0 END)/COUNT(*))  AS indicator FROM TROX LEFT JOIN nuts3 ON (nuts3.year=TROX.YEAR_ID) AND (LEFT(TROX.GEOCODE_ACC_CL,2)=nuts3.code) GROUP BY nuts3.eu_code,nuts3.nut,TROX.YEAR_ID ORDER BY nuts3.nut,TROX.YEAR_ID";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    // Ποσοστό ατυχημάτων κατά τους θερινούς μήνες
    @GetMapping(path = "/nut10")
    public List<Nut2> nut10Query() {
        String sql_query = "SELECT nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,(100.00*SUM(CASE WHEN  (TROX.MONTH_ID Between 6 And 8) THEN 1 ELSE 0 END)/COUNT(*))  AS indicator FROM TROX LEFT JOIN nuts3 ON (nuts3.year=TROX.YEAR_ID) AND (LEFT(TROX.GEOCODE_ACC_CL,2)=nuts3.code) GROUP BY nuts3.eu_code,nuts3.nut,TROX.YEAR_ID ORDER BY nuts3.nut,TROX.YEAR_ID";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Ποσοστό ατυχημάτων υπό δυσμενείς καιρικές συνθήκες
    @GetMapping(path = "/nut11")
    public List<Nut2> nut11Query() {
        String sql_query = "SELECT nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,(100.00*SUM(CASE WHEN  (TROX.ATMOSF_SINTHIKES_CL<>'1') THEN 1 ELSE 0 END)/COUNT(*))  AS indicator FROM TROX LEFT JOIN nuts3 ON (nuts3.year=TROX.YEAR_ID) AND (LEFT(TROX.GEOCODE_ACC_CL,2)=nuts3.code) GROUP BY nuts3.eu_code,nuts3.nut,TROX.YEAR_ID ORDER BY nuts3.nut,TROX.YEAR_ID";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Ποσοστό ατυχημάτων σε σημεία με κακή συντήρηση
    @GetMapping(path = "/nut12")
    public List<Nut2> nut12Query() {
        String sql_query = "SELECT nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,(100.00*SUM(CASE WHEN  (TROX.STATUS_ODOSTR_CL<>'5') THEN 1 ELSE 0 END)/COUNT(*))  AS indicator FROM TROX LEFT JOIN nuts3 ON (nuts3.year=TROX.YEAR_ID) AND (LEFT(TROX.GEOCODE_ACC_CL,2)=nuts3.code) GROUP BY nuts3.eu_code,nuts3.nut,TROX.YEAR_ID ORDER BY nuts3.nut,TROX.YEAR_ID";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Ποσοστό ατυχημάτων υπό δυσμενείς καιρικές συνθήκες και συντήρηση
    @GetMapping(path = "/nut13")
    public List<Nut2> nut13Query() {
        String sql_query = "SELECT nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,(100.00*SUM(CASE WHEN  (TROX.STATUS_ODOSTR_CL<>'5' And TROX.ATMOSF_SINTHIKES_CL<>'1') THEN 1 ELSE 0 END)/COUNT(*))  AS indicator FROM TROX LEFT JOIN nuts3 ON (nuts3.year=TROX.YEAR_ID) AND (LEFT(TROX.GEOCODE_ACC_CL,2)=nuts3.code) GROUP BY nuts3.eu_code,nuts3.nut,TROX.YEAR_ID ORDER BY nuts3.nut,TROX.YEAR_ID";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Ποσοστό ατυχημάτων σε σημεία με κακές συνθήκες φωτισμού
    @GetMapping(path = "/nut14")
    public List<Nut2> nut14Query() {
        String sql_query = "SELECT nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,(100.00*SUM(CASE WHEN  (TROX.LIGHT_CL<>'1') THEN 1 ELSE 0 END)/COUNT(*))  AS indicator FROM TROX LEFT JOIN nuts3 ON (nuts3.year=TROX.YEAR_ID) AND (LEFT(TROX.GEOCODE_ACC_CL,2)=nuts3.code) GROUP BY nuts3.eu_code,nuts3.nut,TROX.YEAR_ID ORDER BY nuts3.nut,TROX.YEAR_ID";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }

    //Ποσοστό ατυχημάτων που συνέβησαν Σαββατοκύριακα
    @GetMapping(path = "/nut28")
    public List<Nut2> nut28Query() {
        String sql_query = "SELECT nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,(100.00*SUM(CASE WHEN  (TROX.DATE_WEEK_ACC_NR=1 Or TROX.DATE_WEEK_ACC_NR=7) THEN 1 ELSE 0 END)/COUNT(*))  AS indicator FROM TROX LEFT JOIN nuts3 ON (nuts3.year=TROX.YEAR_ID) AND (LEFT(TROX.GEOCODE_ACC_CL,2)=nuts3.code) GROUP BY nuts3.eu_code,nuts3.nut,TROX.YEAR_ID ORDER BY nuts3.nut,TROX.YEAR_ID";
        List<Nut2> nut2_res = queryRepo.nut23_query(sql_query, true, 0);
        nut2_res.forEach(System.out::println);
        return nut2_res;
    }


    //Γεωγραφικό Επίπεδο Επικράτειας
    //Κατηγορία Πλήθος Ατυχημάτων
    //Αριθμός Ατυχημάτων
    @GetMapping(path = "/E1")
    public List<E> E1Query() {
        String sql_query = "SELECT TROX.YEAR_ID,COUNT(*) AS indicator FROM TROX GROUP BY TROX.YEAR_ID ORDER BY TROX.YEAR_ID";
        List<E> e_res = queryRepo.E_query(sql_query);
        e_res.forEach(System.out::println);
        return e_res;
    }

    //Κατηγορία Κοινωνικοοικονομικά Χαρακτηριστικά
    //Αριθμός Ατυχημάτων ανά 1,000,000 κατοίκους
    @GetMapping(path = "/E2")
    public List<E> E2Query() {
        String sql_query = "SELECT TROX.YEAR_ID,((COUNT(*)*1000000.000000) / 10816286) AS indicator FROM TROX GROUP BY TROX.YEAR_ID ORDER BY TROX.YEAR_ID";
        List<E> e_res = queryRepo.E_query(sql_query);
        e_res.forEach(System.out::println);
        return e_res;
    }

    //Αριθμός νεκρών από ατυχήματα ανά 1,000,000 κατοίκους
    @GetMapping(path = "/E3")
    public List<E> E3Query() {
        String sql_query = "SELECT TROX.YEAR_ID,((Sum(TROX.PATH_DEAD_NR)*1000000.000000) / 10816286) AS indicator FROM TROX GROUP BY TROX.YEAR_ID ORDER BY TROX.YEAR_ID";
        List<E> e_res = queryRepo.E_query(sql_query);
        e_res.forEach(System.out::println);
        return e_res;
    }

    //Αριθμός σοβαρά τραυματιών από ατυχήματα ανά 1,000,000 κατοίκους
    @GetMapping(path = "/E4")
    public List<E> E4Query() {
        String sql_query = "SELECT TROX.YEAR_ID,((Sum(TROX.PATH_BAR_TRAYM_NR)*1000000.000000) / 10816286) AS indicator FROM TROX LEFT JOIN POPULATION ON (TROX.GEOCODE_ACC_CL=POPULATION.Code) GROUP BY TROX.YEAR_ID ORDER BY TROX.YEAR_ID";
        List<E> e_res = queryRepo.E_query(sql_query);
        e_res.forEach(System.out::println);
        return e_res;
    }

    //Γεωγραφικό Επίπεδο Καλλικρατικών Δήμων
//Κατηγορία Πλήθος Ατυχημάτων
//Αριθμός Ατυχημάτων
    @GetMapping(path = "/kd1")
    public List<Kd> kd1Query() {
        String sql_query = "SELECT KalMun.Code, KalMun.Muname,TROX.YEAR_ID, Count(*) as indicator FROM TROX LEFT JOIN KalMun ON Left(TROX.GEOCODE_ACC_CL,4)=KalMun.code GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID ORDER BY KalMun.Muname, TROX.YEAR_ID;";
        List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
        kd_res.forEach(System.out::println);
        return kd_res;
    }

    // Γεωγραφικό Επίπεδο Καλλικρατικών Δήμων
// Κατηγορία Κοινωνικοοικονομικά Χαρακτηριστικά
//Αριθμός Ατυχημάτων ανά 1,000,000 κατοίκους
    @GetMapping(path = "/kd2")
    public List<Kd> kd2Query() {
        String sql_query = "SELECT KalMun.Code, KalMun.Muname,TROX.YEAR_ID,Count(*) * 1000000.0 / POPULATION.[Μόνιμος Πληθυσμός]as indicator FROM (TROX LEFT JOIN POPULATION ON POPULATION.Code=Left(TROX.GEOCODE_ACC_CL,4)) LEFT JOIN Kalmun ON Kalmun.Code=Left(TROX.GEOCODE_ACC_CL,4) GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID,POPULATION.[Μόνιμος Πληθυσμός] ORDER BY KalMun.Muname, TROX.YEAR_ID;";
        List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
        kd_res.forEach(System.out::println);
        return kd_res;
    }

    //Αριθμός νεκρών από ατυχήματα ανά 1,000,000 κατοίκους
    @GetMapping(path = "/kd3")
    public List<Kd> kd3Query() {
        String sql_query = "SELECT KalMun.Code, KalMun.Muname,TROX.YEAR_ID,Sum(TROX.PATH_DEAD_NR) * 1000000.000 / POPULATION.[Μόνιμος Πληθυσμός] as indicator FROM (TROX LEFT JOIN POPULATION ON POPULATION.Code=Left(TROX.GEOCODE_ACC_CL,4)) LEFT JOIN Kalmun ON Kalmun.Code=Left(TROX.GEOCODE_ACC_CL,4) GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID,POPULATION.[Μόνιμος Πληθυσμός] ORDER BY KalMun.Muname, TROX.YEAR_ID;";
        List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
        kd_res.forEach(System.out::println);
        return kd_res;
    }

    //Αριθμός σοβαρά τραυματιών από ατυχήματα ανά 1,000,000 κατοίκου
    @GetMapping(path = "/kd4")
    public List<Kd> kd4Query() {
        String sql_query = "SELECT KalMun.Code, KalMun.Muname,TROX.YEAR_ID,Sum(TROX.PATH_BAR_TRAYM_NR) * 1000000.000 / POPULATION.[Μόνιμος Πληθυσμός] as indicator FROM (TROX LEFT JOIN POPULATION ON POPULATION.Code=Left(TROX.GEOCODE_ACC_CL,4)) LEFT JOIN Kalmun ON Kalmun.Code=Left(TROX.GEOCODE_ACC_CL,4) GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID,POPULATION.[Μόνιμος Πληθυσμός] ORDER BY KalMun.Muname, TROX.YEAR_ID;";
        List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
        kd_res.forEach(System.out::println);
        return kd_res;
    }

    //Ατυχήματα ανά km δικτύου
    @GetMapping(path = "/kd8")
    public List<Kd> kd8Query() {
        String sql_query = "SELECT KalMun.Code, KalMun.Muname,TROX.YEAR_ID,(COUNT(*)*1.000/LENGTH.LENGTH_KM) as indicator FROM (TROX LEFT JOIN LENGTH ON Left(TROX.GEOCODE_ACC_CL,4)=LENGTH.CODE_ELSTAT) LEFT JOIN Kalmun ON Left(TROX.GEOCODE_ACC_CL,4)=Kalmun.code GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID,LENGTH.LENGTH_KM ORDER BY KalMun.Muname, TROX.YEAR_ID;";
        List<Kd> kd_res = queryRepo.kd_query(sql_query, false, 2);
        kd_res.forEach(System.out::println);
        return kd_res;
    }

    //Ατυχήματα ανά km2
    @GetMapping(path = "/kd9")
    public List<Kd> kd9Query() {
        String sql_query = "SELECT KalMun.Code, KalMun.Muname,TROX.YEAR_ID,(COUNT(*)*1.000/AREA.AREA_KM2) as indicator FROM (TROX LEFT JOIN AREA  ON Left(TROX.GEOCODE_ACC_CL,4)=AREA.CODE_ELSTAT) LEFT JOIN Kalmun ON Left(TROX.GEOCODE_ACC_CL,4)=Kalmun.code GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID,AREA.AREA_KM2 ORDER BY KalMun.Muname, TROX.YEAR_ID;";
        List<Kd> kd_res = queryRepo.kd_query(sql_query, false, 2);
        kd_res.forEach(System.out::println);
        return kd_res;
    }

    //Αριθμός νεκρών από ατυχήματα ανά 1,000,000 κατοίκους
    @GetMapping(path = "/kd29")
    public List<Kd> kd29Query() {
        //   String sql_query = "SELECT KalMun.Code, KalMun.Muname,TROX.YEAR_ID,Sum(TROX.PATH_DEAD_NR)*1000000.0/POPULATION .[Μόνιμος Πληθυσμός] AS indicator FROM TROX LEFT JOIN POPULATION ON (LEFT(TROX.GEOCODE_ACC_CL,2)=POPULATION .Code) LEFT JOIN Kalmun ON (Left(TROX.GEOCODE_ACC_CL,4)=Kalmun.code)  LEFT JOIN (SELECT TROX.YEAR_ID,((Sum(TROX.PATH_DEAD_NR)*1000000.000) / 10816286) AS indicator1 FROM TROX GROUP BY TROX.YEAR_ID ORDER BY TROX.YEAR_ID) AS Ε3 ON (Ε3.YEAR_ID =TROX.YEAR_ID) GROUP BY Kalmun.Code, Kalmun.Muname, TROX.YEAR_ID, POPULATION .[Μόνιμος Πληθυσμός] ,Ε3.indicator1 ORDER BY Kalmun.Muname,TROX.YEAR_ID";
        String sql_query = "SELECT KalMun.Code, KalMun.Muname , TROX.YEAR_ID, (Sum(TROX.PATH_DEAD_NR) * 1000000) / POPULATION.[Μόνιμος Πληθυσμός]  AS indicator FROM ((TROX LEFT JOIN POPULATION ON POPULATION.Code=Left(TROX.GEOCODE_ACC_CL,4)) LEFT JOIN Kalmun ON Kalmun.Code=Left(TROX.GEOCODE_ACC_CL,4)) LEFT JOIN (SELECT TROX.YEAR_ID,((Sum(TROX.PATH_DEAD_NR)*1000000.000) / 10816286) AS indicator1 FROM TROX GROUP BY TROX.YEAR_ID ORDER BY TROX.YEAR_ID) AS Ε3 ON (Ε3.YEAR_ID = TROX.YEAR_ID) GROUP BY Kalmun.Code, Kalmun.Muname, TROX.YEAR_ID, POPULATION.[Μόνιμος Πληθυσμός],indicator1 ORDER BY Kalmun.Muname, TROX.YEAR_ID;";

        List<Kd> Kd_res = queryRepo.kd_query(sql_query, true, 0);
        List<E> e3_list = E3Query();
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
@GetMapping(path = "/kd5")
public List<Kd> kd5Query() {
    String sql_query = "SELECT KalMun.Code, KalMun.Muname, TROX.YEAR_ID, 100.000*Count(EV.AA_ATICHIMATOS_ID)/COUNT(*) AS indicator FROM (TROX LEFT JOIN KalMun  ON (Left(TROX.GEOCODE_ACC_CL,4)=Kalmun.code)) LEFT JOIN (SELECT TROX.YEAR_ID, TROX.MONTH_ID, TROX.AA_ATICHIMATOS_ID FROM (TROX LEFT JOIN PATHON ON (PATHON.YEAR_ID = TROX.YEAR_ID) AND (PATHON.MONTH_ID = TROX.MONTH_ID) AND (PATHON.AA_ATICHIMATOS_ID = TROX.AA_ATICHIMATOS_ID)) LEFT JOIN ochim ON (ochim.YEAR_ID = TROX.YEAR_ID) AND (ochim.MONTH_ID = TROX.MONTH_ID) AND (ochim.AA_ATICHIMATOS_ID = TROX.AA_ATICHIMATOS_ID) WHERE (PATHON.KATIG_PATHON_CL = '3' OR ochim.TYPE_OXHMATOS_CL = '21') GROUP BY TROX.YEAR_ID, TROX.MONTH_ID, TROX.AA_ATICHIMATOS_ID)  AS EV ON (TROX.YEAR_ID = EV.YEAR_ID) AND (TROX.MONTH_ID = EV.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = EV.AA_ATICHIMATOS_ID) GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID ORDER BY KalMun.Muname, TROX.YEAR_ID;";
    List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
    kd_res.forEach(System.out::println);
    return kd_res;
}
//Ποσοστό θανατηφόρων ατυχημάτων
@GetMapping(path = "/kd15")
public List<Kd> kd15Query() {
        String sql_query = "SELECT KalMun.Code, KalMun.Muname,TROX.YEAR_ID,(SUM(CASE WHEN (TROX.PATH_DEAD_NR>0) THEN 1 ELSE 0 END)*100.000/COUNT(*)) as indicator FROM (TROX LEFT JOIN Kalmun ON Left(TROX.GEOCODE_ACC_CL,4)=Kalmun.code) GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID ORDER BY KalMun.Muname, TROX.YEAR_ID;";
        List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
        kd_res.forEach(System.out::println);
        return kd_res;
    }



//Ποσοστό ατυχημάτων με σοβαρά τραυματίες
@GetMapping(path = "/kd16")
public List<Kd> kd16Query() {
        String sql_query = "SELECT KalMun.Code, KalMun.Muname,TROX.YEAR_ID,(SUM(CASE WHEN (TROX.PATH_BAR_TRAYM_NR>0) THEN 1 ELSE 0 END)*100.000/COUNT(*)) as indicator FROM (TROX LEFT JOIN Kalmun ON Left(TROX.GEOCODE_ACC_CL,4)=Kalmun.code) GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID ORDER BY KalMun.Muname, TROX.YEAR_ID;";
        List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
        kd_res.forEach(System.out::println);
        return kd_res;
    }
//Ποσοστό ατυχημάτων με ελαφρά τραυματίες
@GetMapping(path = "/kd17")
public List<Kd> kd17Query() {
    String sql_query = "SELECT KalMun.Code, KalMun.Muname,TROX.YEAR_ID,(SUM(CASE WHEN (TROX.PATH_ELAF_TRAYM_NR>0) THEN 1 ELSE 0 END)*100.000/COUNT(*)) as indicator FROM (TROX LEFT JOIN Kalmun ON Left(TROX.GEOCODE_ACC_CL,4)=Kalmun.code) GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID ORDER BY KalMun.Muname, TROX.YEAR_ID;";
    List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
    kd_res.forEach(System.out::println);
    return kd_res;
}

//Ποσοστό ατυχημάτων με παράσυρση πεζού
@GetMapping(path = "/kd26")
public List<Kd> kd26Query() {
        String sql_query = "SELECT KalMun.Code, KalMun.Muname,TROX.YEAR_ID,(SUM(CASE WHEN (TROX.TIPOS_ATICHIM_CL='11') THEN 1 ELSE 0 END)*100.000/COUNT(*)) as indicator FROM (TROX LEFT JOIN Kalmun ON Left(TROX.GEOCODE_ACC_CL,4)=Kalmun.code) GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID ORDER BY KalMun.Muname, TROX.YEAR_ID;";
        List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
        kd_res.forEach(System.out::println);
        return kd_res;
    }
@GetMapping(path = "/kd27")
public List<Kd> kd27Query() {
        String sql_query = "SELECT KalMun.Code, KalMun.Muname,TROX.YEAR_ID,(SUM(CASE WHEN (TROX.TIPOS_ATICHIM_CL='11') THEN 1 ELSE 0 END)) as indicator FROM (TROX LEFT JOIN Kalmun ON Left(TROX.GEOCODE_ACC_CL,4)=Kalmun.code) GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID ORDER BY KalMun.Muname, TROX.YEAR_ID;";
        List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
        kd_res.forEach(System.out::println);
        return kd_res;
    }


//Γεωγραφικό Επίπεδο Καλλικρατικών Δήμων
//Κατηγορία Παθόντες
//Ποσοστό παθόντων στην ηλικιακή ομάδα <29 ετών
@GetMapping(path = "/kd18")
public List<Kd> kd18Query() {
    String sql_query = "SELECT KalMun.Code, KalMun.Muname, TROX.YEAR_ID,CASE WHEN SUM(CASE WHEN  (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)=0 THEN NULL ELSE (100.00*(SUM(CASE WHEN  ((PATHON.ILIKIA_PATHON_NR<29) AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END))/SUM(CASE WHEN (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)) END  AS indicator FROM (TROX LEFT JOIN Kalmun  ON (Kalmun.code=Left(TROX.GEOCODE_ACC_CL,4)) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID)) GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID ORDER BY KalMun.Muname, TROX.YEAR_ID;";
    List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
    kd_res.forEach(System.out::println);
    return kd_res;
}

//Ποσοστό παθόντων στην ηλικιακή ομάδα >65 ετών
@GetMapping(path = "/kd19")
public List<Kd> kd19Query() {
        String sql_query = "SELECT KalMun.Code, KalMun.Muname, TROX.YEAR_ID,CASE WHEN SUM(CASE WHEN  (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)=0 THEN NULL ELSE (100.00*(SUM(CASE WHEN  ((PATHON.ILIKIA_PATHON_NR>65) AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END))/SUM(CASE WHEN (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)) END  AS indicator FROM (TROX LEFT JOIN Kalmun  ON (Kalmun.code=Left(TROX.GEOCODE_ACC_CL,4)) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID)) GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID ORDER BY KalMun.Muname, TROX.YEAR_ID;";
        List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
        kd_res.forEach(System.out::println);
        return kd_res;
    }

//Αριθμός παθόντων στην ηλικιακή ομάδα <29 ετών
@GetMapping(path = "/kd20")
public List<Kd> kd20Query() {
    String sql_query = "SELECT KalMun.Code, KalMun.Muname, TROX.YEAR_ID,CASE WHEN SUM(CASE WHEN  (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)=0 THEN NULL ELSE ((SUM(CASE WHEN  ((PATHON.ILIKIA_PATHON_NR<29) AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END))) END  AS indicator FROM (TROX LEFT JOIN Kalmun  ON (Kalmun.code=Left(TROX.GEOCODE_ACC_CL,4)) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID)) GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID ORDER BY KalMun.Muname, TROX.YEAR_ID;";
    List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
    kd_res.forEach(System.out::println);
    return kd_res;
}
//Αριθμός παθόντων στην ηλικιακή ομάδα >65 ετών
@GetMapping(path = "/kd21")
public List<Kd> kd21Query() {
    String sql_query = "SELECT KalMun.Code, KalMun.Muname, TROX.YEAR_ID,CASE WHEN SUM(CASE WHEN  (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)=0 THEN NULL ELSE ((SUM(CASE WHEN  ((PATHON.ILIKIA_PATHON_NR>65) AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END))) END  AS indicator FROM (TROX LEFT JOIN Kalmun  ON (Kalmun.code=Left(TROX.GEOCODE_ACC_CL,4)) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID)) GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID ORDER BY KalMun.Muname, TROX.YEAR_ID;";
    List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
    kd_res.forEach(System.out::println);
    return kd_res;
}
//Ποσοστό ανδρών παθόντων
 @GetMapping(path = "/kd22")
 public List<Kd> kd22Query() {
        String sql_query = "SELECT KalMun.Code, KalMun.Muname, TROX.YEAR_ID,CASE WHEN SUM(CASE WHEN  (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)=0 THEN NULL ELSE (100.00*(SUM(CASE WHEN  (PATHON.FILO_PATHON_CL='1' AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END))/SUM(CASE WHEN (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)) END  AS indicator FROM (TROX LEFT JOIN Kalmun  ON (Kalmun.code=Left(TROX.GEOCODE_ACC_CL,4)) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID)) GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID ORDER BY KalMun.Muname, TROX.YEAR_ID;";
        List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
        kd_res.forEach(System.out::println);
        return kd_res;
    }

//Ποσοστό γυναικών παθόντων
@GetMapping(path = "/kd23")
    public List<Kd> kd23Query() {
        String sql_query = "SELECT KalMun.Code, KalMun.Muname, TROX.YEAR_ID,CASE WHEN SUM(CASE WHEN  (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)=0 THEN NULL ELSE (100.00*(SUM(CASE WHEN  (PATHON.FILO_PATHON_CL='2' AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END))/SUM(CASE WHEN (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)) END  AS indicator FROM (TROX LEFT JOIN Kalmun  ON (Kalmun.code=Left(TROX.GEOCODE_ACC_CL,4)) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID)) GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID ORDER BY KalMun.Muname, TROX.YEAR_ID;";
        List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
        kd_res.forEach(System.out::println);
        return kd_res;
    }

@GetMapping(path = "/kd24")
public List<Kd> kd24Query() {
        String sql_query = "SELECT KalMun.Code, KalMun.Muname, TROX.YEAR_ID,CASE WHEN SUM(CASE WHEN  (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)=0 THEN NULL ELSE ((SUM(CASE WHEN  ((PATHON.FILO_PATHON_CL='1') AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END))) END  AS indicator FROM (TROX LEFT JOIN Kalmun  ON (Kalmun.code=Left(TROX.GEOCODE_ACC_CL,4)) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID)) GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID ORDER BY KalMun.Muname, TROX.YEAR_ID;";
        List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
        kd_res.forEach(System.out::println);
        return kd_res;
    }
@GetMapping(path = "/kd25")
public List<Kd> kd25Query() {
        String sql_query = "SELECT KalMun.Code, KalMun.Muname, TROX.YEAR_ID,CASE WHEN SUM(CASE WHEN  (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2') THEN 1 ELSE 0 END)=0 THEN NULL ELSE ((SUM(CASE WHEN  ((PATHON.FILO_PATHON_CL='2') AND (PATHON.SOVAROT_ATICH_CL='1' Or PATHON.SOVAROT_ATICH_CL='2')) THEN 1 ELSE 0 END))) END  AS indicator FROM (TROX LEFT JOIN Kalmun  ON (Kalmun.code=Left(TROX.GEOCODE_ACC_CL,4)) LEFT JOIN PATHON ON (TROX.YEAR_ID = PATHON.YEAR_ID) AND (TROX.MONTH_ID = PATHON.MONTH_ID) AND (TROX.AA_ATICHIMATOS_ID = PATHON.AA_ATICHIMATOS_ID)) GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID ORDER BY KalMun.Muname, TROX.YEAR_ID;";
        List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
        kd_res.forEach(System.out::println);
        return kd_res;
    }
//Γεωγραφικό Επίπεδο Καλλικρατικών Δήμων
//Κατηγορία Συνθήκες
// Ποσοστό ατυχημάτων μεταξύ 06 και 22
@GetMapping(path = "/kd6")
public List<Kd> kd6Query() {
    String sql_query = "SELECT KalMun.Code, KalMun.Muname,TROX.YEAR_ID,(100.00*SUM(CASE WHEN  (TROX.HOUR_ACC_NR<=6 Or TROX.HOUR_ACC_NR>=22) THEN 1 ELSE 0 END)/COUNT(*))  AS indicator FROM TROX LEFT JOIN Kalmun  ON (LEFT(TROX.GEOCODE_ACC_CL,4)=KalMun.Code) GROUP BY KalMun.Code, KalMun.Muname, TROX.YEAR_ID ORDER BY KalMun.Muname, TROX.YEAR_ID;";
    List<Kd> kd_res = queryRepo.kd_query(sql_query, true, 0);
    kd_res.forEach(System.out::println);
    return kd_res;
}



}
