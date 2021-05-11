push = [false, false, false];
window.onload = function () {

    let inch_slide = new Slider('#random', {});

    change(push);

    document.getElementById("dx").onchange = function () {
        check();
    }

    document.getElementById("button_1").onclick = function () {

        if (push[0]) {
            document.getElementById("button_1").style.height = "50px";
            document.getElementById("button_1").classList.remove("push")
            document.getElementById("button_1").classList.add("unpush")
        } else {
            document.getElementById("button_1").style.height = "150px";
            document.getElementById("button_1").classList.add("push")
            document.getElementById("button_1").classList.remove("unpush")
        }

        push[0] = !push[0]
        change(push);
    }

    document.getElementById("button_2").onclick = function () {

        if (push[1]) {
            document.getElementById("button_2").style.height = "50px";
            document.getElementById("button_2").classList.remove("push")
            document.getElementById("button_2").classList.add("unpush")
        } else {
            document.getElementById("button_2").style.height = "150px";
            document.getElementById("button_2").classList.add("push")
            document.getElementById("button_2").classList.remove("unpush")
        }

        push[1] = !push[1]
        change(push);
    }

    document.getElementById("button_3").onclick = function () {

        if (push[2]) {
            document.getElementById("button_3").style.height = "50px";
            document.getElementById("button_3").classList.remove("push")
            document.getElementById("button_3").classList.add("unpush")
        } else {
            document.getElementById("button_3").style.height = "150px";
            document.getElementById("button_3").classList.add("push")
            document.getElementById("button_3").classList.remove("unpush")
        }

        push[2] = !push[2]
        change(push);
    }

}

function check() {
    let dx = document.getElementById("dx").value;

    let array = [
        [false, false, false], [false, true, false],
        [true, false, false], [true, true, false],
        [true, true, false], [true, false, true],
        [false, true, true], [true, true, true]];
    let value = [];

    for (let i = 0; i < array.length; i++) {
        value[i] = change(array[i]);
    }

    alert(value)

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