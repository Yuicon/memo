package com.yuicon.memo.config;

import java.util.Arrays;
import java.util.List;

/**
 * @author Yuicon
 */
class SecurityManager {

    private static final List<String> ALLOW_PATH_LIST = Arrays.asList("/login", "/signin");

    static Boolean allowAccessTo(String path) {
        return ALLOW_PATH_LIST.contains(path);
    }

}
