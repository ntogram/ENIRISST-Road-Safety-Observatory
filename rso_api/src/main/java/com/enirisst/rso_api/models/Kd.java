package com.enirisst.rso_api.models;

import java.util.LinkedHashMap;

public class Kd {
    private String Code;
    private String Muname;
    private int YEAR_ID;
    private double indicator;

    public Kd(String code, String muname, int YEAR_ID, double indicator) {
        Code = code;
        Muname = muname;
        this.YEAR_ID = YEAR_ID;
        this.indicator = indicator;
    }
    public Kd(LinkedHashMap<String, Object> item){
        this.Code = (String) item.get("code");
        this.Muname = (String) item.get("muname");;
        this.YEAR_ID = (int) item.get("year_ID");
        this.indicator = (double) item.get("indicator");
    }





    public String getCode() {
        return Code;
    }

    public void setCode(String code) {
        Code = code;
    }

    public String getMuname() {
        return Muname;
    }

    public void setMuname(String muname) {
        Muname = muname;
    }

    public int getYEAR_ID() {
        return YEAR_ID;
    }

    public void setYEAR_ID(int YEAR_ID) {
        this.YEAR_ID = YEAR_ID;
    }

    public double getIndicator() {
        return indicator;
    }

    public void setIndicator(double indicator) {
        this.indicator = indicator;
    }

    @Override
    public String toString() {
        return "Kd{" +
                "Code='" + Code + '\'' +
                ", Muname='" + Muname + '\'' +
                ", YEAR_ID=" + YEAR_ID +
                ", indicator=" + indicator +
                '}';
    }
}

