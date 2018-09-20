export module HypergridThemes {

    export function getLightTheme(): any {
        return {
            font: '14px Helvetica Neue, Helvetica, Arial, sans-serif',
            color: '#003f59',
            backgroundColor: '#ffffff',
            altbackground: '#e6f2f8',
            foregroundSelectionColor: '#ffffff',
            backgroundSelectionColor: 'rgba(13, 106, 146, 0.5)',

            columnHeaderFont: '14px Helvetica Neue, Helvetica, Arial, sans-serif',
            columnHeaderColor: '#00435e',
            columnHeaderBackgroundColor: '#d9ecf5',
            columnHeaderForegroundSelectionColor: 'rgb(25, 25, 25)',
            columnHeaderBackgroundSelectionColor: 'rgb(255, 220, 97)',

            rowHeaderFont: '14px Helvetica Neue, Helvetica, Arial, sans-serif',
            rowHeaderColor: '#00435e',
            rowHeaderBackgroundColor: '#d9ecf5',
            rowHeaderForegroundSelectionColor: 'rgb(25, 25, 25)',
            rowHeaderBackgroundSelectionColor: 'rgb(255, 220, 97)',

            backgroundColor2: 'rgb(201, 201, 201)',
            lineColor: '#bbdceb',
            voffset: 0,
            scrollbarHoverOver: 'visible',
            scrollbarHoverOff: 'visible',
            scrollingEnabled: true,

            fixedRowAlign: 'center',
            fixedColAlign: 'center',
            cellPadding: 15,
            gridLinesH: false,
            gridLinesV: true,

            defaultRowHeight: 30,
            defaultFixedRowHeight: 15,
            showRowNumbers: false,
            editorActivationKeys: ['alt', 'esc'],
            columnAutosizing: true,
            readOnly: false
        }
    }


    export function getDarkTheme(): any {
        return {
            font: '14px Helvetica Neue, Helvetica, Arial, sans-serif',
            color: '#ffffff',
            backgroundColor: '#403E3E',
            altbackground: '#302E2E',
            foregroundSelectionColor: '#ffffff',
            backgroundSelectionColor: '#546465',

            columnHeaderFont: '14px Helvetica Neue, Helvetica, Arial, sans-serif',
            columnHeaderColor: '#ffffff',
            columnHeaderBackgroundColor: '#626262',
            columnHeaderForegroundSelectionColor: '#ffffff',
            columnHeaderBackgroundSelectionColor: '#546465',

            rowHeaderFont: '14px Helvetica Neue, Helvetica, Arial, sans-serif',
            rowHeaderColor: '#ffffff',
            rowHeaderBackgroundColor: '#07071E',
            rowHeaderForegroundSelectionColor: '#ffffff',
            rowHeaderBackgroundSelectionColor: '#3D77FE',

            backgroundColor2: 'rgb(201, 201, 201)',
            lineColor: 'rgb(199, 199, 199)',
            voffset: 0,
            scrollbarHoverOver: 'visible',
            scrollbarHoverOff: 'visible',
            scrollingEnabled: true,

            fixedRowAlign: 'center',
            fixedColAlign: 'center',
            cellPadding: 15,
            gridLinesH: false,
            gridLinesV: false,

            defaultRowHeight: 30,
            defaultFixedRowHeight: 15,
            showRowNumbers: false,
            editorActivationKeys: ['alt', 'esc'],
            columnAutosizing: true,
            readOnly: false
        }

    }
}