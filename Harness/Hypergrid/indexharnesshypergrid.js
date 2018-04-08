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

    var grid = new fin.Hypergrid('#grid', { data: trades, schema: getSchema(trades) });
    dataGen.startTickingDataHypergrid(grid)
    //Set to `true` to render `0` and `false`. Otherwise these value appear as blank cells.
    grid.addProperties({ renderFalsy: true })
    //JO: Temporary. I still havent found a way to prevent the editor to open if a shortcut is executed and editonky is ON
    //which causes an issue.....
    grid.addProperties({ editOnKeydown: false })
    let behavior = grid.behavior;

    grid.localization.add('USDCurrencyFormat', new grid.localization.NumberFormatter('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }));

    var shortDateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    grid.localization.add('shortDateFormat', new grid.localization.DateFormatter('en-EN', shortDateOptions));

    //we enable the edit on some columns
    grid.behavior.dataModel.getCellEditorAt = function (columnIndex, rowIndex, declaredEditorName, options) {
        let editorName = declaredEditorName;
        if (options.column.name !== "tradeId"
          //  && options.column.name !== "changeOnYear"
            && options.column.name !== "price"
            && options.column.name !== "bid"
            && options.column.name !== "ask"
            && options.column.name !== "isLive"
            && options.column.name !== "bloomberkAsk"
            && options.column.name !== "bloomberkBid"
            && options.column.name !== "percentChange"
        ) {
            editorName = 'textfield';
        }
        return grid.cellEditors.create(editorName, options);
    }

    //Add Format for Notional column
    behavior.setColumnProperties(1, {
        format: 'USDCurrencyFormat'
    });

    //Add Edit for Trade Date column
    behavior.setColumnProperties(15, {
        format: 'shortDateFormat'
    });

    //Add Edit for Settlement Date column
    behavior.setColumnProperties(16, {
        format: 'shortDateFormat'
    });

    var container = document.getElementById('content');
    adaptableblotter = new adaptableblotterhypergrid.AdaptableBlotter(grid, container, {
        primaryKey: "tradeId",
        userName: "jonathan",
        blotterId: "Demo Blotter",
        enableAuditLog: true,
        enableRemoteConfigServer: false,
        predefinedConfigUrl:"",// "predefinedConfig.json",
        iPushPullConfig: {
            api_key: "CbBaMaoqHVifScrYwKssGnGyNkv5xHOhQVGm3cYP",
            api_secret: "xYzE51kuHyyt9kQCvMe0tz0H2sDSjyEQcF5SOBlPQmcL9em0NqcCzyqLYj5fhpuZxQ8BiVcYl6zoOHeI6GYZj1TkUiiLVFoW3HUxiCdEUjlPS8Vl2YHUMEPD5qkLYnGj",
        }
    });
    //TEST ENV
    // {
    //         api_url: "https://test.ipushpull.com/api/1.0",
    //         ws_url: "https://test.ipushpull.com",
    //         api_key: "rG25WWuOdEhLejupBc9TfPyB4womfOibmPHdBytJ",
    //         api_secret: "Icfcc8eceP1eNUt9EEAaa8mHjCfyAhaiG0EXBurhy2GWSqkDgakxAKr76hXBeNaymAkpG2NGfK6a3ScgCNSyZhIWxGTmuyi35YNQXMW5JT1e4zeazpfva14NUIevROE9",
    //     }
    var origgetCell = grid.behavior.dataModel.getCell;
    grid.behavior.dataModel.getCell = (config, declaredRendererName) => {
        if (config.isDataRow) {
            var y = config.dataCell.y;
            if (y % 2) {
                config.backgroundColor = config.altbackground;
            }
        }
        return origgetCell.call(grid.behavior.dataModel, config, declaredRendererName)
    };

    adaptableblotter.AdaptableBlotterStore.TheStore.subscribe(() => this.ThemeChange(adaptableblotter, grid))

    grid.addProperties(lightTheme);
}

var lightTheme = {
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

var darkTheme = {
    font: '14px Helvetica Neue, Helvetica, Arial, sans-serif',
    color: '#ffffff',
    backgroundColor: '#333333',
    altbackground: '#333333',
    foregroundSelectionColor: '#ffffff',
    backgroundSelectionColor: 'rgba(61, 119, 254, 0.5)',

    columnHeaderFont: '14px Helvetica Neue, Helvetica, Arial, sans-serif',
    columnHeaderColor: '#ffffff',
    columnHeaderBackgroundColor: '#333333',
    columnHeaderForegroundSelectionColor: '#ffffff',
    columnHeaderBackgroundSelectionColor: '#3D77FE',

    rowHeaderFont: '14px Helvetica Neue, Helvetica, Arial, sans-serif',
    rowHeaderColor: '#ffffff',
    rowHeaderBackgroundColor: '#333333',
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
};