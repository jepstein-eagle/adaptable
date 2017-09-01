function ThemeChange(blotter, grid) {
    if (themeName != blotter.AdaptableBlotterStore.TheStore.getState().Theme.CurrentTheme) {
        themeName = blotter.AdaptableBlotterStore.TheStore.getState().Theme.CurrentTheme
        if (themeName == "Slate" || themeName == "Cyborg" || themeName == "Darkly" || themeName == "Superhero") {
            grid.addProperties(darkTheme);
        }
        else {
            grid.addProperties(lightTheme);
        }
    }
}
var themeName = ""
var adaptableblotter
function capitalize(string) {
    return (/[a-z]/.test(string) ? string : string.toLowerCase())
        .replace(/[\s\-_]*([^\s\-_])([^\s\-_]+)/g, replacer)
        .replace(/[A-Z]/g, ' $&')
        .trim();
}
function replacer(a, b, c) {
    return b.toUpperCase() + c;
}

function getSchema(data) {
    var schema = [],
        firstRow = Array.isArray(data) && data[0];

    firstRow = (typeof firstRow === 'object') ? firstRow : {};
    for (var p in firstRow) {
        if (firstRow.hasOwnProperty(p)) {
            if (p === 'notional' || p === 'ask' || p === 'bid') {
                schema.push({ name: p, header: capitalize(p), type: 'number' });
            }
            else if (p === 'tradeDate') {
                schema.push({ name: p, header: capitalize(p), type: 'date' });
            }
            else {
                schema.push({ name: p, header: capitalize(p) });
            }
        }
    }
    return schema;
}
function InitBlotter() {
    var dataGen = new harness.DataGenerator();
    var trades = dataGen.getTrades();


    var notionalPattern = /^(\d+) EUR$/;
    var notionalLocalizer = {
        format: function (value) {
            if (value != null) {
                value = value + ' EUR';
            } else {
                value = null;
            }
            return value;
        },
        parse: function (str) {
            var value, parts = str.match(notionalPattern);
            if (parts) {
                value = parts[0]
            } else {
                value = 0;
            }
            return value;
        }
    };


    var grid = new fin.Hypergrid('#grid', { data: trades, schema: getSchema(trades) });
    //dataGen.startTickingDataHypergrid(grid)
    //Set to `true` to render `0` and `false`. Otherwise these value appear as blank cells.
    grid.addProperties({ renderFalsy: true })
    //JO: Temporary. I still havent found a way to prevent the editor to open if a shortcut is executed and editonky is ON
    //which causes an issue.....
    grid.addProperties({ editOnKeydown: false })
    //Set to `true` to render `0` and `false`. Otherwise these value appear as blank cells
    grid.addProperties({ renderFalsy: true })
    let behavior = grid.behavior;

    //   grid.localization.add('notional', notionalLocalizer);
    // grid.localization.add('UKCurrencyFormat', new grid.localization.NumberFormatter('en-EN', {
    //     style: 'currency',
    //     currency: 'GBP'
    // }));
    grid.localization.add('USDCurrencyFormat', new grid.localization.NumberFormatter('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }));

    var shortDateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    grid.localization.add('shortDateFormat', new grid.localization.DateFormatter('en-EN', shortDateOptions));

    //Add Edit for Notional column
    behavior.setColumnProperties(1, {
        editor: 'textfield',// case-insensitive
        format: 'USDCurrencyFormat'
    });

    //Add Edit for DeskId column
    behavior.setColumnProperties(2, {
        editor: 'textfield',// case-insensitive
        format: 'number' // also case-insensitive
    });

    //Add Edit for counterparty column
    behavior.setColumnProperties(3, {
        editor: 'textfield',// case-insensitive
    });

    //Add Edit for Currency column
    behavior.setColumnProperties(4, {
        editor: 'textfield',// case-insensitive
    });

    //Add Edit for Country column
    behavior.setColumnProperties(5, {
        editor: 'textfield',// case-insensitive
    });

    //Add Edit for b/o spread column
    behavior.setColumnProperties(10, {
        editor: 'Number',// case-insensitive
    });

    //Add Edit for moodys column
    behavior.setColumnProperties(12, {
        editor: 'textfield',// case-insensitive
    });

    //Add Edit for fitch column
    behavior.setColumnProperties(13, {
        editor: 'textfield',// case-insensitive
    });

    //Add Edit for snp column
    behavior.setColumnProperties(14, {
        editor: 'textfield',// case-insensitive
    });

    //Add Edit for Trade Date column
    behavior.setColumnProperties(15, {
        editor: 'textfield', // Date should work in Chrome apparently but it doesnt
        format: 'shortDateFormat'
    });

    //Add Edit for Settlement Date column
    behavior.setColumnProperties(16, {
        editor: 'textfield',
        format: 'shortDateFormat'
    });

    var container = document.getElementById('content');
    adaptableblotter = new adaptableblotterhypergrid.AdaptableBlotter(grid, container, {
        primaryKey: "tradeId",
        userName: "Jonathan",
        enableAuditLog: false,
        enableRemoteConfigServer: false,
        //predefinedConfigUrl:"predefinedConfig.json"
    });
    var origgetCell = grid.behavior.dataModel.getCell;
    grid.behavior.dataModel.getCell = (config, declaredRendererName) => {
        if (config.isDataRow) {
            var y = config.dataCell.y;
            if (y % 2) {
                config.backgroundColor = config.altbackground;
            }
        }
        return origgetCell(config, declaredRendererName);
    };
    adaptableblotter.AdaptableBlotterStore.TheStore.subscribe(() => this.ThemeChange(adaptableblotter, grid))

    grid.addProperties(lightTheme);
}

var lightTheme = {
    font: '14px Helvetica Neue, Helvetica, Arial, sans-serif',
    color: '#003f59',
    backgroundColor: 'white',
    altbackground: '#e6f2f8',
    foregroundSelectionColor: 'white',
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

var darkTheme = {
    font: '14px Helvetica Neue, Helvetica, Arial, sans-serif',
    color: 'white',
    backgroundColor: '#07071E',
    altbackground: '#07071E',
    foregroundSelectionColor: 'white',
    backgroundSelectionColor: 'rgba(61, 119, 254, 0.5)',

    columnHeaderFont: '14px Helvetica Neue, Helvetica, Arial, sans-serif',
    columnHeaderColor: 'white',
    columnHeaderBackgroundColor: '#07071E',
    columnHeaderForegroundSelectionColor: 'white',
    columnHeaderBackgroundSelectionColor: '#3D77FE',

    rowHeaderFont: '14px Helvetica Neue, Helvetica, Arial, sans-serif',
    rowHeaderColor: 'white',
    rowHeaderBackgroundColor: '#07071E',
    rowHeaderForegroundSelectionColor: 'white',
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
};