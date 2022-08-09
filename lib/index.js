// picking html elements to use in the DOM //
let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
// array created from box id to keep it simple //
let boxes = Array.from(document.getElementsByClassName('box'))

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

// creating a variable to assign players //
const X_TEXT =  'X'
const O_TEXT = 'O'
// assigned starting player //
let currentPlayer = X_TEXT
// array with blank spaces created to keep track of empty spaces //
const spaces = Array(9).fill(null)
// iterate through boxes array to add event listener at click //
const startGame = () => {
  boxes.forEach(box => box.addEventListener('click', boxClicked))

};

function boxClicked(e) {
  const id = e.target.id

  if(!spaces[id]){ // if the space is empty (not filled with id)
    spaces[id] = currentPlayer // fill the space at current index(id) at current player
    e.target.innerText = currentPlayer // putting a player on the box

    if(winningPlayer() !== false){
      playerText.innerText = `${currentPlayer} wins!`
      let winning_blocks = winningPlayer()

      winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator);
      return
    }

    currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT // switching player
    }
}

// winning combinations in form of array (index position) //
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function winningPlayer() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition
    if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
      return [a,b,c]
    }
  }
  return false
}

restartBtn.addEventListener('click', restart)

function restart() {
  spaces.fill(null)

  boxes.forEach(box => {
    box.innerText = ''
    box.style.backgroundColor = ''
  })

  playerText.innerText = 'Tic Tac Toe'
  currentPlayer =  X_TEXT
};

startGame()
