package com.enirisst.rso_api.models;

import java.util.LinkedHashMap;

public class Nut1 {
private String eu_code;
private String nut ;
private  int YEAR_ID;
private long  indicator;


    public Nut1(String eu_code, String nut, int YEAR_ID, long indicator) {
        this.eu_code = eu_code;
        this.nut = nut;
        this.YEAR_ID = YEAR_ID;
        this.indicator = indicator;
    }

    public Nut1(LinkedHashMap<String, Object> item){
        this.eu_code = (String) item.get("eu_code");
        this.nut = (String) item.get("nut");;
        this.YEAR_ID = (int) item.get("year_ID");
        this.indicator = ((Number) item.get("indicator")).longValue();
    }



    public String getNut() {
        return nut;
    }

    public void setNut(String nut) {
        this.nut = nut;
    }

    public String getEu_code() {
        return eu_code;
    }

    public void setEu_code(String eu_code) {
        this.eu_code = eu_code;
    }

    public int getYEAR_ID() {
        return YEAR_ID;
    }

    public void setYEAR_ID(int YEAR_ID) {
        this.YEAR_ID = YEAR_ID;
    }

    public long getIndicator() {
        return indicator;
    }

    public void setIndicator(long indicator) {
        this.indicator = indicator;
    }

    @Override
    public String toString() {
        return "Nut1{" +
                "eu_code='" + eu_code + '\'' +
                ", nut='" + nut + '\'' +
                ", YEAR_ID=" + YEAR_ID +
                ", indicator=" + indicator +
                '}';
    }
}
