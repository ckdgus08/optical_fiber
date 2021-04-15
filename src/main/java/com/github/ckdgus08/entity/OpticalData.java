package com.github.ckdgus08.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.influxdb.annotation.Column;
import org.influxdb.annotation.Measurement;
import org.influxdb.annotation.TimeColumn;

import java.time.Instant;

@Measurement(name = "optical_data")
@Getter
@NoArgsConstructor
@ToString(of = {"time", "uuid", "optical_value"})
public class OpticalData {

    @TimeColumn
    @Column(name = "time")
    private Instant time;

    @Column(name = "uuid")
    private String uuid;

    @Column(name = "optical_value")
    private int optical_value;


    public OpticalData(String uuid, int optical_value) {
        this.optical_value = optical_value;
        this.uuid = uuid;

        this.time = Instant.now();
    }

    public OpticalData(Instant time, String uuid, int optical_value) {
        this.time = time;
        this.optical_value = optical_value;
        this.uuid = uuid;
    }

}
