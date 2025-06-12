package com.xitomate.client;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

import org.eclipse.microprofile.config.inject.ConfigProperty;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class PythonForecastClient {

    @ConfigProperty(name = "prophet.url", defaultValue = "http://localhost:8000/forecast")
    String prophetUrl;
    private static final ObjectMapper mapper = new ObjectMapper();

    public String getForecast(List<?> history) {
        try {
            HttpClient client = HttpClient.newHttpClient();
            ForecastRequest request = new ForecastRequest(history);
            String requestBody = mapper.writeValueAsString(request);

            HttpRequest httpRequest = HttpRequest.newBuilder()
                    .uri(URI.create(prophetUrl))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                    .build();

            HttpResponse<String> response = client.send(httpRequest, HttpResponse.BodyHandlers.ofString());
            return response.body();
        } catch (Exception e) {
            throw new RuntimeException("Error calling forecast service", e);
        }
    }

    public static class ForecastRequest {
        public List<?> history;
        public ForecastRequest(List<?> history) { this.history = history; }
    }
}