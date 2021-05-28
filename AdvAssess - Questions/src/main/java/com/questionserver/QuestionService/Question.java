package com.questionserver.QuestionService;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "questions")
public class Question {

    @Id
    private String id;
    private String question;
    private String response1;
    private String response2;
    private String response3;
    private String response4;
    private String selection;
    private String assessmentType;
    private String category;
    private String subCategory;



    public Question() {}

    public Question(String id, String question, String response1, String response2, String response3, String response4, String selection, String assessmentType, String category, String subCategory){
        this.id = id;
        this.question = question;
        this.response1 = response1;
        this.response2 = response2;
        this.response3 = response3;
        this.response4 = response4;
        this.selection = selection;
        this.assessmentType = assessmentType;
        this.category = category;
        this.subCategory = subCategory;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }


    public String getSelection() {
        return selection;
    }

    public void setSelection(String selection) {
        this.selection = selection;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getResponse1() {
        return response1;
    }

    public void setResponse1(String response1) {
        this.response1 = response1;
    }

    public String getResponse2() {
        return response2;
    }

    public void setResponse2(String response2) {
        this.response2 = response2;
    }

    public String getResponse3() {
        return response3;
    }

    public void setResponse3(String response3) {
        this.response3 = response3;
    }

    public String getResponse4() {
        return response4;
    }

    public void setResponse4(String response4) {
        this.response4 = response4;
    }

    public String getAssessmentType() {
        return assessmentType;
    }

    public void setAssessmentType(String assessmentType) {
        this.assessmentType = assessmentType;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getSubCategory() {
        return subCategory;
    }

    public void setSubCategory(String subCategory) {
        this.subCategory = subCategory;
    }

    @Override
    public String toString() {
        return "Question{" +
                "id='" + id + '\'' +
                ", question='" + question + '\'' +
                ", response1='" + response1 + '\'' +
                ", response2='" + response2 + '\'' +
                ", response3='" + response3 + '\'' +
                ", response4='" + response4 + '\'' +
                ", selection='" + selection + '\'' +
                ", assessmentType='" + assessmentType + '\'' +
                ", category='" + category + '\'' +
                ", subCategory='" + subCategory + '\'' +
                '}';
    }
}

/* Testing for Error */


