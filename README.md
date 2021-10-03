## FTDI모듈과 광섬유로 측정된 데이터를 휴대폰으로 웹상에서 모니터링하기


### 전체적인 동작 flow

1. FTDI 모듈
```text
FTDI 모듈에서 빛의 세기에 따라 전압 측정 -> 전압을 0~4096 스케일로 표현
```

2. 모듈 -> 컴퓨터
```
SPI 통신으로 컴퓨터로 전달됨.
위 개발환경 셋팅의 6번에서 설명한 프로그램을 통해 원하는 형태로 데이터를 가공함.

** 1분간 측정된 데이터를 파일로 만들고 싶다, 평균을 구하고 싶다, ... 등의 목적을 달성하려면
c:\optical_fiber-main\moduleToFileByCPP\ConsoleApplication1.vcxproj 을 visualStudio로 열고 C 언어를 활용해 코딩해야한다.
* [참고 코딩한 프로그램 .exe파일로 만들기](https://splendidlolli.tistory.com/25)
```

3. 컴퓨터 (웹 서버)
```
해당 프로젝트는 Intellij 라는 IDE (통합 개발 환경)을 이용하고, java라는 언어, spring 이라는 프레임워크를 활용하여 웹서버를 띄우고 있다.
위 과정에서 처리된 데이터파일을 이용하여 실시간으로 0~4096의 데이터를 웹페이지 상에서 활용 할 수 있다.

optical_fiber/blob/main/src/main/resources/static/js/index.js
optical_fiber/blob/main/src/main/resources/templates/index.html

에 미리 작성된 내용을 활용해 적절히 수정하여 사용하면 된다.
(현재는 시작버튼을 눌리면, 0.25초마다 data.txt 파일에 기록된 데이터를 계속해서 가져와 처리하도록 작성되어있다.)

* html, js(자바스크립트) 에 대해서 공부하고 싶다면, "자바스크립트 웹사이트 만들기" 등의 키워드로 검색해서 공부하면 된다.
* java에 대한 내용은 공부하지 않아도 사용하는데 프로젝트의 구조를 크게 바꾸지 않는다면 이 문서를 보고 사용만 하는데는 무리가 없을 것 이다.
* 에러가 나거나 궁금증이 있다면 google에 spring boot ~~~~ 와 같은 키워드로 검색하면 된다.
** 별도의 서버를 두지 않고 개인노트북에서 모든 것을 해결하고자 하는 목적 달성을 위해 다소 비효율적인, 보안에 취약한 부분들이 있긴하다.
```

4. 외부기기에서 웹서버로 접속
```
웹서버, 외부 기기에서 모두 인터넷을 사용가능한 상태여야 접속가능하다.
```


### 개발환경 셋팅
** WINDOW 10 운영체제에서만 동작함.

#### 1. source code download

```text
다운로드 후 압축풀기, 다운로드 위치는 C:\

* 압축을 푼 폴더 이름이 optical_fiber-main 인지 확인 후, 아니라면 이름을 바꿔준다.
* 다른 위치에 압축을 풀 시 경로가 달라져 에러 발생 할 수 있다.
```

![이미지](https://github.com/ckdgus08/optical_fiber/blob/main/src/main/resources/static/image/example_download.JPG?raw=true)

#### 2. intellij(개발툴) 다운로드

[1. JDK 설치 (jdk 설치 부분만 보면 됨.)](https://drcode-devblog.tistory.com/221)

[2. 인텔리제이 학생라이센스 사용](https://cheershennah.tistory.com/160)

** 학생라이센스를 받지 않고 community(무료)버전을 설치해도 작동에 문제는 없음.

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
C:\optical_fiber-main\moduleToFile - 바로가기.exe 파일 실행

모듈과 컴퓨터 사이에 SPI 통신을 하여 데이터를 수신함.
수신된 데이터는 C:\optical_fiber-main\src\main\resources\static\sample_data\data.txt
에 기록됨. (계속해서 덮어쓰기 되는 방식이라, 항상 데이터는 한줄만 표시됨)

* FTDI 모듈이 컴퓨터와 정상적으로 연결되어 있어야 프로그램이 정상작동함.
* 경로를 찾을 수 없다는 문구가 뜨면, C:\optical_fiber-main\optical_fiber-main 혹은 C:\optical_fiber 위치에 있는건 아닌지 확인 C:\optical_fiber-main 가 정상 경로임. (사진의 optical_fiber 라고 된 것은 과거 사진임. optical_fiber-main이 맞는 것임)
* 그래도 프로그램이 열리지 않으면 USB 연결, 드라이버 설치 등을 의심해봐야함.

** 모듈이 없거나,, 등등의 이유로 해당 프로그램을 실행하지 않아도, 웹사이트 기능 동작 테스트 및 모바일기기 접속 테스트는 가능하다.
```

![이미지](https://github.com/ckdgus08/optical_fiber/blob/main/src/main/resources/static/image/process1.jpg?raw=true)
![이미지](https://github.com/ckdgus08/optical_fiber/blob/main/src/main/resources/static/image/process2.jpg?raw=true)

#### 7. Intellij를 이용해 프로젝트 파일 열기

![이미지](https://github.com/ckdgus08/optical_fiber/blob/main/src/main/resources/static/image/process3.jpg?raw=true)
![이미지](https://github.com/ckdgus08/optical_fiber/blob/main/src/main/resources/static/image/process4.jpg?raw=true)

프로젝트 파일을 열고 로딩을 기다림 (처음으로 열면 오래 걸릴 수 있음.)
![이미지](https://github.com/ckdgus08/optical_fiber/blob/main/src/main/resources/static/image/process5.jpg?raw=true)

```text
optical_fiber-main/src/main/java/com/github/ckdgus08/OpticalFiberApplication 경로의
OpticalFiberApplication 파일을 실행시킴
```

![이미지](https://github.com/ckdgus08/optical_fiber/blob/main/src/main/resources/static/image/process6.jpg?raw=true)

```text
아래 이미지와 같이 
Started OpticalFiberApplication in ~~~ 이라는 문구가 나타나면 정상적으로 실행 된 것임.

* 정상작동이 안된다면, 구글에 "window intellij java spring 개발환경 셋팅" 과 같은 키워드로 검색하여 재시도
* 해당 프로젝트는 java spring으로 구동되는 웹서버 프로그램이며, HTML, 자바스크립트를 활용하여 기능을 구현 할 수 있다. (c언어를 해봤다면 배우는데 오래 걸리지 않을 것이다.)
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
** 6번 항목의 프로그램이 동작되고 있지 않아도 웹사이트가 동작하는데 문제는 없다. 하지만 실행을 눌려도 값이 변하지 않고 하나의 값만 출력 됨.
```

![이미지](https://github.com/ckdgus08/optical_fiber/blob/main/src/main/resources/static/image/process8.jpg?raw=true)

#### 9. 외부에서 접속가능하도록 하기

```text
외부 웹브라우저로 요청을 보낼시 -> 공유기(공인 아이피:8081) -> 서버 컴퓨터(내부아이피:8081) 으로 전달됨.

일반적으로 외부 웹브라우저 -> 공유기로 접속시 서버 컴퓨터로 연결되지 않음.
공유기(공인아이피) -> 서버 컴퓨터(내부아이피) 로 연결하기 위해서는 포트포워딩 이라는 것을 해야함.

내부아이피는 CMD 창에서 ipconfig 입력 후 IPv4 주소 . . . . . . . . . : 192.168.25.44 에서 볼 수 있다.
(192.168.25.44 는 컴퓨터마다 다른 값을 가질 가능성이 높다.)

공인 아이피는 네이버 검색창에 "내 아이피" 라고 치면 볼 수 있다.

** 공유기(58.123.34.5:8081) 로 들어오는 요청을 컴퓨터(192.168.25.44:8081) 으로 보내주는 것이 목표이고, 포트포워딩이라 부른다.
** 위에서 사용했던 localhost 는 자기 컴퓨터의 IP를 의미한다.
** 학교 WIFI 와 같이 개인의 소유가 아닌 네트워크에서는 포트포워딩을 시도하지 말자.

* 현재 같은 공유기의 wifi에 연결되어 있으면 외부기기에서 접속되지 않는 버그가 있다. (만약 연결이 제대로 안된다면, wifi연결을 하지말고 데이터로 다시 시도해보자.)
```

[포트포워딩 참고](https://m.blog.naver.com/seoulworkshop/221265052717)

```text
포트포워딩을 했다면, 
공인 아이피를 알아낸 후(공인 아이피는 네이버 검색창에 "내 아이피" 라고 치면 볼 수 있다.)

공인아이피를 기억하고, C:\optical_fiber-main\src\main\resources\static\js\index.js 파일을 열어준다.

let 공인아이피 = '127.0.0.1'  부분에서 '' 은 지우지말고 127.0.0.1 부분만 자신의 공인아이피로 바꿔준다.
```

#### 10. 테스트
```text
7번 과정을 통해 서버를 start 시킨 후
핸드폰으로 인터넷 브라우저를 킨 후 http://공인아이피:8081 주소로 접속한다.
```
