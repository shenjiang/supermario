class Renderer {
    constructor(ctx) {
        this.ctx = ctx;
        this.width = ctx.canvas.width;
        this.height = ctx.canvas.height;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    drawRect(x, y, width, height, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(Math.floor(x), Math.floor(y), width, height);
    }

    drawText(text, x, y, color = 'white', size = 10) {
        this.ctx.fillStyle = color;
        this.ctx.font = `${size}px "Courier New"`;
        this.ctx.fillText(text, x, y);
    }

    // Programmatic Sprite Generation

    // Mario (Red/Brown)
    drawPlayer(player) {
        const x = Math.floor(player.x);
        const y = Math.floor(player.y);
        const w = player.width;
        const h = player.height;

        // Body color based on state
        const color = '#b22222'; // Firebrick red (Shirt)
        const skin = '#ffcc99';
        const overall = '#0000cc'; // Darker Blue Overalls (Contrasts with sky)
        const shoes = '#8b4513'; // SaddleBrown

        this.drawRect(x, y, w, h, overall); // Base (Overalls)
        this.drawRect(x, y, w, h / 2, color); // Shirt (Top half)
        this.drawRect(x + 4, y + 2, 8, 6, skin); // Face

        // Shoes
        this.drawRect(x, y + h - 2, 4, 2, shoes); // Left Shoe
        this.drawRect(x + w - 4, y + h - 2, 4, 2, shoes); // Right Shoe

        // Direction facing
        if (player.facingRight) {
            this.drawRect(x + 8, y + 3, 2, 2, 'black'); // Eye
            this.drawRect(x + 8, y + 6, 4, 1, 'black'); // Moustache
        } else {
            this.drawRect(x + 4, y + 3, 2, 2, 'black'); // Eye
            this.drawRect(x + 2, y + 6, 4, 1, 'black'); // Moustache
        }
    }

    drawGoomba(enemy) {
        const x = Math.floor(enemy.x);
        const y = Math.floor(enemy.y);
        const w = enemy.width;
        const h = enemy.height;

        this.drawRect(x, y, w, h, '#8b4513'); // Brown body
        this.drawRect(x + 2, y + 4, 4, 4, 'white'); // Left Eye
        this.drawRect(x + 10, y + 4, 4, 4, 'white'); // Right Eye
        this.drawRect(x + 4, y + 5, 1, 2, 'black'); // Pupil
        this.drawRect(x + 11, y + 5, 1, 2, 'black'); // Pupil

        // Feet animation
        if (Math.floor(Date.now() / 200) % 2 === 0) {
            this.drawRect(x, y + h - 2, 4, 2, 'black');
        } else {
            this.drawRect(x + w - 4, y + h - 2, 4, 2, 'black');
        }
    }

    drawTile(tile, x, y, size) {
        if (tile.type === 1) { // Ground / Brick
            this.drawRect(x, y, size, size, '#8b4513'); // Base brown
            this.drawRect(x + 1, y + 1, size - 2, size - 2, '#cd853f'); // Inner light brown
            // Brick pattern
            this.drawRect(x, y + 7, size, 1, 'black');
            this.drawRect(x + 7, y, 1, 7, 'black');
            this.drawRect(x + 7, y + 8, 1, 8, 'black');
        } else if (tile.type === 2) { // Question Block
            this.drawRect(x, y, size, size, '#ffd700'); // Gold
            this.drawRect(x + 2, y + 2, size - 4, size - 4, '#ffa500'); // Inner Orange
            this.drawText('?', x + 4, y + 12, 'black', 12);
        } else if (tile.type === 3) { // Pipe
            this.drawRect(x, y, size, size, '#228b22'); // Green
            this.drawRect(x + 2, y, 4, size, '#32cd32'); // Highlight
        } else if (tile.type === 'F') { // Flag pole
            this.drawRect(x + 6, y, 4, size, 'white'); // Pole
            // Draw Flag (Triangle-ish)
            this.drawRect(x + 10, y + 2, 8, 2, 'red');
            this.drawRect(x + 10, y + 4, 6, 2, 'red');
            this.drawRect(x + 10, y + 6, 4, 2, 'red');
        } else if (tile.type === 4) { // Used Block
            this.drawRect(x, y, size, size, '#6b4c35'); // Darker brown
            this.drawRect(x + 1, y + 1, size - 2, size - 2, '#8b5a2b');
            // Bolts
            this.drawRect(x + 1, y + 1, 1, 1, 'black');
            this.drawRect(x + size - 2, y + 1, 1, 1, 'black');
            this.drawRect(x + 1, y + size - 2, 1, 1, 'black');
            this.drawRect(x + size - 2, y + size - 2, 1, 1, 'black');
        }
    }

    drawCoin(coin) {
        const x = Math.floor(coin.x);
        const y = Math.floor(coin.y);
        this.drawRect(x, y, 10, 14, '#ffd700'); // Gold
        this.drawRect(x + 2, y + 2, 6, 10, '#ffa500'); // Inner
    }
}
