
const board = document.getElementById("board");
const currentPlayerSP = document.getElementById("current-player")
const p1ScoreSp = document.getElementById("p1-score");
const p2ScoreSp = document.getElementById("p2-score");
const SIZE = 3;
const horizontal = [];
const vertical = [];
const boxes = [];

let currentPlayer = 1;
let p1Score = 0;
let p2Score = 0;



//init game
init();

function init() {
    setUpArrays();
    createBoard();

}

function setUpArrays() {
    for (let r = 0; r <= SIZE; r++) {
        horizontal[r] = [];
        vertical[r] = [];
        for (let c = 0; c <= SIZE; c++) {
            horizontal[r][c] = false;
            vertical[r][c] = false;
        }
    }

    for (let r = 0; r < SIZE; r++) {
        boxes[r] = [];
        for (let c = 0; c < SIZE; c++) {
            boxes[r][c] = false;
        }
    }
}
//creating board and line
function createBoard() {
    for (let r = 0; r <= SIZE; r++) {
        for (let c = 0; c <= SIZE; c++) {
            const dot = document.createElement("div")
            dot.className = "dot";
            dot.style.top = `${r * 200 + 50}px`;
            dot.style.left = `${c * 200 + 50}px`;
            board.appendChild(dot);
        }
    }
    for (let r = 0; r <= SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
            const line = document.createElement("div")
            line.className = "horline";
            line.style.top = `${r * 200 + 50 }px`;
            line.style.left = `${c * 200 + 50 + 12}px`;
            line.addEventListener("click", () => clickHorLine(r, c, line));
            board.appendChild(line);
        }
    }
    for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c <= SIZE; c++) {
            const line = document.createElement("div")
            line.className = "verline";
            line.style.top = `${r * 200 + 50 + 12}px`;
            line.style.left = `${c * 200 + 50}px`;
            line.addEventListener("click", () => clickVerLine(r, c, line));
            board.appendChild(line);
        }
    }


}
//able to switch player
function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    currentPlayerSP.textContent = `Player ${currentPlayer}`;

}


//make lines functional
function clickHorLine(r, c, line) {
    if (horizontal[r][c]) return;
    horizontal[r][c] = true;
    line.classList.add("active");

    if (!checkBoxes()) switchPlayer();
}

function clickVerLine(r,c, line) {
    if (vertical[r][c]) return;
    vertical[r][c]= true
    line.classList.add("active")

    if(!checkBoxes()) switchPlayer();
}
//checking for score
function checkBoxes() {
    let scored = false

    for(let r=0; r < SIZE; r++){
        for(let c=0; c<SIZE; c++){
            if(
                !boxes[r][c] &&
                horizontal[r][c]&&
                horizontal[r+1][c]&&
                vertical[r][c]&&
                vertical[r][c+1]
            ){
                boxes[r][c] = true;
                claimBox(r,c);
                scored=true;
            }
        }
    }
    return scored;
}
//claim the box
function claimBox(r, c) {
    const box = document.createElement("div")
    box.className= "box";
    box.textContent= `P${currentPlayer}`;
    box.style.top=`${r * 200 + 90}px`;
    box.style.left= `${c * 200 + 90}px`;
    board.appendChild(box);

    if(currentPlayer === 1) p1Score++
    else p2Score++

    updateScore();
}
//update score
function updateScore() {
    p1ScoreSp.textContent = p1Score;
    p2ScoreSp.textContent = p2Score;
    checkForWinnerTie();

}
//check for winner
function checkForWinnerTie() {
    if (p1Score + p2Score === SIZE * SIZE) {
        if (p1Score > p2Score) {
            console.log("Player 1 Won!");
        } else if (p2Score > p1Score) {
            console.log("Player 2 Won!");
        } else {
            console.log("It's a Tie");
        }
    }
}