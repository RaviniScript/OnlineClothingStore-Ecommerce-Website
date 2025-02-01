package com.ead2.coursework.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI userManagementOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Clothing Shop APIs")
                        .description("API documentation for Clothing Shop User Microservices")
                        .version("1.0"));
    }
}