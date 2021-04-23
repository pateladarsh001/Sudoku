let GRID_LENGTH = 9;
let squareSize = 0;
let gridX;
let gridY;
let grid;
let providedNumbers;
let userInput = ' ';
function setup(){
    gridX = new Array(GRID_LENGTH);
    gridY = new Array(GRID_LENGTH);
    grid = new Array(GRID_LENGTH * GRID_LENGTH);
    providedNumbers = new Array(GRID_LENGTH * GRID_LENGTH);
    createCanvas(720, 720);
    squareSize=width / GRID_LENGTH;
    fillRandomNumbers();
    drawGrid();
    drawProvidedNumbers();
}

function draw(){
    if(keyIsPressed) {
        userInput=key;
    }
}

function drawGrid(){
    let squareX = 0;
    let squareY = 0;
    for(let i = 0;i < GRID_LENGTH + 1;i++) {
        for(let j = 0;j < GRID_LENGTH;j++) {
            squareX=j * squareSize;
            fill(200);
            square(squareX, squareY, squareSize);
        }
        squareY=i * squareSize;
    }
    let miniGridX = 0;
    let miniGridY = 0;
    for(let i = 0;i <= GRID_LENGTH / 3;i++) {
        for(let j = 0;j < GRID_LENGTH / 3;j++) {
            miniGridX=j * squareSize * 3;
            strokeWeight(GRID_LENGTH / 3);
            noFill();
            square(miniGridX, miniGridY, squareSize * 3);
        }
        miniGridY=i * squareSize * 3;
    }
}

function drawNumber(squareX, squareY, num){
    text(num, (squareX * squareSize) + (squareSize / 2) - textWidth(num) / 2, (squareY * squareSize) + (squareSize / 2) + (textAscent() / 2) - textDescent() / 2);
}

function getSquareX(){
    return int(mouseX / squareSize);
}

function getSquareY(){
    return int(mouseY / squareSize);
}

function fillRandomNumbers(){
    for(let i = 0;i < GRID_LENGTH;i++) {
        let numRandomNumbers = int(random(1, GRID_LENGTH - 2));
        for(let j = 0;j < numRandomNumbers;j++) {
            let randomIndex = int(random(1, GRID_LENGTH));
            providedNumbers[i * GRID_LENGTH + randomIndex]=int(random(1, GRID_LENGTH));
            grid[i * GRID_LENGTH + randomIndex]=int(random(1, GRID_LENGTH));
        }
    }
}

function drawProvidedNumbers(){
    let drawNum = ' ';
    let boxNumber = -1;
    for(let i = 0;i < GRID_LENGTH;i++) {
        for(let j = 0;j < GRID_LENGTH;j++) {
            boxNumber=(grid[(i * GRID_LENGTH) + j]);
            if(boxNumber > 0) {
                drawNum=str(boxNumber).charAt(0);
                fill(255, 0, 0);
                textSize(squareSize * 0.5);
                drawNumber(i, j, drawNum);
            }
        }
    }
}

function providedExists(x, y){
    return providedNumbers[x * GRID_LENGTH + y] != 0;
}

function gridExists(x, y){
    return grid[x * GRID_LENGTH + y] != 0;
}

function mouseClicked(){
    if(userInput != ' ') {
        noStroke();
        fill(0);
        textSize(squareSize * 0.5);
        let x = getSquareX();
        let y = getSquareY();
        if(!providedExists(x, y)) {
            if(gridExists(x, y)) {
                fill(200);
                square(x * squareSize, y * squareSize, squareSize - 1);
                drawNumber(x, y, userInput);
                grid[x * GRID_LENGTH + y]=userInput;
                noFill();
            }
            drawNumber(x, y, userInput);
            grid[x * GRID_LENGTH + y]=userInput;
        }
    else {
            console.log("Value in this box cannot be updated.");
        }
        console.log("User input is : " + userInput);
    }
    else {
        console.log("User has not selected any input");
    }
}

