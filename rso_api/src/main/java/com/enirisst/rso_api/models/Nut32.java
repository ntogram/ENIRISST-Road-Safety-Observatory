package com.enirisst.rso_api.models;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

public class Nut32 {
    private String eu_code;
    private String nut ;
    private  int YEAR_ID;
    private   int count;
    private   String unemployment;
    private String indicator;

    public Nut32(String eu_code, String nut, int YEAR_ID, int count, String unemployment, String indicator) {
        this.eu_code = eu_code;
        this.nut = nut;
        this.YEAR_ID = YEAR_ID;
        this.count = count;
        this.unemployment = unemployment;
        this.indicator = indicator;
    }
    public Nut32(LinkedHashMap<String, Object> item){
        this.eu_code = (String) item.get("eu_code");
        this.nut = (String) item.get("nut");;
        this.YEAR_ID = (int) item.get("year_ID");
        this.indicator = (String) item.get("indicator");
    }


    public String getEu_code() {
        return eu_code;
    }

    public void setEu_code(String eu_code) {
        this.eu_code = eu_code;
    }

    public String getNut() {
        return nut;
    }

    public void setNut(String nut) {
        this.nut = nut;
    }

    public int getYEAR_ID() {
        return YEAR_ID;
    }

    public void setYEAR_ID(int YEAR_ID) {
        this.YEAR_ID = YEAR_ID;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public String getUnemployment() {
        return unemployment;
    }

    public void setUnemployment(String unemployment) {
        this.unemployment = unemployment;
    }

    public String getIndicator() {
        return indicator;
    }

    public void setIndicator(String indicator) {
        this.indicator = indicator;
    }

    public Map<String,Object> toMap()
    {
        Map<String, Object> nut32_return=new HashMap<String,Object>();
        nut32_return.put("eu_code",eu_code);
        nut32_return.put("nut",nut);
        nut32_return.put("year_ID",YEAR_ID);
        nut32_return.put("indicator",indicator);
        return nut32_return;
    }

    @Override
    public String toString() {
        return "Nut32{" +
                "eu_code='" + eu_code + '\'' +
                ", nut='" + nut + '\'' +
                ", YEAR_ID=" + YEAR_ID +
                ", count=" + count +
                ", unemployment='" + unemployment + '\'' +
                ", indicator='" + indicator + '\'' +
                '}';
    }
}
