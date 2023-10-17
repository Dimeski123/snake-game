document.addEventListener("DOMContentLoaded", function() {
    let snake = document.querySelector(".snake");
    let gameContainer = document.querySelector(".game-container");
    let interval;
    let currentTop = parseInt(snake.style.top) || 240;
    let currentLeft = parseInt(snake.style.left) || 100;
    let currentRight = 500 - parseInt(snake.style.left);
    let currentBottom = 500 - parseInt(snake.style.top);
    snake.style.top = (currentTop) + "px";
    snake.style.left = (currentLeft) + "px";
    const tail = document.createElement("div");
    tail.id = "tail";
    tail.style.backgroundColor = "green";
    tail.style.position = "absolute";
    tail.style.width = "20px";
    tail.style.height = "20px";
    tail.style.top = (currentTop) + "px";
    tail.style.left = (currentLeft - 20) + "px";
    tail.style.display = "none";
    gameContainer.appendChild(tail);
    const food = document.createElement("div");
    food.id = "food";
    food.style.backgroundColor = "red";
    food.style.position = "absolute";
    food.style.width = "20px";
    food.style.height = "20px";
    createFood();
    displayFood(foodX,foodY);
    let moving = false;
    let direction = "right";
    let tailSegments = [];
    let tailConter = 1;
    let score = 0;
    let highscore = 0;
    let scoreDisplay = document.querySelector(".score-display");
    scoreDisplay.innerHTML = parseInt(score);
    let highscoreDisplay = document.querySelector(".highscore-display");
    highscoreDisplay.innerHTML = parseInt(highscore);
    let highscoreDisplayModal = document.querySelector(".highscore-display-modal");
    let modal = document.querySelector(".modal");
    let restartBtn = document.querySelector(".restartBtn");
    let playing = true;



    function snakeMoveUp() {
            currentTop = parseInt(snake.style.top) || 240;
            snake.style.top = (currentTop - 20) + "px";
            tail.style.top = currentTop + "px";
            tail.style.left = snake.style.left;
            currentRight = 500 -  parseInt(snake.style.left);
            currentBottom = 500 - parseInt(snake.style.top);
            checkFoodCollision();
            checkWallCollision();
            updateTail();
            snakeCollision();
    }

    function snakeMoveDown() {
            currentTop = parseInt(snake.style.top) || 240;
            snake.style.top = (currentTop + 20) + "px";
            tail.style.top = currentTop + "px";
            tail.style.left = snake.style.left;
            currentRight = 500 -  parseInt(snake.style.left);
            currentBottom = 500 - parseInt(snake.style.top);
            checkFoodCollision();
            checkWallCollision();
            updateTail();
            snakeCollision();
    }

    function snakeMoveLeft() {
            currentLeft = parseInt(snake.style.left) || 100;
            snake.style.left = (currentLeft - 20) + "px";
            tail.style.left = currentLeft + "px";
            tail.style.top = snake.style.top;
            currentRight = 500 -  parseInt(snake.style.left);
            currentBottom = 500 - parseInt(snake.style.top);
            checkFoodCollision();
            checkWallCollision();
            updateTail();
            snakeCollision();
    }

    function snakeMoveRight() {
            currentLeft = parseInt(snake.style.left) || 100;
            snake.style.left = (currentLeft + 20) + "px";
            tail.style.left = currentLeft + "px";
            tail.style.top = snake.style.top;
            currentRight = 500 -  parseInt(snake.style.left);
            currentBottom = 500 - parseInt(snake.style.top);
            checkFoodCollision();
            checkWallCollision();
            updateTail();
            snakeCollision();

    }

    document.onkeyup = function (e) {
        if (!interval) {
            interval = setInterval(() => {
                moving = false;
            }, 150);
        }

        switch (e.key) {
            case "ArrowRight":
            case "d":
                if (direction != "left" && playing){
                    clearInterval(interval);
                    interval = setInterval(snakeMoveRight, 150);
                    direction = "right";
                    snake.style.transform = "rotate(0deg)";
                    moving = true;
                }

                break;
            case "ArrowLeft":
            case "a":
                if (direction != "right" && playing){
                    clearInterval(interval);
                    interval = setInterval(snakeMoveLeft, 150);
                    direction = "left";
                    snake.style.transform = "rotate(180deg)";
                    moving = true;
                }
                break;
            case "ArrowUp":
            case "w":
                if (direction != "down" && playing){
                    clearInterval(interval);
                    interval = setInterval(snakeMoveUp, 150);
                    direction = "up";
                    snake.style.transform = "rotate(-90deg)";
                    moving = true;
                }
                break;
            case "ArrowDown":
            case "s":
                if (direction != "up" && playing){
                    clearInterval(interval);
                    interval = setInterval(snakeMoveDown, 150);
                    direction = "down";
                    snake.style.transform = "rotate(90deg)";
                    moving = true;
                }
                break;
            case " ":
                clearInterval(interval);
                interval = null;

                /*console.log("Current TOP:   " + currentTop);
                console.log("Current LEFT:   " + currentLeft);
                console.log("Snake TOP:   " + snake.style.top);
                console.log("Snake LEFT:   " + snake.style.left);
                console.log("Tail TOP:   " + tail.style.top);
                console.log("Tail LEFT:   " + tail.style.left);*/
                break;
        }
    };

    function createFood(){
        function randomFood(min,max){
            const randNum = Math.round((Math.random() * (max - min) - min ) / 20) * 20;
            return randNum;
        }
        foodY = randomFood(0, 500 - 20);
        foodX = randomFood(0, 500 - 20);
        if (foodY < 20){
            foodY = 20;
        }
        if (foodX < 20){
            foodX = 20;
        }


    }
    function displayFood(foodY, foodX){
        food.style.top = foodX + "px";
        food.style.left = foodY + "px";
        gameContainer.appendChild(food);

    }

    function checkFoodCollision(){
        if (parseInt(snake.style.top) === foodY && parseInt(snake.style.left) === foodX){
            createFood();
            displayFood(foodX,foodY);
            addTailSegment(currentTop, currentLeft);
            score++;
            scoreDisplay.innerHTML = parseInt(score);

        }
    }
    function gameOver(){
        for (let i = 0; i < tailSegments.length; i++) {
            gameContainer.removeChild(tailSegments[i].element);
        }
        highScoreCheck();
        score = 0;
        playing = false;
        scoreDisplay.innerHTML = parseInt(score);
        tailSegments.length = 0; // Clear the tailSegments array
        snake.style.top = "240px";
        snake.style.left = "100px";
        tail.style.top = "240px";
        tail.style.left = "80px";
        clearInterval(interval);
        direction = "right";
        snake.style.transform = "rotate(0deg)";
        modal.style.display = "block";
    }
    function checkWallCollision(){
        if (parseInt(snake.style.top) >= 500 || parseInt(snake.style.left) >= 500 || currentBottom === 500 || currentRight === 500){

            gameOver();
        }
    }

    function addTailSegment(top, left) {
        const newTail = document.createElement("div");
        newTail.style.backgroundColor = "#75b954";
        newTail.style.position = "absolute";
        newTail.style.width = "20px";
        newTail.style.height = "20px";
        switch (direction){
            case "right":
                newTail.style.top = parseInt(tail.style.top) + "px";
                newTail.style.left = parseInt(tail.style.left)  + "px";
                tailConter++;
                break;
            case "left":
                newTail.style.top = parseInt(tail.style.top) + "px";
                newTail.style.left = parseInt(tail.style.left) + "px";
                tailConter++;
                break;
            case "up":
                newTail.style.top = parseInt(tail.style.top)  + "px";
                newTail.style.left = parseInt(tail.style.left) + "px";
                tailConter++;
                break;
            case "down":
                newTail.style.top = parseInt(tail.style.top) + "px";
                newTail.style.left = parseInt(tail.style.left) + "px";
                tailConter++;
                break;
        }
        lastTop = parseInt(newTail.style.top);
        lastLeft = parseInt(newTail.style.left);

        gameContainer.appendChild(newTail);
        tailSegments.push({ element: newTail, top: lastTop, left: lastLeft });

    }
    function updateTail() {
        let prevTop = parseInt(tail.style.top);
        let prevLeft = parseInt(tail.style.left);

        for (let i = tailSegments.length - 1; i >= 0; i--) {
            if (i === 0) {
                tailSegments[i].top = prevTop;
                tailSegments[i].left = prevLeft;
            } else {
                const tempTop = tailSegments[i].top;
                const tempLeft = tailSegments[i].left;
                tailSegments[i].top = prevTop;
                tailSegments[i].left = prevLeft;
                prevTop = tempTop;
                prevLeft = tempLeft;
            }
            tailSegments[i].element.style.top = tailSegments[i].top + "px";
            tailSegments[i].element.style.left = tailSegments[i].left + "px";
        }
    }

    function snakeCollision(){
        snakeTop = parseInt(snake.style.top);
        snakeLeft = parseInt(snake.style.left);

        for (let i = 0; i < tailSegments.length; i++){
            tailTop = parseInt(tailSegments[i].top);
            tailLeft = parseInt(tailSegments[i].left);

            if (snakeTop === tailTop && snakeLeft === tailLeft){
                gameOver();
                return;
            }
        }
    }

    function highScoreCheck(){
        if (highscore<score){
            highscore = score;
            highscoreDisplay.innerHTML = parseInt(highscore);
            highscoreDisplayModal.innerHTML = parseInt(highscore);
        }
    }

    restartBtn.addEventListener("click", function (){
        modal.style.display = "none";
        playing = true;
    })
});