package org.apache.age.jdbc;

import org.apache.age.jdbc.base.type.AgtypeAnnotation;
import org.apache.age.jdbc.base.type.AgtypeMapImpl;
import org.apache.age.jdbc.base.type.UnrecognizedObject;

public class AgtypeUnrecognizedMap extends AgtypeMapImpl implements UnrecognizedObject,
    AgtypeAnnotation {

    private String annotation;

    @Override
    public String getAnnotation() {
        return this.annotation;
    }

    @Override
    public void setAnnotation(String annotation) {
        this.annotation = annotation;
    }
}
