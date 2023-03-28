const audioNames = {
  "w": "crash",
  "a": "kick-bass",
  "s": "snare",
  "d": "tom-1",
  "j": "tom-2",
  "k": "tom-3",
  "l": "tom-4",
}

const playSound = key => {
  if (Object.keys(audioNames).includes(key)) {
    let sound = new Audio(`../assets/sounds/${audioNames[key]}.mp3`);
    sound.play();
  }
}

document.addEventListener("keydown", (event) => {
  playSound(event.key);
  buttonAnimation(event.key);
}, {passive: true});

document.querySelector("div.set")
        .addEventListener("click", (event) => {
          let key = event.target.textContent;

          if (event.target.localName !== "button") return;

          playSound(key);
          buttonAnimation(key);
        }, {passive: true});

function buttonAnimation(key) {
  let activeButton = document.querySelector(`.${key}`);

  activeButton.classList.add("pressed");

  setTimeout(function () {
    activeButton.classList.remove("pressed");
  }, 100);
  
}
