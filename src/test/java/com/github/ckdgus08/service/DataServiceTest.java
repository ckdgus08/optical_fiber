package com.github.ckdgus08.service;


import net.sf.yad2xx.Device;
import net.sf.yad2xx.FTDIException;
import net.sf.yad2xx.FTDIInterface;
import org.junit.jupiter.api.Test;

import java.io.IOException;

public class DataServiceTest {

    @Test
    void serial() throws IOException, FTDIException {

        int board_rate = 9600;

        String libraryVersion = FTDIInterface.getLibraryVersion();
        System.out.println("libraryVersion is " + libraryVersion);

        Device[] devices = FTDIInterface.getDevices();

        for (Device device : devices) {
            System.out.println(device.getType());
        }


//        if (devices.length == 0) {
//            System.out.println("No devices!!");
//            throw new IllegalStateException("연결된 기기가 없습니다.");
//        }
//
//        Device device = devices[0];
//
//        Spi spi = new Spi(device, board_rate, SpiMode.M0, false);
//
//        byte[] bytes = spi.readBits(1000);
//
//        for (byte aByte : bytes) {
//            System.out.println("aByte = " + aByte);
//        }


    }
//
//    @Test
//    void write_data() throws IOException {
//        //given
//
//        File file = new File("/Users/cch/project/optical_fiber/src/main/resources/static/sample_data/sample2.txt");
//        List<String> list = Files.readAllLines(Paths.get(file.getAbsolutePath()), StandardCharsets.UTF_8);
//
//        // when
//        Instant instant = Instant.now();
//
//        for (int i = 0; i < 10000; i++) {
//            String value = list.get(i).split(",")[1].split("\\.")[0];
//            instant = instant.plusMillis(20);
//
//            OpticalData opticalData = new OpticalData(instant, "testUUID", Integer.parseInt(value));
//            //when
//            dataService.write(opticalData);
//        }
//        //then
//    }
//
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


}
