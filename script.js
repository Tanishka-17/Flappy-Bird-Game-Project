document.addEventListener("DOMContentLoaded", function() {
    // Get all the elements from the HTML
    const bird = document.getElementById('bird');
    const gameContainer = document.getElementById('game-container');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const restartBtn = document.getElementById('restart-btn');
    const instructions = document.getElementById('instructions');

    // Game state variables
    let birdTop = 250;
    let isGameOver = false;
    let isPaused = true;
    let gameSpeed = 2;

    function initializeGame() {
        birdTop = 250;
        isGameOver = false;
        isPaused = true;
        bird.style.top = birdTop + "px";
        playPauseBtn.textContent = 'Play';
        playPauseBtn.style.display = 'block';
        instructions.style.display = 'block';
        gameContainer.style.animationPlayState = 'paused';
    }

    playPauseBtn.addEventListener('click', () => {
        if (isGameOver) return;
        isPaused = !isPaused;
        playPauseBtn.style.display = 'none';
        instructions.style.display = 'none';
        gameContainer.style.animationPlayState = 'running';
    });

    restartBtn.addEventListener('click', () => {
        const pipes = document.querySelectorAll('.pipe');
        pipes.forEach(pipe => {
            pipe.style.left = pipe.getAttribute('data-initial-left');
        });
        initializeGame();
        restartBtn.style.display = 'none';
    });

    function jump(e) {
        if (e.keyCode === 32 && !isGameOver && !isPaused) {
            birdTop -= 50;
            bird.style.top = birdTop + "px";
        }
    }
    document.addEventListener("keydown", jump);

    function applyGravity() {
        birdTop += 2;
        bird.style.top = birdTop + "px";
    }

    function movePipes() {
        const pipes = document.querySelectorAll('.pipe');
        pipes.forEach(pipe => {
            let pipeLeft = parseInt(pipe.style.left);
            pipe.style.left = (pipeLeft - gameSpeed) + "px";
            if (pipeLeft < -60) {
                pipe.style.left = '400px';
            }
        });
    }

    function detectCollision() {
        // Check for top and bottom boundaries
        const birdHeight = parseInt(window.getComputedStyle(bird).getPropertyValue('height'));
        if (birdTop <= 0 || (birdTop + birdHeight) >= 600) {
            gameOver();
            return;
        }


    }

    function gameOver() {
        isGameOver = true;
        isPaused = true;
        gameContainer.style.animationPlayState = 'paused';
        restartBtn.style.display = 'block';
    }

    function gameLoop() {
        if (!isPaused && !isGameOver) {
            applyGravity();
            movePipes();
            detectCollision();
        }
        requestAnimationFrame(gameLoop);
    }

    const pipes = document.querySelectorAll('.pipe');
    pipes.forEach(pipe => {
        pipe.setAttribute('data-initial-left', pipe.style.left);
    });
    initializeGame();
    gameLoop();
});