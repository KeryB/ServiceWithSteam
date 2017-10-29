package com.process.platform.utils.Jpa;


import com.process.platform.entity.SearchRequest;

import java.util.List;
import java.util.stream.Collectors;

public class QueryUtils {

    public static String restRequestToPart(SearchRequest searchRequest) {
        StringBuilder stringBuilder = new StringBuilder();
        checkOnFilter(searchRequest, stringBuilder);
        if (!searchRequest.getFilter().isEmpty()) {
            stringBuilder.append(" ORDER BY");
            List<String> sortList = searchRequest.getSort().entrySet().stream()
                    .map(entry -> entry.getKey() + " " + entry.getValue())
                    .collect(Collectors.toList());
            stringBuilder.append(String.join(" , ", sortList));
        }
        return stringBuilder
                .append(" LIMIT ")
                .append(searchRequest.getOffset() != 0 ? "OFFSET "+ searchRequest.getOffset() : "")
                .append(searchRequest.getLimit())
                .toString();
    }

    public static String checkOnFilter(SearchRequest searchRequest) {
        return checkOnFilter(searchRequest, new StringBuilder());
    }

    private static String checkOnFilter(SearchRequest searchRequest, StringBuilder stringBuilder) {
        stringBuilder.append(" WHERE").append(" NICKNAME");
        stringBuilder.append(" LIKE").append(" '%").append(searchRequest.getSearch()).append("%'");
        if (!searchRequest.getFilter().isEmpty()) {
            //todo реализовать фильтр
        }
        return stringBuilder.toString();
    }
}
