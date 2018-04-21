// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    //speed
    this.speed = 10;
    this.sprite = 'images/enemy-bug.png';
    console.log("I'm gonna getcha!");
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.speed

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// This is the player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    this.x = 200;
    this.y = 380;
    this.sprite = 'images/char-horn-girl.png';

    console.log("I exist");
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

let timerId;

function resetPlayer() {
    timerId = window.setTimeout(function() {
        console.log("END");
        this.x = 200;
        this.y = 380;
    }, 500);
}
// ensures the player stays within bounds and updates when the player reaches the top
Player.prototype.update = function() {
    if (this.x < 0) { //stop left side
        this.x = 0;
    } else if (this.x > 505) { //stop right side
        this.x = 405;
    } else if (this.y > 380) { //stop bottom
        this.y = 380;
    } else if (this.y < 0) { //stop top, winning condition
        // the value is -20 so the player ends up at the bottom of the top row
        this.y = -20;
        resetPlayer();
        //clearTimeout(timerId);
    }

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [
    enemyOne = new Enemy(0, 60),
    enemyTwo = new Enemy(0, 145),
    enemyThree = new Enemy(0, 230)
];

player = new Player();

/*
newEnemies = function() {
    this.allEnemies.push(new Enemy());
};
*/

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
