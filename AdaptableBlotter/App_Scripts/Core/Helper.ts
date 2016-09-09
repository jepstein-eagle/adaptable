export module Helper {
    export function getCharFromKey(event: JQueryKeyEventObject): string;
    export function getCharFromKey(event: KeyboardEvent): string;
    export function getCharFromKey(event: JQueryKeyEventObject | KeyboardEvent): string {
        if (event.which == null) {
            return String.fromCharCode(event.keyCode) // IE
        } else if (event.which != 0 && event.charCode != 0) {
            return String.fromCharCode(event.which)   // the rest
        } else {
            return null // special key
        }
    }

    export function getStringRepresentionFromKey(event: JQueryKeyEventObject | KeyboardEvent): string {
        if (event.key == null) {
            return event.char // IE
        } else
            return event.key

    }
}