let themeBtn = document.querySelector(".theme-btn");
let menuBtn = document.querySelector(".menu-btn");
let navListElement = document.querySelector(".nav-list");
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
menuBtn.addEventListener("click", () => {
    navListElement.classList.toggle("open");
    if (navListElement.classList.contains("open")) {
        document.querySelector(".main .container").style.filter = "blur(10px)";
        document.querySelector(".main .container").style.pointerEvents = "none";
    } else {
        document.querySelector(".main .container").style.filter = "none";
        document.querySelector(".main .container").style.pointerEvents = "auto";
    }
    menuBtn.firstElementChild.innerHTML = "close";
    if (menuBtn.classList.contains("close")) {
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

function swapTheme() {
    if (themeBtn.classList.contains("dark-theme")) {
        changeToLightTheme();
        addThemeToLocalStorage("light");
    } else {
        changeToDarkTheme();
        addThemeToLocalStorage("dark");
    }
}

// theme local storage start
function addThemeToLocalStorage(theme) {
    window.localStorage.setItem("theme", theme);
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
let emojiElements = document.querySelectorAll(".experience .emojis span");
emojiElements.forEach((span) => {
    span.classList.remove("checked");
    span.addEventListener("click", (e) => {
        emojiElements.forEach((span) => {
            span.style.color = "";
            span.classList.remove("checked");
        });
        span.classList.add("checked");
        if (window.localStorage.getItem("settings-color")) {
            span.style.color = window.localStorage.getItem("settings-color");
        }
    });
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
