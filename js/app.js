// This is the enemy class; it determines what enemies looks like and
// regulates where they may be located on the canvas
var Enemy = function(x, y, speed) {
    // enemy location
    this.x = x;
    this.y = y;
    // enemy speed
    this.speed = speed;
    // enemy image
    this.sprite = 'images/enemy-bug.png';
};

// Updates the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // any movement is multiplied by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // each bug resets and goes back to the starting position when it
    // reaches the end of the canvas
    if (this.x > 505) {
        this.x = -100;
    }
};

// Draws the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This is the player class; it determines what the character looks like and
// where it is located on the canvas
var Player = function(x, y) {
    this.x = 200;
    this.y = 380;
    this.sprite = 'images/char-horn-girl.png';
};

// moves the player
Player.prototype.handleInput = function(e) {
    switch (e) {
        case 'left':
            this.x -= 102;
            break;
        case 'right':
            this.x += 102;
            break;
        case 'up':
            this.y -= 83;
            break;
        case 'down':
            this.y += 83;
            break;
    }
};

// bounces the player back to start after a short delay once top is reached
function resetPlayer() {
    timerId = window.setTimeout(function() {
        player.x = 200;
        player.y = 380;
    }, 500);
}

// ensures the player stays within bounds and updates when the player reaches the // top
Player.prototype.update = function() {
    if (this.x < 0) { //boundary left side
        this.x = 0;
    } else if (this.x > 505) { //boundary right side
        this.x = 405;
    } else if (this.y > 380) { //boundary bottom
        this.y = 380;
    } else if (this.y < 0) { //boundary top, "winning" condition
        // the value is -20 so the player ends up at the bottom of the top row
        this.y = -20;
        //reset
        resetPlayer();
    }
};

// draws the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// all enemy objects are located in an array called allEnemies
const allEnemies = [
    enemyOne = new Enemy(-100, 60, 100),
    enemyTwo = new Enemy(-100, 145, 200),
    enemyThree = new Enemy(-100, 230, 150)
];

// new player object
player = new Player();

// listens for key presses and sends the keys to the
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
