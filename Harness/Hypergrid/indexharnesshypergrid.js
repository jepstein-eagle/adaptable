function ThemeChange(blotter, vendorGrid) {
    if (themeName != blotter.AdaptableBlotterStore.TheStore.getState().Theme.CurrentTheme) {
        themeName = blotter.AdaptableBlotterStore.TheStore.getState().Theme.CurrentTheme
        if (themeName == "Dark Theme" || themeName == "Slate" || themeName == "Cyborg" || themeName == "Darkly" || themeName == "Superhero") {
            vendorGrid.addProperties(darkTheme);
        }
        else {
            vendorGrid.addProperties(lightTheme);
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
    var trades = dataGen.getTrades(15000);

    var vendorGrid = new fin.Hypergrid('#grid', { data: trades, schema: getSchema(trades) });
    //  dataGen.startTickingDataHypergrid(vendorGrid)
    //Set to `true` to render `0` and `false`. Otherwise these value appear as blank cells.
    vendorGrid.addProperties({ renderFalsy: true })
    //JO: Temporary. I still havent found a way to prevent the editor to open if a shortcut is executed and editonky is ON
    //which causes an issue.....
    vendorGrid.addProperties({ editOnKeydown: false })

    // make it unsortable 
    // vendorGrid.addProperties({ unsortable: true })

    let behavior = vendorGrid.behavior;

    vendorGrid.localization.add('USDCurrencyFormat', new vendorGrid.localization.NumberFormatter('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }));

    var shortDateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    vendorGrid.localization.add('shortDateFormat', new vendorGrid.localization.DateFormatter('en-EN', shortDateOptions));

    //we enable the edit on some columns
    vendorGrid.behavior.dataModel.getCellEditorAt = function (columnIndex, rowIndex, declaredEditorName, options) {
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
        return vendorGrid.cellEditors.create(editorName, options);
    }

    // Make DeskID not sortable
    behavior.setColumnProperties(2, {
        unsortable: true
    });


    //Add Format for Notional column
    behavior.setColumnProperties(1, {
        format: 'USDCurrencyFormat'
    });

    //Add Edit for Trade Date column
    behavior.setColumnProperties(16, {
        format: 'shortDateFormat'
    });

    //Add Edit for Settlement Date column
    behavior.setColumnProperties(17, {
        format: 'shortDateFormat'
    });

    var origgetCell = vendorGrid.behavior.dataModel.getCell;
    vendorGrid.behavior.dataModel.getCell = (config, declaredRendererName) => {
        if (config.isDataRow) {
            var y = config.dataCell.y;
            if (y % 2) {
                config.backgroundColor = config.altbackground;
            }
        }
        return origgetCell.call(vendorGrid.behavior.dataModel, config, declaredRendererName)
    };

    var blotterOptions = {
        primaryKey: "tradeId",
        userName: "jonathan",
        blotterId: "my Blotter",
        enableAuditLog: false,
        enableRemoteConfigServer: false,
        //  predefinedConfig: json,
        serverSearchOption: "AdvancedSearch",
        vendorGrid: vendorGrid,
        iPushPullConfig: {
            api_key: "CbBaMaoqHVifScrYwKssGnGyNkv5xHOhQVGm3cYP",
            api_secret: "xYzE51kuHyyt9kQCvMe0tz0H2sDSjyEQcF5SOBlPQmcL9em0NqcCzyqLYj5fhpuZxQ8BiVcYl6zoOHeI6GYZj1TkUiiLVFoW3HUxiCdEUjlPS8Vl2YHUMEPD5qkLYnGj",
        },
        getDistinctColumnValues: getValuesForColumn
    }

    adaptableblotter = new adaptableblotterhypergrid.AdaptableBlotter(blotterOptions);
 //   adaptableblotter.AdaptableBlotterStore.TheStore.subscribe(() => this.ThemeChange(adaptableblotter, vendorGrid))

 //  adaptableblotter.api.onSearchedChanged().Subscribe((blotter, searchArgs) => getTradesForSearch(searchArgs, dataGen))
    vendorGrid.addProperties(lightTheme);
}

// A function that takes two parameters, the last one a callback function
function getValuesForColumn(columnName) {
    let columnValues = []
    if (columnName == 'currency') {
        columnValues.push("Currency1")
        columnValues.push("Currency2")
        columnValues.push("Currency3")
        columnValues.push("Currency4")
        columnValues.push("Currency5")
        columnValues.push("Currency6")
    } else {
        columnValues.push("Value1")
        columnValues.push("Value2")
        columnValues.push("Value3")
        columnValues.push("Value4")
        columnValues.push("Value5")
        columnValues.push("Value6")
        columnValues.push("Value7")
    }
    return columnValues
}

function getTradesForSearch(searchArgs, dataGen) {
    if (searchArgs.data != null && searchArgs.data.length > -1) {
        let searchChangedInfo = searchArgs.data[0].id;
        if (searchChangedInfo.searchChangedTrigger == "QuickSearch") {
            alert("Quick search: " + searchChangedInfo.blotterSearchState.quickSearch)

            let jsonstring = JSON.stringify(searchArgs)
            console.log(jsonstring)
        }


        if (searchArgs.SearchChangedTrigger == "DataSourcexxxx") {
            if (searchArgs.BlotterSearchState.DataSource == "Dollar") {
                adaptableblotter.api.setGridData(dataGen.getDollarTrades(50));
                adaptableblotter.api.layoutSet("Dollar View")
            } else if (searchArgs.BlotterSearchState.DataSource == "Sterling") {
                adaptableblotter.api.setGridData(dataGen.getGBPTrades(50));
                adaptableblotter.api.layoutSet("Sterling View")
            } else if (searchArgs.BlotterSearchState.DataSource == "Euro") {
                adaptableblotter.api.setGridData(dataGen.getEuroTrades(50));
                adaptableblotter.api.layoutSet("Euro View")
            } else {
                adaptableblotter.api.setGridData(dataGen.getTrades(15000));
                adaptableblotter.api.layoutClear();
            }
        }

    }
}



let json = {
    "UserInterface": {
        "PermittedColumnValues": [
            {
                "ColumnId": "country",
                "PermittedValues": [
                    "France",
                    "Russia",
                    "Israel"
                ]
            },
            {
                "ColumnId": "currency",
                "PermittedValues": [
                    "EUR",
                    "USD",
                    "NIS"
                ]
            },
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
    "DataSource": {
        "DataSources": [
            "Dollar",
            "Euro",
            "Sterling",
        ],
        "CurrentDataSource": "Dollar"
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
                    "ColumnValueExpressions": [
                        {
                            "ColumnId": 'country',
                            "ColumnValues": [
                                'France',
                                'Germany'
                            ]
                        }
                    ],
                    "FilterExpressions": [],
                    "RangeExpressions": []
                },
            }
        ]
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
                    "ColumnValueExpressions": [
                        {
                            "ColumnId": 'bid',
                            "ColumnValues": [
                                '14.3971'
                            ]
                        }
                    ],
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
            "QuickSearch",
            "DataSource"
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

