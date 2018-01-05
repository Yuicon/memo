package com.yuicon.memo.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @author Yuicon
 */
@Document
public class PasswordRecord {

    @Id
    private String id;

    private String uid;

    private String source;

    private String userName;

    private String password;

    @Override
    public String toString() {
        return "PasswordRecord{" +
                "id='" + id + '\'' +
                ", uid='" + uid + '\'' +
                ", source='" + source + '\'' +
                ", userName='" + userName + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
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

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
