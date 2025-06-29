let secondsElement = document.querySelector(".seconds");
let minutesElement = document.querySelector(".minutes");
let hourElement = document.querySelector(".hours");
let editBtn = document.querySelector(".edit");
//
let turnOffBtn = document.querySelector(".turn-off");
let turnOnBtn = document.querySelector(".turn-on");
//
let themeBtn = document.querySelector(".theme-btn");
let menuBtn = document.querySelector(".menu-btn");
let navListElement = document.querySelector(".nav-list");
let soundInput = document.querySelector(".main-options .sound select");
let popupElement = document.querySelector(".edit-pop-up");
let popupCancelBtn = document.querySelector(".edit-pop-up .bottom .cancel");
let popupturnOnBtn = document.querySelector(".edit-pop-up .bottom  .popup-start");
let closePopup = document.querySelector(".edit-pop-up .top span");
let soundActiveBtn = document.querySelector(".edit-pop-up .main-timer-edit .sound .btn");
let messageActiveBtn = document.querySelector(".edit-pop-up .main-timer-edit .message .btn");
//
//
let localTimeElement = document.querySelector(".main-content .local-time");
let localDayElement = document.querySelector(".main-content .local-day");
let alarTimeElement = document.querySelector(".main-content .alarm-time");
let alarmStatusElement = document.querySelector(".alarm-status");

//
//
let inputBoxElement = document.querySelectorAll(".main-options .input-box");
let messageInput = document.querySelector(".input-text");

let editHoursInput = document.querySelector(".hours select");
let editMinutesInput = document.querySelector(".minutes select");
let runSoundElement = document.querySelector(".main-options .sound  .material-symbols-outlined");
let checkSoundElement = document.querySelector(".main-options .sound  .checkbox");
let checkTextSoundElement = document.querySelector(".main-options .sound  .checkbox-text");
let scrollBtn = document.querySelector(".scroll-btn");

let audioElement = new Audio("/audio/tone.wav");
let choosedAudio;

//
let counter;
let spanAnimationDelay = 0;
let animationSpanElements = document.querySelectorAll(".progress span");

let choseedMinutesElement = minutesElement.innerHTML;
let choseedHoursElement = hourElement.innerHTML;
let choseedMessage = "AAA";
//
//
//
let finishPopupElement = document.querySelector(".finsh-pop-up");

let finshPopupOkBtn = document.querySelector(".finsh-pop-up .ok");
let finshPopupMessage = document.querySelector(".finsh-pop-up .message");
let finshPopupStartTime = document.querySelector(".finsh-pop-up  .start-time");
let finshPopupResetBtn = document.querySelector(".finsh-pop-up  .reset");
let finshPopupCloseBtn = document.querySelector(".finsh-pop-up  .material-symbols-outlined");
//
//
let deffCounter;
let remainingTime;

//
//
let endDate = new Date();

let date = String(new Date());
let chossedTime = new Date();
let dateRe = /\d+:\d+:\d+/g;
let dateTimeRe = /\w+\s\w+\s\d+\s\d+/g;
localTimeElement.innerHTML = date.match(dateRe)[0];
localDayElement.innerHTML = date.match(dateTimeRe)[0].replace(/\s/g, " - ");
//
let localTimeCounter = setInterval(function () {
    date = String(new Date());
    localTimeElement.innerHTML = date.match(dateRe)[0];
    localDayElement.innerHTML = date.match(dateTimeRe)[0].replace(/\s/g, " - ");
    //
}, 1000);
//
//
//

let TimerTime = {
    hValue: hourElement.innerHTML,
    mValue: minutesElement.innerHTML,
};
let oldTimerTime = {
    hValue: choseedHoursElement,
    mValue: choseedMinutesElement,
};

if (turnOnBtn.style.display === "none") {
    editBtn.style.cssText = " pointer-events: none;opacity: .3;";
} else {
    turnOnBtn.style.cssText = " pointer-events: auto;opacity: 1;";
}
if (hourElement.innerHTML == "00" && minutesElement.innerHTML == "00") {
    turnOnBtn.style.cssText = " pointer-events: none;opacity: .3;";
} else {
    turnOnBtn.style.cssText = " pointer-events: auto;opacity: 1;";
}
let seconds = 0;
let minutes = 1;
let hours = 0;
turnOnBtn.addEventListener("click", function (e) {
    // startTimer();
    hideBtns(turnOnBtn);
    showBtns(turnOffBtn);
    startAnimation(parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds));
    turnOnBtn.classList.add("animation-started");
    editBtn.style.cssText = " pointer-events: none;opacity: .3;";
    countdownTimer(chossedTime.getTime());
    // alarmStatusElement.innerHTML = "";

    alarmStatusElement.classList.add("on");
    alarmStatusElement.classList.remove("off");
    localDayElement.classList.add("alarm-on");
    localTimeElement.classList.add("alarm-on");
    alarTimeElement.classList.add("alarm-on");
});
//   end start btn click
//   start stop btn click

turnOffBtn.addEventListener("click", function () {
    clearInterval(counter);
    // clearInterval(counter - 2);
    hideBtns(turnOffBtn);
    showBtns(turnOnBtn);
    stopAnimation();
    // addTimerturnOnBtnstatusToLocalSotrage("Not-started");
    editBtn.style.cssText = " pointer-events: auto;opacity: 1;";

    alarmStatusElement.innerHTML = "Alarm is turned off !";
    clearInterval(deffCounter);
    alarmStatusElement.classList.add("off");
    alarmStatusElement.classList.remove("on");
    localTimeElement.classList.remove("alarm-on");
    localDayElement.classList.remove("alarm-on");
    alarTimeElement.classList.remove("alarm-on");
});

// short cut start
document.body.addEventListener("keypress", (event) => {
    if (alarmStatusElement.classList.contains("off") && turnOnBtn.style.opacity == "1") {
        if (event.key === "s" || event.key === "S" || event.key === " ") {
            hideBtns(turnOnBtn);
            showBtns(turnOffBtn);
            startAnimation(parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds));
            turnOnBtn.classList.add("animation-started");
            editBtn.style.cssText = " pointer-events: none;opacity: .3;";
            countdownTimer(chossedTime.getTime());
            // alarmStatusElement.innerHTML = "";
            alarmStatusElement.classList.add("on");
            alarmStatusElement.classList.remove("off");
            localDayElement.classList.add("alarm-on");
            localTimeElement.classList.add("alarm-on");
            alarTimeElement.classList.add("alarm-on");
        }
    } else {
        if (event.key === "s" || event.key === "S" || event.key === " ") {
            clearInterval(counter);
            // clearInterval(counter - 2);
            hideBtns(turnOffBtn);
            showBtns(turnOnBtn);
            stopAnimation();
            // addTimerturnOnBtnstatusToLocalSotrage("Not-started");
            editBtn.style.cssText = " pointer-events: auto;opacity: 1;";

            alarmStatusElement.innerHTML = "Alarm is turned off !";
            clearInterval(deffCounter);
            alarmStatusElement.classList.add("off");
            alarmStatusElement.classList.remove("on");
            localTimeElement.classList.remove("alarm-on");
            localDayElement.classList.remove("alarm-on");
            alarTimeElement.classList.remove("alarm-on");
        }
    }
});
// short cut end
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
// finshPopupCloseBtn
finshPopupCloseBtn.addEventListener("click", (e) => {
    finishPopupElement.classList.remove("opened");
    if (audioElement) {
        audioElement.pause();
    }
    addremoveblur(finishPopupElement);
});
// editBtn
editBtn.addEventListener("click", (e) => {
    popupElement.classList.add("opened");
    addremoveblur(popupElement);
});
// closePopup
closePopup.addEventListener("click", (e) => {
    popupElement.classList.remove("opened");
    if (audioElement) {
        audioElement.pause();
    }
    addremoveblur(popupElement);
});
// popupCancelBtn
popupCancelBtn.addEventListener("click", (e) => {
    popupElement.classList.remove("opened");
    if (audioElement) {
        audioElement.pause();
    }
    addremoveblur(popupElement);
});

if (window.localStorage.getItem("theme")) {
    if (window.localStorage.getItem("theme") === "light") {
        changeToLightTheme();
    } else {
        changeToDarkTheme();
    }
}

//
//
//
//
//
//
//

//
//
//

//
//
//
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

// counter = setInterval(() => {
//   // d.setMinutes(d.setHours.getHours + 1);
//   // d.setSeconds(d.setHours.getHours + 1);

// }, 1000);

//
soundActiveBtn.addEventListener("click", (e) => {
    if (soundActiveBtn.classList.contains("active")) {
        soundActiveBtn.firstElementChild.style.cssText = "left: 6px;";
        soundActiveBtn.classList.add("not-active");
        soundActiveBtn.classList.remove("active");
        soundActiveBtn.style.cssText = "background-color: #D4DAE7;";
        inputStatus("sound", "off");
    } else {
        soundActiveBtn.firstElementChild.style.cssText = "left:35px ;";
        soundActiveBtn.classList.add("active");
        soundActiveBtn.classList.remove("not-active");
        soundActiveBtn.style.cssText = "background-color: green;";
        inputStatus("sound", "on");
    }
});
messageActiveBtn.addEventListener("click", (e) => {
    if (messageActiveBtn.classList.contains("active")) {
        messageActiveBtn.firstElementChild.style.cssText = "left: 6px;";
        messageActiveBtn.classList.add("not-active");
        messageActiveBtn.classList.remove("active");
        messageActiveBtn.style.cssText = "background-color: #D4DAE7;";
        inputStatus("message", "off");
    } else {
        messageActiveBtn.firstElementChild.style.cssText = "left:35px ;";
        messageActiveBtn.classList.add("active");
        messageActiveBtn.classList.remove("not-active");
        messageActiveBtn.style.cssText = "background-color: green;";
        inputStatus("message", "on");
    }
});

// let chossedTime = new Date();
popupturnOnBtn.addEventListener("click", (e) => {
    const date = new Date();
    minutesElement.innerHTML = editMinutesInput.value;
    hourElement.innerHTML = editHoursInput.value;
    choseedMinutesElement = editMinutesInput.value;
    choseedHoursElement = editHoursInput.value;
    choseedMessage = messageInput.value;
    chossedTime.setHours(+choseedHoursElement);
    chossedTime.setMinutes(+choseedMinutesElement);
    chossedTime.setSeconds(0);
    if (chossedTime < date) {
        chossedTime.setDate(chossedTime.getDate() + 1);
    }
    if (remainingTime <= 0) {
        turnOnBtn.style.cssText = " pointer-events: none;opacity: .3;";
    } else {
        turnOnBtn.style.cssText = " pointer-events: auto;opacity: 1;";
        localDayElement.classList.add("alarm-on");
        localTimeElement.classList.add("alarm-on");
        alarTimeElement.classList.add("alarm-on");
    }
    alarmStatusElement.innerHTML = "";
    alarmStatusElement.classList.add("on");
    alarmStatusElement.classList.remove("off");
    hideBtns(turnOnBtn);
    showBtns(turnOffBtn);
    countdownTimer(chossedTime.getTime());
    turnOnBtn.classList.remove("animation-started");
    stopAnimation();
    spanAnimationDelay = 0;
    animationSpanElements.forEach((span) => {
        if (span.parentElement) {
            span.classList.remove("animated-span");
            void span.offsetWidth; // Trigger reflow
            span.classList.add("animated-span");
        }
    });
    startAnimation((chossedTime.getTime() - date.getTime()) / 1000);
    turnOnBtn.classList.add("animation-started");
    popupElement.classList.remove("opened");
    addremoveblur(popupElement);
    editBtn.style.cssText = " pointer-events: none;opacity: .3;";
    if (messageInput.classList.contains("on")) {
        finshPopupMessage.innerHTML = choseedMessage;
        if (finshPopupMessage.innerHTML.length > 10) {
            finshPopupMessage.innerHTML = finshPopupMessage.innerHTML.split("").slice(0, 10).join("") + "...";
        }
    } else {
        finshPopupMessage.innerHTML = "";
    }
    if (audioElement) {
        audioElement.pause();
    }
});

getAudio(soundInput.value);

soundInput.addEventListener("change", (e) => {
    getAudio(soundInput.value);
});
runSoundElement.addEventListener("click", (e) => {
    runSoundElement.classList.toggle("not-played");
    if (runSoundElement.classList.contains("not-played")) {
        runSoundElement.innerHTML = "play_arrow";
        if (audioElement) {
            audioElement.pause();
            return;
        }
    } else {
        runSoundElement.innerHTML = "pause";
    }

    runSoundElement.innerHTML = "pause";
    // ended => when the audio end
    audioElement.addEventListener("ended", () => {
        runSoundElement.classList.toggle("not-played");
        runSoundElement.innerHTML = "play_arrow";
        return;
    });
    if (audioElement) {
        audioElement.play();
    }
});
soundInput.addEventListener("change", (e) => {
    Array.from(soundInput.children).forEach((option) => {
        if (option.innerHTML === soundInput.value) {
            option.setAttribute("selected", "selected");
        }
    });
    runSoundElement.classList.remove("not-played");
    runSoundElement.innerHTML = "pause";
    getAudio(soundInput.value);
    if (audioElement) {
        audioElement.play();
    }
    audioElement.addEventListener("ended", () => {
        runSoundElement.classList.toggle("not-played");
        runSoundElement.innerHTML = "play_arrow";
        return;
    });
});
finshPopupOkBtn.addEventListener("click", (e) => {
    finishPopupElement.classList.remove("opened");
    if (audioElement) {
        audioElement.pause();
    }
    addremoveblur(finishPopupElement);
    alarmStatusElement.innerHTML = "Alarm is turned off !";
});
finshPopupCloseBtn.addEventListener("click", (e) => {
    finishPopupElement.classList.remove("opened");
    if (audioElement) {
        audioElement.pause();
    }
    addremoveblur(finishPopupElement);
    alarmStatusElement.innerHTML = "Alarm is turned off !";
});
// start popup

//
//
function inputStatus(type, value) {
    if (type === "sound" && value === "off") {
        for (let i = 0; i <= 3; i++) {
            inputBoxElement[0].children[i].classList.add("off");
            inputBoxElement[0].children[i].classList.remove("on");
            inputBoxElement[0].children[i].style.cssText = " pointer-events: none;opacity: .2;";
        }
    } else if (type === "sound" && value === "on") {
        for (let i = 0; i <= 3; i++) {
            inputBoxElement[0].children[i].classList.add("on");
            inputBoxElement[0].children[i].classList.remove("off");
            inputBoxElement[0].children[i].style.cssText = " pointer-events: auto;opacity: 1;";
        }
    } else if (type === "message" && value === "off") {
        inputBoxElement[1].children[0].classList.add("off");
        inputBoxElement[1].children[0].classList.remove("on");
        inputBoxElement[1].children[0].style.cssText = " pointer-events: none;opacity: .2;";
    } else if (type === "message" && value === "on") {
        inputBoxElement[1].children[0].classList.add("on");
        inputBoxElement[1].children[0].classList.remove("off");
        inputBoxElement[1].children[0].style.cssText = " pointer-events: auto;opacity: 1;";
    }
}
function getAudio(value) {
    audioElement.pause();
    if (value == "Tone") {
        audioElement.src = "/audio/tone.wav";
    } else if (value == "Beep") {
        audioElement.src = "/audio/beep.wav";
    } else if (value == "Battlesip") {
        audioElement.src = "/audio/battleship.wav";
    } else if (value == "Rain") {
        audioElement.src = "/audio/rain.wav";
    } else if (value == "Thunder") {
        audioElement.src = "/audio/thunder.wav";
    } else if (value == "Birds") {
        audioElement.src = "/audio/bird.wav";
    }

    audioToLocalSotrage(value);
}
function repeatSound() {
    audioElement.addEventListener("ended", () => {
        audioElement.play();
    });
    audioElement.play();
}
function audioToLocalSotrage(AudioName) {
    window.localStorage.setItem("audio", AudioName);
}
if (window.localStorage.getItem("audio")) {
    getAudio(window.localStorage.getItem("audio"));
}

function startAnimation(duration) {
    animationSpanElements.forEach((span) => {
        if (turnOnBtn.classList.contains("animation-started") === false) {
            span.style.animationDuration = `${duration / 4}s`;
            span.style.animationDelay = `${spanAnimationDelay}s`;
            spanAnimationDelay += duration / 4;
            span.style.animationPlayState = "running";
        } else {
            span.style.animationPlayState = "running";
        }
    });
}
function stopAnimation() {
    animationSpanElements.forEach((span) => {
        span.style.animationPlayState = "paused";
    });
}
//stopAnimation function end
//hide btns start
function hideBtns(btn1) {
    btn1.style.display = "none";
}
//hide btns start

//show btns end
function showBtns(btn1) {
    btn1.style.display = "flex";
}
//show btns end

function addremoveblur(element) {
    const mainContainer = document.querySelector(".main .container");
    if (element.classList.contains("opened")) {
        const overlay = document.createElement("div");
        overlay.classList.add("overlay");
        mainContainer.appendChild(overlay);
    } else {
        const overlay = document.querySelector(".overlay");
        mainContainer.removeChild(overlay);
    }
}
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
let a = new Date();
let b = new Date();
b.setHours(15);
b.setMinutes(46);
b.setSeconds(0);
if (
    b < a ||
    (b == a && b.getMinutes() < a.getMinutes()) ||
    (b == a && b.getMinutes() == a.getMinutes() && b.getSeconds() < a.getSeconds())
) {
    b.setDate(b.getDate() + 1);
}
function countdownTimer(endDate) {
    const now = new Date().getTime();
    remainingTime = endDate - now;
    seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (hours <= 9) {
        hours = "0" + hours;
    }
    if (minutes <= 9) {
        minutes = "0" + minutes;
    }
    if (seconds <= 9) {
        seconds = "0" + seconds;
    }
    alarmStatusElement.innerHTML = `Alarm Will Turn Off in ${hours}:${minutes}:${seconds}`;
    deffCounter = setInterval(() => {
        const now = new Date().getTime();
        remainingTime = endDate - now;
        if (chossedTime <= new Date()) {
            clearInterval(deffCounter);
            finishPopupElement.classList.add("opened");
            addremoveblur(finishPopupElement);
            getAudio(soundInput.value);
            hideBtns(turnOffBtn);
            showBtns(turnOnBtn);
            alarmStatusElement.innerHTML = "Alarm is turned off !";
            alarmStatusElement.classList.add("off");
            alarmStatusElement.classList.remove("on");
            localDayElement.classList.remove("alarm-on");
            localTimeElement.classList.remove("alarm-on");
            alarTimeElement.classList.remove("alarm-on");
            editBtn.style.cssText = " pointer-events: auto;opacity: 1;";
            turnOnBtn.style.cssText = " pointer-events: none;opacity: .3;";
            if (soundInput.classList.contains("on")) {
                if (audioElement) {
                    audioElement.play();
                }
            }
            if (checkSoundElement.checked) {
                repeatSound();
            }
            return;
        }
        seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
        minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        if (hours <= 9) {
            hours = "0" + hours;
        }
        if (minutes <= 9) {
            minutes = "0" + minutes;
        }
        if (seconds <= 9) {
            seconds = "0" + seconds;
        }
        alarmStatusElement.innerHTML = `Alarm Will Turn Off in ${hours}:${minutes}:${seconds}`;
    }, 1000);
}
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
