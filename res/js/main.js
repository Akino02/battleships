const startgame = document.getElementById("playbutt");
const containergame = document.getElementById("containergame");
const menu = document.getElementById("menu");
const fieldp = document.getElementsByClassName("field");
const fielde = document.getElementsByClassName("fielde");
const reset = document.getElementById("reset");
const start = document.getElementById("ready");

let boats = 4;
let gamestarted = 0;
let randomnumsbot;
let botboats = [];

let botshots = [];
let arrayhelp = 0;
let randomshot;

let turn = 0;
let firstshot = 0;
let hitp = 0;
let hite = 0;

let pboat = "green";
let pboatd = "orange";
let eboatd = "red";
let miss = "grey";

let chcechendgameend = setInterval(chechendgame, 2000);

function chechendgame() {
  if (hitp == 4 || hite == 4) {
    containergame.style.display = "none";
    menu.style.display = "flex";
    if (hitp != 4) {
      alert("You lost");
    } else {
      alert("You won");
    }
    document.location.reload();
    clearInterval(chcechendgameend);
  }
  console.log("ahoj");
}
function randomnumbot() {
  for (let i = 0; i < 4; i++) {
    checherror = 0;
    randomnumsbot = Math.floor(Math.random() * 23 + 0);
    randomnumsbot = Math.round(randomnumsbot);
    if (botboats[0] >= 0) {
      for (let y = 0; y < botboats.length; y++) {
        if (randomnumsbot == botboats[y]) {
          randomnumbot();
          checherror++;
        }
      }
    }
    if (checherror == 0) {
      botboats[i] = randomnumsbot;
      fielde[randomnumsbot].value = 1;
      //console.log(randomnumsbot);
    }
  }
}
function botplay() {
  randomshot = Math.floor(Math.random() * 23 + 0);
  console.log(randomshot);
  if (fieldp[randomshot].value == 1) {
    fieldp[randomshot].style.background = pboatd;
    hite++;
    fieldp[randomshot].value = 2;
  } else if (fieldp[randomshot].value == 0 || fieldp[randomshot].value == 2) {
    botplay();
  } else {
    fieldp[randomshot].style.background = miss;
    fieldp[randomshot].value = 0;
  }
  if (turn <= 0) {
    turn++;
  }
}

startgame.onclick = () => {
  containergame.style.display = "flex";
  menu.style.display = "none";
};

[...fieldp].forEach((blockp) => {
  blockp.onclick = () => {
    if (gamestarted == 0) {
      if (blockp.style.background == pboat) {
      } else if (boats > 0) {
        blockp.style.background = pboat;
        blockp.value = 1;
        boats--;
      }
    }
  };
});
reset.onclick = () => {
  if (gamestarted == 0) {
    boats = 4;
    for (let i = 0; i < 24; i++) {
      fieldp[i].value = 0;
      fieldp[i].style.background = "white";
    }
  }
};
start.onclick = () => {
  if (boats == 0) {
    gamestarted++;
    start.style.display = "none";
    reset.style.display = "none";
    randomnumbot();
    turn++;
  } else if (boats != 4) {
    alert("Place 4 boats");
  }
};
[...fielde].forEach((blocke) => {
  blocke.onclick = () => {
    if (gamestarted >= 1 && turn == 1 && hitp < 4 && hite < 4) {
      console.log(blocke.value);
      if (blocke.value == 1) {
        blocke.style.background = eboatd;
        blocke.value = 2;
        hitp++;
        turn--;
        botplay();
      } else if (blocke.value == 2) {
        blocke.style.background = eboatd;
      } else if (blocke.value == 3) {
      } else {
        blocke.style.background = miss;
        blocke.value = 3;
        turn--;
        botplay();
      }
    }
  };
});
