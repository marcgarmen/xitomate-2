package com.xitomate.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import io.quarkus.runtime.StartupEvent;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import java.io.InputStream;

@ApplicationScoped
public class FirebaseInitializer {

    @ConfigProperty(name = "firebase.credentials")
    String credentialsPath;

    void onStart(@Observes StartupEvent ev) throws Exception {
        InputStream serviceAccount = getClass().getResourceAsStream(credentialsPath);
        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();
        FirebaseApp.initializeApp(options);
    }
}
