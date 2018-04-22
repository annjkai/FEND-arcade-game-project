// This is the enemy class; it determines what enemies looks like and
// regulates where they may be located on the canvas
var Enemy = function(x, y, speed, width, height) {
    // enemy location
    this.x = x;
    this.y = y;
    // enemy speed
    this.speed = speed;
    // enemy size
    this.width = width;
    this.height = height;
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

    // runs the collision function
    checkCollisions(player, this);
};

// Draws the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This is the player class; it determines what the character looks like and
// where it is located on the canvas
var Player = function(x, y, width, height) {
    // player location
    this.x = x;
    this.y = y;
    // player size
    this.width = width;
    this.height = height;
    // player image
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

/* ensures the player stays within bounds and updates when the player
 * reaches the top
 */
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

/* checks whether enemy & player occupy the same location in space
 * if they do, the player dies and is reset back to the starting position;
 * functionality sourced from MDN:
 * developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
 */
function checkCollisions(player, Enemy) {
    if (player.x < Enemy.x + Enemy.width &&
    player.x + player.width > Enemy.x &&
    player.y < Enemy.y + Enemy.height &&
    player.height + player.y > Enemy.y){
        resetPlayer();
    }
}

/* all enemy objects are located in an array called allEnemies
 * the height for the enemies and the player (83) look arbitrary,
 * but I set them to the same height as the amount the player moves
 * so checkCollisions() isn't triggered when the player is sat
 * right underneath/above a bug
*/
const allEnemies = [
    enemyOne = new Enemy(-100, 48, 100, 100, 83),
    enemyTwo = new Enemy(-100, 131, 200, 100, 83),
    enemyThree = new Enemy(-100, 214, 150, 100, 83)
];

// new player object
player = new Player(200, 380, 100, 83);

/* listens for key presses and sends the keys to the Player.handleInput()
 * method
 */
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
