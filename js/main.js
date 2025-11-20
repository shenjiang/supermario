window.onload = function () {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const renderer = new Renderer(ctx);
    const game = new Game(canvas.width, canvas.height);

    function loop() {
        game.update();
        game.draw(renderer);
        requestAnimationFrame(loop);
    }

    loop();
};
