package com.reverie.auth.service;

import com.reverie.common.error.BusinessException;
import com.reverie.common.error.ErrorCode;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class RateLimiterService {

    private final Map<String, RequestTracker> trackers = new ConcurrentHashMap<>();

    private static class RequestTracker {
        final AtomicInteger count = new AtomicInteger(0);
        volatile Instant resetTime;

        RequestTracker(Instant resetTime) {
            this.resetTime = resetTime;
        }
    }

    public void checkRateLimit(String key, int maxRequests, long windowSeconds) {
        Instant now = Instant.now();
        RequestTracker tracker = trackers.compute(key, (k, existing) -> {
            if (existing == null || now.isAfter(existing.resetTime)) {
                RequestTracker newTracker = new RequestTracker(now.plusSeconds(windowSeconds));
                newTracker.count.incrementAndGet();
                return newTracker;
            }
            existing.count.incrementAndGet();
            return existing;
        });

        if (tracker.count.get() > maxRequests) {
            throw new BusinessException(ErrorCode.RATE_LIMITED, "Too many attempts. Please try again later.");
        }
    }

    public void reset(String key) {
        trackers.remove(key);
    }
}
