### 광섬유를 활용하여 측정된 웹상에서 데이터 모니터링

개발환경 셋팅

* WINDOW 10 운영체제에서만 동작함.

#### 1. source code download

```text
다운로드 후 압축풀기, 다운로드 위치는 C:\

* 다른 위치에 다운시 경로가 달라져 에러 발생 할 수 있음.
```

![이미지](https://github.com/ckdgus08/optical_fiber/blob/main/src/main/resources/static/image/example_download.jpg?raw=true)

#### 2. intellij(개발툴) 다운로드

[1. JDK 설치 (jdk 설치 부분만 보면 됨.)](https://drcode-devblog.tistory.com/221)

[2. 인텔리제이 학생라이센스 사용](https://cheershennah.tistory.com/160)

#### 3. visual studio(c언어 관련 개발툴) 다운로드

[참고 링크](https://cis.cju.ac.kr/2019/09/02/visual-studio-2019-install/)

#### 4. FTDI VCP 드라이버 설치

```text
키트 사용을 위해선 FTDI VCP 드라이버 설치를 해야 합니다. 

Onedrive CDM21228_Setup 파일 설치 혹은 https://ftdichip.com/drivers/vcp-drivers/ 홈페이지를 통해 다운로드하여 설치합니다. 
```

[다운로드 링크](https://ftdichip.com/drivers/vcp-drivers/)

#### 5. 설치 확인

```text
설치를 하고 난 뒤 [내컴퓨터] – [장치 관리자]에 들어가면 
 포트(COM & LP) - USB serial Port가 나옵니다.
```

[그림파일 참고](https://seoultechackr-my.sharepoint.com/:w:/r/personal/dkim_seoultech_ac_kr/_layouts/15/Doc.aspx?sourcedoc=%7B97B085EA-5BE2-4192-9639-03A38A203C89%7D&file=FTDI%20%EC%99%80%20Labview%20%EC%97%B0%EB%8F%99%EB%B2%95.docx&action=default&mobileredirect=true)

#### 6. FTDI 모듈에서 데이터 받아오는 프로그램 실행

```text
C:\optical_fiber\moduleToFile - 바로가기.exe 파일 실행

모듈과 컴퓨터 사이에 SPI 통신을 하여 데이터를 수신함.
수신된 데이터는 C:\optical_fiber\src\main\resources\static\sample_data\data.txt
에 기록됨. (계속해서 덮어쓰기 되는 방식이라, 항상 데이터는 한줄만 표시됨)

* FTDI 모듈이 컴퓨터와 정상적으로 연결되어 있어야 프로그램이 정상작동함.
* 프로그램이 열리지 않으면 USB 연결, 드라이버 설치 등을 의심해봐야함.
```

![이미지](https://github.com/ckdgus08/optical_fiber/blob/main/src/main/resources/static/image/process1.jpg?raw=true)
![이미지](https://github.com/ckdgus08/optical_fiber/blob/main/src/main/resources/static/image/process2.jpg?raw=true)

#### 7. Intellij를 이용해 프로젝트 파일 열기

![이미지](https://github.com/ckdgus08/optical_fiber/blob/main/src/main/resources/static/image/process3.jpg?raw=true)
![이미지](https://github.com/ckdgus08/optical_fiber/blob/main/src/main/resources/static/image/process4.jpg?raw=true)

프로젝트 파일을 열고 로딩을 기다림 (처음으로 열면 오래 걸릴 수 있음.)
![이미지](https://github.com/ckdgus08/optical_fiber/blob/main/src/main/resources/static/image/process5.jpg?raw=true)

```text
optical_fiber/src/main/java/com/github/ckdgus08/OpticalFiberApplication 경로의
OpticalFiberApplication 파일을 실행시킴
```

![이미지](https://github.com/ckdgus08/optical_fiber/blob/main/src/main/resources/static/image/process6.jpg?raw=true)

```text
아래 이미지와 같이 
Started OpticalFiberApplication in ~~~ 이라는 문구가 나타나면 정상적으로 실행 된 것임.

* 정상작동이 안된다면, 구글에 "window intellij java spring 개발환경 셋팅" 과 같은 키워드로 검색하여 재시도
```

![이미지](https://github.com/ckdgus08/optical_fiber/blob/main/src/main/resources/static/image/process7.jpg?raw=true)

#### 8. 웹사이트 정상작동 확인

```text
chrome 브라우저를 열고 http://localhost:8081/에 접속한다.
```

[http://localhost:8081/](http://localhost:8081/)

```text
아래 이미지와 같은 화면이 나타나면 정상임.
** 현재 화면은 썬팅필름을 활용하여 3지점의 눌림을 측정하는 프로젝트를 위해 제작된 화면이기 때문에, 나중에 본인 프로젝트에 알맞게 수정해야함.
** 6번 항목의 프로그램이 동작되고 있지 않으면, 실행을 눌려도 값이 변하지 않을 것 이다.
```

![이미지](https://github.com/ckdgus08/optical_fiber/blob/main/src/main/resources/static/image/process8.jpg?raw=true)

#### 9. 외부에서 접속가능하도록 하기

```text
외부 컴퓨터에서 요청을 보낼시 -> 공유기(공인 아이피:8081) -> 컴퓨터(내부아이피:8081) 으로 전달됨.

일반적으로 외부 컴퓨터 -> 공유기로 접속시 컴퓨터로 연결되지 않음.
공유기(공인아이피) -> 컴퓨터(내부아이피) 로 연결하기 위해서는 포트포워딩 이라는 것을 해야함.

내부아이피는 CMD 창에서 ipconfig 입력 후 IPv4 주소 . . . . . . . . . : 192.168.25.44 에서 볼 수 있다.
(192.168.25.44 는 컴퓨터마다 다른 값을 가질 가능성이 높다.)

공인 아이피는 네이버 검색창에 "내 아이피" 라고 치면 볼 수 있다.

** 공유기(58.123.34.5:8081) 로 들어오는 요청을 컴퓨터(192.168.25.44:8081) 으로 보내주는 것이 목표이고, 포트포워딩이라 부른다.
** 위에서 사용했던 localhost 는 자기 컴퓨터의 IP를 의미한다.
** 학교 WIFI 와 같이 개인의 소유가 아닌 네트워크에서는 포트포워딩을 시도하지 말자.
```

[포트포워딩 참고](https://m.blog.naver.com/seoulworkshop/221265052717)

```text
포트포워딩을 했다면, 
공인 아이피를 알아낸 후(공인 아이피는 네이버 검색창에 "내 아이피" 라고 치면 볼 수 있다.)

공인아이피를 기억하고, C:\optical_fiber\src\main\resources\static\js\index.js 파일을 열어준다.

let 공인아이피 = '127.0.0.1'  부분에서 127.0.0.1 을 자신의 공인아이피로 바꿔준다.
```

#### 10. 테스트
```text
7번 과정을 통해 서버를 start 시킨 후
핸드폰으로 인터넷 브라우저를 킨 후 http://공인아이피:8081 주소로 접속한다.
```
