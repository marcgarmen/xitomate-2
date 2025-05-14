package com.xitomate.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import io.smallrye.config.SmallRyeConfig;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;
import jakarta.ws.rs.ext.Provider;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import io.quarkus.runtime.StartupEvent;

import java.io.InputStream;

@ApplicationScoped
public class FirebaseInitializer {

    @ConfigProperty(name = "firebase.credentials")
    String credentialsPath;

    void onStart(@Observes StartupEvent ev) throws Exception {
        if (!FirebaseApp.getApps().isEmpty()) return;

        InputStream serviceAccount;
        if (credentialsPath.startsWith("classpath:")) {
            String cp = credentialsPath.replace("classpath:", "");
            serviceAccount = Thread.currentThread()
                    .getContextClassLoader()
                    .getResourceAsStream(cp);
        } else {
            serviceAccount = java.nio.file.Files.newInputStream(
                    java.nio.file.Paths.get(credentialsPath));
        }

        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        FirebaseApp.initializeApp(options);
    }
}
