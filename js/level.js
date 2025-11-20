class Level {
    constructor() {
        this.tileSize = 16;
        this.width = 0;
        this.height = 15; // 240px / 16px
        this.tiles = [];
        this.entities = [];

        // Simple level layout
        // 0: Air, 1: Ground, 2: Question, 3: Pipe, P: Player, E: Goomba, F: Flag
        const levelString = [
            "................................................................................",
            "................................................................................",
            "................................................................................",
            "................................................................................",
            "................................................................................",
            "................................................................................",
            "................................................................................",
            "................................................................................",
            "................................................................................",
            "................................................................................",
            "...................2.2.2........................................................",
            "................................................................................",
            "................................................................................",
            "...................................33.......................................F...",
            "11111111111111111111111111111111111111111111111111111111111111111111111111111111"
        ];

        // Add some more features programmatically or manually edit above
        // Let's parse the string
        this.parseLevel(levelString);
    }

    parseLevel(rows) {
        this.height = rows.length;
        this.width = rows[0].length;
        this.tiles = new Array(this.width * this.height).fill(null);

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const char = rows[y][x];
                let type = 0;
                let solid = false;

                if (char === '1') { type = 1; solid = true; }
                else if (char === '2') { type = 2; solid = true; } // Question block acts as solid
                else if (char === '3') { type = 3; solid = true; }
                else if (char === 'F') { type = 'F'; solid = false; } // Flag is not solid collision-wise usually, but trigger

                // Spawns are handled by Game class reading this, or we store them
                if (char === 'P') { /* Player Spawn marker */ }
                if (char === 'E') { /* Enemy Spawn marker */ }

                if (type !== 0) {
                    this.setTile(x, y, { type, solid });
                }
            }
        }

        // Manually add some entities for now
        this.initialEntities = [
            { type: 'player', x: 50, y: 100 },
            { type: 'goomba', x: 300, y: 200 },
            { type: 'goomba', x: 400, y: 200 },
            { type: 'coin', x: 310, y: 150 }
        ];
    }

    getTile(col, row) {
        if (col < 0 || col >= this.width || row < 0 || row >= this.height) return null;
        return this.tiles[row * this.width + col];
    }

    setTile(col, row, data) {
        if (col >= 0 && col < this.width && row >= 0 && row < this.height) {
            this.tiles[row * this.width + col] = data;
        }
    }
}
