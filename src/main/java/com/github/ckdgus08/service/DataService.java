package com.github.ckdgus08.service;

import com.github.ckdgus08.entity.OpticalData;
import lombok.RequiredArgsConstructor;
import org.influxdb.dto.Point;
import org.springframework.data.influxdb.InfluxDBTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
@RequiredArgsConstructor
public class DataService {

    private final InfluxDBTemplate<Point> influxDBTemplate;

    @PostConstruct
    public void init() {
        influxDBTemplate.createDatabase();
    }

    public void write(OpticalData opticalData) {
        influxDBTemplate.write(
                Point.measurementByPOJO(OpticalData.class).
                        addFieldsFromPOJO(opticalData)
                        .build());
    }

}
