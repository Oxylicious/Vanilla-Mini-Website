// HTML DOM Elements
const cards:{[key:string]: HTMLElement} = {
    register_card: document.getElementById("register-card") as HTMLElement,
    login_card: document.getElementById("login-card") as HTMLElement
};

const buttons: {[key:string]: HTMLButtonElement} = {
    register_button: document.getElementById("register-prompt") as HTMLButtonElement,
    login_button: document.getElementById("login-prompt") as HTMLButtonElement,
    exit_register: document.getElementById("exit-register") as HTMLButtonElement,
    exit_login: document.getElementById("exit-login") as HTMLButtonElement
};

const forms: {[key:string]: HTMLFormElement} = {
    register_form: document.getElementById("register-form") as HTMLFormElement,
    login_form: document.getElementById("login-form") as HTMLFormElement
};

// Strong Type
type cardID = keyof typeof cards; // Keyof (key in object array)

// Helper function
function formsHelper(pageID:cardID) {
    for(const key in cards) {
        cards[key]!.style.display = (key === pageID) ? "block" : "none";
    }
}

function exitFunction() {
    for(const key in cards) {
        cards[key]!.style.display = "none";
    }
}

// Interactable Elements
buttons["register_button"]?.addEventListener("click", () => {
    formsHelper("register_card");
});

buttons["login_button"]?.addEventListener("click", () => {
    formsHelper("login_card");
});

buttons["exit_register"]?.addEventListener("click", () => {
    exitFunction();
});

buttons["exit_login"]?.addEventListener("click", () => {
    exitFunction();
});

forms["register_form"]?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const registerData = new FormData(forms["register_form"]);
    const registerEmail = registerData.get("register-email") as string;
    const registerPass = registerData.get("register-password") as string;

    if (registerPass.length < 8 ) {
        return alert("The password should be 8 characters above!");
    }

    const registerJSON:{[key:string]: string} = {
        email: registerEmail,
        password:registerPass
    };

    try {
        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(registerJSON)
        });

        const dataBackend = await response.json();

        if (dataBackend["status"] === "REG_PASS") {
            alert("Registration Success!");
            exitFunction();
        } else if (dataBackend["status"] === "REG_FAIL") {
            alert("Registration Failed");
        } else if (dataBackend["status"] === "EMAIL_EXIST") {
            alert("The Email already exist!");
        }

    } catch (err) {
        alert("Server Not responding\n" + (err as Error).message);
    }
});

forms["login_form"]?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const loginData = new FormData(forms["login_form"]);
    const loginEmail = loginData.get("login-email") as string;
    const loginPassword = loginData.get("login-password") as string;
    const loginJSON:{[key:string]: string} = {
        email: loginEmail,
        password: loginPassword
    }
    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(loginJSON)
        });

        const dataBackend = await response.json();

        if(dataBackend["status"] === "LOGIN_PASS") {
            window.location.href = "Subpages/MainPage/MainPage.html";
        } else if(dataBackend["status"] === "LOGIN_FAIL") {
            alert("Incorrect Password!");
        } else if(dataBackend["status"] === "LOGIN_SERVER_FAIL") {
            alert("Server Fail!");
        } else if(dataBackend["status"] === "EMAIL_NOT_EXIST") {
            alert("Incorrect Email or not Found!");
        }

    } catch (err) {
        alert("Server Not responding\n" + (err as Error).message);
    }
});