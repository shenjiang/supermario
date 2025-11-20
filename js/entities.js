class Entity {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velX = 0;
        this.velY = 0;
        this.markedForDeletion = false;
    }

    update(deltaTime) {
        this.x += this.velX;
        this.y += this.velY;
    }
}

class Player extends Entity {
    constructor(x, y) {
        super(x, y, 12, 16); // Slightly narrower than tile
        this.speed = 2;
        this.jumpForce = -6.5;
        this.onGround = false;
        this.facingRight = true;
        this.isDead = false;
    }

    update(input, physics, map, onScore) {
        if (this.isDead) return;

        // Horizontal Movement
        if (input.isPressed('left')) {
            this.velX = -this.speed;
            this.facingRight = false;
        } else if (input.isPressed('right')) {
            this.velX = this.speed;
            this.facingRight = true;
        } else {
            this.velX = 0;
        }

        // Jumping
        if (input.isPressed('jump') && this.onGround) {
            this.velY = this.jumpForce;
            this.onGround = false;
        }

        // Variable Jump Height (release early to fall faster)
        if (!input.isPressed('jump') && this.velY < -2) {
            this.velY *= 0.9;
        }

        // Apply Gravity
        this.velY += physics.gravity;

        // Apply Velocity
        this.x += this.velX;
        this.y += this.velY;

        // Map Collision
        physics.resolveMapCollision(this, map, (side, tile) => {
            if (side === 'bottom') {
                if (tile.type === 2) { // Question Block
                    // Turn into Used Block
                    tile.type = 4;
                    if (onScore) onScore(100);
                    console.log("Hit Question Block! +100");
                } else if (tile.type === 1) { // Brick
                    // Just score for now, maybe break later
                    if (onScore) onScore(10);
                    console.log("Hit Brick! +10");
                }
            }
        });

        // Screen Boundaries
        if (this.x < 0) this.x = 0;
        if (this.y > map.height * map.tileSize) {
            this.die();
        }
    }

    die() {
        this.isDead = true;
        this.velY = -5; // Hop up before falling
        // Disable collision for falling off screen
    }
}

class Enemy extends Entity {
    constructor(x, y) {
        super(x, y, 16, 16);
        this.speed = 0.5;
        this.velX = -this.speed;
    }

    update(physics, map) {
        this.velY += physics.gravity;

        this.x += this.velX;
        this.y += this.velY;

        // Simple AI: Turn on wall collision
        // We need a custom collision resolve that tells us if we hit a wall
        // For now, let's just check next position or use the physics engine's result
        // A simple way is to check if x velocity was zeroed out by collision

        const preX = this.x;
        physics.resolveMapCollision(this, map);

        if (this.velX === 0) {
            this.speed = -this.speed;
            this.velX = this.speed;
        }
    }
}

class Coin extends Entity {
    constructor(x, y) {
        super(x, y, 10, 14);
        this.collected = false;
    }
}
