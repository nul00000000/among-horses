const MAP_WIDTH = 100;
const MAP_HEIGHT = 100;

const TILE_WIDTH = 128;
const TILE_HEIGHT = 72;

const WINDOW_WIDTH = window.innerWidth;
const WINDOW_HEIGHT = window.innerHeight;

let px = 0;
let py = 0;
let x = 0;
let y = 0;

let tileImgs = [];
let playerImg;

let tiles;

let keys = [];
let jKeys = [];

let AIR = 0;
let CACTUS = 1;
let ROCK = 2;

let right = true;

let moveProgress = 0;

let mX = 0;
let mY = 0;

let bx = 0;
let by = 0;

let buts = [];
let jButs = [];

function setup() {
    createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
    frameRate(60);

    tileImgs[AIR] = loadImage('assets/cactus.png');
    tileImgs[CACTUS] = loadImage('assets/cactus.png');
    tileImgs[ROCK] = loadImage('assets/rock.png');
    playerImg = loadImage('assets/player.png');

    tiles = [];
    for(let i = 0; i < MAP_WIDTH; i++) {
        tiles.push([]);
        for(let j = 0; j < MAP_HEIGHT; j++) {
            tiles[i].push(0);
        }
    }
    for(let i = 0; i < 50; i++) {
        tiles[Math.round(Math.random() * (MAP_WIDTH - 1))][Math.round(Math.random() * (MAP_HEIGHT - 1))] = CACTUS;
    }
    for(let i = 0; i < 150; i++) {
        tiles[Math.round(Math.random() * (MAP_WIDTH - 1))][Math.round(Math.random() * (MAP_HEIGHT - 1))] = ROCK;
    }

}

function draw() {
    bx = Math.round((mX - WINDOW_WIDTH / 2) / TILE_WIDTH) + MAP_WIDTH / 2 + (px + (x - px) * moveProgress);

    if(moveProgress == 0) {
        px = x;
        py = y;
        if(keys[87]) {
            y--;
            moveProgress = 0.05;
        }
        if(keys[65]) {
            right = false;
            x--;
            moveProgress = 0.05;
        }
        if(keys[83]) {
            y++;
            moveProgress = 0.05;
        }
        if(keys[68]) {
            right = true;
            x++;
            moveProgress = 0.05;
        }
    } else if(moveProgress >= 1.0) {
        moveProgress = 0;
        px = x;
        py = y;
    } else {
        moveProgress += 0.05;
    }

    if(tiles[x + 50][y + 50] != AIR) {
        x = px;
        y = py;
    }

    if(x < -MAP_WIDTH / 2) {
        x = -MAP_WIDTH / 2;
    }
    if(x >= MAP_WIDTH / 2) {
        x = MAP_WIDTH / 2 - 1;
    }
    if(y < -MAP_HEIGHT / 2) {
        y = -MAP_HEIGHT / 2;
    }
    if(y >= MAP_HEIGHT / 2) {
        y = MAP_HEIGHT / 2 - 1;
    }

    for(let i = 0; i < keys.length; i++) {
        jKeys[i] = false;
    }



    //draw
    background(246, 230, 130);
    for(let i = 0; i < MAP_WIDTH; i++) {
        for(let j = 0; j < y + MAP_HEIGHT / 2 + 1; j++) {
            if(tiles[i][j] != 0) {
                image(tileImgs[tiles[i][j]], (i - (px + (x - px) * moveProgress) - MAP_WIDTH / 2) * TILE_WIDTH - TILE_WIDTH / 2 + WINDOW_WIDTH / 2, (j - (py + (y - py) * moveProgress) - MAP_HEIGHT / 2) * TILE_HEIGHT + TILE_HEIGHT / 2 - TILE_WIDTH / 2 + WINDOW_HEIGHT / 2, TILE_WIDTH, TILE_WIDTH);
            }
        }
    }
    if(right) {
        image(playerImg, WINDOW_WIDTH / 2 - TILE_WIDTH / 2, WINDOW_HEIGHT / 2 + TILE_HEIGHT / 2 - TILE_WIDTH / 2, TILE_WIDTH, TILE_WIDTH);
    } else {
        scale(-1, 1);
        image(playerImg, -(WINDOW_WIDTH / 2 + TILE_WIDTH / 2), WINDOW_HEIGHT / 2 + TILE_HEIGHT / 2 - TILE_WIDTH / 2, TILE_WIDTH, TILE_WIDTH);
        scale(-1, 1);
    }
    for(let i = 0; i < MAP_WIDTH; i++) {
        for(let j = y + MAP_HEIGHT / 2 + 1; j < MAP_HEIGHT; j++) {
            if(tiles[i][j] != 0) {
                image(tileImgs[tiles[i][j]], (i - (px + (x - px) * moveProgress) - MAP_WIDTH / 2) * TILE_WIDTH - TILE_WIDTH / 2 + WINDOW_WIDTH / 2, (j - (py + (y - py) * moveProgress) - MAP_HEIGHT / 2) * TILE_HEIGHT + TILE_HEIGHT / 2 - TILE_WIDTH / 2 + WINDOW_HEIGHT / 2, TILE_WIDTH, TILE_WIDTH);
            }
        }
    }
    
    rect((bx - (px + (x - px) * moveProgress) - MAP_WIDTH / 2) * TILE_WIDTH - TILE_WIDTH / 2 + WINDOW_WIDTH / 2, (50 - (py + (y - py) * moveProgress) - MAP_HEIGHT / 2) * TILE_HEIGHT + TILE_HEIGHT / 2 - TILE_WIDTH / 2 + WINDOW_HEIGHT / 2, TILE_WIDTH, TILE_HEIGHT);
}

function keyPressed() {
    jKeys[keyCode] = true;
    keys[keyCode] = true;
}

function keyReleased() {
    jKeys[keyCode] = false;
    keys[keyCode] = false;
}

function mouseMoved() {
    mX = mouseX;
    mY = mouseY;

    bx = (x - WINDOW_WIDTH / 2 + TILE_WIDTH / 2) / TILE_WIDTH + MAP_WIDTH / 2 + (px + (x - px) * moveProgress);
}