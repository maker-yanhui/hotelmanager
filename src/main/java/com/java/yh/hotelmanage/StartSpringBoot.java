package com.java.yh.hotelmanage;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;

/**
 * description:
 * author:严辉(小辉)
 * time:21:37
 */
@SpringBootApplication
@MapperScan(basePackages = "com.java.yh.hotelmanage.mapper")
public class StartSpringBoot  extends SpringBootServletInitializer {
    public static void main(String[] args) {
        SpringApplication.run(StartSpringBoot.class);
    }
    @Override//为了打包springboot项目
    protected SpringApplicationBuilder configure(
            SpringApplicationBuilder builder) {
        return builder.sources(this.getClass());
    }
}
