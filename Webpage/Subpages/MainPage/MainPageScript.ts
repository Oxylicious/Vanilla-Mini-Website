const buttons:{[key:string]: HTMLButtonElement} = {
    about_button: document.getElementById("about-button") as HTMLButtonElement,
    logout_button: document.getElementById("logout-button") as HTMLButtonElement,
    exit_about_button: document.getElementById("exit-about-button") as HTMLButtonElement
};

const mainButtons:{[key:string]: HTMLElement} = {
    calculatorButton: document.getElementById("calc-button") as HTMLElement,
    chatbotButton: document.getElementById("ai-button") as HTMLElement,
    uploadButton: document.getElementById("upload-button") as HTMLElement
};

// SFX
const hover_sound = new Audio("Assets/SFX/hover.mp3");
hover_sound.volume = 0.7;

for(const key in buttons) {
    buttons[key]?.addEventListener("mouseenter", () => {
        hover_sound.currentTime = 0;
        hover_sound.play();
    });
}

for(const key in mainButtons) {
    mainButtons[key]?.addEventListener("mouseenter", () => {
        hover_sound.currentTime = 0;
        hover_sound.play();
    });
}

const about_card = document.getElementById("about-card") as HTMLElement;
buttons["about_button"]?.addEventListener("click", () => {
    let action:boolean = false;

    if (!action) {
        about_card.style.display = "block";
    } else {
        about_card.style.display = "none";
    }

});

buttons["exit_about_button"]?.addEventListener("click", () => {
    about_card.style.display = "none";
});

buttons["logout_button"]?.addEventListener("click", () => {
    window.location.href = "../../Account_Authentication.html";
});

mainButtons["calculatorButton"]?.addEventListener("click", () => {
    // window.location.href = "../Calculator/Calculator.html";
    window.open("https://www.desmos.com/scientific");
});

mainButtons["chatbotButton"]?.addEventListener("click", () => {
    window.location.href = "../ChatBot/ChatBot.html";
});

mainButtons["uploadButton"]?.addEventListener("click", () => {
    window.location.href = "../UploadImage/UploadImage.html";
});