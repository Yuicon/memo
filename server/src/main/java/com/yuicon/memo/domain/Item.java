package com.yuicon.memo.domain;

/**
 * @author Yuicon
 */
public class Item {

    private String label;

    private String value;

    @Override
    public String toString() {
        return "Item{" +
                "label='" + label + '\'' +
                ", value='" + value + '\'' +
                '}';
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

}
