package com.yuicon.memo.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * @author Yuicon
 */
@Document
public class Record {

    @Id
    private String id;

    private String source;

    private List<Item> items;

    @Override
    public String toString() {
        return "Record{" +
                "id='" + id + '\'' +
                ", source='" + source + '\'' +
                ", items=" + items +
                '}';
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

}
