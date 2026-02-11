import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import './GameMaze.css';

const mazeIndex = [
   9,  8, 19,  7, 18, 29,  6, 17, 28, 39,
   5, 16, 27, 38, 49,  4, 15, 26, 37, 48,
  59,  3, 14, 25, 36, 47, 58, 69,  2, 13,
  24, 35, 46, 57, 68, 79,  1, 12, 23, 34,
  45, 56, 67, 78, 89,  0, 11, 22, 33, 44,
  55, 66, 77, 88, 99, 10, 21, 32, 43, 54,
  65, 76, 87, 98, 20, 31, 42, 53, 64, 75,
  86, 97, 30, 41, 52, 63, 74, 85, 96, 40,
  51, 62, 73, 84, 95, 50, 61, 72, 83, 94,
  60, 71, 82, 93, 70, 81, 92, 80, 91, 90
];

const playerIndex = [
  [45, 36, 28, 21, 15, 10,  6,  3,  1,  0],
  [55, 46, 37, 29, 22, 16, 11,  7,  4,  2],
  [64, 56, 47, 38, 30, 23, 17, 12,  8,  5],
  [72, 65, 57, 48, 39, 31, 24, 18, 13,  9],
  [79, 73, 66, 58, 49, 40, 32, 25, 19, 14],
  [85, 80, 74, 67, 59, 50, 41, 33, 26, 20],
  [90, 86, 81, 75, 68, 60, 51, 42, 34, 27],
  [94, 91, 87, 82, 76, 69, 61, 52, 43, 35],
  [97, 95, 92, 88, 83, 77, 70, 62, 53, 44],
  [99, 98, 96, 93, 89, 84, 78, 71, 63, 54],
];

const playerXY = [[0, -0], [1, -0.5], [1, 0.5], [2, -1], [2, 0], [2, 1], [3, -1.5], [3, -0.5], [3, 0.5], [3, 1.5], [4, -2], [4, -1], [4, 0], [4, 1], [4, 2], [5, -2.5], [5, -1.5], [5, -0.5], [5, 0.5], [5, 1.5], [5, 2.5], [6, -3], [6, -2], [6, -1], [6, 0], [6, 1], [6, 2], [6, 3], [7, -3.5], [7, -2.5], [7, -1.5], [7, -0.5], [7, 0.5], [7, 1.5], [7, 2.5], [7, 3.5], [8, -4], [8, -3], [8, -2], [8, -1], [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [9, -4.5], [9, -3.5], [9, -2.5], [9, -1.5], [9, -0.5], [9, 0.5], [9, 1.5], [9, 2.5], [9, 3.5], [9, 4.5], [10, -4], [10, -3], [10, -2], [10, -1], [10, 0], [10, 1], [10, 2], [10, 3], [10, 4], [11, -3.5], [11, -2.5], [11, -1.5], [11, -0.5], [11, 0.5], [11, 1.5], [11, 2.5], [11, 3.5], [12, -3], [12, -2], [12, -1], [12, 0], [12, 1], [12, 2], [12, 3], [13, -2.5], [13, -1.5], [13, -0.5], [13, 0.5], [13, 1.5], [13, 2.5], [14, -2], [14, -1], [14, 0], [14, 1], [14, 2], [15, -1.5], [15, -0.5], [15, 0.5], [15, 1.5], [16, -1], [16, 0], [16, 1], [17, -0.5], [17, 0.5], [18, 0]];

const gameLevels = [
  {
    player: {
      row: 2,
      col: 5,
      dir: 'south'
    },
    maze: [
      [2, 2, 2, 0, 0, 0, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 0, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 0, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 0, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 9, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 0, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 0, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 0, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 0, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 0, 0, 3, 3, 3]
    ]
  },
  {
    player: {
      row: 2,
      col: 5,
      dir: 'south'
    },
    maze: [
      [2, 2, 2, 0, 0, 0, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 0, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 0, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 0, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 9, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 0, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 9, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 0, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 0, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 0, 0, 3, 3, 3]
    ]
  },
  {
    player: {
      row: 2,
      col: 5,
      dir: 'south'
    },
    maze: [
      [2, 2, 2, 0, 0, 0, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 0, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 0, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 0, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 6, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 0, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 6, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 0, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 0, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 0, 0, 3, 3, 3]
    ]
  },
  {
    player: {
      row: 2,
      col: 5,
      dir: 'south'
    },
    maze: [
      [2, 2, 2, 0, 0, 0, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 0, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 0, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 9, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 9, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 9, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 9, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 0, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 0, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 0, 0, 3, 3, 3]
    ]
  }
];

function GameMaze({level}) {
  const [playerPos, setPlayerPos] = React.useState(gameLevels[level].player);
  const [mazeData, setMazeData] = React.useState(() => gameLevels[level].maze.map(row => [...row]));
  const [farmerSprite, setFarmerSprite] = React.useState(0);
  const imagesRef = React.useRef(null);
  const playerPosRef = React.useRef(playerPos);
  playerPosRef.current = playerPos;
  const mazeDataRef = React.useRef(mazeData);
  mazeDataRef.current = mazeData;

  const onResizeWindow = () => {
    const canvas = document.getElementById('canvas');
    //get window height
    const height = window.innerHeight;
    //set canvas top as height percentage
    const top = 200 - (1973*(window.innerWidth/3439) - window.innerHeight)/2;
    canvas.style.top = `${top}px`;
  };

  const resetGame = () => {
    setPlayerPos(gameLevels[level].player);
    setMazeData(gameLevels[level].maze.map(row => [...row]));
  };

  const walkSteps = (steps) => {
    let newPlayerPos = {...playerPos};
    // eslint-disable-next-line default-case
    switch (playerPos.dir) {
      case 'north':
        newPlayerPos.row -= steps;
        if (newPlayerPos.row < 0) {
          newPlayerPos.row = 0;
        }
        break;
      case 'south':
        newPlayerPos.row += steps;
        if (newPlayerPos.row > 9) {
          newPlayerPos.row = 9;
        }
        break;
      case 'east':
        newPlayerPos.col += steps;
        if (newPlayerPos.col > 9) {
          newPlayerPos.col = 9;
        }
        break;
      case 'west':
        newPlayerPos.col -= steps;
        if (newPlayerPos.col < 0) {
          newPlayerPos.col = 0;
        }
        break;
    }
    setPlayerPos(newPlayerPos);
  }

  const turnLeft = () => {
    let newPlayerPos = {...playerPos};
    // eslint-disable-next-line default-case
    switch (playerPos.dir) {
      case 'north':
        newPlayerPos.dir = 'west';
        break;
      case 'south':
        newPlayerPos.dir = 'east';
        break;
      case 'east':
        newPlayerPos.dir = 'north';
        break;
      case 'west':
        newPlayerPos.dir = 'south';
        break;
    }
    setPlayerPos(newPlayerPos);
  };

  const turnRight = () => {
    let newPlayerPos = {...playerPos};
    // eslint-disable-next-line default-case
    switch (playerPos.dir) {
      case 'north':
        newPlayerPos.dir = 'east';
        break;
      case 'south':
        newPlayerPos.dir = 'west';
        break;
      case 'east':
        newPlayerPos.dir = 'south';
        break;
      case 'west':
        newPlayerPos.dir = 'north';
        break;
    }
    setPlayerPos(newPlayerPos);
  };

  const turnBackward = () => {
    let newPlayerPos = {...playerPos};
    // eslint-disable-next-line default-case
    switch (playerPos.dir) {
      case 'north':
        newPlayerPos.dir = 'south';
        break;
      case 'south':
        newPlayerPos.dir = 'north';
        break;
      case 'east':
        newPlayerPos.dir = 'west';
        break;
      case 'west':
        newPlayerPos.dir = 'east';
        break;
    }
    setPlayerPos(newPlayerPos);
  };

  const updateTile = (row, col, newType) => {
    setMazeData(prev => {
      const next = prev.map(r => [...r]);
      next[row][col] = newType;
      return next;
    });
  };

  const playCollectAnimation = () => {
    setFarmerSprite(1);
    setTimeout(() => setFarmerSprite(0), 500);
  };

  const collectTomato = (num) => {
    const pos = playerPosRef.current;
    const data = mazeDataRef.current;
    const visualRow = Math.max(0, pos.row - 1);
    updateTile(visualRow, pos.col, Math.max(0, data[visualRow][pos.col] - num));
    playCollectAnimation();
  };

  const collectCorn = (num) => {
    const pos = playerPosRef.current;
    const data = mazeDataRef.current;
    const visualRow = Math.max(0, pos.row - 1);
    updateTile(visualRow, pos.col, Math.max(0, data[visualRow][pos.col] - num));
    playCollectAnimation();
  };

  const isLevelComplete = () => {
    const data = mazeDataRef.current;
    return !data.some(row => row.some(tile => tile >= 7));
  };

  window.resetGame = resetGame;
  window.walkSteps = walkSteps;
  window.turnLeft = turnLeft;
  window.turnRight = turnRight;
  window.turnBackward = turnBackward;
  window.updateTile = updateTile;
  window.collectTomato = collectTomato;
  window.collectCorn = collectCorn;
  window.isLevelComplete = isLevelComplete;

  const mazeTile = useCallback((counter) => {
    const index = mazeIndex[counter];
    const row = Math.floor(index / 10);
    const col = index % 10;
    return mazeData[row][col];
  }, [mazeData]);

  useEffect(() => {
    window.addEventListener('resize', onResizeWindow);
    return () => {
      window.removeEventListener('resize', onResizeWindow);
    };
  }, []);

  useEffect(() => {
    setPlayerPos(gameLevels[level].player);
    setMazeData(gameLevels[level].maze.map(row => [...row]));
  }, [level]);

  useEffect(() => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const logicalW = 1000;
    const logicalH = 800;
    canvas.width = logicalW * dpr;
    canvas.height = logicalH * dpr;
    canvas.style.width = logicalW + 'px';
    canvas.style.height = logicalH + 'px';
    ctx.scale(dpr, dpr);
    // Grid: halfCell = horizontal half-step
    // Tile diamond in 1500×1500 image: width=1310, half-height=376, top vertex at y=620
    const halfCell = 44;
    const vStep = halfCell * 376 / 655;
    // Render size derived so rendered diamond width = 2*halfCell exactly
    const tileW = 2 * halfCell * 1500 / 1310;
    const tileH = tileW;
    // Offsets align diamond within tile to grid positions:
    // xOff centers diamond horizontally, yOff places diamond top at grid y
    const xOff = tileW / 2 - halfCell;
    const yOff = tileH * 620 / 1500;
    // Center diamond field vertically (field spans 20*vStep top-to-bottom)
    const yStart = Math.round((logicalH - 20 * vStep) / 2) - 19;

    const drawTile = (img, x, y) => {
      ctx.drawImage(img, x - xOff, y - yOff, tileW, tileH);
    }
    const drawPlayer = (img, x, y) => {
      ctx.drawImage(img, x, y, halfCell * 2, halfCell * 2);
    }
    const cx = Math.round(logicalW / 2);
    const drawMaze = (tile) => {
      let counter = 0;
      for(let i = 0; i < 10; i++) {
        for(let jh = -i; jh <= i; jh += 2) {
          drawTile(tile[mazeTile(counter++)], cx + jh * halfCell, i * vStep + yStart);
        }
      }
      for(let i = 9; i > 0; i--) {
        for(let jh = -i + 1; jh <= i; jh += 2) {
          drawTile(tile[mazeTile(counter++)], cx + jh * halfCell, (19 - i) * vStep + yStart);
        }
      }
    }
    // Player sprite anchor: feet at (0.424 * width, bottom) in source image
    const playerFootX = Math.round(halfCell * 2 * 284 / 670) + 20;
    const drawScene = (tile, player) => {
      ctx.clearRect(0, 0, logicalW, logicalH);
      drawMaze(tile);
      const pos = playerXY[playerIndex[playerPos.row][playerPos.col]];
      const ph = Math.round(pos[1] * 2);
      const gridY = pos[0] < 10
        ? pos[0] * vStep + yStart
        : (19 - pos[0]) * vStep + yStart;
      // Place farmer feet on tile
      drawPlayer(player[farmerSprite], cx + ph * halfCell - playerFootX, gridY - halfCell * 2 - 2);
    };

    if (imagesRef.current) {
      // Images already loaded — draw immediately
      const { tile, player } = imagesRef.current;
      drawScene(tile, player);
    } else {
      // First render — load all tile images (0-9) and player
      const tile = [];
      for (let i = 0; i < 10; i++) tile.push(new Image());
      const player = [new Image(), new Image()];
      let loaded = 0;
      const totalImages = tile.length + player.length;
      const onLoad = () => {
        loaded++;
        if (loaded >= totalImages) {
          imagesRef.current = { tile, player };
          drawScene(tile, player);
        }
      };
      tile.forEach(img => { img.onload = onLoad; });
      player[0].onload = onLoad;
      player[1].onload = onLoad;
      player[0].src = '/images/player/farmer1.png';
      player[1].src = '/images/player/farmer2.png';
      for (let i = 0; i < 10; i++) {
        tile[i].src = `/images/maze/tile${i}.png`;
      }
    }
  }, [level, mazeTile, playerPos.col, playerPos.row, farmerSprite]);

  return (
    <div className="GameMaze">
      <canvas id="canvas" width="900" height="800" />
    </div>
  )
}

GameMaze.propTypes = {
  level: PropTypes.number.isRequired
}

export default GameMaze
