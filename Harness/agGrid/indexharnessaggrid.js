




function ThemeChange(theme, container) {
    if (themeName != theme.CurrentTheme) {
        themeName = theme.CurrentTheme
        if (themeName == "Dark Theme") {
            container.className = "ag-theme-dark";
        } else if (themeName == "Flat Theme") {
            container.className = "ag-theme-balham";
        }
        else { // White theme
            container.className = "ag-theme-balham";
        }
    }
}
var themeName = ""
var adaptableblotter


var currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
});

function currencyRendereragGrid(params) {
    try {
        if (params.value) {
            return currencyFormatter.format(params.value)
        } else {
            return null;
        }
    }
    catch (ex) {
        console.error("Error formatting the currency for value: " + params.value + " and node : ", params.node)
    }
}

var shortDateFormatter = new Intl.DateTimeFormat('en-GB');
function shortDateFormatteragGrid(params) {
    try {
        if (params.value) {
            return shortDateFormatter.format(params.value)
        } else {
            return null;
        }
    }
    catch (ex) {
        console.error("Error formatting the date for value: " + params.value + " and node : ", params.node)
    }
}

function boolParseragGrid(params) {
    try {
        return `<input type='checkbox'   ${params.value ? 'checked' : ''} />`;
    }
    catch (ex) {
        console.error("Error parsing the date value: " + params.newValue + " and node : ", params.node)
    }
}

function numberToBool(params) {
    if (params.value === 0) {
        return 'false';
    } else {
        return 'true';
    }
}

function dateParseragGrid(params) {
    try {
        return stringToDate(params.newValue, "dd/mm/yyyy", "/");
    }
    catch (ex) {
        console.error("Error parsing the date value: " + params.newValue + " and node : ", params.node)
    }
}



function stringToDate(date, format, delimiter) {
    var formatLowerCase = format.toLowerCase();
    var formatItems = formatLowerCase.split(delimiter);
    var dateItems = date.split(delimiter);
    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var month = parseInt(dateItems[monthIndex]);
    month -= 1;
    var formatedDate = new Date(parseInt(dateItems[yearIndex]), month, parseInt(dateItems[dayIndex]));
    return formatedDate;
}

var decimalPlaceRendereragGrid = (minDigits, maxDigits) => function (params) {
    if (params.value) {
        var decimalPlaceFormatter = new Intl.NumberFormat('en-GB', {
            minimumFractionDigits: minDigits,
            maximumFractionDigits: maxDigits
        });
        return decimalPlaceFormatter.format(params.value)
    }
}

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
    var schema = []

    schema.push({ headerName: "Trade Id", field: "tradeId", editable: true, filter: 'text', type: "abColDefNumber" });
    schema.push({ headerName: "Notional", field: "notional", editable: true, filter: 'text', cellRenderer: notionalCellRenderer, enableRowGroup: true, type: ["abColDefNumber", "randon"], enableValue: true });
    schema.push({ headerName: "DeskId", field: "deskId", editable: true, filter: 'text', enableRowGroup: true, type: ["randon", "another"] });
    schema.push({ headerName: "Counterparty", field: "counterparty", editable: true, filter: 'text', enableRowGroup: true });
    schema.push({ headerName: "Country", field: "country", editable: true, filter: 'text', enableRowGroup: true });
    schema.push({ headerName: "Currency", field: "currency", editable: false, filter: 'text', enableRowGroup: true, suppressFilter: true });
    schema.push({ headerName: "Change On Year", field: "changeOnYear", editable: true, filter: 'text' });

    schema.push({
        headerName: "Pricing",
        children: [
            { headerName: "Bid Offer Spread", field: "bidOfferSpread", columnGroupShow: 'open', editable: true, cellClass: 'number-cell' },
            { headerName: "Price", field: "price", columnGroupShow: 'open', editable: true, cellClass: 'number-cell', enableRowGroup: true },
            { headerName: "Ask", field: "ask", columnGroupShow: 'closed', cellClass: 'number-cell' },
            { headerName: "Bid", field: "bid", columnGroupShow: 'closed', cellClass: 'number-cell' },
            { headerName: "Bloomberg Ask", field: "bloombergAsk", columnGroupShow: 'closed', cellClass: 'number-cell' },
            { headerName: "Bloomberg Bid", field: "bloombergBid", columnGroupShow: 'closed', cellClass: 'number-cell' }
        ]
    })
    schema.push({
        headerName: "Is Live", field: "isLive", editable: false, cellRenderer: params => {
            return `<input type='checkbox' ${params.value ? 'checked' : ''} />`;
        }
    });
    schema.push({ headerName: "Fitch Rating", field: "fitchRating", editable: true, filter: 'text', });
    schema.push({ headerName: "Moodys Rating", field: "moodysRating", editable: true, filter: 'text' });
    schema.push({ headerName: "SandP Rating", field: "sandpRating", editable: true, filter: 'text' });
    schema.push({ headerName: "Trade Date", field: "tradeDate", editable: true, cellEditorParams: { useFormatter: true }, valueParser: dateParseragGrid, valueFormatter: shortDateFormatteragGrid });
    schema.push({ headerName: "Settlement Date", field: "settlementDate", editable: true, cellEditorParams: { useFormatter: true }, valueParser: dateParseragGrid, valueFormatter: shortDateFormatteragGrid });
    schema.push({ headerName: "Percent Change", field: "percentChange", filter: 'text' });
    schema.push({ headerName: "Last Updated By", field: "lastUpdatedBy", filter: 'text', enableRowGroup: true });
    schema.push({ headerName: "Last Updated", field: "lastUpdated", editable: true, cellEditorParams: { useFormatter: true }, valueParser: dateParseragGrid, valueFormatter: shortDateFormatteragGrid });

    return schema;
}

var currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
});
function notionalCellRenderer(params) {
    if (params.value) {
        return currencyFormatter.format(params.value)
    } else {
        return null;
    }
}

function InitBlotter() {
    // get some dummy data
    let dataGen = new harness.DataGenerator();

    let trades = dataGen.getTrades();

    // populate the agGrid gridOptions object with the data, column scheme and other properties
    // setting columnTypes for easier identification of underlying agGrid column types
    let gridOptions = {
        columnDefs: getSchema(trades),  // returns a list of agGrid column definitions
        rowData: trades,                // the dummy data we are using
        enableSorting: true,
        enableRangeSelection: true,
        enableFilter: true,
        enableColResize: true,
        suppressColumnVirtualisation: true,
        columnTypes: {                  // not required but helpful for column data type identification
            "abColDefNumber": {},
            "abColDefString": {},
            "abColDefBoolean": {},
            "abColDefDate": {},
            "abColDefObject": {},
        }
    };

    let adaptableBlotterOptions = {
        primaryKey: "tradeId",                  // pk for blotter - required
        userName: "demo user",                  // name of current user
        blotterId: "Demo Blotter",              // id for blotter 
        enableAuditLog: false,                  // not running audit log
        enableRemoteConfigServer: false,        // not running remote config
       //predefinedConfig: "demoConfig.json",    // passing in predefined config with a file    
        serverSearchOption: "None",             // performing AdvancedSearch on the server, not the client
        iPushPullConfig: {
            api_key: "CbBaMaoqHVifScrYwKssGnGyNkv5xHOhQVGm3cYP",
            api_secret: "xYzE51kuHyyt9kQCvMe0tz0H2sDSjyEQcF5SOBlPQmcL9em0NqcCzyqLYj5fhpuZxQ8BiVcYl6zoOHeI6GYZj1TkUiiLVFoW3HUxiCdEUjlPS8Vl2YHUMEPD5qkLYnGj",
        }
    }

    // set the container for the underlying grid
    let gridcontainer = document.getElementById('grid');
    // initialise the agGrid
    let grid = new agGrid.Grid(gridcontainer, gridOptions);
    // set the container for the Adaptable Blotter
    let abContainer = document.getElementById('adaptableBlotter');

    // instantiate the Adaptable Blotter, passing in 
    // 1   the AdaptableBlotterOptions
    // 2.  the AdaptableBlotter Container 
    // 3.  the GridOptions
    // 4.  the underlying Grid Container (required for agGrid)
    adaptableblotter = new adaptableblotteraggrid.AdaptableBlotter(adaptableBlotterOptions, abContainer, gridOptions, gridcontainer);

    adaptableblotter.AdaptableBlotterStore.TheStore.subscribe(() => { ThemeChange(adaptableblotter.AdaptableBlotterStore.TheStore.getState().Theme, gridcontainer); });
    adaptableblotter.api.onSearchedChanged().Subscribe((sender, searchArgs) => getTradesForSearch(searchArgs, dataGen))

}

function getTradesForSearch(searchArgs, dataGen) {
    //alert(searchArgs.SearchChangedTrigger)
    if (searchArgs.SearchChangedTrigger == "DataSourcezzzz") {
        if (searchArgs.BlotterSearchState.DataSource == "Sterling") {
       //     adaptableblotter.api.themeSelectCurrent("Dark Theme");
            adaptableblotter.api.setSystemStatus("its all fucked", "Red")
            adaptableblotter.api.showAlert("Error Header", "Error message", "Error")
        } else if (searchArgs.BlotterSearchState.DataSource == "Euro") {
     //       adaptableblotter.api.themeSelectCurrent("White Theme");
            adaptableblotter.api.clearSystemStatus()
            adaptableblotter.api.showAlert("Info Header", "Info message", "Info")
        } else if (searchArgs.BlotterSearchState.DataSource == "Dollar") {
      //      adaptableblotter.api.themeSelectCurrent("White Theme");
            adaptableblotter.api.setSystemStatus("a few issues perhaps", "Amber")
            adaptableblotter.api.showAlert("Warning Header", "Warning message", "Warning")
        }
        /*
        if (searchArgs.BlotterSearchState.DataSource == "Dollar") {
            adaptableblotter.api.setGridData(dataGen.getDollarTrades());
            adaptableblotter.api.selectLayout("Dollar View")
          //  adaptableblotter.api.selectCurrentTheme("Dark Theme")
        } else if (searchArgs.BlotterSearchState.DataSource == "Sterling") {
            adaptableblotter.api.setGridData(dataGen.getGBPTrades());
            adaptableblotter.api.selectLayout("Sterling View")
        } else if (searchArgs.BlotterSearchState.DataSource == "Euro") {
            adaptableblotter.api.setGridData(dataGen.getEuroTrades());
            adaptableblotter.api.selectLayout("Euro View")
        } else {
            adaptableblotter.api.setGridData(dataGen.getTrades());
            adaptableblotter.api.clearLayout();
        }
        */
    }
}

let json = {
    "QuickSearch": {
        "Style": {
            "ClassName": "styleBackGreen"
        },

    },
    "DataSource": {
        "DataSources": [
            "Dollar",
            "Euro",
            "Sterling",
        ],
        "CurrentDataSource": "Dollar"
    },
    "Filter": {
        "ColumnFilters": [],
        "UserFilters": [{
            "Name": "April 2018",
            "Expression": {
                "ColumnValueExpressions": [],
                "FilterExpressions": [],
                "RangeExpressions": [{
                    "ColumnId": "tradeDate",
                    "Ranges": [{
                        "Operator": "Between",
                        "Operand1": "2018-04-01",
                        "Operand2": "2018-04-30",
                        "Operand1Type": "Value",
                        "Operand2Type": "Value"
                    }]
                }]
            },
            "ColumnId": "tradeDate",
            "IsReadOnly": false
        }],
        "SystemFilters": [
            "Blanks",
            "Non Blanks",
            "Today",
            "In Past",
            "True",
            "False"
        ]
    },
    "UserInterface": {
        "StyleClassNames": [
            "styleBackBrown",
            "styleForeYellow"
        ],
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
    "Theme": {
        "CurrentTheme": "Default",
    },
    "FormatColumn": {
        "FormatColumns": [
            {
                "ColumnId": "notional",
                "Style": {
                    "BackColor": "#ff0000",
                    "ForeColor": null,
                    "FontWeight": "Normal",
                    "FontStyle": "Normal",
                    "FontSize": null
                },
            }
        ],

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
        "Zoom": "1",
        "ShowSystemStatusButton": true
    }
}

