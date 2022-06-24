package com.enirisst.rso_api.helper;

import com.enirisst.rso_api.controllers.QueryController;
import com.enirisst.rso_api.models.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;

public class Helper implements QueryExecutor {
    final String uri = "http://localhost:8080/api/";


    public int findpercentile(List A, int k) {
        int p = (int) Math.ceil(k / 100.0 * A.size());
        ;
        return p;
    }


    public List filter(List a, String code, Integer year) {
        System.out.println(code);
        int count = 0;
        if (code.equals(new String("nut1"))) {
            List<Nut1> b2 = new ArrayList<Nut1>();
            for (int i = 0; i < a.size(); i++) {
                //   System.out.println(a.get(i));
                LinkedHashMap<String, Object> item = (LinkedHashMap<String, Object>) a.get(i);
                int t = (int) item.get("year_ID");
                if (t == year.intValue()) {
                    Nut1 new_item = new Nut1(item);
                    b2.add(new_item);
                }

            }
            // System.out.println(b2);
            return b2;

        } else if (code.equals(new String("nut32"))) {
            List<Map<String, Object>> b2 = new ArrayList<Map<String, Object>>();
            for (int i = 0; i < a.size(); i++) {
                // System.out.println(a.get(i));
                LinkedHashMap<String, Object> item = (LinkedHashMap<String, Object>) a.get(i);
                int t = (int) item.get("year_ID");
                if (t == year.intValue()) {
                    Nut32 new_item = new Nut32(item);
                    b2.add(new_item.toMap());
                }
            }
            //System.out.println(b2);
            return b2;

            // if (.== year.intValue()) {
//                    b2.add(item);
//                }
//            }
        } else if (code.startsWith("nut")) {
            List<Nut2> b2 = new ArrayList<Nut2>();
            for (int i = 0; i < a.size(); i++) {
                //   System.out.println(a.get(i));
                LinkedHashMap<String, Object> item = (LinkedHashMap<String, Object>) a.get(i);
                int t = (int) item.get("year_ID");
                if (t == year.intValue()) {
                    Nut2 new_item = new Nut2(item);
                    b2.add(new_item);
                }

            }
            //   System.out.println(b2);
            return b2;
        } else if (code.startsWith("kd")) {
            List<Kd> b2 = new ArrayList<Kd>();
            for (int i = 0; i < a.size(); i++) {
                // System.out.println(a.get(i));
                LinkedHashMap<String, Object> item = (LinkedHashMap<String, Object>) a.get(i);
                int t = (int) item.get("year_ID");
                if (t == year.intValue()) {
                    Kd new_item = new Kd(item);
                    b2.add(new_item);
                }

            }
            //   System.out.println(b2);
            return b2;
        } else {
            List<O> b2 = new ArrayList<O>();
            for (int i = 0; i < a.size(); i++) {
                // System.out.println(a.get(i));
                LinkedHashMap<String, Object> item = (LinkedHashMap<String, Object>) a.get(i);
                int t = (int) item.get("year_ID");
                if (t == year.intValue()) {
                    O new_item = new O(item);
                    b2.add(new_item);
                }

            }
            return b2;
            // System.out.println(b2);
        }


        // return 0;


    }


    @Override
    public double[] execute(String code, Integer year) {
        String query_uri = uri + code;
        RestTemplate restTemplate = new RestTemplate();
        List result = restTemplate.getForObject(query_uri, List.class);
        List filtered_result = filter(result, code, year);
        System.out.println(filtered_result);
        double[] d;
        if (filtered_result.size() > 0) {
            String result_class = String.valueOf(filtered_result.get(0).getClass());
            System.out.println(result_class);

            if (result_class.contains("Nut1")) {
                List<Long> indicator_vals = new ArrayList<Long>();
                for (Object item : filtered_result) {
                    Nut1 it = (Nut1) item;
                    indicator_vals.add(it.getIndicator());
                }
                //System.out.println(indicator_vals);
                Collections.sort(indicator_vals);
                int p0 = findpercentile(indicator_vals, 25);
                int p1 = findpercentile(indicator_vals, 50);
                int p2 = findpercentile(indicator_vals, 75);
                d = new double[]{indicator_vals.get(p0), indicator_vals.get(p1), indicator_vals.get(p2)};
                return d;
            } else if (result_class.contains("Nut2")) {
                List<Double> indicator_vals = new ArrayList<Double>();
                for (Object item : filtered_result) {
                    Nut2 it = (Nut2) item;
                    indicator_vals.add(it.getIndicator());
                }
                System.out.println(indicator_vals);
                Collections.sort(indicator_vals);

                if (code.equals("nut13")) {
                    d = new double[]{0, 1};
                } else {
                    int p0 = findpercentile(indicator_vals, 25);
                    int p1 = findpercentile(indicator_vals, 50);
                    int p2 = findpercentile(indicator_vals, 75);
                    d = new double[]{indicator_vals.get(p0), indicator_vals.get(p1), indicator_vals.get(p2)};
                }
                return d;
            } else if (result_class.contains("Kd")) {
                List<Double> indicator_vals = new ArrayList<Double>();
                for (Object item : filtered_result) {
                    Kd it = (Kd) item;
                    indicator_vals.add(it.getIndicator());
                }
                System.out.println(indicator_vals);
                Collections.sort(indicator_vals);
                if (code.equals("kd13")) {
                    d = new double[]{0, 1};
                } else {
                    int p0 = findpercentile(indicator_vals, 25);
                    int p1 = findpercentile(indicator_vals, 50);
                    int p2 = findpercentile(indicator_vals, 75);
                    d = new double[]{indicator_vals.get(p0), indicator_vals.get(p1), indicator_vals.get(p2)};
                }
                return d;
            } else if (result_class.contains("O")) {
                List<Double> indicator_vals = new ArrayList<Double>();
                for (Object item : filtered_result) {
                    O it = (O) item;
                    indicator_vals.add(it.getIndicator());
                }
                //System.out.println(indicator_vals);
                Collections.sort(indicator_vals);
                double min_val = indicator_vals.get(0);
                double max_val = indicator_vals.get(indicator_vals.size() - 1);
                double range_val = max_val - min_val;
                double p0 = -1;
                double p1 = min_val + 0.1 * range_val;
                double p2 = max_val - 0.1 * range_val;
                //  int p0=findpercentile(indicator_vals,10);
                // int p1=findpercentile(indicator_vals,90);

                d = new double[]{p0, p1, p2};
                return d;

            } else {
                List<String> indicator_vals = new ArrayList<String>();
                for (Object item : filtered_result) {
                    HashMap<String, Object> it = (HashMap<String, Object>) item;
                    indicator_vals.add((String) it.get("indicator"));
                }
                System.out.println(indicator_vals);
                Collections.sort(indicator_vals);
                System.out.println(indicator_vals);
                List<Double> values=new ArrayList<Double>();
                for (String item:indicator_vals){
                    try{
                        Double val=Double.parseDouble(item);
                        values.add(val);
                    }
                     catch (NumberFormatException e) {
                         continue;
                    }
                }
                int p0 = findpercentile(values, 25);
                int p1 = findpercentile(values, 50);
                int p2 = findpercentile(values, 75);
                d = new double[]{-1,values.get(p0), values.get(p1), values.get(p2)};
                return d;
            }

        }
        return new double[2];
    }
}


        // System.out.println(filter(result,code,year));
