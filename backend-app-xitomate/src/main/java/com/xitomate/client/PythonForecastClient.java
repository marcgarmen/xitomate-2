package com.xitomate.client;

import jakarta.enterprise.context.ApplicationScoped;
import java.net.URI;
import java.net.http.*;
import java.util.List;
import com.fasterxml.jackson.databind.ObjectMapper;

@ApplicationScoped
public class PythonForecastClient {
    private static final String PROPHET_URL = "https://xitomate2-prophet-155882435984.us-central1.run.app/forecast";
    private static final ObjectMapper mapper = new ObjectMapper();

    public String getForecast(List<?> history) {
        try {
            HttpClient client = HttpClient.newHttpClient();
            String body = mapper.writeValueAsString(new ForecastRequest(history));
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(PROPHET_URL))
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