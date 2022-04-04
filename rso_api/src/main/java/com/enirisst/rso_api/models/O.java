package com.enirisst.rso_api.models;

public class O {
    private  String GEOCODE_ACC_CL;
    private String oikismos;
    private int YEAR_ID;
    private double indicator;

    public O(String GEOCODE_ACC_CL, String oikismos, int YEAR_ID, double indicator) {
        this.GEOCODE_ACC_CL = GEOCODE_ACC_CL;
        this.oikismos = oikismos;
        this.YEAR_ID = YEAR_ID;
        this.indicator = indicator;
    }

    public String getGEOCODE_ACC_CL() {
        return GEOCODE_ACC_CL;
    }

    public void setGEOCODE_ACC_CL(String GEOCODE_ACC_CL) {
        this.GEOCODE_ACC_CL = GEOCODE_ACC_CL;
    }

    public String getOikismos() {
        return oikismos;
    }

    public void setOikismos(String oikismos) {
        this.oikismos = oikismos;
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
        return "Ο{" +
                "GEOCODE_ACC_CL='" + GEOCODE_ACC_CL + '\'' +
                ", oikismos='" + oikismos + '\'' +
                ", YEAR_ID=" + YEAR_ID +
                ", indicator=" + indicator +
                '}';
    }
}
