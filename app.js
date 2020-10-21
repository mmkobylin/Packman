document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid')

    const scoreDisplay = document.getElementById('score');

    const width = 28 // 28 x 28 = 784 squares

    //layout legend: 

    // 0 - pac dot
    // 1 - wall
    // 2 - ghost-lair
    // 3 - powerball 
    // 4 - empty

    const layout = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
      ];

    //drawing the grid

    const squares = [];

      function createBoard() {
          //adding the layout items to the squares
          for (let i=0; i < layout.length; i++) {
              const square = document.createElement('div')
              grid.appendChild(square)
              squares.push(square);

            if(layout[i] === 0) {
                squares[i].classList.add('pac-dot')
            } else if (layout[i] === 1) {
            squares[i].classList.add('wall')
            } else if (layout[i] === 3) {
            squares[i].classList.add('power-pellet')
            } else if (layout[i] === 2)
            squares[i].classList.add('ghost-lair')
        }
    }

createBoard()

let pacmanIndex = 490; 

squares[pacmanIndex].classList.add('pac-man')

        // //arrow legend: 
        // left arrow	37
        // up arrow	38
        // right arrow	39
        // down arrow	40

//this is where you move the packman using arrows-triggered event
function movePacman(e) {
    squares[pacmanIndex].classList.remove('pac-man')
    switch(e.keyCode) {
        case 37: 
            if (pacmanIndex % width !== 0 && !squares[pacmanIndex -1].classList.contains('wall')
            && !squares[pacmanIndex -1].classList.contains('ghostlair')) 
            pacmanIndex -=1;
            break 
        case 38: 
            if (pacmanIndex - width >= 0 && !squares[pacmanIndex - width].classList.contains('wall')
            && !squares[pacmanIndex - width].classList.contains('ghost-lair')) 
            pacmanIndex -=width;
            break
        case 39: 
            if (pacmanIndex % width < width-1 && !squares[pacmanIndex+1].classList.contains('wall')
            && !squares[pacmanIndex+1].classList.contains('ghost-lair')) 
            pacmanIndex +=1;
            break 
        case 40: 
        if (pacmanIndex + width < width * width && !squares[pacmanIndex + width].classList.contains('wall')
            && !squares[pacmanIndex + width].classList.contains('ghost-lair')) 
            pacmanIndex +=width;
            break
        }

        squares[pacmanIndex].classList.add('pac-man')

        //pacDotEaten()
        //powerPelletEaten()
        //checkForGameOver
        //checkFor win

    }

document.addEventListener('keyup', movePacman)
}
);