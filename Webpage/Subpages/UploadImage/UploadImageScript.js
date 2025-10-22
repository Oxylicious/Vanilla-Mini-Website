var _a;
var forms = {
    fileUpload: document.getElementById("upload-form")
};
var outputDisplay = document.getElementById("upload-output");
var fileInputData = document.getElementById("file-inputID");
var fileInputLabel = document.getElementById("upload-label");
var homeButton = document.getElementById("home-button");
// Helper Function
function fileReader(fileData) {
    // reader file
    var fileReader = new FileReader();
    // if file is image
    if (fileData.type.startsWith("image/")) {
        // element creation for the image
        fileReader.onload = function (imgData) {
            var _a;
            outputDisplay.innerHTML = "";
            var image = document.createElement("img");
            image.src = (_a = imgData.target) === null || _a === void 0 ? void 0 : _a.result;
            image.alt = "upload preview";
            outputDisplay.appendChild(image);
        };
        fileReader.readAsDataURL(fileData);
    }
    // if file is text
    else if (fileData.type.startsWith("text/")) {
        fileReader.onload = function (txtData) {
            var _a;
            outputDisplay.innerHTML = "<pre>".concat((_a = txtData.target) === null || _a === void 0 ? void 0 : _a.result, "</pre>");
        };
        fileReader.readAsText(fileData);
    }
    // Music Files
    else if (fileData.type.startsWith("audio/")) {
        outputDisplay.innerHTML = "<span style=\"font-size: 0.5em; text-align: center;\">Music\uD83C\uDFB5: ".concat(fileData.name, "</span><br>");
        var audioPlayer = document.createElement("audio"); // Creates the element for Audio
        audioPlayer.controls = true;
        audioPlayer.src = URL.createObjectURL(fileData);
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
        outputDisplay.innerHTML = "\n            <p style=\"font-size: 0.5em;\">File ".concat(fileData.name, "</p>\n            <p style=\"font-size: 0.5em;\">Type: ").concat(fileData.type || "Unknown", "</p>\n            <p style=\"font-size: 0.5em;\">Size: ").concat(fileData.size, "</p>\n        ");
    }
}
// DOM Functionality
fileInputData.addEventListener("change", function (event) {
    var fileName = (fileInputData.files[0]).name;
    fileInputLabel.textContent = "File Chosen \uD83D\uDDC3\uFE0F: ".concat(fileName);
});
(_a = forms["fileUpload"]) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) {
    event.preventDefault();
    // Grabbing the File from the input
    var fileData = fileInputData.files[0];
    // Make sure the File is not empty
    if (!fileData) {
        return outputDisplay.textContent = "The file is empty!";
    }
    else {
        fileReader(fileData);
    }
});
homeButton.addEventListener("click", function () {
    window.location.href = "../MainPage/MainPage.html";
});
