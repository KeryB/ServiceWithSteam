package com.process.platform.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

@Setter
@Getter
public class SearchRequest {

    private int limit=20;
    private int offset;
    private String search;
    private Map<String,String> filter = new HashMap<>();
    private Map<String, SortDirection> sort = new HashMap<>();

    public enum SortDirection {
        ASC, DESC
    }
}
