package com.github.ckdgus08.service;


import com.github.ckdgus08.entity.OpticalData;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.Method;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.Instant;
import java.util.List;

@SpringBootTest
public class DataServiceTest {

    @Autowired
    DataService dataService;

    @Test
    void tttt() {
        //given
        for (int i = 0; i < 10000; i++) {
            dataService.write(new OpticalData("1", (int) (Math.random() * 4096)));
        }
        //when

        //then
    }


    @Test
    void write_data() throws IOException {
        //given

        while (true) {

            File file = new File("C:\\Users\\ckdgu\\project\\optical_fiber\\src\\main\\resources\\static\\sample_data\\data.txt");
            List<String> list = Files.readAllLines(Paths.get(file.getAbsolutePath()), StandardCharsets.UTF_8);

            // when

            for (int i = 0; i < list.size(); i++) {
                String value = list.get(i);

                OpticalData opticalData = new OpticalData("1", Integer.parseInt(value));
                //when
                dataService.write(opticalData);
            }
            //then
        }
    }
}

//    @Test
//    public void select() {
//        Query query = BoundParameterQuery.QueryBuilder
//                .newQuery("SELECT * FROM optical_data")
//                .forDatabase("optical_fiber")
//                .create();
//
//        QueryResult queryResult = influxDBTemplate.query(query);
//        InfluxDBResultMapper resultMapper = new InfluxDBResultMapper();
//        // thread-safe - can be reused
//        List<OpticalData> testMeasurementList = resultMapper.toPOJO(queryResult, OpticalData.class);
//
//        for (OpticalData opticalData : testMeasurementList) {
//            System.out.println(opticalData.toString());
//        }
//    }


