function genRandomNum(min, max) {
    /* Returns random integer from min to max inclusive */
    return Math.floor(Math.random() * (max-min + 1)) + min;
}

function getRandomElement(arr) {
  let randomIndex = genRandomNum(0, COLORS.length-1);
  return arr[randomIndex];
}

function isValidKey(keyCode) {
  // Exclude some key from being detected with
  // event listener for key
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

