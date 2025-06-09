# Etapa 1: Build (usando Maven)
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /workspace/app

# Copia los archivos de Maven y descarga dependencias
COPY pom.xml .
COPY src ./src
RUN mvn -B package -DskipTests

# Etapa 2: Imagen final para Quarkus JVM
FROM eclipse-temurin:21-jre
WORKDIR /work

# Copia el JAR generado desde la etapa de build
COPY --from=build /workspace/app/target/*-runner.jar /work/application.jar

EXPOSE 8081

# Comando para correr la app
CMD ["java", "-jar", "/work/application.jar"]