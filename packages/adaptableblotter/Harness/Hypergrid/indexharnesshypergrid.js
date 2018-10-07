
var adaptableblotter
var trades
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
     trades = dataGen.getTrades(15000);

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
        unsortable: true,
     //   unfilterable: true
    });


    //Add Format for Notional column
    behavior.setColumnProperties(1, {
        format: 'USDCurrencyFormat'
    });

    //Add Edit for Trade Date column
    behavior.setColumnProperties(17, {
        format: 'shortDateFormat'
    });

    //Add Edit for Settlement Date column
    behavior.setColumnProperties(18, {
        format: 'shortDateFormat'
    });

    var blotterOptions = {
        primaryKey: "tradeId",
        userName: "jonathan",
        blotterId: "my Blotter",
        enableAuditLog: false,
        enableRemoteConfigServer: false,
        //  predefinedConfig: json,
        serverSearchOption: "None",
        vendorGrid: vendorGrid,
        useDefaultVendorGridThemes: true,
        iPushPullConfig: {
            api_key: "CbBaMaoqHVifScrYwKssGnGyNkv5xHOhQVGm3cYP",
            api_secret: "xYzE51kuHyyt9kQCvMe0tz0H2sDSjyEQcF5SOBlPQmcL9em0NqcCzyqLYj5fhpuZxQ8BiVcYl6zoOHeI6GYZj1TkUiiLVFoW3HUxiCdEUjlPS8Vl2YHUMEPD5qkLYnGj",
        },
        getColumnValues: retrieveValues,
        maxColumnValueItemsDisplayed: 1000
    }

    adaptableblotter = new adaptableblotterhypergrid.AdaptableBlotter(blotterOptions);
    adaptableblotter.api.onStateChanged().Subscribe((sender, stateChangedArgs) => listenToStateChange(stateChangedArgs))
  
 //  adaptableblotter.api.onSearchedChanged().Subscribe((blotter, searchArgs) => getTradesForSearch(searchArgs, dataGen))
  //  vendorGrid.addProperties(lightTheme);
}

function listenToStateChange(stateChangedArgs) {
    console.log("state event received")
    console.log(stateChangedArgs)
}

function retrieveValues(columnName) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(getValuesForColumn(columnName)), 500);
    });
}

function getValuesForColumn(columnName) {
    let vals;
    if (columnName == "notional") {
        vals = [1000000, 5000000, 10000000];
    }
    else if (columnName == "settlementDate") {
        vals = [
            trades[0]["settlementDate"],
            trades[1]["settlementDate"],
            trades[2]["settlementDate"],
            trades[3]["settlementDate"],
            trades[4]["settlementDate"],
        ];
    } else {
        vals = ["val1", "val2", "val3"]
    }
    return { DistinctCriteriaPairValue: "DisplayValue", ColumnValues: vals }
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

