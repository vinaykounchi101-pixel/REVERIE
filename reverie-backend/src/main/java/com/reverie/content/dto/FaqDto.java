package com.reverie.content.dto;

import com.reverie.content.entity.FaqItem;

import java.util.UUID;

public class FaqDto {

    private UUID id;
    private String category;
    private String question;
    private String answer;
    private Integer displayOrder;
    private Boolean isPublished;

    public FaqDto() {}

    public static FaqDto fromEntity(FaqItem item) {
        FaqDto dto = new FaqDto();
        dto.setId(item.getId());
        dto.setCategory(item.getCategory());
        dto.setQuestion(item.getQuestion());
        dto.setAnswer(item.getAnswer());
        dto.setDisplayOrder(item.getDisplayOrder());
        dto.setIsPublished(item.getIsPublished());
        return dto;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

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
