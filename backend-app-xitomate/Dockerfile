# Build stage
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /workspace
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /workspace/target/*-runner.jar /app/application.jar
EXPOSE 8080
CMD ["java", "-jar", "/app/application.jar"]