const audioNames = {
  "w": "crash",
  "a": "kick-bass",
  "s": "snare",
  "d": "tom-1",
  "j": "tom-2",
  "k": "tom-3",
  "l": "tom-4",
}

const sounds = document.querySelector(".sounds");
const playSound = key => {
  if (Object.keys(audioNames).includes(key)) {
    let sound = new Audio(`../assets/sounds/${audioNames[key]}.mp3`);
    sound.play();
  }
}

document.addEventListener("keydown", (event) => {
  playSound(event.key);
}, {passive: true});

document.querySelector("div.set")
        .addEventListener("click", (event) => {
          if (event.target.localName !== "button") return;
          playSound(event.target.textContent);
        }, {passive: true});

