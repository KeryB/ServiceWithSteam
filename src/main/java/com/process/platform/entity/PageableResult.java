package com.process.platform.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
public class PageableResult<T> {
    private List<T> result = new ArrayList();
    private int totalResult;
}
