package com.reverie.common.error;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.Instant;
import java.util.List;
import java.util.Map;

/**
 * Standard RFC 7807 Problem Details representation for REVERIE API.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProblemDetailResponse {

    private String type;
    private String title;
    private int status;
    private String code;
    private String detail;
    private String instance;
    private String traceId;
    private Instant timestamp;
    private List<ValidationError> errors;
    private Map<String, Object> extensions;

    public ProblemDetailResponse() {
        this.timestamp = Instant.now();
    }

    public ProblemDetailResponse(ErrorCode errorCode, String detail, String traceId) {
        this.type = "https://reverie.app/errors/" + errorCode.name().toLowerCase().replace('_', '-');
        this.title = errorCode.getDefaultMessage();
        this.status = errorCode.getHttpStatus().value();
        this.code = errorCode.name();
        this.detail = detail != null ? detail : errorCode.getDefaultMessage();
        this.traceId = traceId;
        this.timestamp = Instant.now();
    }

    public record ValidationError(String field, String message, Object rejectedValue) {}

    // Getters and Setters
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public int getStatus() { return status; }
    public void setStatus(int status) { this.status = status; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getDetail() { return detail; }
    public void setDetail(String detail) { this.detail = detail; }

    public String getInstance() { return instance; }
    public void setInstance(String instance) { this.instance = instance; }

    public String getTraceId() { return traceId; }
    public void setTraceId(String traceId) { this.traceId = traceId; }

    public Instant getTimestamp() { return timestamp; }
    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }

    public List<ValidationError> getErrors() { return errors; }
    public void setErrors(List<ValidationError> errors) { this.errors = errors; }

    public Map<String, Object> getExtensions() { return extensions; }
    public void setExtensions(Map<String, Object> extensions) { this.extensions = extensions; }
}
