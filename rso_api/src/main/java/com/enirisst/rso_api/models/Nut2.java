package com.enirisst.rso_api.models;


import static java.lang.Math.round;

public class Nut2 {
    private String eu_code;
    private String nut ;
    private  int YEAR_ID;
    //nut2:Αριθμός Ατυχημάτων ανά 1,000,000 κατοίκους
    //nut3:Αριθμός νεκρών από ατυχήματα ανά 1,000,000 κατοίκους
    //nut4:Αριθμός σοβαρά τραυματιών από ατυχήματα ανά 1,000,000 κατοίκους
    //nut8:Ατυχήματα ανά km δικτύου
    //nut9:Ατυχήματα ανά km2
    private double indicator;

    public Nut2(String eu_code, String nut, int YEAR_ID, double indicator) {
        this.eu_code = eu_code;
        this.nut = nut;
        this.YEAR_ID = YEAR_ID;
        this.indicator = indicator;
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

    public double getIndicator() {
        return indicator;
    }




    public void setIndicator(double indicator) {
        this.indicator = indicator;
    }

    @Override
    public String toString() {


        return "Nut2{" +
                "eu_code='" + eu_code + '\'' +
                ", nut='" + nut + '\'' +
                ", YEAR_ID=" + YEAR_ID +
               // ", mulaccident_number=" + mulaccident_number +
              //  ", population=" + population +
                ",indicator="+indicator+
                '}';
    }
}
