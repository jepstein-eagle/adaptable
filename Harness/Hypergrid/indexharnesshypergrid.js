function ThemeChange(blotter, grid) {
    if (themeName != blotter.AdaptableBlotterStore.TheStore.getState().Theme.CurrentTheme) {
        themeName = blotter.AdaptableBlotterStore.TheStore.getState().Theme.CurrentTheme
        if (themeName == "Dark Theme" ||themeName == "Slate" || themeName == "Cyborg" || themeName == "Darkly" || themeName == "Superhero") {
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
    // dataGen.startTickingDataHypergrid(grid)
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

    let serverSearch = "AllSearchandSort"

    var container = document.getElementById('content');
    adaptableblotter = new adaptableblotterhypergrid.AdaptableBlotter(grid, container, {
        primaryKey: "tradeId",
        userName: "jonathan",
        blotterId: "Demo Blotter",
        enableAuditLog: true,
        enableRemoteConfigServer: false,
       // predefinedConfig: "",//json, // "predefinedConfig.json",
        serverSearch: serverSearch,
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

    adaptableblotter.api.onSearchedChanged().Subscribe((sender, searchArgs) => getTradesForSearch(searchArgs, dataGen))


    grid.addProperties(lightTheme);
}


function getTradesForSearch(searchArgs, dataGen) {

    let search = searchArgs.BlotterSortState.GridSorts;
    let firstSort = search[0].ColumnId
    alet(firstSort)
    alert(searchArgs.SearchChangedTrigger);
    let newTrades
    if (search == null || search.Name == "") {
        alert("nowt")
        newTrades = dataGen.getTrades()
    } else {
        alert(search.Name);
        if (search.Name == "barcap") {
            newTrades = dataGen.getBarcapTrades()
        } else {
            newTrades = dataGen.getGSTrades()
        }
    }
    adaptableblotter.api.setDataSource(newTrades);
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
};


let json = {
    "Filter": {
        "SystemFilters": [
            "Blanks",
            "Tomorrow",
            "Positive"
        ]
    },
    "Entitlements": {
        "FunctionEntitlements": [
            {
                "FunctionName": "CustomSort",
                "AccessLevel": "ReadOnly"
            },
            {
                "FunctionName": "QuickSearch",
                "AccessLevel": "ReadOnly"
            },
            {
                "FunctionName": "PlusMinus",
                "AccessLevel": "Hidden"
            },
            {
                "FunctionName": "SmartEdit",
                "AccessLevel": "Hidden"
            }
        ]
    },
    "ConditionalStyle": {
        "ConditionalStyles": [
            {
                "ColumnId": '',
                "Style": {
                    "ClassName": "styleForeYellow"
                },
                "ConditionalStyleScope": 'Row',
                "Expression": {
                    "DisplayValueExpressions": [
                        {
                            "ColumnId": 'country',
                            "DisplayValues": [
                                'France',
                                'Germany'
                            ]
                        }
                    ],
                    "RawValueExpressions": [],
                    "FilterExpressions": [],
                    "RangeExpressions": []
                },
            }
        ]
    },
    "Theme": {
        "CurrentTheme": "Slate",
    },
    "FormatColumn": {
        "FormatColumns": [
            {
                "ColumnId": "notional",
                "Style": {
                    "ClassName": "styleBackBrown"
                }
            }
        ]
    },
    "AdvancedSearch": {
        "AdvancedSearches": [
            {
                "Name": 'test',
                "Expression": {
                    "DisplayValueExpressions": [
                        {
                            "ColumnId": 'bid',
                            "DisplayValues": [
                                '14.3971'
                            ]
                        }
                    ],
                    "RawValueExpressions": [],
                    "FilterExpressions": [],
                    "RangeExpressions": []
                },
                "IsReadOnly": false
            }
        ],
    },
    "Dashboard": {
        "VisibleToolbars": [
            "AdvancedSearch",
            "Layout",
            "QuickSearch"
        ],
        "VisibleButtons": [
            "About",
            "Dashboard",
            "QuickSearch",
            "SmartEdit",
            "ColumnChooser",
            "BulkUpdate"
        ],
        "Zoom": "1"
    }
}

