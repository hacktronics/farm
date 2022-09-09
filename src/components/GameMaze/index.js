import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './GameMaze.css';

const maze = [
  [
    [          3],
    [         3, 3],
    [        3, 3, 3],
    [       0, 3, 3, 3],
    [      0, 0, 3, 3, 3],
    [     0, 0, 0, 3, 3, 3],
    [    0, 0, 0, 0, 3, 3, 3],
    [   2, 0, 0, 0, 0, 3, 3, 3],
    [ 2, 2, 0, 0, 5, 0, 3, 3, 3],
    [2, 2, 2, 0, 0, 0, 0, 3, 3, 3],
    [  2, 2, 2, 0, 0, 0, 0, 3, 3],
    [    2, 2, 2, 0, 0, 0, 0, 3],
    [      2, 2, 2, 0, 0, 0, 0],
    [       2, 2, 2, 0, 0, 0],
    [         2, 2, 2, 0, 0],
    [           2, 2, 2, 0],
    [             2, 2, 2],
    [               2, 2],
    [                 2]
  ],
  [
    [          3],
    [         3, 3],
    [        3, 3, 3],
    [       0, 3, 3, 3],
    [      0, 0, 3, 3, 3],
    [     0, 0, 0, 3, 3, 3],
    [    0, 0, 0, 0, 3, 3, 3],
    [   2, 0, 0, 0, 0, 3, 3, 3],
    [ 2, 2, 0, 0, 5, 0, 3, 3, 3],
    [2, 2, 2, 0, 0, 0, 0, 3, 3, 3],
    [  2, 2, 2, 0, 0, 5, 0, 3, 3],
    [    2, 2, 2, 0, 0, 0, 0, 3],
    [      2, 2, 2, 0, 0, 0, 0],
    [       2, 2, 2, 0, 0, 0],
    [         2, 2, 2, 0, 0],
    [           2, 2, 2, 0],
    [             2, 2, 2],
    [               2, 2],
    [                 2]
  ],
  [
    [          3],
    [         3, 3],
    [        3, 3, 3],
    [       0, 3, 3, 3],
    [      0, 0, 3, 3, 3],
    [     0, 0, 0, 3, 3, 3],
    [    0, 0, 0, 0, 3, 3, 3],
    [   2, 0, 0, 0, 0, 3, 3, 3],
    [ 2, 2, 0, 0, 6, 0, 3, 3, 3],
    [2, 2, 2, 0, 0, 0, 0, 3, 3, 3],
    [  2, 2, 2, 0, 0, 6, 0, 3, 3],
    [    2, 2, 2, 0, 0, 0, 0, 3],
    [      2, 2, 2, 0, 0, 0, 0],
    [       2, 2, 2, 0, 0, 0],
    [         2, 2, 2, 0, 0],
    [           2, 2, 2, 0],
    [             2, 2, 2],
    [               2, 2],
    [                 2]
  ],
  [
    [          3],
    [         3, 3],
    [        3, 3, 3],
    [       0, 3, 3, 3],
    [      0, 0, 3, 3, 3],
    [     0, 0, 0, 3, 3, 3],
    [    0, 0, 0, 0, 3, 3, 3],
    [   2, 0, 0, 5, 0, 3, 3, 3],
    [ 2, 2, 0, 0, 5, 0, 3, 3, 3],
    [2, 2, 2, 0, 0, 5, 0, 3, 3, 3],
    [  2, 2, 2, 0, 0, 5, 0, 3, 3],
    [    2, 2, 2, 0, 0, 0, 0, 3],
    [      2, 2, 2, 0, 0, 0, 0],
    [       2, 2, 2, 0, 0, 0],
    [         2, 2, 2, 0, 0],
    [           2, 2, 2, 0],
    [             2, 2, 2],
    [               2, 2],
    [                 2]
  ]
];

const movePlayer = null;
let playerPos = null;

function GameMaze({level}) {
  const [step, setStep] = React.useState(1);

  const onResizeWindow = () => {
    const canvas = document.getElementById('canvas');
    //get window height
    const height = window.innerHeight;
    //set canvas top as height percentage
    const top = 210 - (1973*(window.innerWidth/3439) - window.innerHeight)/2;
    canvas.style.top = `${top}px`;
  };

  useEffect(() => {
    window.addEventListener('resize', onResizeWindow);
    return () => {
      window.removeEventListener('resize', onResizeWindow);
    };
  }, []);

  useEffect(() => {
    window.movePlayer = setStep;
    window.playerPos = step;
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
      for(let i = 0; i < 10; i++) {
        for(let j = -0.5*i; j <= 0.5*i; j++) {
          drawImage(tile[maze[level-1][i][j+0.5*i]], width/2 + j*cellSize, (0.40*i)*cellSize + 30);
        }
      }
      for(let i = 9; i > 0; i--) {
        for(let j = -0.5*i+0.5; j <= 0.5*i; j++) {
          drawImage(tile[maze[level-1][19 - i][j+0.5*i-0.5]], width/2 + j*cellSize, (7.6-0.40*i)*cellSize + 30);
        }
      }
    }
    tile[0].onload=function(){
      setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawMaze();
        drawImage(player[0], width/2 - 0.5*(2-step)*cellSize - 35, (0.40*(5+step))*cellSize - 10);
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
  }, [level, step]);

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
