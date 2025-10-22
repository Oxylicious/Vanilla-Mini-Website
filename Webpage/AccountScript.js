var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a, _b, _c, _d, _e, _f;
var _this = this;
// HTML DOM Elements
var cards = {
    register_card: document.getElementById("register-card"),
    login_card: document.getElementById("login-card")
};
var buttons = {
    register_button: document.getElementById("register-prompt"),
    login_button: document.getElementById("login-prompt"),
    exit_register: document.getElementById("exit-register"),
    exit_login: document.getElementById("exit-login")
};
var forms = {
    register_form: document.getElementById("register-form"),
    login_form: document.getElementById("login-form")
};
// Helper function
function formsHelper(pageID) {
    for (var key in cards) {
        cards[key].style.display = (key === pageID) ? "block" : "none";
    }
}
function exitFunction() {
    for (var key in cards) {
        cards[key].style.display = "none";
    }
}
// Interactable Elements
(_a = buttons["register_button"]) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    formsHelper("register_card");
});
(_b = buttons["login_button"]) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    formsHelper("login_card");
});
(_c = buttons["exit_register"]) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () {
    exitFunction();
});
(_d = buttons["exit_login"]) === null || _d === void 0 ? void 0 : _d.addEventListener("click", function () {
    exitFunction();
});
(_e = forms["register_form"]) === null || _e === void 0 ? void 0 : _e.addEventListener("submit", function (event) { return __awaiter(_this, void 0, void 0, function () {
    var registerData, registerEmail, registerPass, registerJSON, response, dataBackend, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                event.preventDefault();
                registerData = new FormData(forms["register_form"]);
                registerEmail = registerData.get("register-email");
                registerPass = registerData.get("register-password");
                if (registerPass.length < 8) {
                    return [2 /*return*/, alert("The password should be 8 characters above!")];
                }
                registerJSON = {
                    email: registerEmail,
                    password: registerPass
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch("http://localhost:3000/register", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(registerJSON)
                    })];
            case 2:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 3:
                dataBackend = _a.sent();
                if (dataBackend["status"] === "REG_PASS") {
                    alert("Registration Success!");
                    exitFunction();
                }
                else if (dataBackend["status"] === "REG_FAIL") {
                    alert("Registration Failed");
                }
                else if (dataBackend["status"] === "EMAIL_EXIST") {
                    alert("The Email already exist!");
                }
                return [3 /*break*/, 5];
            case 4:
                err_1 = _a.sent();
                alert("Server Not responding\n" + err_1.message);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
(_f = forms["login_form"]) === null || _f === void 0 ? void 0 : _f.addEventListener("submit", function (event) { return __awaiter(_this, void 0, void 0, function () {
    var loginData, loginEmail, loginPassword, loginJSON, response, dataBackend, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                event.preventDefault();
                loginData = new FormData(forms["login_form"]);
                loginEmail = loginData.get("login-email");
                loginPassword = loginData.get("login-password");
                loginJSON = {
                    email: loginEmail,
                    password: loginPassword
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch("http://localhost:3000/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(loginJSON)
                    })];
            case 2:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 3:
                dataBackend = _a.sent();
                if (dataBackend["status"] === "LOGIN_PASS") {
                    window.location.href = "Subpages/MainPage/MainPage.html";
                }
                else if (dataBackend["status"] === "LOGIN_FAIL") {
                    alert("Incorrect Password!");
                }
                else if (dataBackend["status"] === "LOGIN_SERVER_FAIL") {
                    alert("Server Fail!");
                }
                else if (dataBackend["status"] === "EMAIL_NOT_EXIST") {
                    alert("Incorrect Email or not Found!");
                }
                return [3 /*break*/, 5];
            case 4:
                err_2 = _a.sent();
                alert("Server Not responding\n" + err_2.message);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
