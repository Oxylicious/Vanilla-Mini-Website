var _a, _b, _c, _d, _e, _f, _g, _h;
var buttons = {
    about_button: document.getElementById("about-button"),
    logout_button: document.getElementById("logout-button"),
    exit_about_button: document.getElementById("exit-about-button")
};
var mainButtons = {
    calculatorButton: document.getElementById("calc-button"),
    chatbotButton: document.getElementById("ai-button"),
    uploadButton: document.getElementById("upload-button")
};
// SFX
var hover_sound = new Audio("Assets/SFX/hover.mp3");
hover_sound.volume = 0.7;
for (var key in buttons) {
    (_a = buttons[key]) === null || _a === void 0 ? void 0 : _a.addEventListener("mouseenter", function () {
        hover_sound.currentTime = 0;
        hover_sound.play();
    });
}
for (var key in mainButtons) {
    (_b = mainButtons[key]) === null || _b === void 0 ? void 0 : _b.addEventListener("mouseenter", function () {
        hover_sound.currentTime = 0;
        hover_sound.play();
    });
}
var about_card = document.getElementById("about-card");
(_c = buttons["about_button"]) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () {
    var action = false;
    if (!action) {
        about_card.style.display = "block";
    }
    else {
        about_card.style.display = "none";
    }
});
(_d = buttons["exit_about_button"]) === null || _d === void 0 ? void 0 : _d.addEventListener("click", function () {
    about_card.style.display = "none";
});
(_e = buttons["logout_button"]) === null || _e === void 0 ? void 0 : _e.addEventListener("click", function () {
    window.location.href = "../../Account_Authentication.html";
});
(_f = mainButtons["calculatorButton"]) === null || _f === void 0 ? void 0 : _f.addEventListener("click", function () {
    // window.location.href = "../Calculator/Calculator.html";
    window.open("https://www.desmos.com/scientific");
});
(_g = mainButtons["chatbotButton"]) === null || _g === void 0 ? void 0 : _g.addEventListener("click", function () {
    window.location.href = "../ChatBot/ChatBot.html";
});
(_h = mainButtons["uploadButton"]) === null || _h === void 0 ? void 0 : _h.addEventListener("click", function () {
    window.location.href = "../UploadImage/UploadImage.html";
});
