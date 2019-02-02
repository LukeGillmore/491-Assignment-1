function keyDownHandler(e) { /* Handler for keyup events */
    console.log("I was pressed!")
    e.preventDefault();

    switch(e.code) {
        case "ArrowRight":
            cursor.rightPressed = true;
            break;
        case "Right": // IE <= 9 and FF <= 36
            cursor.rightPressed = true;
            break;
        case "KeyD":
            cursor.rightPressed = true;
            break;
        case "ArrowLeft":
            cursor.leftPressed = true;
            break;
        case "Left": // IE <= 9 and FF <= 36
            cursor.leftPressed = true;
            break;
        case "KeyA":
            cursor.leftPressed = true;
            break;
        case "ArrowUp":
            cursor.upPressed = true;
            break;
        case "Up": // IE <= 9 and FF <= 36
            cursor.upPressed = true;
            break;
        case "KeyW":
            cursor.upPressed = true;
            break;
        case "ArrowDown":
            cursor.downPressed = true;
            break;
        case "Down": // IE <= 9 and FF <= 36
            cursor.downPressed = true;
            break;
        case "KeyS":
            cursor.downPressed = true;
            break;
        case "KeyC":
            cursor.cPressed = true;
            setTimeout(1000);
            console.log('C pressed');
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
            break;
        case "Right": // IE <= 9 and FF <= 36
            cursor.rightPressed = false;
            break;
        case "KeyD":
            cursor.rightPressed = false;
            break;
        case "ArrowLeft":
            cursor.leftPressed = false;
            break;
        case "Left": // IE <= 9 and FF <= 36
            cursor.leftPressed = false;
            break;
        case "KeyA":
            cursor.leftPressed = false;
            break;
        case "ArrowUp":
            cursor.upPressed = false;
            break;
        case "Up": // IE <= 9 and FF <= 36
            cursor.upPressed = false;
            break;
        case "KeyW":
            cursor.upPressed = false;
            break;
        case "ArrowDown":
            cursor.downPressed = false;
            break;
        case "Down": // IE <= 9 and FF <= 36
            cursor.downPressed = false;
            break;
        case "KeyS":
            cursor.downPressed = false;
            break;
        case "KeyC":
            cursor.cPressed = false;
            break;
        default:
            return;
    }
}