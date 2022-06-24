package com.enirisst.rso_api.models;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Thresholds {
    double[] threshs=new double[3];


    public double[] getThreshs() {
        return threshs;
    }

    public void setThreshs(double[] threshs) {
        this.threshs = threshs;
    }

    public Map<String, double[]> getresult(){
        HashMap<String,  double[]> t = new HashMap<String, double[]>();
        t.put("limits",threshs);
        return t;
    }




    @Override
    public String toString() {
        return "Thresholds{" +
                "threshs=" + Arrays.toString(threshs) +
                '}';
    }
}
