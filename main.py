"""

inButtonOn

משמש כדי לדעת את הרגע המדויק לרמת הפריים של מתי הפסיקו ללחוץ על הכפתור. 

1 אומר לחוץ

0 אומר לא לחוץ

"""
music.set_volume(255)
keyboard.start_keyboard_service()
isButtonOn = 0
TimePressed = 0

def on_forever():
    global isButtonOn, TimePressed
    if isButtonOn == 0 and input.button_is_pressed(Button.A):
        keyboard.send_string(" ")
        isButtonOn = 1
        basic.show_icon(IconNames.YES)
    elif isButtonOn == 1 and not (input.button_is_pressed(Button.A)):
        if TimePressed >= 2:
            keyboard.send_string("" + keyboard.modifiers(keyboard._Modifier.APPLE) + "W")
            basic.show_icon(IconNames.NO)
        else:
            keyboard.send_string(" ")
            basic.show_icon(IconNames.ASLEEP)
        isButtonOn = 0
        TimePressed = 0
    else:
        basic.clear_screen()
basic.forever(on_forever)

def on_every_interval():
    global TimePressed
    if isButtonOn == 0 and input.button_is_pressed(Button.A):
        TimePressed += 0.1
loops.every_interval(100, on_every_interval)
