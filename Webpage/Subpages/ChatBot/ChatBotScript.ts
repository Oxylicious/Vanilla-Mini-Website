const buttons:{[key:string]: HTMLButtonElement} = {
    homeButton: document.getElementById("home-button") as HTMLButtonElement,
    sendButton: document.getElementById("send-button") as HTMLButtonElement
};

const outputBoxes:{[key:string]: HTMLElement} = {
    user_output: document.getElementById("user-output") as HTMLElement,
    chatbot_output: document.getElementById("chatbot-output") as HTMLElement
};
const inputUser = document.getElementById("reply-input") as HTMLTextAreaElement;

// Typewriter Effect
function typeMessage(element: HTMLElement, text: string, delay = 30) {
    element.textContent = "";
    let i = 0;
    const interval = setInterval(() => {
        element.textContent += text[i];
        i++;
        if (i >= text.length) clearInterval(interval);
    }, delay);
}

inputUser.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            buttons["sendButton"]!.click();
        }
});

buttons["homeButton"]?.addEventListener("click", () => {
    window.location.href = "../MainPage/MainPage.html";
});

buttons["sendButton"]?.addEventListener("click", async () => {
    const inputData = inputUser.value.trim() as string;

    if (inputData !== "") {
        outputBoxes["user_output"]!.textContent = inputData;
        inputUser.value = "";
        outputBoxes["chatbot_output"]!.textContent = "OxyBot is typing JAJAJ 💬...";
    } else {
        return; // Avoiding the empty response
    }
    
    try {
        // API FETCH
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer < API key here! >",
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
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status} - ${response.statusText}`);
        }

        const chatbotReply = await response.json();
        const chatbotMessage = chatbotReply?.choices[0]?.message?.content || "OxyBot couldn't think... BEEP BOOP! 🤖🔃";
        typeMessage(outputBoxes["chatbot_output"]!, chatbotMessage);
    } catch(err) {
        alert("OxyBot not responding...\n" + (err as Error).message);
    }
});
