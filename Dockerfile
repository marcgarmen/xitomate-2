# Root Dockerfile to build backend-app-xitomate
# Build stage
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /build
COPY backend-app-xitomate/pom.xml .
COPY backend-app-xitomate/src ./src
COPY backend-app-xitomate/.mvn ./.mvn
COPY backend-app-xitomate/mvnw .
RUN chmod +x mvnw
RUN MAVEN_CONFIG="" ./mvnw clean package -DskipTests

# Run stage
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /build/target/quarkus-app/quarkus-run.jar /app/application.jar
EXPOSE 8080
CMD ["java", "-jar", "/app/application.jar"]
