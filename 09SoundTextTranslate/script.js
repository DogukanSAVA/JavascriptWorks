const message = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"],[name="text"]');
const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");
message.text = options[2].value;

function populateVoices() {
  voices = this.getVoices();
  voicesDropdown.innerHTML = voices
    .filter(voice => voice.lang.includes('en'))
    .map(
      (voice) => `<option value ="${voice.name}">${voice.name}(${voice.lang})`
    )
    .join("");
}

function setVoice(){
    message.voice = voices.find(voice => voice.name === this.value)
}

function toggle(startOver = true){
    speechSynthesis.cancel()
    if(startOver){
        speechSynthesis.speak(message)
    }
}

function setOption(){
    console.log(this.name,this.value)
    message[this.name] = this.value
    toggle()
}

speechSynthesis.addEventListener("voiceschanged", populateVoices);
voicesDropdown.addEventListener("change",setVoice)
options.forEach(option => option.addEventListener("change",setOption))
speakButton.addEventListener("click",toggle)
stopButton.addEventListener("click",() => toggle(false))