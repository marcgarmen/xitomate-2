FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /build
COPY . .
RUN chmod +x mvnw
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /build/target/quarkus-app /app/quarkus-app
EXPOSE 8081
CMD ["java", "-jar", "/app/quarkus-app/quarkus-run.jar"]
