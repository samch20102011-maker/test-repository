const rows = 20;
const cols = 20;
const game = document.getElementById('game');

let playerPos = { x: 0, y: 0 }; // top-left corner

// Create tiles
for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');

        // If this is the player's position, add player class
        if (x === playerPos.x && y === playerPos.y) {
            tile.classList.add('player');
        }

        game.appendChild(tile);
    }
}
