const audioNames = {
  "w": "crash",
  "a": "kick-bass",
  "s": "snare",
  "d": "tom-1",
  "j": "tom-2",
  "k": "tom-3",
  "l": "tom-4",
}

function recordClickSequence(event) {
  // Get the color of the square that was clicked
  let colorClicked = event.target.dataset.square;

  // Skip if the element that was clicked doesn't belong
  // to array colors
  if (!colors.includes(colorClicked)) return;

  let colorSound = new Audio(`${soundsDir}/${colorClicked}.mp3`);

  // Check if the clicked doesn't match with the current sequence
  if (colorClicked !== currentSequence[counter]) {
    let errorSound = new Audio(`${soundsDir}/wrong.mp3`);

    errorSound.play();

    // Add flashing red for every wrong input
    addAnimation("body", "game-over");

    // Reset status
    counter = 0;
    currentLevel = 0;
    currentSequence = [];

    // Change header text to game over message
    $("#header-text").text(`Game over. ${headerStartText}`);

    // Reenable event listener for key press to restart the game
    document.addEventListener("keydown", handleKeypress);
    return;

  } else {
    counter++;
    colorSound.play();
    addAnimation(`[data-square=${colorClicked}]`, "clicked");
  }

  // Check if the user completed the given sequence
  if (counter > currentSequence.length - 1) {
    // Sleep for 1sec then proceed to next level
    sleep(1000).then(() => {
      // Reset counter
      counter = 0;

      // Add new color to current sequence
      addNewColor();
    });
  }

  return;
}

function handleKeypress(event) {
  if (!isValidKey(event.keyCode)) return;
  addNewColor();
}

function addAnimation(element, className) {
  $(element).addClass(className);
  setTimeout(function () {
    $(element).removeClass(className);
  }, 100);
}

function isValidKey(keyCode) {
  /* Exclude some key from being detected with
   * event listener for key */
  if (
      (keyCode === 8  || keyCode ===  9) ||
      (keyCode >= 16  && keyCode <=  27) ||
      (keyCode >= 34  && keyCode <=  46) ||
      (keyCode >= 91  && keyCode <= 183)
  ) {
    return false;
  }

  return true;
}

function genRandomNum(min, max) {
  /* Returns random integer from min to max INCLUSIVE */
  return Math.floor(Math.random() * (max-min + 1)) + min;
}

function getRandomElement(arr) {
  let randomIndex = genRandomNum(0, arr.length-1);
  return arr[randomIndex];
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

