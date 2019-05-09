
    export function getLightTheme(): any {
        return {
            font: '12px Helvetica Neue, Helvetica, Arial, sans-serif',
            color: '#003f59',
            backgroundColor: '#ffffff',
            altbackground: '#e6f2f8',
            foregroundSelectionColor: '#ffffff',
            backgroundSelectionColor: 'rgba(13, 106, 146, 0.5)',
            foregroundSelectionFont: '12px Helvetica Neue, Helvetica, Arial, sans-serif',
            hoverCellHighlight: {
                enabled: true,
                backgroundColor: 'rgba(160, 160, 40, 0.45)'
            },

            columnHeaderFont: '12px Helvetica Neue, Helvetica, Arial, sans-serif',
            columnHeaderColor: '#00435e',
            columnHeaderBackgroundColor: '#d9ecf5',
            columnHeaderForegroundSelectionColor: 'rgb(25, 25, 25)',
            columnHeaderBackgroundSelectionColor: 'rgb(255, 220, 97)',

            rowHeaderFont: '12px Helvetica Neue, Helvetica, Arial, sans-serif',
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
            cellPadding: 10,
            gridLinesH: false,
            gridLinesV: true,

            defaultRowHeight: 25,
            defaultFixedRowHeight: 15,
            showRowNumbers: false,
            editorActivationKeys: ['alt', 'esc'],
            columnAutosizing: true,
            readOnly: false
        }
    }


    export function getDarkTheme(): any {
        return {
            font: '12px Helvetica Neue, Helvetica, Arial, sans-serif',
            color: '#ffffff',
            backgroundColor: '#272C2E',
            altbackground: '#2E3436',
            foregroundSelectionColor: '#ffffff',
            backgroundSelectionColor: '#34546B',
            foregroundSelectionFont: '12px Helvetica Neue, Helvetica, Arial, sans-serif',
            hoverCellHighlight: {
                enabled: true,
                backgroundColor: '#7C8287'
            },
           columnHeaderFont: '12px Helvetica Neue, Helvetica, Arial, sans-serif',
            columnHeaderColor: '#ffffff',
            columnHeaderBackgroundColor: '#626262',
            columnHeaderForegroundSelectionColor: '#ffffff',
            columnHeaderBackgroundSelectionColor: '#7C8287',

            rowHeaderFont: '12px Helvetica Neue, Helvetica, Arial, sans-serif',
            rowHeaderColor: '#ffffff',
            rowHeaderBackgroundColor: '#7C8287',
            rowHeaderForegroundSelectionColor: '#ffffff',
            rowHeaderBackgroundSelectionColor: '#7C8287',

            backgroundColor2: '#7C8287',
            lineColor: '#7C8287',
            voffset: 0,
            scrollbarHoverOver: 'visible',
            scrollbarHoverOff: 'visible',
            scrollingEnabled: true,

            fixedRowAlign: 'center',
            fixedColAlign: 'center',
            cellPadding: 10,
            gridLinesH: true,
            gridLinesV: false,

            defaultRowHeight: 25,
            defaultFixedRowHeight: 15,
            showRowNumbers: false,
            editorActivationKeys: ['alt', 'esc'],
            columnAutosizing: true,
            readOnly: false,




        
           
        }

    }
    export const HypergridThemes = {
        getLightTheme,
        getDarkTheme
    }
    export default HypergridThemes