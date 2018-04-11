
function ThemeChange(blotter, container) {

    if (themeName != blotter.AdaptableBlotterStore.TheStore.getState().Theme.CurrentTheme) {
        themeName = blotter.AdaptableBlotterStore.TheStore.getState().Theme.CurrentTheme
        if (themeName == "Slate" || themeName == "Cyborg" || themeName == "Darkly" || themeName == "Superhero") {
            container.className = "ag-theme-dark";
        } else if (themeName == "flatyle") {
            container.className = "ag-theme-balham";
        }
        else {
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

    schema.push({ headerName: "Trade Id", field: "tradeId", editable: true, filter: 'text', type: 'Number' });
    schema.push({ headerName: "Notional", field: "notional", editable: true, filter: 'text', cellRenderer: notionalCellRenderer, enableRowGroup: true });
    schema.push({ headerName: "DeskId", field: "deskId", editable: true, filter: 'text' , enableRowGroup: true});
    schema.push({ headerName: "Counterparty", field: "counterparty", editable: true, filter: 'text', enableRowGroup: true });
    schema.push({ headerName: "Country", field: "country", editable: true, filter: 'text',enableRowGroup: true });
    schema.push({ headerName: "Currency", field: "currency", editable: false, filter: 'text', enableRowGroup: true, suppressFilter: true });
    schema.push({ headerName: "Change On Year", field: "changeOnYear", editable: true, filter: 'text' });

    schema.push({
        headerName: "Pricing",
        children: [
            { headerName: "Bid Offer Spread", field: "bidOfferSpread", columnGroupShow: 'open', editable: true, cellClass: 'number-cell'},
            { headerName: "Price", field: "price", columnGroupShow: 'open', editable: true, cellClass: 'number-cell', enableRowGroup: true},
            { headerName: "Ask", field: "ask", columnGroupShow: 'closed', cellClass: 'number-cell'},
            { headerName: "Bid", field: "bid", columnGroupShow: 'closed', cellClass: 'number-cell'},
            { headerName: "Bloomberg Ask", field: "bloombergAsk", columnGroupShow: 'closed', cellClass: 'number-cell'},
            { headerName: "Bloomberg Bid", field: "bloombergBid", columnGroupShow: 'closed', cellClass: 'number-cell'}
        ]
    })
    schema.push({ headerName: "Is Live", field: "isLive",editable: false, cellRenderer: params => {
        return `<input type='checkbox' ${params.value ? 'checked' : ''} />`;
    }});
    schema.push({ headerName: "Fitch Rating", field: "fitchRating", editable: true, filter: 'text' });
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
    var dataGen = new harness.DataGenerator();
    var trades = dataGen.getTrades();

    // let the grid know which columns and what data to use
    var gridOptions = {
        columnDefs: getSchema(trades),
        rowData: trades,
        enableSorting: true,
        enableRangeSelection: true,
        groupMultiAutoColumn: false,
        groupUseEntireRow: false,
        animateRows: true,
        enableFilter: true,
        enableColResize: true
    };


   
   
    var eGridDiv = document.getElementById('grid');
    var grid = new agGrid.Grid(eGridDiv, gridOptions);
    dataGen.startTickingDataagGrid(gridOptions);

    var container = document.getElementById('content');
    var gridcontainer = document.getElementById('grid');
    adaptableblotter = new adaptableblotteraggrid.AdaptableBlotter(gridOptions, container, gridcontainer, {
        primaryKey: "tradeId",
        userName: "demo user",
        blotterId: "Demo Blotter",
        enableAuditLog: false,
        enableRemoteConfigServer: false,
        predefinedConfigUrl: "",// "demoConfig.json",
        iPushPullConfig: {
            api_key: "CbBaMaoqHVifScrYwKssGnGyNkv5xHOhQVGm3cYP",
            api_secret: "xYzE51kuHyyt9kQCvMe0tz0H2sDSjyEQcF5SOBlPQmcL9em0NqcCzyqLYj5fhpuZxQ8BiVcYl6zoOHeI6GYZj1TkUiiLVFoW3HUxiCdEUjlPS8Vl2YHUMEPD5qkLYnGj",
        }
    });

    adaptableblotter.AdaptableBlotterStore.TheStore.subscribe(() => { ThemeChange(adaptableblotter, gridcontainer); });
}
