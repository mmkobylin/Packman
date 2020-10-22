document.addEventListener('DOMContentLoaded', () => {

    //selecting the div by the class
    const grid = document.querySelector('.grid')

    //getting the score to show up later
    const scoreDisplay = document.getElementById('score');

    const width = 28 // 28 x 28 = 784 squares
    
    //initial value
    let score = 0

    //layout legend: 

    // 0 - pac dot
    // 1 - wall
    // 2 - ghost-lair
    // 3 - powerball 
    // 4 - empty

    //drawing the grid

    const layout = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,0,0,0,0,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,0,1,1,
        1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,
        1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
      ];
    
    //an empty array to draw different types information
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
    
    //creating initial pacman placement
    let pacmanIndex = 490; 

    squares[pacmanIndex].classList.add('pac-man')

        // //arrow legend: 
        // left arrow	37
        // up arrow	38
        // right arrow	39
        // down arrow	40

    //this is where you move the packman using arrows-triggered event
    function movePacman(e) {
        //first, i get rid of 'old' pacman
        squares[pacmanIndex].classList.remove('pac-man')
        //event triggered
        switch(e.keyCode) {
            case 37: 
                // checking for walls and ghost lair
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
            checkForGameOver()
            checkForWin()

        }

    document.addEventListener('keyup', movePacman)

    // eating pellets - deleting pellets and adding score
    function pacDotEaten(){
        if (squares[pacmanIndex].classList.contains('pac-dot')){
            score+=1
            scoreDisplay.innerHTML = score
            squares[pacmanIndex].classList.remove('pac-dot')
        }
    }
    
    // eating power pellets - deleting pellets and adding score and scaring ghosts
    function powerPelletEaten(){
        if (squares[pacmanIndex].classList.contains('power-pellet')){
            score+=10
            ghosts.forEach(ghost => ghost.isScared = true)
            setTimeout(unScareGhosts, 10000)
            squares[pacmanIndex].classList.remove('power-pellet')
        }
    }

    function unScareGhosts() {
        ghosts.forEach(ghost => ghost.isScared = false)
    }


    //creating ghost template 
    class Ghost {
        //constructor - this values ghost is assigned at the beginning
        constructor(className, startIndex, speed) {
            this.className = className
            this.startIndex = startIndex
            this.speed = speed
            this.currentIndex = startIndex
            this.timerId = NaN
            this.isScared = false
        }
    } 
    
    //declaring ghosts in an array
    ghosts = [
        new Ghost('blinky', 348, 250),
        new Ghost('pinky', 376, 400),
        new Ghost('inky', 351, 300),
        new Ghost('clyde', 379, 500)
    ]

    //drawing a ghost
    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.add(ghost.className)

        squares[ghost.currentIndex].classList.add('ghost')

    })

    //move ghosts at random 
    ghosts.forEach(ghost => moveGhost(ghost))

    //get coordinates for pacman
    function getCoordinates (index) {
        return (index % width, Math.floor(index))
    }

    //moving ghosts
    function moveGhost(ghost) {
        //direction options
        const directions = [1, -1, width, -width]

        //randomising
        let direction = directions[Math.floor(Math.random() * directions.length)]

        //checking if one can go there
        ghost.timerId = setInterval(function() {
            if (!squares[ghost.currentIndex + direction].classList.contains('wall') 
            && !squares[ghost.currentIndex + direction].classList.contains('ghost')) {
                //ghost can move here
                //remove all ghost classes
                squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost', ghost.className)
                //change the current index: 
                ghost.currentIndex += direction
                //redraw the ghost: 
                squares[ghost.currentIndex].classList.add('ghost', ghost.className)
            }

            else direction = directions[Math.floor(Math.random() * directions.length)]
                
            if (ghost.isScared) {
                squares[ghost.currentIndex].classList.add('scared-ghost')
            }

            if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
                squares[ghost.currentIndex].classList.remove(ghost.className, 'scared-ghost', 'ghost')
                ghost.currentIndex = ghost.startIndex            
                score +=100
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
            }

            //

        checkForGameOver()
        checkForWin()

    }, ghost.speed)
    }

    //check for gameover
    function checkForGameOver() {
        if (squares[pacmanIndex].classList.contains('ghost') 
        && !squares[pacmanIndex].classList.contains('scared-ghost')) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener('keyup', movePacman)
            setTimeout(function(){alter('GAME OVER')
        }, 500)
            scoreDisplay.innerHTML = 'GAME OVER'
        }
    }

    function checkForWin() {
        if (score === 284) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener('keyup', movePacman)
            scoreDisplay.innerHTML = 'VICTORY!'
            
            }
        }
    }
);