/**
 * inButtonOn
 * 
 * משמש כדי לדעת את הרגע המדויק לרמת הפריים של מתי הפסיקו ללחוץ על הכפתור. 
 * 
 * 1 אומר לחוץ
 * 
 * 0 אומר לא לחוץ
 */
music.setVolume(255)
keyboard.startKeyboardService()
let isButtonOn = 0
let TimePressed = 0
basic.forever(function () {
    if (isButtonOn == 0 && input.buttonIsPressed(Button.AB)) {
        keyboard.sendString(" ")
        isButtonOn = 1
        basic.showIcon(IconNames.Yes)
    } else if (isButtonOn == 1 && !(input.buttonIsPressed(Button.AB))) {
        if (TimePressed >= 2) {
            keyboard.sendString("" + keyboard.modifiers(keyboard._Modifier.apple) + "W")
            basic.showIcon(IconNames.No)
        } else {
            keyboard.sendString(" ")
            basic.showIcon(IconNames.Asleep)
        }
        isButtonOn = 0
        TimePressed = 0
    } else if (input.buttonIsPressed(Button.A) || input.buttonIsPressed(Button.B)) {
        keyboard.sendString(" ")
        basic.pause(100)
        keyboard.sendString(" ")
    } else {
        basic.clearScreen()
    }
})
loops.everyInterval(100, function () {
    if (input.buttonIsPressed(Button.A)) {
        TimePressed += 0.1
    }
})
