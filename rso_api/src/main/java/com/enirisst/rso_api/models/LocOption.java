package com.enirisst.rso_api.models;

import java.util.List;

public class LocOption
{
    private String label;
    private List<String> options;

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }

    public List<String> getOptions() {
        return options;
    }

    @Override
    public String toString() {
        return "LocOption{" +
                "label='" + label + '\'' +
                ", options=" + options +
                '}';
    }
}
