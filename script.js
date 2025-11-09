const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const TILE_SIZE = 32;
const SCREEN_WIDTH = canvas.width / TILE_SIZE; // 20 tiles
const SCREEN_HEIGHT = canvas.height / TILE_SIZE; // 15 tiles

// Example map: 50x50 tiles
const MAP_WIDTH = 50;
const MAP_HEIGHT = 50;

// Simple map: 0 = grass, 1 = wall
const map = [];
for (let y = 0; y < MAP_HEIGHT; y++) {
    const row = [];
    for (let x = 0; x < MAP_WIDTH; x++) {
        if (x === 0 || y === 0 || x === MAP_WIDTH - 1 || y === MAP_HEIGHT - 1 || Math.random() < 0.1) {
            row.push(1); // wall
        } else {
            row.push(0); // grass
        }
    }
    map.push(row);
}

// Player
const player = { x: 25, y: 25 };

// Camera
let cameraX = 0;
let cameraY = 0;

// Keyboard input
const keys = {};
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

// Update function
function update() {
    let newX = player.x;
    let newY = player.y;

    if (keys["ArrowUp"]) newY--;
    if (keys["ArrowDown"]) newY++;
    if (keys["ArrowLeft"]) newX--;
    if (keys["ArrowRight"]) newX++;

    // Collision check
    if (map[newY] && map[newY][newX] === 0) {
        player.x = newX;
        player.y = newY;
    }

    // Update camera
    cameraX = player.x - Math.floor(SCREEN_WIDTH / 2);
    cameraY = player.y - Math.floor(SCREEN_HEIGHT / 2);

    // Clamp to map boundaries
    cameraX = Math.max(0, Math.min(cameraX, MAP_WIDTH - SCREEN_WIDTH));
    cameraY = Math.max(0, Math.min(cameraY, MAP_HEIGHT - SCREEN_HEIGHT));
}

// Draw function
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw tiles
    for (let y = 0; y < SCREEN_HEIGHT; y++) {
        for (let x = 0; x < SCREEN_WIDTH; x++) {
            const mapX = x + cameraX;
            const mapY = y + cameraY;
            const tile = map[mapY][mapX];

            ctx.fillStyle = tile === 0 ? "#6c9" : "#555";
            ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
    }

    // Draw player
    ctx.fillStyle = "#4693ebff";
    const screenX = (player.x - cameraX) * TILE_SIZE;
    const screenY = (player.y - cameraY) * TILE_SIZE;
    ctx.fillRect(screenX, screenY, TILE_SIZE, TILE_SIZE);
}

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();