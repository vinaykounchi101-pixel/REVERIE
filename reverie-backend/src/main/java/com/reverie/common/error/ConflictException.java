package com.reverie.common.error;

public class ConflictException extends BusinessException {

    public ConflictException(ErrorCode errorCode) {
        super(errorCode);
    }

    public ConflictException(ErrorCode errorCode, String detail) {
        super(errorCode, detail);
    }
}
