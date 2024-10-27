const canva = document.getElementById('gameSnake');
const ctx = canva.getContext('2d'); 

let box = 20;
let snake = [{ x: 9 * box, y: 10 * box }]; 
let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box,
};
let direction = 'RIGHT';
let score = 0;
let game; 


document.addEventListener('keydown', changeDirection);


document.getElementById('left').addEventListener('click', () => changeDirection({ keyCode: 37 }));
document.getElementById('up').addEventListener('click', () => changeDirection({ keyCode: 38 }));
document.getElementById('down').addEventListener('click', () => changeDirection({ keyCode: 40 }));
document.getElementById('right').addEventListener('click', () => changeDirection({ keyCode: 39 }));

function changeDirection(event) {
    if (event.keyCode === 37 && direction !== 'RIGHT') {
        direction = 'LEFT';
    } else if (event.keyCode === 38 && direction !== 'DOWN') {
        direction = 'UP';
    } else if (event.keyCode === 39 && direction !== 'LEFT') {
        direction = 'RIGHT';
    } else if (event.keyCode === 40 && direction !== 'UP') {
        direction = 'DOWN';
    }
}


function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? '#fff' : 'rgb(159, 55, 55)'; 
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = '#fff';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
}


function drawFood() {
    ctx.fillStyle = 'rgb(159, 55, 55)';
    ctx.fillRect(food.x, food.y, box, box);
}


function updateGame() {
    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

  
    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'DOWN') snakeY += box;

    
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        }; 
    } else {
        snake.pop(); 
    }

   
    let newHead = { x: snakeX, y: snakeY };

  
    if (snakeX < 0 || snakeY < 0 || snakeX >= 20 * box || snakeY >= 20 * box || collision(newHead, snake)) {
        clearInterval(game); // End the game
  
    swal({
        title: "Game Over!",
        text: "Your score was: " + score,
        icon: "error",
        buttons: {
            restart: {
                text: "Restart",
                value: "restart",
            },
            cancel: {
                text: "Cancel",
                value: "cancel",
                visible: true,
                className: "cancel",
                closeModal: true,
            },
        },
    }).then((value) => {
        switch (value) {
            case "restart":
                restart();
                break;
            default:
               
                break;
        }
    });
}

    snake.unshift(newHead); 
}

// Collision detection
function collision(head, array) {
    return array.some(segment => head.x === segment.x && head.y === segment.y);
}

// Main game loop
function draw() {
    ctx.clearRect(0, 0, canva.width, canva.height); 
    drawSnake();
    drawFood();
    updateGame();
    ctx.fillStyle = 'rgb(159, 55, 55)';
    ctx.font = 'bold 28px monospace';
    ctx.fillText('Score: ' + score, box, box); 
}

// Start the game loop
function startGame() {
    game = setInterval(draw, 300); 
}

// Restart the game
document.getElementById('restart').addEventListener('click', restart);
function restart() {
    
    snake = [{ x: 9 * box, y: 10 * box }]; 
    direction = 'RIGHT'; 
    score = 0; 

  
    food = {
        x: Math.floor(Math.random() * 19 + 1) * box,
        y: Math.floor(Math.random() * 19 + 1) * box,
    };

   
    clearInterval(game); 
    startGame(); 
}


startGame();