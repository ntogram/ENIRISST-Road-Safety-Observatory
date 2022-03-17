package com.enirisst.rso_api.models;

public class Nut1 {
private String eu_code;
private String nut ;
private  int YEAR_ID;
private long  accident_number;


    public Nut1(String eu_code, String nut, int YEAR_ID, long accident_number) {
        this.eu_code = eu_code;
        this.nut = nut;
        this.YEAR_ID = YEAR_ID;
        this.accident_number = accident_number;
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

    public long getAccident_number() {
        return accident_number;
    }

    public void setAccident_number(long accident_number) {
        this.accident_number = accident_number;
    }

    @Override
    public String toString() {
        return "Nut1{" +
                "eu_code='" + eu_code + '\'' +
                ", nut='" + nut + '\'' +
                ", YEAR_ID=" + YEAR_ID +
                ", accident_number=" + accident_number +
                '}';
    }
}
