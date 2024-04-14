let area = document.querySelector(".upload-area");
let uploadAreaChilds = document.querySelector(".upload-area-childs");
let uploadAreaUpdated = document.querySelector(".upload-area-updated");
let outputAreaChilds = document.querySelector(".output-area-childs");
let outputArea = document.querySelector(".output-area");
let audioPlayer = document.getElementById("audio-player");
let outputPreview = document.getElementById("outputArea");
let button = document.getElementById("generate-captions");
let copyButton = document.getElementById("copyButton");
let loader = document.querySelector(".spinner");
let uploadAnotherButton = document.getElementById("upload-another");
let audioFile;

function resizeOutputArea() {
  var outputArea = document.getElementById("outputArea");
  outputArea.style.height = "auto";
  outputArea.style.height = outputArea.scrollHeight + "px";
}

function hideElement(element) {
  element.classList.add("hide");
}

function showElement(element) {
  element.classList.remove("hide");
}

function copyToClipboard() {
  var outputArea = document.getElementById("outputArea");
  var range = document.createRange();
  range.selectNode(outputArea);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
  var copyButton = document.getElementById("copyButton");
  copyButton.textContent = "Copied!";
  setTimeout(function () {
    copyButton.textContent = "Copy to Clipboard";
  }, 1500); // Reset button text after 1.5 seconds
}

function updateUploadText(text) {
  uploadAreaUpdated.textContent = text;
  showElement(uploadAreaUpdated);
  hideElement(uploadAreaChilds);
}

function makeButtonInProgress() {
  button.setAttribute("disabled", "true");
  button.textContent = "Generating text...";
  button.classList.add("button-progress");
}

function removeButtonFromProgress() {
  button.removeAttribute("disabled");
  button.textContent = "Submit";
  button.classList.remove("button-progress");
}

function displayCaptions(caption) {
  console.log(caption);
  outputAreaChilds.textContent = caption;
  outputPreview.classList.remove("hide");
  copyButton.classList.remove("hide");
  outputAreaChilds.before(audioPlayer);
  showElement(uploadAnotherButton);
  hideElement(button);
}

function loadAudioPlayer() {
  audioPlayer.src = URL.createObjectURL(audioFile);
  audioPlayer.classList.remove("hide");
}

function showLoader() {
  loader.classList.remove("hide");
}

function hideLoader() {
  loader.classList.add("hide");
}

function resetToDefault() {
  hideElement(audioPlayer);
  hideElement(outputArea);
  hideElement(uploadAreaUpdated);
  hideElement(copyButton);
  hideElement(uploadAnotherButton);
  showElement(area);
  showElement(uploadAreaChilds);
  showElement(button);
}

// Function to fetch captions from backend
async function fetchCaptions(audioBlob) {
  // let key = document.getElementById("key").value;

  const formData = new FormData();
  formData.append("audio", audioBlob);
  // formData.append("key", key);
  makeButtonInProgress();
  showElement(loader);
  hideElement(area);
  try {
    const response = await fetch("http://localhost:8080/audio", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch captions");
    }
    const responseJson = await response.json();
    displayCaptions(responseJson.text);
  } catch (error) {
    console.error(error.message);
  } finally {
    removeButtonFromProgress();
    hideElement(loader);
  }
}

area.addEventListener("dragover", (event) => {
  event.stopPropagation();
  event.preventDefault();
  event.dataTransfer.dropEffect = "copy";
});

area.addEventListener("drop", (event) => {
  event.stopPropagation();
  event.preventDefault();
  let files = event.dataTransfer.files;
  audioFile = files[0];
  loadAudioPlayer();
  updateUploadText(audioFile.name);
});

area.addEventListener("click", () => {
  let input = document.createElement("input");
  input.name = "audio";
  input.type = "file";
  input.onchange = (e) => {
    audioFile = e.target.files[0];
    updateUploadText(audioFile.name);
    loadAudioPlayer();
  };
  input.click();
});

uploadAnotherButton.addEventListener("click", () => resetToDefault());

document.getElementById("generate-captions").addEventListener("click", () => {
  fetchCaptions(audioFile);
});
