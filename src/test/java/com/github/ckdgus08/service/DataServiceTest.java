package com.github.ckdgus08.service;


import com.github.ckdgus08.entity.OpticalData;
import org.influxdb.dto.BoundParameterQuery;
import org.influxdb.dto.Point;
import org.influxdb.dto.Query;
import org.influxdb.dto.QueryResult;
import org.influxdb.impl.InfluxDBResultMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.influxdb.InfluxDBTemplate;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.Instant;
import java.util.List;

@SpringBootTest
public class DataServiceTest {

    @Autowired
    private DataService dataService;
    @Autowired
    private InfluxDBTemplate<Point> influxDBTemplate;

    @Test
    void write_data() throws IOException {
        //given

        File file = new File("/Users/cch/project/optical_fiber/src/main/resources/static/sample_data/sample2.txt");
        List<String> list = Files.readAllLines(Paths.get(file.getAbsolutePath()), StandardCharsets.UTF_8);

        // when
        Instant instant = Instant.now();

        for (int i = 0; i < 100000; i++) {
            String value = list.get(i).split(",")[1].split("\\.")[0];
            instant = instant.plusMillis(20);

            OpticalData opticalData = new OpticalData(instant, "testUUID", Integer.parseInt(value));
            //when
            dataService.write(opticalData);
        }
        //then
    }

    @Test
    public void select() {
        Query query = BoundParameterQuery.QueryBuilder
                .newQuery("SELECT * FROM optical_data")
                .forDatabase("optical_fiber")
                .create();

        QueryResult queryResult = influxDBTemplate.query(query);
        InfluxDBResultMapper resultMapper = new InfluxDBResultMapper();
        // thread-safe - can be reused
        List<OpticalData> testMeasurementList = resultMapper.toPOJO(queryResult, OpticalData.class);

        for (OpticalData opticalData : testMeasurementList) {
            System.out.println(opticalData.toString());
        }
    }


}
