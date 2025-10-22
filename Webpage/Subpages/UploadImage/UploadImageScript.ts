const forms:{[key:string]: HTMLFormElement} = {
    fileUpload: document.getElementById("upload-form") as HTMLFormElement
};
const outputDisplay = document.getElementById("upload-output") as HTMLElement;
const fileInputData = document.getElementById("file-inputID") as HTMLInputElement;
const fileInputLabel = document.getElementById("upload-label") as HTMLLabelElement;
const homeButton = document.getElementById("home-button") as HTMLButtonElement;

// Helper Function
function fileReader(fileData:any) {

    // reader file
    const fileReader = new FileReader();

    // if file is image
    if (fileData.type.startsWith("image/")) {
        // element creation for the image
        fileReader.onload = (imgData) => {
            outputDisplay.innerHTML = "";
            const image = document.createElement("img");
            image.src = imgData.target?.result as string;
            image.alt = "upload preview";
            outputDisplay.appendChild(image);
        };
        fileReader.readAsDataURL(fileData);
    }

    // if file is text
    else if (fileData.type.startsWith("text/")) {
        fileReader.onload = (txtData) => {
            outputDisplay.innerHTML = `<pre>${txtData.target?.result}</pre>`
        };
        fileReader.readAsText(fileData);
    }

    // Music Files
    else if (fileData.type.startsWith("audio/")) {
        outputDisplay.innerHTML = `<span style="font-size: 0.5em; text-align: center;">Music🎵: ${fileData.name}</span><br>`;
        const audioPlayer = document.createElement("audio"); // Creates the element for Audio
        audioPlayer.controls = true;
        audioPlayer.src = URL.createObjectURL(fileData) as string;
        outputDisplay.appendChild(audioPlayer); // Appends the Element in the DOM

        // ========================================== Quality Check ==========================================
        // audioPlayer.onplay = () => {
        //     const context = new AudioContext({ sampleRate: 192000 }); // or 48000 if your files use that
        //     const source = context.createMediaElementSource(audioPlayer);
        //     source.connect(context.destination);

        //     // required to "resume" context after user gesture
        //     if (context.state === "suspended") {
        //     context.resume();
        //     }
        //     console.log('Actual playback rate:', context.sampleRate);
        // };
        // ===================================================================================================
    }

    // Other files
    else {
        outputDisplay.innerHTML = `
            <p style="font-size: 0.5em;">File ${fileData.name}</p>
            <p style="font-size: 0.5em;">Type: ${fileData.type || "Unknown"}</p>
            <p style="font-size: 0.5em;">Size: ${fileData.size}</p>
        `;
    }
}

// DOM Functionality
fileInputData.addEventListener("change", (event) => {
    const fileName = (fileInputData.files![0])!.name;
    fileInputLabel.textContent = `File Chosen 🗃️: ${fileName}`;
});

forms["fileUpload"]?.addEventListener("submit", (event) => {
    event.preventDefault();
    
    // Grabbing the File from the input
    const fileData = fileInputData.files![0];

    // Make sure the File is not empty
    if (!fileData) {
        return outputDisplay.textContent = "The file is empty!";
    } else {
        fileReader(fileData);
    }    
});

homeButton.addEventListener("click", () => {
    window.location.href = "../MainPage/MainPage.html";
});


