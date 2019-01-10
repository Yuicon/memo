package com.yuicon.memo.domain;

/**
 * @author Yuicon
 */
public class Item {

    private int id;

    private int recordId;

    private String label;

    private String value;

    private int sequence;

    private boolean isDelete;

    @Override
    public String toString() {
        return "Item{" +
                "label='" + label + '\'' +
                ", value='" + value + '\'' +
                '}';
    }

    public boolean isDelete() {
        return isDelete;
    }

    public void setDelete(boolean delete) {
        this.isDelete = delete;
    }

    public int getSequence() {
        return sequence;
    }

    public void setSequence(int sequence) {
        this.sequence = sequence;
    }

    public int getRecordId() {
        return recordId;
    }

    public void setRecordId(int recordId) {
        this.recordId = recordId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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
