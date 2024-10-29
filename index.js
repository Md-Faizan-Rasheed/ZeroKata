const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winingPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,8,5],
    [0,4,8],
    [2,4,6]
];


// Lets create a function to initialis a Game 
function initGame(){
    currentPlayer = "X";
    gameGrid = [" "," "," "," "," "," "," "," "," ",];

    boxes.forEach((box,index) =>{
    box.innerText = "";
    box.style.pointerEvents ="all";
    box.classList = `box box${index + 1}`

    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText =`Current Player - ${currentPlayer}`
};
initGame();

boxes.forEach((boxes,index) => {
    boxes.addEventListener("click",()=>{
        handleClick(index);
    })
});

function checkGameOver() {
    let answer = "";

    winingPositions.forEach((position) => {
        // All three boxes should not be empty and exactly the same in value
        if (
            (gameGrid[position[0]] !== " " ||
            gameGrid[position[1]] !== " " ||
            gameGrid[position[2]] !== " ") &&
            (gameGrid[position[0]] === gameGrid[position[1]]) &&
            (gameGrid[position[1]] === gameGrid[position[2]])
        ) {
            // check if the winner is X
            if (gameGrid[position[0]] === "X") {
                answer = "X";
            } else {
                answer = "O"; // Corrected from "0" to "O"
            }

            // disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });

            // Now we know X/O is the winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    // it means we have a winner
    if (answer !== "") { // Corrected from " " to ""
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // let's NO winner Found lets check When there is no winner / tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box != " "){
            fillCount++;
        }
    });


    // board is Filled , game is TIE
    if(fillCount === 9){
        gameInfo.innerText = "Game Tied";
        newGameBtn.classList.add("active");
    }
}

function handleClick(index) {
    if(gameGrid[index] === " "){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents ="none";
        //swap karo tutn ko
        swapTurn();

        checkGameOver(); //******************************/
    }
}

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "0";
    }
    else{
        currentPlayer = "X";
    }
    //UI update
    gameInfo.innerText = `Current Player - ${currentPlayer}`
}

newGameBtn.addEventListener("click",initGame)
