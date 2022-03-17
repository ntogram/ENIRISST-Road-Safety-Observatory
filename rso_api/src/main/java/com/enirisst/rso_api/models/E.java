package com.enirisst.rso_api.models;

public class E {
    private  int YEAR_ID;


    private  double indicator;

    public E(int YEAR_ID, double indicator) {
        this.YEAR_ID = YEAR_ID;
        this.indicator = indicator;
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
        return "E{" +
                "YEAR_ID=" + YEAR_ID +
                ", indicator=" + indicator +
                '}';
    }
}
