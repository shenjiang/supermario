class InputHandler {
    constructor() {
        this.keys = {
            left: false,
            right: false,
            up: false,
            down: false,
            jump: false
        };

        this.keysPressed = {}; // Track single press events

        window.addEventListener('keydown', (e) => this.onKeyDown(e));
        window.addEventListener('keyup', (e) => this.onKeyUp(e));
    }

    onKeyDown(e) {
        const code = e.code;
        if (code === 'ArrowLeft') this.keys.left = true;
        if (code === 'ArrowRight') this.keys.right = true;
        if (code === 'ArrowUp' || code === 'Space') {
            if (!this.keys.jump) this.keysPressed['jump'] = true;
            this.keys.jump = true;
            this.keys.up = true;
        }
        if (code === 'ArrowDown') this.keys.down = true;
    }

    onKeyUp(e) {
        const code = e.code;
        if (code === 'ArrowLeft') this.keys.left = false;
        if (code === 'ArrowRight') this.keys.right = false;
        if (code === 'ArrowUp' || code === 'Space') {
            this.keys.jump = false;
            this.keys.up = false;
        }
        if (code === 'ArrowDown') this.keys.down = false;
    }

    isPressed(action) {
        return this.keys[action];
    }

    isJustPressed(action) {
        const pressed = this.keysPressed[action];
        this.keysPressed[action] = false; // Consume the event
        return pressed;
    }
}
