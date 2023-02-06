const nSqr = 9;let currLvl = 1;
let currSquare = 0;
const squareSelect = getComputedStyle(document.documentElement).getPropertyValue("--showSqr");    //different square colors
const squareDefault = getComputedStyle(document.documentElement).getPropertyValue("--sqrClr");
let lvlStatus = document.querySelector("#lvl");
function animBody(color){
  let startColor = getComputedStyle(document.body).backgroundColor;
  document.body.animate([{
    backgroundColor: color, offset: .2
  },{backgroundColor: startColor, offset: .8}], {duration: 800})
}
function terminateGame(){
  let newRecord = false;
  game.classList.add("hide");
  endGame.classList.remove("hide");
  document.getElementById("currScore").innerHTML = currLvl;
  maxScore = document.getElementById("maxScore");
  if(currLvl>localStorage.getItem("maxScore")) {
    localStorage.setItem("maxScore",currLvl);
    newRecord = true;
  }
  maxScore.innerHTML = localStorage.getItem("maxScore");
  if(newRecord)maxScore.addClass("newRecord");
}
function squareClickReact(e){
  console.log(e.target.id);
  console.log(pattern[currSquare]);
  if(e.target.id == pattern[currSquare]){
    e.target.animate([{
      backgroundColor:squareSelect
    },{backgroundColor: squareDefault}], {duration: 400});
    if(currSquare == pattern.length-1){
      animBody('rgba(43, 126, 243, .7)');
      currLvl++;
      updateLvl(currLvl);
      addPattern();
      setTimeout(()=>{
        showPattern();
      }, 500)
      return;
    }
    currSquare++;
  }
  else{
    animBody('rgba(255,0,0, .5)');
    terminateGame();
  }
}
function updateLvl(newLvl) {
  lvlStatus.innerHTML = newLvl;
  currSquare = 0;
}
const sqrGlow = [
  { backgroundColor: squareSelect, offset: 0.3},
]
const sqrGlowTiming = {
  duration: 550
}
function lightUp(elem){
  elem.animate(sqrGlow, sqrGlowTiming);
}
let pattern; //uses indices, e.g. for nSqr = 9, it'll contain [0-8];
function showPattern() {
  game.style.pointerEvents = "none";
  for(let i = 0; i < pattern.length;i++){
    setTimeout(()=>{
      lightUp(squares[pattern[i]]);
      if(i === pattern.length-1) setTimeout(()=>{game.style.pointerEvents = "auto"}, sqrGlowTiming.duration);
    }, i * sqrGlowTiming.duration);
  } 
}
function addPattern() {
  let nItem = Math.floor(Math.random() * nSqr);
  if(pattern.length >= 1){
    while (nItem == pattern[pattern.length-1]) {      
      nItem = Math.floor(Math.random() * nSqr);
    }
  }
  pattern.push(nItem);
}
function startGame() {
    game.classList.remove("hide");
    intro.classList.add("hide");
    endGame.classList.add("hide");
    if(localStorage.getItem("maxScore") === null) localStorage.setItem("maxStore", 0);
    pattern = [];
    currLvl = 1;
    updateLvl(currLvl);
    addPattern();
    showPattern();
  }
let squares;
let game = document.querySelector(".game");
let endGame = document.querySelector(".endGame")
let intro = document.querySelector(".intro");

window.addEventListener("DOMContentLoaded", () => {   //START
  let squaresHTML = ``;
  for (let i = 0; i < nSqr; ++i) {
    squaresHTML += `<div class="sqr" onclick = "squareClickReact(event)" id="${i}"></div>`;
  }
  game.querySelector(".sqr-container").innerHTML = squaresHTML;
  squares = document.querySelectorAll(".sqr");
});
