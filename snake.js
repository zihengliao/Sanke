
let blockSize = 25
let rows = 20
let cols = 20
let board 
let context

let highScore = null    // this is the highest score ive ever gotten in the game

let snakeXpos = 5
let snakeYpos = 5       // there might be a bug with this where the head is resetted each time

let eaten = true        // this is to identify if the apple has been eaten or not

let snakeComp = [[snakeXpos, snakeYpos]]      // this is a list to contain the values of the position of the snake 


let xDirection = 0
let yDirection = 0

let travellingDirection = null      // this is the current direction the snake is travelling



window.onload = () => {
    board = document.getElementById("board")
    board.height = rows * blockSize
    board.width = cols * blockSize
    context = board.getContext("2d")    // this allows me to edit the canvas

    document.addEventListener("keydown", (event) => {
        if (event.key == "a" && travellingDirection !== "right") {     // moving left
            xDirection = -1
            yDirection = 0
            travellingDirection = "left"
        }
        if (event.key == "d" && travellingDirection !== "left") {     // moving right
            xDirection = 1
            yDirection = 0
            travellingDirection = "right"
        }
        if (event.key == "w" && travellingDirection !== "down") {     // moving up
            xDirection = 0
            yDirection = -1
            travellingDirection = "up"
        }
        if (event.key == "s" && travellingDirection !== "up") {     // moving down
            xDirection = 0
            yDirection = 1
            travellingDirection = "down"
        }
    })
    
    
    





    interval = setInterval(update, 100)    // frame will update every 100 milliseconds 

}



function update() {
    context.fillStyle = "black"
    context.fillRect(0, 0, board.width, board.height)
  
    apple()

    // if the snake goes out of the area, reset the game
    if (snakeXpos < 0 || snakeXpos == 20 || snakeYpos < 0 || snakeYpos == 20) {
        location.reload()
    }
    snake()
    
    
}


// apple 
function apple() {
    if (eaten) {
        appleXpos = getRandomInt(0, cols)
        appleYpos = getRandomInt(0, rows)

        let appleInSnake = false
        // console.log([appleXpos, appleYpos])
        snakeComp.forEach((element) => {
            if (element[0] == appleXpos && element[1] == appleYpos) {
                appleInSnake = true
            }
        })

        // while loop will run if the generated apple is inside the snake 
        while (appleInSnake) {    
            appleXpos = getRandomInt(0, cols) 
            appleYpos = getRandomInt(0, rows) 
            console.log("hi")
            appleInSnake = false
        }
        
        eaten = false
    }
    
    context.fillStyle = "red"
    context.fillRect(appleXpos * blockSize, appleYpos * blockSize, blockSize, blockSize)

}





// the characteristics and the construction of the snake
function snake() {
    snakeXpos += xDirection
    snakeYpos += yDirection

    context.fillStyle = "green"
    


    // this is so the body is conjoined and gives the appearance of it moving 
    if (snakeComp.length > 1) {
        for (let i = snakeComp.length - 1; i > 0; i--) {
            snakeComp[i][0] = snakeComp[i-1][0]
            snakeComp[i][1] = snakeComp[i-1][1]
            
            if (snakeXpos == snakeComp[i][0] && snakeYpos == snakeComp[i][1]) { 
                location.reload()
            }

            context.fillRect(snakeComp[i][0] * blockSize, snakeComp[i][1] * blockSize, blockSize, blockSize)
        }
    }
    

    snakeComp[0][0] += xDirection
    snakeComp[0][1] += yDirection
    
    

    
    context.fillRect(snakeXpos * blockSize, snakeYpos * blockSize, blockSize, blockSize)

    
    // if it eats the apple, the snake gets longer
    if (snakeXpos == appleXpos && snakeYpos == appleYpos) {
        eaten = true
        // snakeComp.push(snakeComp[snakeComp.length - 1])
        snakeComp.push([snakeXpos, snakeYpos])
    }


    
}







function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}










