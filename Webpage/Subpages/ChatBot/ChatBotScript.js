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
var _a, _b;
var _this = this;
var buttons = {
    homeButton: document.getElementById("home-button"),
    sendButton: document.getElementById("send-button")
};
var outputBoxes = {
    user_output: document.getElementById("user-output"),
    chatbot_output: document.getElementById("chatbot-output")
};
var inputUser = document.getElementById("reply-input");
// Typewriter Effect
function typeMessage(element, text, delay) {
    if (delay === void 0) { delay = 30; }
    element.textContent = "";
    var i = 0;
    var interval = setInterval(function () {
        element.textContent += text[i];
        i++;
        if (i >= text.length)
            clearInterval(interval);
    }, delay);
}
inputUser.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        buttons["sendButton"].click();
    }
});
(_a = buttons["homeButton"]) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    window.location.href = "../MainPage/MainPage.html";
});
(_b = buttons["sendButton"]) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
    var inputData, response, chatbotReply, chatbotMessage, err_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                inputData = inputUser.value.trim();
                if (inputData !== "") {
                    outputBoxes["user_output"].textContent = inputData;
                    inputUser.value = "";
                    outputBoxes["chatbot_output"].textContent = "OxyBot is typing JAJAJ 💬...";
                }
                else {
                    return [2 /*return*/]; // Avoiding the empty response
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch("https://openrouter.ai/api/v1/chat/completions", {
                        method: "POST",
                        headers: {
                            "Authorization": "Bearer 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",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "model": "meta-llama/llama-3.3-70b-instruct:free",
                            "messages": [
                                {
                                    "role": "system",
                                    "content": "You are OxyBot 🤖, be nice and friendly, but also a chill broski to anyone."
                                },
                                {
                                    "role": "user",
                                    "content": inputData
                                }
                            ]
                        })
                    })];
            case 2:
                response = _c.sent();
                if (!response.ok) {
                    throw new Error("HTTP ".concat(response.status, " - ").concat(response.statusText));
                }
                return [4 /*yield*/, response.json()];
            case 3:
                chatbotReply = _c.sent();
                chatbotMessage = ((_b = (_a = chatbotReply === null || chatbotReply === void 0 ? void 0 : chatbotReply.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) || "OxyBot couldn't think... BEEP BOOP! 🤖🔃";
                typeMessage(outputBoxes["chatbot_output"], chatbotMessage);
                return [3 /*break*/, 5];
            case 4:
                err_1 = _c.sent();
                alert("OxyBot not responding...\n" + err_1.message);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
