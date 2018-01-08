package com.yuicon.memo.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * @author Yuicon
 */
@Document
public class User {

    @Id
    private String id;

    private String name;

    @Indexed(unique = true)
    private String email;

    private String masterPassword;

    @DBRef
    private List<PasswordRecord> passwordRecords;

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", masterPassword='" + masterPassword + '\'' +
                '}';
    }

    public User() {
    }

    public User(String name, String email, String masterPassword) {
        this.name = name;
        this.email = email;
        this.masterPassword = masterPassword;
    }

    public List<PasswordRecord> getPasswordRecords() {
        return passwordRecords;
    }

    public void setPasswordRecords(List<PasswordRecord> passwordRecords) {
        this.passwordRecords = passwordRecords;
    }

    public String getid() {
        return id;
    }

    public void setid(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMasterPassword() {
        return masterPassword;
    }

    public void setMasterPassword(String masterPassword) {
        this.masterPassword = masterPassword;
    }
}
