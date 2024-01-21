const scoreCounter = document.querySelector('.score-counter');
const grid = document.querySelector(".grid");
const endGameScreen = document.querySelector(".end-game-screen");
const endGameText = document.querySelector(".end-game-text");
const playAgainButton = document.querySelector(".play-again");

const totalCells = 100;
const totalBombs=10;
const maxScore = totalCells - totalBombs;
const bombList=[];

// let used because the value gonna change
let score = 0;
function updateScore(){
  score++;
  //pad is to keep length of the score to 5 
  scoreCounter.innerHTML=score.toString().padStart(5,0);
  if(score === maxScore){
    endGame(true);
  }
}


// creating and adding cell to grid
for(let i=1; i <= 100;i++){
  const cell = document.createElement('div');
  cell.classList.add('cell');

  //add eventlistner to current cell
  cell.addEventListener('click',function(){
    // check if cell already clicked
    if(cell.classList.contains('cell-clicked')) return;

    // check if cell includes bomb
    if(bombList.includes(i)){
      cell.classList.add('cell-bomb');
      endGame(false);
    }else{
    // if no bomb and not clicked add cell-clicked css class to it
    cell.classList.add('cell-clicked');
    updateScore();
    }
  });
  grid.appendChild(cell);
  console.log(i);

};

// generating random number to determine cell to set bombs lataer
while(bombList.length < totalBombs){
  const randomNumber = Math.floor(Math.random()* totalCells) + 1;
  if(!bombList.includes(randomNumber)){
    bombList.push(randomNumber)
  };
};

// we call thi function when the game ends to reveal all bombs
function revealAllBombs(){
  //get all cells
  const cells = document.querySelectorAll('.cell');

  //loop through cells
  for(let i=1; i <= cells.length; i++){
    const cell = cells[i-1];
    if (bombList.includes(i)){
      cell.classList.add('cell-bomb');
    }
  }

}

// call this at the end to show victory or defeat 
function endGame(isVictory){
  //if you won return victory screen
  if(isVictory){
    endGameText.innerHTML="YOU <BR> WON";
    endGameScreen.classList.add('win');
  }
  
  // if you lost return lost scren with revealed bombs
  revealAllBombs();
  endGameScreen.classList.remove('hidden');
};
// add eventlistner to the button
playAgainButton.addEventListener('click',function(){
  window.location.reload();
})

