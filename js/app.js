

// Enemies our player must avoid
var Enemy = function(a, b, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.a = a;
    this.b = b;
    this.sp = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
	Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.a = this.a + this.sp * dt;

    // reset position when canvas off
    this.offScreenA= 550;
	this.startingA= -100;
	
	if (this.a > this.offScreenA) {
        this.a = this.startingA;
		
        this.sp = 100 + Math.floor(Math.random() * 256);
    }
	this.checkCollision();
	
};
	


    // To Generate Random speed
    Enemy.prototype.randomSpeed = function (){
    "use strict";
    // Speed will be a random number between 1 and 10 times speedMultiplier
    this.sp = speedMultiplier * Math.floor(Math.random() * 10 + 1);
};

	
	 
    // Check for collision between player and enemies
	Enemy.prototype.checkCollision = function(){
	"use strict";
	    var playerBox = {a: player.a, b: player.b, width: 37, height: 30};
        var enemyBox = {a: this.a, b: this.b, width: 60, height: 25};
    if (playerBox.a < enemyBox.a + enemyBox.width &&
        playerBox.a + playerBox.width > enemyBox.a &&
        playerBox.b < enemyBox.b + enemyBox.height &&
        playerBox.height + playerBox.b > enemyBox.b) {
        // When collision detected an alert will pop up and call collision detection function
        this.collisionDetected();
		window.alert("Oops! try again");
		
    }
};


	// Draw the enemy on the screen, required method for game
	Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.a, this.b);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(a, b, speed) {
    this.a = a;
    this.b = b;
    this.sp = speed;
    this.sprite = 'images/char-cat-girl.png';


};

    Enemy.prototype.collisionDetected = function() {
    "use strict";

    player.characterReset();
};
Player.prototype.update = function() {
    // To ensure the player is not off the canvass boundries
    if (this.b > 380) {
        this.b = 380;
    }
    if (this.a > 400) {
        this.a = 400;
    }
    if (this.a < 0) {
        this.a = 0;
    }
	
    // When player win the game
	 if (this.b < 0) {
        this.a = 200;
        this.b = 380;
	window.alert("Congrats! You won =D");
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.a, this.b);
};

Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case 'left':
            this.a -= this.sp + 50;
            break;
        case 'up':
            this.b -= this.sp + 30;
            break;
        case 'right':
            this.a += this.sp + 50;
            break;
        case 'down':
            this.b += this.sp + 30;
            break;
    }
};

	// Resets the player position to the start position
	Player.prototype.characterReset = function() {
    "use strict";
    this.startingA = 200;
    this.startingB = 400;
    this.a = this.startingA;
    this.b = this.startingB;
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

// Position "y" where the enemies will are created
var enemyPosition = [60, 140, 220];
var player = new Player(200, 380, 50);
var enemy;

enemyPosition.forEach(function(posY) {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
});

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
