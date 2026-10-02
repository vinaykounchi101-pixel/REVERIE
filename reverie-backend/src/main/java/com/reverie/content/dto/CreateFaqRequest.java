package com.reverie.content.dto;

import jakarta.validation.constraints.NotBlank;

public class CreateFaqRequest {

    private String category = "GENERAL";

    @NotBlank(message = "Question is required")
    private String question;

    @NotBlank(message = "Answer is required")
    private String answer;

    private Integer displayOrder = 0;
    private Boolean isPublished = true;

    public CreateFaqRequest() {}

    public CreateFaqRequest(String category, String question, String answer, Integer displayOrder, Boolean isPublished) {
        this.category = category != null ? category : "GENERAL";
        this.question = question;
        this.answer = answer;
        this.displayOrder = displayOrder != null ? displayOrder : 0;
        this.isPublished = isPublished != null ? isPublished : true;
    }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }

    public String getAnswer() { return answer; }
    public void setAnswer(String answer) { this.answer = answer; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }

    public Boolean getIsPublished() { return isPublished; }
    public void setIsPublished(Boolean published) { isPublished = published; }
}
