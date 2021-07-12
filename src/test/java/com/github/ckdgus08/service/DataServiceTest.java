package com.github.ckdgus08.service;


import com.github.ckdgus08.entity.OpticalData;
import net.sf.yad2xx.Device;
import net.sf.yad2xx.FTDIException;
import net.sf.yad2xx.FTDIInterface;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.lang.reflect.Method;

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
    void spiConnection() throws FTDIException, NoSuchMethodException {

        String libraryVersion = FTDIInterface.getLibraryVersion();
        System.out.println("libraryVersion is " + libraryVersion);

        int deviceCount = FTDIInterface.getDeviceCount();
        System.out.println("deviceCount = " + deviceCount);

        Method getDevices = FTDIInterface.class.getMethod("getDevices");

        System.out.println("getDevices = " + getDevices);

        Device[] devices = FTDIInterface.getDevices();

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
