# Super Mario Bros. Clone

[中文版](README_zh.md) | [English](README.md)

A classic 2D platformer game inspired by Super Mario Bros., built with vanilla JavaScript and HTML5 Canvas.

## Features

- **Classic Gameplay**: Run, jump, and stomp on enemies.
- **Physics Engine**: Custom AABB collision detection for precise platforming.
- **Procedural Graphics**: All assets are generated programmatically using the Canvas API (no external image files required).
- **Level Elements**:
  - Breakable Bricks
  - Question Blocks with Coins
  - Goomba Enemies
  - Pipes and Platforms
  - Flagpole Win Condition

## How to Play

1. **Clone the repository**:
   ```bash
   git clone https://github.com/shenjiang/supermario.git
   cd supermario
   ```

2. **Run the game**:
   You can open `index.html` directly in your browser, or serve it using a local server for the best experience:
   ```bash
   # Python 3
   python3 -m http.server 8080
   ```
   Then navigate to `http://localhost:8080` in your browser.

## Controls

- **Arrow Keys**: Move Left / Right
- **Spacebar** or **Up Arrow**: Jump (Hold for higher jump)

## Project Structure

- `index.html`: Main entry point.
- `style.css`: Styling for the game container.
- `js/`:
  - `main.js`: Game loop and initialization.
  - `game.js`: Core game logic and state management.
  - `entities.js`: Player, Enemy, and Item classes.
  - `physics.js`: Collision detection and physics engine.
  - `level.js`: Level data and parsing.
  - `render.js`: Rendering logic and sprite generation.
  - `input.js`: Keyboard input handling.

## License

[MIT](LICENSE)
