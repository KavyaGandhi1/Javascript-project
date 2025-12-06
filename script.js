
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const saveBtn = document.getElementById("save-btn");
const textArea = document.getElementById("text-area");
const notesList = document.getElementById("notes-list");

let recognition = null;
let isListening = false;
let notes = [];


if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = true;      
  recognition.continuous = true;          


  recognition.addEventListener("result", (event) => {
    let transcript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const result = event.results[i];
      transcript += result[0].transcript;
    }
    textArea.value = transcript;
  });

  
  recognition.addEventListener("end", () => {
    isListening = false;
    toggleButtons();
  });

  recognition.addEventListener("error", (event) => {
    console.error("Speech recognition error:", event.error);
    isListening = false;
    toggleButtons();
    alert("Speech recognition error: " + event.error);
  });
} else {
  alert(
    "SpeechRecognition is not supported in this browser. Try the latest Chrome or Edge."
  );
  startBtn.disabled = true;
  stopBtn.disabled = true;
}


startBtn.addEventListener("click", () => {
  if (!recognition || isListening) return;
  recognition.start();
  isListening = true;
  toggleButtons();
});


stopBtn.addEventListener("click", () => {
  if (!recognition || !isListening) return;
  recognition.stop();

});


saveBtn.addEventListener("click", () => {
  const content = textArea.value.trim();
  if (!content) {
    alert("Pehle kuch bolo to sahi.... :)");
    return;
  }
  notes.push(content);
  renderNotes();
  textArea.value = "";
});


function toggleButtons() {
  startBtn.disabled = isListening;
  stopBtn.disabled = !isListening;
}

function renderNotes() {
  notesList.innerHTML = "";
  notes.forEach((noteText, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${noteText}`;
    notesList.appendChild(li);
  });
}
