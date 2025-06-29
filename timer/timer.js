let hourElement = document.querySelector(".hours");
let hourElementSpan = document.querySelector(".hours-span");
let secondsElement = document.querySelector(".seconds");
let minutesElement = document.querySelector(".minutes");
let editBtn = document.querySelector(".edit");
let startBtn = document.querySelector(".start");
let resetBtn = document.querySelector(".reset");
let stopBtn = document.querySelector(".stop");
let themeBtn = document.querySelector(".theme-btn");
let menuBtn = document.querySelector(".menu-btn");
let navListElement = document.querySelector(".nav-list");
let soundInput = document.querySelector(".main-options .sound select");
let popupElement = document.querySelector(".edit-pop-up");
let popupCancelBtn = document.querySelector(".edit-pop-up .bottom .cancel");
let popupStartBtn = document.querySelector(".edit-pop-up .bottom  .popup-start");
let closePopup = document.querySelector(".edit-pop-up .top span");
let soundActiveBtn = document.querySelector(".edit-pop-up .main-timer-edit .sound .btn");
let messageActiveBtn = document.querySelector(".edit-pop-up .main-timer-edit .message .btn");

let inputBoxElement = document.querySelectorAll(".main-options .input-box");
let messageInput = document.querySelector(".input-text");
let reloaded = false;

let editHoursInput = document.querySelector(".hours select");
let editMinutesInput = document.querySelector(".minutes select");
let editSecondsInput = document.querySelector(".seconds select");
let runSoundElement = document.querySelector(".main-options .sound  .material-symbols-outlined");
let checkSoundElement = document.querySelector(".main-options .sound  .checkbox");
let checkTextSoundElement = document.querySelector(".main-options .sound  .checkbox-text");

let audioElement = new Audio("/audio/tone.wav");
let choosedAudio;

//
let counter;
let spanAnimationDelay = 0;
let animationSpanElements = document.querySelectorAll(".progress span");

let choseedSecondElement = secondsElement.innerHTML;
let choseedMinutesElement = minutesElement.innerHTML;
let choseedHoursElement = hourElement.innerHTML;
let choseedMessage = "";
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
//

let TimerTime = {
    hValue: hourElement.innerHTML,
    mValue: minutesElement.innerHTML,
    sValue: secondsElement.innerHTML,
};
let oldTimerTime = {
    hValue: choseedHoursElement,
    mValue: choseedMinutesElement,
    sValue: choseedSecondElement,
};
//
//
if (hourElement.classList.contains("off")) {
    hourElement.innerHTML = "00";
}
//
//
//   start start btn click
if (startBtn.style.display === "none") {
    editBtn.style.cssText = " pointer-events: none;opacity: .3;";
} else {
    editBtn.style.cssText = " pointer-events: auto;opacity: 1;";
}
startBtn.addEventListener("click", function (e) {
    startTimer();
    hideBtns(startBtn);
    showBtns(stopBtn);
    startAnimation(
        parseInt(hourElement.innerHTML) * 3600 +
            parseInt(minutesElement.innerHTML) * 60 +
            parseInt(secondsElement.innerHTML)
    );
    startBtn.classList.add("animation-started");
    addTimerstartBtnstatusToLocalSotrage("started");
    editBtn.style.cssText = " pointer-events: none;opacity: .3;";
});
//   end start btn click

//   start reset btn click

resetBtn.addEventListener("click", function () {
    clearInterval(counter);
    clearInterval(counter - 1);

    editBtn.style.cssText = " pointer-events: auto;opacity: 1;";
    if (window.localStorage.getItem("oldTimer-time")) {
        let elemnt = JSON.parse(window.localStorage.getItem("oldTimer-time"));
        secondsElement.innerHTML = elemnt.sValue;
        minutesElement.innerHTML = elemnt.mValue;
        hourElement.innerHTML = elemnt.hValue;
        if (hourElement.innerHTML != "00") {
            hourElement.classList.add("on");
            hourElement.classList.remove("off");
            hourElementSpan.classList.remove("off");
            hourElementSpan.classList.add("on");
        }
    }
    hideBtns(stopBtn);
    showBtns(startBtn);
    startBtn.classList.remove("animation-started");
    stopAnimation();
    spanAnimationDelay = 0;
    animationSpanElements.forEach((span) => {
        if (span.parentElement) {
            span.classList.remove("animated-span");
            void span.offsetWidth; // Trigger reflow
            span.classList.add("animated-span");
        }
    });
    startBtn.style.cssText = " pointer-events: auto;opacity: 1;";
});

//   end reset btn click

//   start stop btn click

stopBtn.addEventListener("click", function () {
    clearInterval(counter);
    clearInterval(counter - 1);
    // clearInterval(counter - 2);
    hideBtns(stopBtn);
    showBtns(startBtn);
    stopAnimation();
    addTimerstartBtnstatusToLocalSotrage("Not-started");
    editBtn.style.cssText = " pointer-events: auto;opacity: 1;";
});

//   end stop btn click

// short cut start
document.body.addEventListener("keypress", (event) => {
    if (startBtn.style.display != "none") {
        if (event.key === "s" || event.key === "S" || event.key === " ") {
            startTimer();
            hideBtns(startBtn);
            showBtns(stopBtn);
            startAnimation(
                parseInt(hourElement.innerHTML) * 3600 +
                    parseInt(minutesElement.innerHTML) * 60 +
                    parseInt(secondsElement.innerHTML)
            );
            startBtn.classList.add("animation-started");
            addTimerstartBtnstatusToLocalSotrage("started");
            editBtn.style.cssText = " pointer-events: none;opacity: .3;";
        }
    } else {
        if (event.key === "s" || event.key === "S" || event.key === " ") {
            clearInterval(counter);
            clearInterval(counter - 1);
            // clearInterval(counter - 2);
            hideBtns(stopBtn);
            showBtns(startBtn);
            stopAnimation();
            addTimerstartBtnstatusToLocalSotrage("Not-started");
            editBtn.style.cssText = " pointer-events: auto;opacity: 1;";
        }
    }
    if (event.key === "r" || event.key === "R") {
        clearInterval(counter);
        clearInterval(counter - 1);
        editBtn.style.cssText = " pointer-events: auto;opacity: 1;";
        if (window.localStorage.getItem("oldTimer-time")) {
            let elemnt = JSON.parse(window.localStorage.getItem("oldTimer-time"));
            secondsElement.innerHTML = elemnt.sValue;
            minutesElement.innerHTML = elemnt.mValue;
            hourElement.innerHTML = elemnt.hValue;
            if (hourElement.innerHTML != "00") {
                hourElement.classList.add("on");
                hourElement.classList.remove("off");
                hourElementSpan.classList.remove("off");
                hourElementSpan.classList.add("on");
            }
        }
        hideBtns(stopBtn);
        showBtns(startBtn);
        startBtn.classList.remove("animation-started");
        stopAnimation();
        spanAnimationDelay = 0;
        animationSpanElements.forEach((span) => {
            if (span.parentElement) {
                span.classList.remove("animated-span");
                void span.offsetWidth; // Trigger reflow
                span.classList.add("animated-span");
            }
        });
        startBtn.style.cssText = " pointer-events: auto;opacity: 1;";
    }
});
// short cut end
//   start statTimer function

function startTimer() {
    counter = setInterval(function () {
        if (hourElement.classList.contains("off")) {
            if (secondsElement.innerHTML == "00" && minutesElement.innerHTML == "00") {
                clearInterval(counter);
                hideBtns(stopBtn);
                showBtns(startBtn);
                addTimerTimeToLocalStorage(secondsElement.innerHTML);
                addTimerTimeToLocalStorage(minutesElement.innerHTML);
                addTimerTimeToLocalStorage(hourElement.innerHTML);
                if (soundInput.classList.contains("on")) {
                    if (audioElement) {
                        audioElement.play();
                    }
                }
                editBtn.style.cssText = " pointer-events: auto;opacity: 1;";
                finishPopupElement.classList.add("opened");
                addremoveblur(finishPopupElement);
                if (checkSoundElement.checked) {
                    repeatSound();
                }
                startBtn.style.cssText = " pointer-events: none;opacity: .3;";

                return;
            }
            if (secondsElement.innerHTML == "00" && minutesElement.innerHTML != "00") {
                secondsElement.innerHTML = "60";
                if (parseInt(minutesElement.innerHTML) <= 10) {
                    minutesElement.innerHTML = `0${parseInt(minutesElement.innerHTML) - 1}`;
                } else {
                    minutesElement.innerHTML = parseInt(minutesElement.innerHTML) - 1;
                }
            }

            if (parseInt(secondsElement.innerHTML) <= 10) {
                secondsElement.innerHTML = `0${parseInt(secondsElement.innerHTML) - 1}`;
            } else {
                secondsElement.innerHTML = parseInt(secondsElement.innerHTML) - 1;
            }
            if (parseInt(minutesElement.innerHTML) <= 10) {
                minutesElement.innerHTML = `0${parseInt(minutesElement.innerHTML)}`;
            }
            addTimerTimeToLocalStorage(secondsElement.innerHTML);
            addTimerTimeToLocalStorage(minutesElement.innerHTML);
            addTimerTimeToLocalStorage(hourElement.innerHTML);
        } else if (hourElement.classList.contains("on")) {
            if (hourElement.innerHTML == "00" && secondsElement.innerHTML == "00" && minutesElement.innerHTML == "00") {
                clearInterval(counter);
                hideBtns(stopBtn);
                showBtns(startBtn);
                addTimerTimeToLocalStorage(secondsElement.innerHTML);
                addTimerTimeToLocalStorage(minutesElement.innerHTML);
                addTimerTimeToLocalStorage(hourElement.innerHTML);
                if (soundInput.classList.contains("on")) {
                    if (audioElement) {
                        audioElement.play();
                    }
                }
                editBtn.style.cssText = " pointer-events: auto;opacity: 1;";
                finishPopupElement.classList.add("opened");
                addremoveblur(finishPopupElement);
                if (checkSoundElement.classList.contains("no-repeat")) {
                    repeatSound();
                }
                startBtn.style.cssText = " pointer-events: none;opacity: .3;";
                return;
            }
            if (secondsElement.innerHTML == "00" && minutesElement.innerHTML == "00" && hourElement.innerHTML != "00") {
                minutesElement.innerHTML = "60";
                if (parseInt(hourElement.innerHTML) <= 10) {
                    hourElement.innerHTML = `0${parseInt(hourElement.innerHTML) - 1}`;
                } else {
                    hourElement.innerHTML = parseInt(hourElement.innerHTML) - 1;
                }
            }
            if (secondsElement.innerHTML == "00" && minutesElement.innerHTML == "00" && hourElement.innerHTML != "00") {
                secondsElement.innerHTML = "60";
            }
            if (secondsElement.innerHTML == "00" && minutesElement.innerHTML != "00") {
                secondsElement.innerHTML = "60";
                if (parseInt(minutesElement.innerHTML) <= 10) {
                    minutesElement.innerHTML = `0${parseInt(minutesElement.innerHTML) - 1}`;
                } else {
                    minutesElement.innerHTML = parseInt(minutesElement.innerHTML) - 1;
                }
            }

            if (parseInt(secondsElement.innerHTML) <= 10) {
                secondsElement.innerHTML = `0${parseInt(secondsElement.innerHTML) - 1}`;
            } else {
                secondsElement.innerHTML = parseInt(secondsElement.innerHTML) - 1;
            }
            if (parseInt(minutesElement.innerHTML) <= 10) {
                minutesElement.innerHTML = `0${parseInt(minutesElement.innerHTML)}`;
            }
            if (hourElement.innerHTML == "00") {
                hourElement.classList.add("off");
                hourElement.classList.remove("on");
                hourElementSpan.classList.remove("on");
                hourElementSpan.classList.add("off");
            }
            addTimerTimeToLocalStorage(secondsElement.innerHTML);
            addTimerTimeToLocalStorage(minutesElement.innerHTML);
            addTimerTimeToLocalStorage(hourElement.innerHTML);
        }
    }, 1000);
}

// end statTimer function

//startAnimation function start

function startAnimation(duration) {
    animationSpanElements.forEach((span) => {
        if (startBtn.classList.contains("animation-started") === false) {
            span.style.animationDuration = `${duration / 4}s`;
            span.style.animationDelay = `${spanAnimationDelay}s`;
            spanAnimationDelay += duration / 4;
            span.style.animationPlayState = "running";
        } else {
            span.style.animationPlayState = "running";
        }
    });
}
//startAnimation function start

//stopAnimation function start
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
if (window.localStorage.getItem("theme")) {
    if (window.localStorage.getItem("theme") === "light") {
        changeToLightTheme();
    } else {
        changeToDarkTheme();
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

// theme local storage end

if (window.localStorage.getItem("oldTimer-time")) {
    let elemnt = JSON.parse(window.localStorage.getItem("oldTimer-time"));
    choseedSecondElement = elemnt.sValue;
    choseedMinutesElement = elemnt.mValue;
    choseedHoursElement = elemnt.hValue;
}

function addTimerTimeToLocalStorage(value) {
    if (value == secondsElement.innerHTML) {
        TimerTime.sValue = secondsElement.innerHTML;
    } else if (value == minutesElement.innerHTML) {
        TimerTime.mValue = minutesElement.innerHTML;
    } else {
        TimerTime.hValue = hourElement.innerHTML;
    }
    if (hourElement.classList.contains("off")) {
        oldTimerTime.hValue = "00";
    }
    window.localStorage.setItem("Timer-time", JSON.stringify(TimerTime));
}
if (window.localStorage.getItem("Timer-time")) {
    let elemnt = JSON.parse(window.localStorage.getItem("Timer-time"));
    secondsElement.innerHTML = elemnt.sValue;
    minutesElement.innerHTML = elemnt.mValue;
    hourElement.innerHTML = elemnt.hValue;
    stopAnimation();
    if (window.localStorage.getItem("timer start Btn status") === "started") {
        startTimer();
        hideBtns(startBtn);
        showBtns(stopBtn);
        startBtn.classList.add("stared");
        addTimerstartBtnstatusToLocalSotrage("started");
        startAnimation(
            parseInt(minutesElement.innerHTML) * 3600 +
                parseInt(minutesElement.innerHTML) * 60 +
                parseInt(secondsElement.innerHTML)
        );
    }
}

function addTimerstartBtnstatusToLocalSotrage(status) {
    window.localStorage.setItem("timer start Btn status", status);
}

// Timer time to local storage end
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

//popup start
// edit value

popupStartBtn.addEventListener("click", (e) => {
    secondsElement.innerHTML = editSecondsInput.value;
    minutesElement.innerHTML = editMinutesInput.value;
    hourElement.innerHTML = editHoursInput.value;
    choseedSecondElement = editSecondsInput.value;
    choseedMinutesElement = editMinutesInput.value;
    choseedHoursElement = editHoursInput.value;
    choseedMessage = messageInput.value;
    if (editHoursInput.value == "00") {
        hourElement.classList.remove("on");
        hourElement.classList.add("off");
        hourElementSpan.classList.remove("on");
        hourElementSpan.classList.add("off");
        addHoursStatuToLocalStorage("off");
    } else {
        hourElement.classList.remove("off");
        hourElement.classList.add("on");
        hourElementSpan.classList.remove("off");
        hourElementSpan.classList.add("on");
        addHoursStatuToLocalStorage("on");
    }
    addOldTimeToLocalStorage(choseedSecondElement);
    addOldTimeToLocalStorage(choseedMinutesElement);
    addOldTimeToLocalStorage(choseedHoursElement);
    startBtn.classList.remove("animation-started");
    stopAnimation();
    spanAnimationDelay = 0;
    animationSpanElements.forEach((span) => {
        if (span.parentElement) {
            span.classList.remove("animated-span");
            void span.offsetWidth; // Trigger reflow
            span.classList.add("animated-span");
        }
    });
    startTimer();
    hideBtns(startBtn);
    showBtns(stopBtn);
    startAnimation(
        parseInt(hourElement.innerHTML) * 3600 +
            parseInt(minutesElement.innerHTML) * 60 +
            parseInt(secondsElement.innerHTML)
    );
    startBtn.classList.add("animation-started");
    addTimerstartBtnstatusToLocalSotrage("started");
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
    if (hourElement.classList.contains("on")) {
        finshPopupStartTime.innerHTML = `${choseedHoursElement}:${choseedMinutesElement}:${choseedSecondElement}`;
    } else {
        finshPopupStartTime.innerHTML = `${choseedMinutesElement}:${choseedSecondElement}`;
    }
    if (audioElement) {
        audioElement.pause();
    }
});
getAudio(soundInput.value);

soundInput.addEventListener("change", (e) => {
    getAudio(soundInput.value);
}); // start popup

// cancel popup

popupCancelBtn.addEventListener("click", (e) => {
    popupElement.classList.remove("opened");
    if (audioElement) {
        audioElement.pause();
    }
    addremoveblur(popupElement);
});
// cancel popup

// close popup

editBtn.addEventListener("click", (e) => {
    popupElement.classList.add("opened");
    addremoveblur(popupElement);
});
closePopup.addEventListener("click", (e) => {
    popupElement.classList.remove("opened");
    if (audioElement) {
        audioElement.pause();
    }
    addremoveblur(popupElement);
});
// close popup
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
//
//
//
//

//
//
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

function audioToLocalSotrage(AudioName) {
    window.localStorage.setItem("audio", AudioName);
}
if (window.localStorage.getItem("audio")) {
    getAudio(window.localStorage.getItem("audio"));
}

//
//
// start popup
// selected;
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
//popup end
//finish popup

//finish popup

finshPopupOkBtn.addEventListener("click", (e) => {
    finishPopupElement.classList.remove("opened");
    if (audioElement) {
        audioElement.pause();
    }
    addremoveblur(finishPopupElement);
});
// cancel popup

// close popup

finshPopupResetBtn.addEventListener("click", (e) => {
    clearInterval(counter);
    clearInterval(counter - 1);
    editBtn.style.cssText = " pointer-events: auto;opacity: 1;";
    if (window.localStorage.getItem("oldTimer-time")) {
        let elemnt = JSON.parse(window.localStorage.getItem("oldTimer-time"));
        secondsElement.innerHTML = elemnt.sValue;
        minutesElement.innerHTML = elemnt.mValue;
        hourElement.innerHTML = elemnt.hValue;
    }
    startBtn.classList.remove("animation-started");
    stopAnimation();
    spanAnimationDelay = 0;
    animationSpanElements.forEach((span) => {
        if (span.parentElement) {
            span.classList.remove("animated-span");
            void span.offsetWidth; // Trigger reflow
            span.classList.add("animated-span");
        }
    });
    startTimer();
    hideBtns(startBtn);
    showBtns(stopBtn);
    startAnimation(
        parseInt(hourElement.innerHTML) * 3600 +
            parseInt(minutesElement.innerHTML) * 60 +
            parseInt(secondsElement.innerHTML)
    );
    startBtn.classList.add("animation-started");
    addTimerstartBtnstatusToLocalSotrage("started");
    editBtn.style.cssText = " pointer-events: none;opacity: .3;";
    finishPopupElement.classList.remove("opened");
    if (audioElement) {
        audioElement.pause();
    }
    addremoveblur(finishPopupElement);
});

finshPopupCloseBtn.addEventListener("click", (e) => {
    finishPopupElement.classList.remove("opened");
    if (audioElement) {
        audioElement.pause();
    }
    addremoveblur(finishPopupElement);
});
// close popup
//
function addHoursStatuToLocalStorage(value) {
    window.localStorage.setItem("hours-status", value);
}
if (window.localStorage.getItem("hours-status") === "on") {
    hourElement.classList.remove("off");
    hourElement.classList.add("on");
    hourElementSpan.classList.remove("off");
    hourElementSpan.classList.add("on");
    hourElement.innerHTML = choseedHoursElement;
}
function addOldTimeToLocalStorage(value) {
    if (value == choseedSecondElement) {
        oldTimerTime.sValue = choseedSecondElement;
    } else if (value == choseedMinutesElement) {
        oldTimerTime.mValue = choseedMinutesElement;
    } else {
        oldTimerTime.hValue = choseedHoursElement;
    }

    // if (hourElement.classList.contains("off")) {
    //   oldTimerTime.hValue = "00";
    // }
    window.localStorage.setItem("oldTimer-time", JSON.stringify(oldTimerTime));
} // no-reapeat

checkSoundElement.addEventListener("click", () => {});
function repeatSound() {
    audioElement.addEventListener("ended", () => {
        audioElement.play();
    });
    audioElement.play();
}
//

//
function addremoveblur(element) {
    const mainContainer = document.querySelector(".main .container");
    if (element.classList.contains("opened")) {
        const overlay = document.createElement("div");
        overlay.classList.add("overlay");
        mainContainer.appendChild(overlay);
    } else {
        const overlay = mainContainer.querySelector(".overlay");
        if (overlay) {
            mainContainer.removeChild(overlay);
        }
    }
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
