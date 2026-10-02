package com.reverie.common.error;

import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ProblemDetailResponse> handleBusinessException(
            BusinessException ex, HttpServletRequest request) {

        String traceId = generateTraceId();
        ErrorCode code = ex.getErrorCode();

        log.warn("Business exception [{}]: {} (TraceId: {})", code, ex.getMessage(), traceId);

        ProblemDetailResponse response = new ProblemDetailResponse(code, ex.getMessage(), traceId);
        response.setInstance(request.getRequestURI());

        return ResponseEntity.status(code.getHttpStatus()).body(response);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ProblemDetailResponse> handleBadCredentialsException(
            BadCredentialsException ex, HttpServletRequest request) {

        String traceId = generateTraceId();
        ErrorCode code = ErrorCode.AUTH_INVALID_CREDENTIALS;

        ProblemDetailResponse response = new ProblemDetailResponse(code, code.getDefaultMessage(), traceId);
        response.setInstance(request.getRequestURI());

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ProblemDetailResponse> handleAccessDeniedException(
            AccessDeniedException ex, HttpServletRequest request) {

        String traceId = generateTraceId();
        ErrorCode code = ErrorCode.FORBIDDEN;

        log.warn("Access denied on {}: {} (TraceId: {})", request.getRequestURI(), ex.getMessage(), traceId);

        ProblemDetailResponse response = new ProblemDetailResponse(code, "Access to this resource is denied", traceId);
        response.setInstance(request.getRequestURI());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {

        String traceId = generateTraceId();
        ErrorCode code = ErrorCode.VALIDATION_ERROR;

        List<ProblemDetailResponse.ValidationError> validationErrors = new ArrayList<>();
        for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
            validationErrors.add(new ProblemDetailResponse.ValidationError(
                    fieldError.getField(),
                    fieldError.getDefaultMessage(),
                    fieldError.getRejectedValue()
            ));
        }

        ProblemDetailResponse response = new ProblemDetailResponse(code, "Request validation constraints violated", traceId);
        response.setErrors(validationErrors);

        if (request instanceof ServletWebRequest servletWebRequest) {
            response.setInstance(servletWebRequest.getRequest().getRequestURI());
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ProblemDetailResponse> handleGeneralException(
            Exception ex, HttpServletRequest request) {

        String traceId = generateTraceId();
        log.error("Unhandled internal server error on {} (TraceId: {})", request.getRequestURI(), traceId, ex);

        ProblemDetailResponse response = new ProblemDetailResponse(
                ErrorCode.INTERNAL_ERROR,
                "An unexpected internal error occurred. Please reference the trace ID when contacting support.",
                traceId
        );
        response.setInstance(request.getRequestURI());

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    private String generateTraceId() {
        return UUID.randomUUID().toString().substring(0, 8);
    }
}
