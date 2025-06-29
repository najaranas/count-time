let miliSeondElement = document.querySelector(".miliseconds");
let SeondElement = document.querySelector(".seconds");
let minutesElement = document.querySelector(".minutes");
let startBtn = document.querySelector(".start");
let resetBtn = document.querySelector(".reset");
let lapBtn = document.querySelector(".lap");
let stopBtn = document.querySelector(".stop");
let themeBtn = document.querySelector(".theme-btn");
let menuBtn = document.querySelector(".menu-btn");
let navListElement = document.querySelector(".nav-list");
let tbodyElement = document.querySelector("tbody");
let oldmValue;
let oldsValue;
let oldmiliValue;
let counter;
let NbrofLap = 1;
if (window.localStorage.getItem("theme")) {
    if (window.localStorage.getItem("theme") === "light") {
        changeToLightTheme();
    } else {
        changeToDarkTheme();
    }
}
if (window.localStorage.getItem("stopwatch-time")) {
    let elemnt = JSON.parse(window.localStorage.getItem("stopwatch-time"));
    miliSeondElement.innerHTML = elemnt.miliValue;
    SeondElement.innerHTML = elemnt.sValue;
    minutesElement.innerHTML = elemnt.mValue;
    if (window.localStorage.getItem("stopwatch start Btn status") === "started") {
        startStopWatch();
        hideBtns(startBtn, resetBtn);
        showBtns(lapBtn, stopBtn);
        startBtn.classList.add("started");
        addStopWarchstartBtnstatusToLocalSotrage("started");
    }
}
let arx = /\d{2}/g;

if (window.localStorage.getItem("lap elements")) {
    let lapArray = JSON.parse(window.localStorage.getItem("lap elements"));
    tbodyElement.parentElement.style.display = "block";
    lapArray.forEach((element) => {
        let newRow = document.createElement("tr");
        let data1 = document.createElement("td");
        let data2 = document.createElement("td");
        let data3 = document.createElement("td");

        data1.innerHTML = element.firstData;
        data2.innerHTML = element.secondData;
        data3.innerHTML = element.thirdData;
        newRow.appendChild(data1);
        newRow.appendChild(data2);
        newRow.appendChild(data3);
        //append tr to tbody
        tbodyElement.append(newRow);
        //
    });
    NbrofLap = lapArray.length + 1;
    oldmValue = lapArray[0].thirdData.match(arx)[0];
    oldsValue = lapArray[0].thirdData.match(arx)[1];
    oldmiliValue = lapArray[0].thirdData.match(arx)[2];
}

let stopwatchTime = {
    mValue: minutesElement.innerHTML,
    sValue: SeondElement.innerHTML,
    miliValue: miliSeondElement.innerHTML,
};
let lapArray = [];
if (window.localStorage.getItem("lap elements")) {
    lapArray = JSON.parse(window.localStorage.getItem("lap elements"));
}
//   start start btn click

startBtn.addEventListener("click", function (e) {
    startStopWatch();
    hideBtns(startBtn, resetBtn);
    showBtns(lapBtn, stopBtn);
    startBtn.classList.add("started");
    addStopWarchstartBtnstatusToLocalSotrage("started");
});
//   end start btn click

//   start reset btn click

resetBtn.addEventListener("click", function () {
    clearInterval(counter);
    clearInterval(counter - 1);
    clearInterval(counter - 2);
    miliSeondElement.innerHTML = "00";
    SeondElement.innerHTML = "00";
    minutesElement.innerHTML = "00";
    addStopWatchTimeToLocalStorage(miliSeondElement.innerHTML, "milisecond");
    addStopWatchTimeToLocalStorage(SeondElement.innerHTML, "second");
    addStopWatchTimeToLocalStorage(minutesElement.innerHTML, "minutes");
    NbrofLap = 1;
    tbodyElement.innerHTML = "";
    tbodyElement.parentElement.style.display = "none";
    window.localStorage.removeItem("lap elements");
    lapArray = [];
});

//   end reset btn click

//   start stop btn click

stopBtn.addEventListener("click", function () {
    clearInterval(counter);
    clearInterval(counter - 1);
    clearInterval(counter - 2);
    hideBtns(lapBtn, stopBtn);
    showBtns(startBtn, resetBtn);
    startBtn.classList.remove("started");
    addStopWarchstartBtnstatusToLocalSotrage("not-started");
});

//   end stop btn click

//   start lap btn click

lapBtn.addEventListener("click", function () {
    //
    createLapElement(minutesElement.innerHTML, SeondElement.innerHTML, miliSeondElement.innerHTML);
    addLapElementsToLocalSotrage(lapArray);
});
// short cut start
document.body.addEventListener("keypress", (event) => {
    if (!startBtn.classList.contains("started")) {
        if (event.key === "s" || event.key === "S" || event.key === " ") {
            startStopWatch();
            hideBtns(startBtn, resetBtn);
            showBtns(lapBtn, stopBtn);
            startBtn.classList.add("started");
            addStopWarchstartBtnstatusToLocalSotrage("started");
        }
        if (event.key === "r" || event.key === "R") {
            clearInterval(counter);
            clearInterval(counter - 1);
            clearInterval(counter - 2);
            miliSeondElement.innerHTML = "00";
            SeondElement.innerHTML = "00";
            minutesElement.innerHTML = "00";
            addStopWatchTimeToLocalStorage(miliSeondElement.innerHTML, "milisecond");
            addStopWatchTimeToLocalStorage(SeondElement.innerHTML, "second");
            addStopWatchTimeToLocalStorage(minutesElement.innerHTML, "minutes");
            NbrofLap = 1;
            tbodyElement.innerHTML = "";
            tbodyElement.parentElement.style.display = "none";
            window.localStorage.removeItem("lap elements");
            lapArray = [];
        }
    } else {
        if (event.key === "s" || event.key === "S" || event.key === " ") {
            clearInterval(counter);
            clearInterval(counter - 1);
            clearInterval(counter - 2);
            hideBtns(lapBtn, stopBtn);
            showBtns(startBtn, resetBtn);
            startBtn.classList.remove("started");
            addStopWarchstartBtnstatusToLocalSotrage("not-started");
        }
        if (event.key === "l" || event.key === "L") {
            createLapElement(minutesElement.innerHTML, SeondElement.innerHTML, miliSeondElement.innerHTML);
            addLapElementsToLocalSotrage(lapArray);
        }
    }
});

// short cut end

//   start createLapElement function
function createLapElement(mValue, sValue, miliValue) {
    //display block for table
    tbodyElement.parentElement.style.display = "block";
    //
    let newRow = document.createElement("tr");
    let data1 = document.createElement("td");
    let data2 = document.createElement("td");
    let data3 = document.createElement("td");
    //append text to td
    data1.innerHTML = NbrofLap;
    data3.innerHTML = mValue + ":" + sValue + "." + miliValue;
    //

    //second data conditions
    let newMvalue;
    let newSvalue;
    let newMilivalue;
    if (tbodyElement.children.length === 0) {
        data2.innerHTML = mValue + ":" + sValue + "." + miliValue;
    } else {
        //conditions
        if (miliValue < oldmiliValue && sValue >= oldsValue) {
            newMvalue = +mValue - +oldmValue;
            if (sValue > oldsValue) {
                newSvalue = +sValue - (1 + +oldsValue);
            } else {
                newSvalue = +sValue - +oldsValue;
            }
            newMilivalue = 100 - +oldmiliValue + +miliValue;
            addZero(data2, newMvalue, newSvalue, newMilivalue);
        } else if (miliValue < oldmiliValue && sValue < oldsValue) {
            newMvalue = +mValue - (+oldmValue + 1);
            newSvalue = 60 - (+oldsValue - 1);
            newMilivalue = 100 - +oldmiliValue + +miliValue;
            addZero(data2, newMvalue, newSvalue, newMilivalue);

            data2.innerHTML = `${newMvalue}:${newSvalue}.${newMilivalue}`;
        } else if (miliValue >= oldmiliValue && sValue < oldsValue) {
            newMvalue = +mValue - (+oldmValue + 1);
            newSvalue = 60 - (+oldsValue - 1);
            newMilivalue = +miliValue - +oldmiliValue;
            addZero(data2, newMvalue, newSvalue, newMilivalue);
        } else {
            newMvalue = +mValue - +oldmValue;
            newSvalue = +sValue - +oldsValue;
            newMilivalue = +miliValue - +oldmiliValue;
            addZero(data2, newMvalue, newSvalue, newMilivalue);
        }
    }
    oldmValue = mValue;
    oldsValue = sValue;
    oldmiliValue = miliValue;

    newRow.appendChild(data1);
    newRow.appendChild(data2);
    newRow.appendChild(data3);
    //append tr to tbody
    tbodyElement.prepend(newRow);
    lapArray.unshift({
        firstData: data1.innerHTML,
        secondData: data2.innerHTML,
        thirdData: data3.innerHTML,
    });
    NbrofLap++;
}
//  satart addElement zero function
function addZero(data2, newMvalue, newSvalue, newMilivalue) {
    if (newMvalue < 10) {
        newMvalue = "0" + newMvalue;
    }
    if (newSvalue < 10) {
        newSvalue = "0" + newSvalue;
    }
    if (newMilivalue < 10) {
        newMilivalue = "0" + newMilivalue;
    }
    data2.innerHTML = `${newMvalue}:${newSvalue}.${newMilivalue}`;
}

//  end addElement zero function

//   start createLapElement function

//   start statStopWatch function
let checkMiliSeconds = false;
let checkSeconds = false;
let checkminutes = false;
function startStopWatch() {
    // Seonds Interval Start

    counter = setInterval(function () {
        if (parseInt(miliSeondElement.innerHTML) < 9) {
            miliSeondElement.innerHTML = `0${parseInt(miliSeondElement.innerHTML) + 1}`;
        } else {
            miliSeondElement.innerHTML = parseInt(miliSeondElement.innerHTML) + 1;
        }
        if (miliSeondElement.innerHTML == "100") {
            miliSeondElement.innerHTML = "00";
        }
        addStopWatchTimeToLocalStorage(miliSeondElement.innerHTML, "milisecond");
    }, 10);

    // Seonds Interval Start

    // Seond Interval Start

    counter = setInterval(function () {
        if (parseInt(SeondElement.innerHTML) < 9) {
            SeondElement.innerHTML = `0${parseInt(SeondElement.innerHTML) + 1}`;
        } else {
            SeondElement.innerHTML = parseInt(SeondElement.innerHTML) + 1;
        }
        if (SeondElement.innerHTML == "60") {
            SeondElement.innerHTML = "00";
        }

        addStopWatchTimeToLocalStorage(SeondElement.innerHTML, "second");
    }, 1000);

    // minutes Interval Start

    counter = setInterval(function () {
        if (parseInt(minutesElement.innerHTML) < 9) {
            minutesElement.innerHTML = `0${parseInt(minutesElement.innerHTML) + 1}`;
        } else {
            minutesElement.innerHTML = parseInt(minutesElement.innerHTML) + 1;
        }
        if (minutesElement.innerHTML == "60") {
            minutesElement.innerHTML = "00";
        }
        addStopWatchTimeToLocalStorage(minutesElement.innerHTML, "minutes");
    }, 1000 * 60);

    // minutes Interval end
}

// end statStopWatch function

//hide btns start
function hideBtns(btn1, btn2) {
    btn1.style.display = "none";
    btn2.style.display = "none";
}
//hide btns start

//show btns end
function showBtns(btn1, btn2) {
    btn1.style.display = "flex";
    btn2.style.display = "flex";
}
//show btns end
let scrollBtn = document.querySelector(".scroll-btn");

window.addEventListener("scroll", function () {
    if (window.scrollY >= 300) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
});

scrollBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

themeBtn.addEventListener("click", function () {
    swapTheme();
});

//
//
menuBtn.addEventListener("click", () => {
    navListElement.classList.toggle("open");
    if (navListElement.classList.contains("open")) {
        document.querySelector(".main .container").style.filter = "blur(10px)";
        document.querySelector(".main .container").style.pointerEvents = "none";
    } else {
        document.querySelector(".main .container").style.filter = "none";
        document.querySelector(".main .container").style.pointerEvents = "auto";
    }
    if (menuBtn.classList.contains("close")) {
        menuBtn.firstElementChild.innerHTML = "close";
        menuBtn.classList.add("open");
        menuBtn.classList.remove("close");
    } else {
        menuBtn.firstElementChild.innerHTML = "menu";
        menuBtn.classList.add("close");
        menuBtn.classList.remove("open");
    }
    if (navListElement.classList.contains("open")) {
        document.body.addEventListener("click", (e) => {
            if (!menuBtn.contains(e.target)) {
                if (!navListElement.contains(e.target)) {
                    menuBtn.firstElementChild.innerHTML = "menu";
                    menuBtn.classList.add("close");
                    menuBtn.classList.remove("open");
                    navListElement.classList.remove("open");
                    document.querySelector(".main .container").style.filter = "none";
                    document.querySelector(".main .container").style.pointerEvents = "auto";
                }
            }
        });
    }
});

function swapTheme() {
    if (themeBtn.classList.contains("dark-theme")) {
        changeToLightTheme();
        addThemeToLocalStorage("light");
    } else {
        changeToDarkTheme();
        addThemeToLocalStorage("dark");
    }
}

function changeToLightTheme() {
    themeBtn.classList.remove("dark-theme");
    themeBtn.classList.add("light-theme");
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
    themeBtn.firstElementChild.innerHTML = "nightlight";
}
function changeToDarkTheme() {
    themeBtn.classList.remove("light-theme");
    themeBtn.classList.add("dark-theme");
    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");
    themeBtn.firstElementChild.innerHTML = "light_mode";
}
// theme local storage start
function addThemeToLocalStorage(theme) {
    window.localStorage.setItem("theme", theme);
}

// theme local storage end

// stopwatch time to local storage start

function addStopWatchTimeToLocalStorage(value, type) {
    if (type == "milisecond") {
        stopwatchTime.miliValue = miliSeondElement.innerHTML;
    } else if (type == "second") {
        stopwatchTime.sValue = SeondElement.innerHTML;
    } else {
        stopwatchTime.mValue = minutesElement.innerHTML;
    }
    window.localStorage.setItem("stopwatch-time", JSON.stringify(stopwatchTime));
}

function addStopWarchstartBtnstatusToLocalSotrage(status) {
    window.localStorage.setItem("stopwatch start Btn status", status);
}
function addLapElementsToLocalSotrage(lapArray) {
    window.localStorage.setItem("lap elements", JSON.stringify(lapArray));
}

// stopwatch time to local storage end

navListElement.addEventListener("click", (e) => {
    if (e.target.classList.contains("stopwatch")) {
        location.href = "/index.html";
    } else if (e.target.classList.contains("timer")) {
        location.href = "/timer/timer.html";
    } else if (e.target.classList.contains("alarm")) {
        location.href = "/alarm/alarm.html";
    } else if (e.target.classList.contains("feedback")) {
        location.href = "/feedback/feedback.html";
    } else if (e.target.classList.contains("settings")) {
        location.href = "/settings/settings.html";
    }
});
let ListElements = document.querySelectorAll(".nav-list ul li");
let buttons = document.querySelectorAll(" .editColor");
function changeSystemColor(color) {
    ListElements.forEach((list) => {
        if (list.classList.contains("checked")) {
            Array.from(list.children).forEach((children) => {
                children.style.color = color;
            });
        }
    });
    buttons.forEach((button) => {
        button.style.backgroundColor = color;
    });
}
if (window.localStorage.getItem("settings-color")) {
    const localColor = window.localStorage.getItem("settings-color");
    changeSystemColor(localColor);
}
