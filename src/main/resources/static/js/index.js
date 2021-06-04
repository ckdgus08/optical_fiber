push = [false, false, false];
let array = [
    [false, false, false], [true, false, false],
    [false, true, false], [false, false, true],
    [true, true, false], [true, false, true],
    [false, true, true], [true, true, true]];
value_cache = [];

window.onload = function () {

    let inch_slide = new Slider('#random', {});

    change(push);
    check();


    document.getElementById("dx").onchange = function () {
        check();
    }

    document.getElementById("button_0").onclick = function () {

        change_button_status(0)
    }

    document.getElementById("button_1").onclick = function () {

        change_button_status(1)
    }

    document.getElementById("button_2").onclick = function () {

        change_button_status(2)
    }
    let data = getData();

    document.getElementById("target_value").onclick = function () {
        for (const value of data) {
            setTimeout(function exec() {
                go_change(value)
            }, 0);
        }
        document.getElementById("target_value_result").innerText = "완료"
        // document.getElementById("target_value_result").classList.add("no")
        // document.getElementById("target_value_result").classList.remove("ok")
        // document.getElementById("target_value_result").innerText = "적절하지 않은 수"
    }
}

function change_button_status(index) {
    if (push[index]) {
        document.getElementById("button_" + index).style.height = "50px";
        document.getElementById("button_" + index).classList.remove("push")
        document.getElementById("button_" + index).classList.add("unpush")
    } else {
        document.getElementById("button_" + index).style.height = "150px";
        document.getElementById("button_" + index).classList.add("push")
        document.getElementById("button_" + index).classList.remove("unpush")
    }
    push[index] = !push[index]
    change(push)
}

function go_change(value) {
    let dx = document.getElementById("dx").value;
    document.getElementById("target_value_result").innerText = value;

    for (let i = 1; i < value_cache.length; i++) {
        if (value_cache[i] - (value_cache[i] * 0.05) < value && value_cache[i] + (value_cache[i] * 0.05) >= value) {
            push[0] = !array[i][0];
            push[1] = !array[i][1];
            push[2] = !array[i][2];

            change_button_status(0)
            change_button_status(1)
            change_button_status(2)

            document.getElementById("target_value_result").classList.add("ok")
            document.getElementById("target_value_result").classList.remove("no")
            break;
        }
    }
}

function check() {
    let dx = document.getElementById("dx").value;

    let value = [];

    for (let i = 0; i < array.length; i++) {
        value[i] = change_for_check(array[i]);
        value_cache[i] = value[i];
    }

    let min = 10000000;
    for (let i = 0; i < value.length; i++) {
        for (let j = 0; j < value.length; j++) {
            let temp = Math.abs(value[i] - value[j]);
            if (temp !== 0 && min > temp)
                min = temp;
        }
    }

    let dx_result = document.getElementsByClassName("dx_result")[0];
    if (parseInt(dx) <= min) {
        dx_result.innerHTML = "최소 dx = " + min;
        dx_result.classList.add("ok");
        dx_result.classList.remove("no");
    } else {
        dx_result.innerHTML = "최소 dx = " + min;
        dx_result.classList.add("no");
        dx_result.classList.remove("ok");
    }

}

function change_for_check(isPush) {

    let initValue = document.getElementsByClassName("randomTag")[1].innerHTML;

    let number1 = document.getElementById("number_1").value;
    let number2 = document.getElementById("number_2").value;
    let number3 = document.getElementById("number_3").value;

    let value1 = document.getElementById("value_1");
    let value2 = document.getElementById("value_2");
    let value3 = document.getElementById("value_3");

    initValue = parseInt(initValue);

    if (isPush[0])
        initValue = parseInt(initValue) * (parseInt(number1) / 100);

    if (isPush[1])
        initValue = initValue * (parseInt(number2) / 100);

    if (isPush[2])
        initValue = initValue * (parseInt(number3) / 100);

    return parseInt(initValue);
}


function change(isPush) {

    let initValue = document.getElementsByClassName("randomTag")[1].innerHTML;

    let number1 = document.getElementById("number_1").value;
    let number2 = document.getElementById("number_2").value;
    let number3 = document.getElementById("number_3").value;

    let value1 = document.getElementById("value_1");
    let value2 = document.getElementById("value_2");
    let value3 = document.getElementById("value_3");

    initValue = parseInt(initValue);

    if (isPush[0])
        initValue = parseInt(initValue) * (parseInt(number1) / 100);
    value1.innerText = parseInt(initValue).toString();

    if (isPush[1])
        initValue = initValue * (parseInt(number2) / 100);
    value2.innerText = parseInt(initValue).toString();

    if (isPush[2])
        initValue = initValue * (parseInt(number3) / 100);

    value3.innerText = parseInt(initValue).toString();

    return parseInt(initValue);
}

function getData() {

    result = [];
    $.ajax({
        async: false,
        method: 'GET',
        url: 'http://localhost:8081/api/data',
        dataType: 'json',
        success: function (data) {
            if (data.length > 0) {
                let i = 0;
                for (const datum of data) {
                    result[i++] = datum;
                }
            }
        }
    })
    return result;
}
