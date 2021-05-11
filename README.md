### 광섬유를 활용하여 측정된 웹상에서 데이터 모니터링

문서 업데이트 예정.

### 개발환경

1. macOS
2. intellij
3. spring boot
4. java 11

---

### 개발환경 셋팅

* 롬복
    1. intellij - Preferencse - Plugins - lombok install
    2. intellij - Preferencse - annotaion 검색 - Enable annotation processing 체크
* OS 별 CRLF 차이
    1. window 사용자 : git config --global core.autocrlf true
    2. linux, mac, unix 사용자 : git config --global core.autocrlf input

---

### 도커 명령어 
```dockerfile
docker pull jjeaby/influxfana
docker run --name influxDB_WITH_Grafana -d -p 8086:8086 -p 8083:8083 -p 3000:3000 -p 4000:4000 -v /opt/influxDB:/var/lib/influxdb jjeaby/influxfana

## influx 콘솔 접속
docker exec -it influxDB_WITH_Grafana influx
```

### Granafana(db 정보 시각화 툴) 접속하기

[링크](http://localhost:3000)

아이디 : admin 비밀번호 : admin
