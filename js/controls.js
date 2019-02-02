function keyDownHandler(e) { /* Handler for keyup events */
    console.log("I was pressed!")
    e.preventDefault();

    switch(e.code) {
        case "ArrowRight":
            cursor.rightPressed = true;
            console.log("ArrowRight");
            break;
        case "Right": // IE <= 9 and FF <= 36
            console.log("right");
            cursor.rightPressed = true;
            break;
        case "KeyD":
            cursor.rightPressed = true;
            console.log("KeyD");
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            cursor.leftPressed = true;
            break;
        case "Left": // IE <= 9 and FF <= 36
            console.log("Left");
            cursor.leftPressed = true;
            break;
        case "KeyA":
            cursor.leftPressed = true;
            console.log("KeyA")
            break;
        case "ArrowUp":
            console.log("ArrowUp");
            cursor.upPressed = true;
            break;
        case "Up": // IE <= 9 and FF <= 36
            console.log("Up");
            cursor.upPressed = true;
            break;
        case "KeyW":
            cursor.upPressed = true;
            console.log("KeyW");
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            cursor.downPressed = true;
            break;
        case "Down": // IE <= 9 and FF <= 36
            console.log("Down");
            cursor.downPressed = true;
            break;
        case "KeyS":
            console.log("KeyS");
            cursor.downPressed = true;
            break;
        default:
            return;
    }
}

function keyUpHandler(e) { /* Handler for keyup events */
    e.preventDefault();

    switch(e.code) {
        case "ArrowRight":
            cursor.rightPressed = false;
            console.log("ArrowRight");
            break;
        case "Right": // IE <= 9 and FF <= 36
            console.log("right");
            cursor.rightPressed = false;
            break;
        case "KeyD":
            cursor.rightPressed = false;
            console.log("KeyD");
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            cursor.leftPressed = false;
            break;
        case "Left": // IE <= 9 and FF <= 36
            console.log("Left");
            cursor.leftPressed = false;
            break;
        case "KeyA":
            cursor.leftPressed = false;
            console.log("KeyA")
            break;
        case "ArrowUp":
            console.log("ArrowUp");
            cursor.upPressed = false;
            break;
        case "Up": // IE <= 9 and FF <= 36
            console.log("Up");
            cursor.upPressed = false;
            break;
        case "KeyW":
            cursor.upPressed = false;
            console.log("KeyW");
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            cursor.downPressed = false;
            break;
        case "Down": // IE <= 9 and FF <= 36
            console.log("Down");
            cursor.downPressed = false;
            break;
        case "KeyS":
            console.log("KeyS");
            cursor.downPressed = false;
            break;
        default:
            return;
    }
}