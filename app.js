document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid')

    const scoreDisplay = document.getElementById('score');

    const width = 28 // 28 x 28 = 784 squares

    let score = 0;

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
            } else if (layout[i] === 2) {
            squares[i].classList.add('ghost-lair')
            } else if (layout[i] === 3) {
            squares[i].classList.add('power-pellet')
            }                
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
            && !squares[pacmanIndex -1].classList.contains('ghost-lair')) 
            pacmanIndex -=1

            //checking for 'portal' 

            if (pacmanIndex - 1 === 363 )
            pacmanIndex = 391;

            break 

        case 38: 
            if (pacmanIndex - width >= 0 && !squares[pacmanIndex - width].classList.contains('wall')
            && !squares[pacmanIndex - width].classList.contains('ghost-lair')) 
            pacmanIndex -=width;
            break
        case 39: 
            if (pacmanIndex % width < width-1 && !squares[pacmanIndex+1].classList.contains('wall')
            && !squares[pacmanIndex+1].classList.contains('ghost-lair')) 
            pacmanIndex +=1

            if (pacmanIndex +1 === 391) 
            pacmanIndex = 364;
            break 
        case 40: 
        if (pacmanIndex + width < width * width && !squares[pacmanIndex + width].classList.contains('wall')
            && !squares[pacmanIndex + width].classList.contains('ghost-lair')) 
            pacmanIndex +=width;
            break
        }

        squares[pacmanIndex].classList.add('pac-man')

        pacDotEaten()
        powerPelletEaten()
        //checkForGameOver
        //checkFor win

    }

document.addEventListener('keyup', movePacman)

function pacDotEaten(){
    if (squares[pacmanIndex].classList.contains('pac-dot')){
        score+=1
        scoreDisplay.innerHTML = score
        squares[pacmanIndex].classList.remove('pac-dot')
    }
}

function powerPelletEaten(){
    if (squares[pacmanIndex].classList.contains('power-pellet')){
        score+=10
        scoreDisplay.innerHTML = score
        squares[pacmanIndex].classList.remove('power-pellet')
    }
}


//creating ghost template
    class Ghost {

        constructor(className, startIndex, speed) {
            this.className = className;
            this.startIndex = startIndex;
            this.speed = speed;
            this.currentIndex = startIndex;
            this.timerId = NaN
        }
    } 

    ghosts = [
        new Ghost('blinky', 348, 250),
        new Ghost('pinky', 376, 400),
        new Ghost('inky', 351, 300),
        new Ghost('clyde', 379, 500),
    ]

}
);