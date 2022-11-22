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
      [2, 2, 2, 0, 0, 5, 0, 3, 3, 3],
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
      [2, 2, 2, 0, 0, 5, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 0, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 5, 0, 3, 3, 3],
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
      [2, 2, 2, 0, 0, 5, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 5, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 5, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 5, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 0, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 0, 0, 3, 3, 3],
      [2, 2, 2, 0, 0, 0, 0, 3, 3, 3]
    ]
  }
];

function GameMaze({level}) {
  const [playerPos, setPlayerPos] = React.useState(gameLevels[level].player);

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

  window.resetGame = resetGame;
  window.walkSteps = walkSteps;
  window.turnLeft = turnLeft;
  window.turnRight = turnRight;
  window.turnBackward = turnBackward;

  const mazeTile = useCallback((counter) => {
    const index = mazeIndex[counter];
    const row = Math.floor(index / 10);
    const col = index % 10;
    return gameLevels[level].maze[row][col];
    // maze[level][i][j+0.5*i];
    // maze[level][19 - i][j+0.5*i-0.5];
  }, [level]);

  useEffect(() => {
    window.addEventListener('resize', onResizeWindow);
    return () => {
      window.removeEventListener('resize', onResizeWindow);
    };
  }, []);

  useEffect(() => {
    setPlayerPos(gameLevels[level].player);
  }, [level]);

  useEffect(() => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const cellSize = width/12;
    //draw image on canvas
    const drawImage = (img, x, y) => {
      ctx.drawImage(img, x, y, cellSize, cellSize);
    }
    //create image with world tile image
    const tile = [];
    tile.push(new Image());
    tile.push(new Image());
    tile.push(new Image());
    tile.push(new Image());
    tile.push(new Image());
    tile.push(new Image());
    tile.push(new Image());
    const player = [];
    player.push(new Image());

    //draw maze on canvas
    const drawMaze = () => {
      let counter = 0;
      for(let i = 0; i < 10; i++) {
        for(let j = -0.5*i; j <= 0.5*i; j++) {
          drawImage(tile[mazeTile(counter++)], width/2 + j*cellSize, (0.40*i)*cellSize + 40);
        }
      }
      for(let i = 9; i > 0; i--) {
        for(let j = -0.5*i+0.5; j <= 0.5*i; j++) {
          drawImage(tile[mazeTile(counter++)], width/2 + j*cellSize, (7.6-(0.40*i))*cellSize + 40);
        }
      }
    }
    tile[0].onload=function(){
      setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawMaze();
        const pos = playerXY[playerIndex[playerPos.row][playerPos.col]];
        //drawImage(player[0], width/2 - 0.5*(2-step)*cellSize - 35, (0.40*(5+step))*cellSize - 10);
        if(pos[0] < 10) {
          drawImage(player[0], width/2 + pos[1]*cellSize + 5, (0.40*pos[0])*cellSize);
        } else {
          pos[0] = 19 - pos[0];
          drawImage(player[0], width/2 + pos[1]*cellSize, (7.6-(0.40*pos[0]))*cellSize);
        }
      }, 500);
    };
    player[0].src = '/images/player/farmer1.png';
    tile[6].src = '/images/maze/tile0.png';
    tile[5].src = '/images/maze/tile5.png';
    tile[4].src = '/images/maze/tile0.png';
    tile[3].src = '/images/maze/tile3.png';
    tile[2].src = '/images/maze/tile2.png';
    tile[1].src = '/images/maze/tile1.png';
    tile[0].src = '/images/maze/tile0.png';
  }, [level, mazeTile, playerPos.col, playerPos.row]);

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
