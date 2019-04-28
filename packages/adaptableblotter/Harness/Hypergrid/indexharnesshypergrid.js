
var adaptableblotter
var trades
var quickSearchText
  
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
    trades = dataGen.getTrades(20);
    var gridOptions = { data: trades, schema: getSchema(trades) };
    var vendorGrid = new fin.Hypergrid('#grid', gridOptions);
     dataGen.startTickingDataHypergrid(vendorGrid)
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
    behavior.setColumnProperties(18, {
        format: 'shortDateFormat'
    });

    //Add Edit for Settlement Date column
    behavior.setColumnProperties(19, {
        format: 'shortDateFormat'
    });

    let adaptableBlotterOptions = {
        vendorGrid: vendorGrid, // the underlying hypergrid - MANDATORY
        //  primaryKey: "date", // pk for blotter - required
        primaryKey: "tradeId", // pk for blotter - required
        userName: "demo user", // name of current user
        blotterId: "demo blotter 2.5", // id for blotter
        predefinedConfig: categoryJson,

        auditLogOptions: {
            auditCellEdits: true,
            auditFunctionEvents: true,
            auditUserStateChanges: false,
            auditInternalStateChanges: false,
            pingInterval: 120
        },
        configServerOptions: {
            enableConfigServer: false,
            //  configServerUrl: "", //  'http://localhost:8080/adaptableblotter-config',
        },
        layoutOptions: {
            // includeVendorStateInLayouts: true,
            // autoSaveLayouts: true,
        },
        queryOptions: {
            ignoreCaseInQueries: false,
            //maxColumnValueItemsDisplayed: 5,
            columnValuesOnlyInQueries: false,
            // getColumnValues: retrieveValues,
            //  maxColumnValueItemsDisplayed: 5
        },
        filterOptions: {
            //useAdaptableBlotterFilterForm: false,
            // useAdaptableBlotterFloatingFilter: false
        },
        generalOptions: {
            //serverSearchOption: "AdvancedSearch", // performing AdvancedSearch on the server, not the client
        },
        iPushPullConfig: {
            api_key: "CbBaMaoqHVifScrYwKssGnGyNkv5xHOhQVGm3cYP",
            api_secret: "xYzE51kuHyyt9kQCvMe0tz0H2sDSjyEQcF5SOBlPQmcL9em0NqcCzyqLYj5fhpuZxQ8BiVcYl6zoOHeI6GYZj1TkUiiLVFoW3HUxiCdEUjlPS8Vl2YHUMEPD5qkLYnGj",
        },

    }

    adaptableblotter = new adaptableblotterhypergrid.AdaptableBlotter(adaptableBlotterOptions);
    adaptableblotter.api.eventApi.onStateChanged().Subscribe((sender, stateChangedArgs) => listenToStateChange(stateChangedArgs))

    //  adaptableblotter.api.eventApi.onSearchedChanged().Subscribe((blotter, searchArgs) => getTradesForSearch(searchArgs, dataGen))
    //  vendorGrid.addProperties(lightTheme);
}

function listenToStateChange(stateChangedArgs) {
    //  console.log("state event received")
    //  console.log(stateChangedArgs)
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

function apiTester(state, gridOptions) {
    if (state.QuickSearch.QuickSearchText != quickSearchText) {
        quickSearchText = state.QuickSearch.QuickSearchText
        if (quickSearchText == "#advanced") {
            let test = adaptableblotter.api.ConfigApi.configGetUserStateByFunction('AdvancedSearch')
            console.log("object");
            console.log(test);
            let test2 = adaptableblotter.api.ConfigApi.configGetUserStateByFunction('AdvancedSearch', true)
            console.log("string version");
            console.log(test2);
            let test3 = adaptableblotter.api.ConfigApi.configGetAllUserState()
            console.log("all version");
            console.log(test3);
            let test4 = adaptableblotter.api.ConfigApi.configGetAdvancedSearchState()
            console.log("advanced search");
            console.log(test4);
            let test5 = adaptableblotter.api.ConfigApi.configGetAdvancedSearchState(true)
            console.log("advanced search string");
            console.log(test5);
        } else if (quickSearchText == "#hideabout") {
            adaptableblotter.api.DashboardApi.dashboardHideAboutButton()
        } else if (quickSearchText == "#showabout") {
            adaptableblotter.api.DashboardApi.dashboardShowAboutButton()
        } else if (quickSearchText == "#permies") {
            adaptableblotter.api.UserInterfaceApi.uiSetColumnPermittedValues('counterparty', ['first', 'second', 'third'])
        } else if (quickSearchText == "#systemfilters") {
            adaptableblotter.api.SystemFilterApi.systemFilterClear()
        } else if (quickSearchText == "#reset") {
            //     adaptableblotter.api.configDeleteLocalStorage()
        } else if (quickSearchText == "#loadUserState") {
            adaptableblotter.api.loadUserState(oldjson)

        } else if (quickSearchText == "#miguel") {
            setTimeout(() => adaptableblotter.api.uiSetColumnPermittedValues("deskId", ["5555555",
                "8888888"
            ]), 20000);
        } else if (quickSearchText == "#allsf") {
            let thisxx = adaptableblotter.api.filterGetAllSystemFilters()
        } else if (quickSearchText == "#permiex") {
            adaptableblotter.api.uiSetColumnPermittedValues('counterparty', ['fourth', 'fith', 'sixth'])
        } else if (quickSearchText == "#clear") {
            adaptableblotter.api.uiClearColumnPermittedValues('counterparty')
        } else if (quickSearchText == "#send") {
            adaptableblotter.api.ExportApi.exportSendReport('All Data', 'CSV')
        } else if (quickSearchText == "#info") {
            adaptableblotter.api.AlertApi.alertShow("Hello",
                "Your data is fine actually its very good and I want to check that this wraps", "Info",
                true)
        } else if (quickSearchText == "#warning") {
            adaptableblotter.api.AlertApi.alertShow("End of Day", "Dont forget to send the report", "Warning",
                true)
        } else if (quickSearchText == "#error") {
            adaptableblotter.api.AlertApi.alertShow("Limits Breached", "Pleae adjust your PnL", "Error", true)
        } else if (quickSearchText == "#green") {
            adaptableblotter.api.SystemStatusApi.systemStatusSetGreen("The server is fine")
        } else if (quickSearchText == "#amber") {
            adaptableblotter.api.SystemStatusApi.systemStatusSetAmber("The server is running slowly")
        } else if (quickSearchText == "#red") {
            adaptableblotter.api.SystemStatusApi.systemStatusSetRed("The server has stopped ")
        } else if (quickSearchText == "#sbutton") {
            adaptableblotter.api.DashboardApi.dashboardShowSystemStatusButton()
        } else if (quickSearchText == "#hbutton") {
            adaptableblotter.api.DashboardApi.dashboardHideSystemStatusButton()
        } else if (quickSearchText == "#sfunc") {
            adaptableblotter.api.DashboardApi.dashboardShowFunctionsDropdown()
        } else if (quickSearchText == "#hfunc") {
            adaptableblotter.api.DashboardApi.dashboardHideFunctionsDropdown()
        } else if (quickSearchText == "#scols") {
            adaptableblotter.api.DashboardApi.dashboardShowColumnsDropdown()
        } else if (quickSearchText == "#hcols") {
            adaptableblotter.api.DashboardApi.dashboardHideColumnsDropdown()
        } else if (quickSearchText == "#title") {
            adaptableblotter.api.DashboardApi.dashboardSetHomeToolbarTitle("hello world")
        } else if (quickSearchText == "#filterclear") {
            adaptableblotter.api.ColumnFilterApi.columnFilterClearAll()
        } else if (quickSearchText == "#userfilter") {
            adaptableblotter.api.ColumnFilterApi.columnFilterSetUserFilter("Big Desk Id")
        } else if (quickSearchText == "#savelayout") {
            adaptableblotter.api.LayoutApi.layoutSave()
        } else if (quickSearchText == "#setlayout") {
            adaptableblotter.api.LayoutApi.layoutSet("miguel")
        } else if (quickSearchText == "#notional") {
            gridOptions.api.forEachNode((rowNode, index) => {
                if (index == 4) {
                    rowNode.setDataValue("notional", 2000000000)
                }
            });
        }
    }
}

let categoryJson = {
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
                "AccessLevel": "Readonly"
            }
        ]
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

