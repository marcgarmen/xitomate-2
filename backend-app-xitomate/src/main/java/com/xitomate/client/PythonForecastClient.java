package com.xitomate.client;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.enterprise.context.ApplicationScoped;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.Map;

@ApplicationScoped
public class PythonForecastClient {

    @ConfigProperty(name = "prophet.url", defaultValue = "http://localhost:8000/forecast")
    String prophetUrl;
    private static final ObjectMapper mapper = new ObjectMapper();

    public String getForecast(List<?> history) {
        try {
            HttpClient client = HttpClient.newHttpClient();
            String body = mapper.writeValueAsString(new ForecastRequest(history));
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(prophetUrl))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(body))
                .build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            return response.body();
        } catch (Exception e) {
            throw new RuntimeException("Error calling Prophet microservice: " + e.getMessage(), e);
        }
    }

    public static class ForecastRequest {
        public List<?> history;
        public ForecastRequest(List<?> history) { this.history = history; }
    }
}