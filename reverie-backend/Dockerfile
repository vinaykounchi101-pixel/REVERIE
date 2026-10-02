# =============================================================================
# Multi-Stage Dockerfile for REVERIE Spring Boot Backend
# =============================================================================

# Stage 1: Build
FROM maven:3.9.8-eclipse-temurin-21-alpine AS builder
WORKDIR /build

COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn clean package -DskipTests -B

# Stage 2: Runtime
FROM eclipse-temurin:21-jre-alpine AS runner
WORKDIR /app

# Non-root user for container security
RUN addgroup -S reverie && adduser -S reverie -G reverie
USER reverie:reverie

COPY --from=builder /build/target/*.jar app.jar

EXPOSE 8080

ENV JAVA_OPTS="-XX:+UseG1GC -XX:MaxRAMPercentage=75.0 -Djava.security.egd=file:/dev/./urandom"
ENV SPRING_PROFILES_ACTIVE=prod

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
