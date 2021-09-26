let 버튼_눌린상태_배열 = [
    [false, false, false], [true, false, false],
    [false, true, false], [false, false, true],
    [true, true, false], [true, false, true],
    [false, true, true], [true, true, true]]
수신부_결과값_배열 = []

버튼_현재상태 = [false, false, false]

let 데이터_수신_상태 = false

let timeoutId = 0;

function 버튼_클릭(index) {
    if (버튼_현재상태[index])
        버튼_눌려지지않은_모습_시각화(index)
    else
        버튼_눌려진_모습_시각화(index)

    버튼_현재상태[index] = !버튼_현재상태[index]
    각_지점_계산하고_결과반영(버튼_현재상태)
}

const MAX_VALUE = 4000;
const INIT_MIN_VALUE = 2800;
let 최소_dx값;

function SET_ABNORMAL() {
    document.getElementById("target_value_status").classList.add("no")
    document.getElementById("target_value_status").classList.remove("ok")
    document.getElementById("target_value_status").innerText = "정상 범위 벗어난 값"
    버튼_현재상태 = [true, true, true]
    버튼_클릭(0)
    버튼_클릭(1)
    버튼_클릭(2)
}

function 수신부_데이터로_어느버튼_눌렸는지_역추적(수신부데이터) {

    document.getElementById("target_value_result").innerText = 수신부데이터

    if (수신부데이터 >= MAX_VALUE) {
        SET_ABNORMAL();
        return
    }

    if (수신부데이터 >= INIT_MIN_VALUE) {
        이론값_배열_범위_재설정();
        최소_dx값 = 최소_dx값_구하기()
        document.getElementById("init_value").value = document.getElementById("target_value_result").innerText
    }

    for (let i = 0; i < 수신부_결과값_배열.length; i++) {
        if ((수신부_결과값_배열[i] - (최소_dx값 / 2.0)) < 수신부데이터 && (수신부_결과값_배열[i] + (최소_dx값 / 2.0)) >= 수신부데이터) {
            버튼_현재상태[0] = !버튼_눌린상태_배열[i][0]
            버튼_현재상태[1] = !버튼_눌린상태_배열[i][1]
            버튼_현재상태[2] = !버튼_눌린상태_배열[i][2]

            버튼_클릭(0)
            버튼_클릭(1)
            버튼_클릭(2)

            document.getElementById("target_value_status").classList.add("ok")
            document.getElementById("target_value_status").classList.remove("no")
            document.getElementById("target_value_status").innerText = "정상 범위"
            return
        }
    }

    SET_ABNORMAL()
}

function 버튼_눌려지지않은_모습_시각화(index) {
    document.getElementById("button_" + index).style.height = "50px"
    document.getElementById("button_" + index).classList.add("unpush")
    document.getElementById("button_" + index).classList.remove("push")
}

function 버튼_눌려진_모습_시각화(index) {
    document.getElementById("button_" + index).style.height = "150px"
    document.getElementById("button_" + index).classList.add("push")
    document.getElementById("button_" + index).classList.remove("unpush")
}

function 이론값_배열_범위_재설정() {
    for (let i = 0; i < 버튼_눌린상태_배열.length; i++) {
        수신부_결과값_배열[i] = 수신부_이론값_계산하기(버튼_눌린상태_배열[i])
    }
}

function 최소_dx값_구하기() {
    let 최소값 = 10000000
    for (let i = 0; i < 수신부_결과값_배열.length; i++) {
        for (let j = 0; j < 수신부_결과값_배열.length; j++) {
            let 구간차이값 = Math.abs(수신부_결과값_배열[i] - 수신부_결과값_배열[j])
            if (구간차이값 !== 0 && 최소값 > 구간차이값)
                최소값 = 구간차이값
        }
    }
    return 최소값
}

function 목표하는_dx값이_구간의_최소dx보다_큰지_체크하기() {
    let 목표_dx값 = parseInt(document.getElementById("dx").value)
    이론값_배열_범위_재설정();

    최소_dx값 = 최소_dx값_구하기()

    let 구간최소값 = document.getElementsByClassName("dx_result")[0]

    if (목표_dx값 <= 최소_dx값) {
        목표dx_성공_시각화(구간최소값, 최소_dx값)
        return true
    } else {
        목표dx_실패_시각화(구간최소값, 최소_dx값)
        return false
    }
}

function 목표dx_성공_시각화(구간최소값, 최소값) {
    구간최소값.innerHTML = "최소 dx = " + Math.round(최소값)
    구간최소값.classList.add("ok")
    구간최소값.classList.remove("no")
}

function 목표dx_실패_시각화(구간최소값, 최소값) {
    구간최소값.innerHTML = "최소 dx = " + Math.round(최소값)
    구간최소값.classList.add("no")
    구간최소값.classList.remove("ok")
}

function 수신부_이론값_계산하기(isPush) {
    // isPush 예시 [true, false, true]

    let 초기값 = parseInt(document.getElementById("init_value").value)
    let 투과율1 = parseInt(document.getElementById("number_1").value)
    let 투과율2 = parseInt(document.getElementById("number_2").value)
    let 투과율3 = parseInt(document.getElementById("number_3").value)

    let 이론값 = 초기값

    if (isPush[0])
        이론값 = 이론값 * 투과율1 / 100
    if (isPush[1])
        이론값 = 이론값 * 투과율2 / 100
    if (isPush[2])
        이론값 = 이론값 * 투과율3 / 100
    return 이론값
}

// 각 지점 값 계산하고_결과반영
function 각_지점_계산하고_결과반영(isPush) {

    let 초기값 = parseInt(document.getElementById("init_value").value)
    let 투과율1번지점 = parseInt(document.getElementById("number_1").value)
    let 투과율2번지점 = parseInt(document.getElementById("number_2").value)
    let 투과율3번지점 = parseInt(document.getElementById("number_3").value)

    let _1번지점텍스트 = document.getElementById("value_1")
    let _2번지점텍스트 = document.getElementById("value_2")
    let _3번지점텍스트 = document.getElementById("value_3")

    let 수신부값 = 초기값

    if (isPush[0])
        수신부값 = 수신부값 * 투과율1번지점 / 100
    _1번지점텍스트.innerText = 수신부값.toString()

    if (isPush[1])
        수신부값 = 수신부값 * 투과율2번지점 / 100
    _2번지점텍스트.innerText = 수신부값.toString()

    if (isPush[2])
        수신부값 = 수신부값 * 투과율3번지점 / 100
    _3번지점텍스트.innerText = 수신부값.toString()

    return 수신부값
}

function 기록된_데이터_가져오기() {

    let result = []
    $.ajax({
        async: false,
        method: 'GET',
        url: 'http://localhost:8081/api/data',
        dataType: 'json',
        success: function (data) {
            if (data.length > 0) {
                let i = 0
                for (const element of data)
                    result[i++] = element
            }
        }
    })
    return result
}

function 실시간_데이터_가져오기() {

    let result = []
    $.ajax({
        async: false,
        method: 'GET',
        url: 'http://localhost:8081/api/singleData',
        dataType: 'json',
        success: function (data) {
            if (data.length > 0) {
                let i = 0
                for (const element of data)
                    result[i++] = element
            }
        }
    })
    return result
}

window.onload = function () {

    document.getElementById("dx").onchange = function () {
        if (!목표하는_dx값이_구간의_최소dx보다_큰지_체크하기()) {
            alert("목표 dx값을 조정해주세요.")
        }
    }
    document.getElementById("button_0").onclick = function () {
        버튼_클릭(0)
    }
    document.getElementById("button_1").onclick = function () {
        버튼_클릭(1)
    }
    document.getElementById("button_2").onclick = function () {
        버튼_클릭(2)
    }
    document.getElementById("target_value").onclick = function () {

        if (데이터_수신_상태) {
            document.getElementById("target_value").innerText = "시작"
            데이터_수신_상태 = false
            clearTimeout(timeoutId)
            document.getElementById("target_value_result").innerText = "데이터 수신 멈춤"
            document.getElementById("target_value_status").classList.remove("ok")
            document.getElementById("target_value_status").classList.remove("no")
            document.getElementById("target_value_status").innerText = ""
        } else {
            document.getElementById("init_value").value = document.getElementById("target_value_result").innerText
            document.getElementById("target_value").innerText = "중단"
            데이터_수신_상태 = true
            timeoutId = setInterval(
                function exec() {
                    let 데이터 = 실시간_데이터_가져오기()
                    목표하는_dx값이_구간의_최소dx보다_큰지_체크하기()
                    수신부_데이터로_어느버튼_눌렸는지_역추적(데이터)
                }, 300
            )
        }
    }
}
