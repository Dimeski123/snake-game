<?php

session_start();
?>

<html lang="en">
    <head>
        <meta charset="UTF-8">

        <title>Snake Game</title>
        <link rel="stylesheet" href="styles.css">


    </head>
    <body>
    <header>
        <h1>Snake game</h1>
    </header>

    <div class="score-div">
        <h2>Score: <span class="score-display"></span></h2>
        <div class="highscore-div"><span class="highscore-display"></span><i class="fa-solid fa-trophy"></i></div>
    </div>

    <div class="game-container">

        <div class="test-width">

        </div>
        <div class="test-height"></div>

        <div class="snake"></div>
        <div class="modal">
            <img src="GameOver.jpg">
            <div class="score-modal">
                <button type="submit" value="exit" class="restartBtn">Restart</button>
                <div class="highscore-div"><h2>HighScore: <span class="highscore-display-modal">0</span></h2></div>
            </div>

        </div>
    </div>




    <script src="https://kit.fontawesome.com/cbfa582d0a.js" crossorigin="anonymous"></script>
    <script src="app.js"></script>
    </body>




</html>