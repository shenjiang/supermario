class Physics {
    constructor() {
        this.gravity = 0.25;
        this.friction = 0.8;
    }

    // AABB Collision Check
    checkCollision(rect1, rect2) {
        return (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y
        );
    }

    // Resolve collision with static tiles
    resolveMapCollision(entity, map, onCollision = null) {
        // Check corners to find relevant tiles
        const startCol = Math.floor(entity.x / map.tileSize);
        const endCol = Math.floor((entity.x + entity.width) / map.tileSize);
        const startRow = Math.floor(entity.y / map.tileSize);
        const endRow = Math.floor((entity.y + entity.height) / map.tileSize);

        entity.onGround = false;

        for (let row = startRow; row <= endRow; row++) {
            for (let col = startCol; col <= endCol; col++) {
                const tile = map.getTile(col, row);
                if (tile && tile.solid) {
                    const tileRect = {
                        x: col * map.tileSize,
                        y: row * map.tileSize,
                        width: map.tileSize,
                        height: map.tileSize
                    };

                    if (this.checkCollision(entity, tileRect)) {
                        const side = this.resolveBoxCollision(entity, tileRect);
                        if (onCollision) onCollision(side, tile);
                    }
                }
            }
        }
    }

    resolveBoxCollision(entity, wall) {
        // Calculate overlap
        const dx = (entity.x + entity.width / 2) - (wall.x + wall.width / 2);
        const dy = (entity.y + entity.height / 2) - (wall.y + wall.height / 2);
        const width = (entity.width + wall.width) / 2;
        const height = (entity.height + wall.height) / 2;
        const crossWidth = width * dy;
        const crossHeight = height * dx;

        let side = null;

        if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
            if (crossWidth > crossHeight) {
                if (crossWidth > -crossHeight) {
                    // Bottom collision (Entity hitting ceiling)
                    entity.y = wall.y + wall.height;
                    entity.velY = 0;
                    side = 'bottom';
                } else {
                    // Left collision (Entity hitting right side of wall)
                    entity.x = wall.x - entity.width;
                    entity.velX = 0;
                    side = 'left';
                }
            } else {
                if (crossWidth > -crossHeight) {
                    // Right collision (Entity hitting left side of wall)
                    entity.x = wall.x + wall.width;
                    entity.velX = 0;
                    side = 'right';
                } else {
                    // Top collision (Entity landing on floor)
                    entity.y = wall.y - entity.height;
                    entity.velY = 0;
                    entity.onGround = true;
                    side = 'top';
                }
            }
        }
        return side;
    }
}
