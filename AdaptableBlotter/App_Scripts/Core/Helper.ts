export module Helper {
    export function getChar(event: JQueryEventObject):string;
    export function getChar(event: KeyboardEvent):string;
    export function getChar(event: JQueryKeyEventObject | KeyboardEvent):string{
        if (event.which == null) {
            return String.fromCharCode(event.keyCode) // IE
        } else if (event.which != 0 && event.charCode != 0) {
            return String.fromCharCode(event.which)   // the rest
        } else {
            return null // special key
        }
    }
}