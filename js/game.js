class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.input = new InputHandler();
        this.physics = new Physics();
        this.level = new Level();

        this.player = new Player(50, 100);
        this.enemies = [];
        this.coins = [];

        this.score = 0;
        this.gameOver = false;
        this.victory = false;

        this.init();
    }

    init() {
        // Load entities from level
        this.level.initialEntities.forEach(e => {
            if (e.type === 'player') {
                this.player.x = e.x;
                this.player.y = e.y;
            } else if (e.type === 'goomba') {
                this.enemies.push(new Enemy(e.x, e.y));
            } else if (e.type === 'coin') {
                this.coins.push(new Coin(e.x, e.y));
            }
        });
    }

    update() {
        if (this.gameOver || this.victory) return;

        this.player.update(this.input, this.physics, this.level, (points) => {
            this.score += points;
        });

        // Update Enemies
        this.enemies.forEach(enemy => {
            enemy.update(this.physics, this.level);

            // Player vs Enemy Collision
            if (this.physics.checkCollision(this.player, enemy)) {
                // Check if stomped (player falling and above enemy)
                if (this.player.velY > 0 && this.player.y + this.player.height < enemy.y + enemy.height / 2) {
                    enemy.markedForDeletion = true;
                    this.player.velY = -4; // Bounce
                    this.score += 100;
                } else {
                    this.player.die();
                    this.gameOver = true;
                    console.log("Game Over");
                }
            }
        });

        // Update Coins
        this.coins.forEach(coin => {
            if (this.physics.checkCollision(this.player, coin)) {
                coin.markedForDeletion = true;
                this.score += 100;
            }
        });

        // Check Win Condition (Flag)
        // We need to check if player intersects with any 'F' tile
        // Since 'F' is not solid, physics doesn't return it, so we check manually
        const startCol = Math.floor(this.player.x / this.level.tileSize);
        const endCol = Math.floor((this.player.x + this.player.width) / this.level.tileSize);
        const startRow = Math.floor(this.player.y / this.level.tileSize);
        const endRow = Math.floor((this.player.y + this.player.height) / this.level.tileSize);

        for (let row = startRow; row <= endRow; row++) {
            for (let col = startCol; col <= endCol; col++) {
                const tile = this.level.getTile(col, row);
                if (tile && tile.type === 'F') {
                    this.victory = true;
                    console.log("Victory!");
                }
            }
        }

        // Cleanup
        this.enemies = this.enemies.filter(e => !e.markedForDeletion);
        this.coins = this.coins.filter(c => !c.markedForDeletion);

        // Camera / Scroll (Simple centering)
        // For this prototype, we might just clamp or let it scroll
        // Let's implement a simple camera offset in the renderer, 
        // but for now, let's just keep the player in view if we had a camera class.
        // Since we don't have a camera class, we'll pass an offset to render.
    }

    draw(renderer) {
        renderer.clear();

        // Simple Camera: Center player horizontally
        let cameraX = Math.max(0, this.player.x - renderer.width / 2);
        // Clamp to level width
        cameraX = Math.min(cameraX, this.level.width * this.level.tileSize - renderer.width);

        renderer.ctx.save();
        renderer.ctx.translate(-Math.floor(cameraX), 0);

        // Draw Level
        for (let y = 0; y < this.level.height; y++) {
            for (let x = 0; x < this.level.width; x++) {
                const tile = this.level.getTile(x, y);
                if (tile) {
                    renderer.drawTile(tile, x * this.level.tileSize, y * this.level.tileSize, this.level.tileSize);
                }
            }
        }

        // Draw Entities
        this.coins.forEach(c => renderer.drawCoin(c));
        this.enemies.forEach(e => renderer.drawGoomba(e));
        renderer.drawPlayer(this.player);

        renderer.ctx.restore();

        // UI
        renderer.drawText(`Score: ${this.score}`, 10, 20);
        if (this.gameOver) {
            renderer.drawText("GAME OVER", renderer.width / 2 - 30, renderer.height / 2, 'red', 20);
        } else if (this.victory) {
            renderer.drawText("VICTORY!", renderer.width / 2 - 30, renderer.height / 2, 'gold', 20);
            renderer.drawText(`Final Score: ${this.score}`, renderer.width / 2 - 40, renderer.height / 2 + 20, 'white', 12);
        }
    }
}
