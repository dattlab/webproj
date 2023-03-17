const IMG_PATH = "./assets/img";

function genRandomNum(min, max) {
    /* Returns random integer from min to max inclusive */
    return Math.floor(Math.random() * (max-min + 1)) + min;
}

function rollDice() {
    var player1 = genRandomNum(1, 6);
    var player2 = genRandomNum(1, 6);
    
    var newImg1Path = IMG_PATH + "/dice" + player1 + ".png";
    var newImg2Path = IMG_PATH + "/dice" + player2 + ".png";
    
    document.querySelector(".img1").setAttribute("src", newImg1Path);
    document.querySelector(".img2").setAttribute("src", newImg2Path);

    return { player1, player2 };
}

function getResult(player1, player2) {
    if (player1 > player2)
        return "🚩Player 1 Wins!";
    else if (player1 < player2)
        return "Player 2 Wins! 🚩";
    return "🚩Draw! 🚩";
}

let roll = rollDice();
var result = getResult(roll.player1, roll.player2);

// Display result in h1
document.querySelector("h1").textContent = result;

