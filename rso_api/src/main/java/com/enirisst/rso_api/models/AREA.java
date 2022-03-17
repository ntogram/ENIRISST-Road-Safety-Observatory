package com.enirisst.rso_api.models;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

public class AREA {
    private String CODE_ELSTAT;
    private String NAME;
    private String PERIFEREIA;
    private double AREA_KM2;



    public String getNAME() {
        return NAME;
    }

    public void setNAME(String NAME) {
        this.NAME = NAME;
    }

    public AREA(String CODE_ELSTAT, String NAME, String PERIFEREIA, double AREA_KM2) {
        this.CODE_ELSTAT = CODE_ELSTAT;
        this.NAME = NAME;
        this.PERIFEREIA = PERIFEREIA;
        this.AREA_KM2 = AREA_KM2;
    }

    public String getCODE_ELSTAT() {
        return CODE_ELSTAT;
    }

    public void setCODE_ELSTAT(String CODE_ELSTAT) {
        this.CODE_ELSTAT = CODE_ELSTAT;
    }

    public String getPERIFEREIA() {
        return PERIFEREIA;
    }

    public void setPERIFEREIA(String PERIFEREIA) {
        this.PERIFEREIA = PERIFEREIA;
    }

    public double getAREA_KM2() {
        return AREA_KM2;
    }

    public void setAREA_KM2(double AREA_KM2) {
        this.AREA_KM2 = AREA_KM2;
    }

    @Override
    public String toString() {
        return "AREA{" +
                "CODE_ELSTAT='" + CODE_ELSTAT + '\'' +
                ", NAME='" + NAME + '\'' +
                ", PERIFEREIA='" + PERIFEREIA + '\'' +
                ", AREA_KM2=" + AREA_KM2 +
                '}';
    }
}
