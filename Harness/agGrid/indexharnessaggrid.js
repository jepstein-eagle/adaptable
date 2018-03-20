
function ThemeChange(blotter, container) {

    if (themeName != blotter.AdaptableBlotterStore.TheStore.getState().Theme.CurrentTheme) {
        themeName = blotter.AdaptableBlotterStore.TheStore.getState().Theme.CurrentTheme
        if (themeName == "Slate" || themeName == "Cyborg" || themeName == "Darkly" || themeName == "Superhero") {
            container.className = "ag-theme-dark";
        } else if (themeName == "flatyle") {
            container.className = "ag-theme-balham";
        }
        else {
            container.className = "ag-theme-blue";
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
    var schema = [],
        firstRow = Array.isArray(data) && data[0];

    firstRow = (typeof firstRow === 'object') ? firstRow : {};
    for (var p in firstRow) {
        if (firstRow.hasOwnProperty(p)) {
            if (p === 'ask' || p === 'bid' || p === 'bloombergAsk' || p === 'bloombergBid') {
                schema.push({ headerName: capitalize(p), field: p });
            }
            else if (p === 'isLive') {
                schema.push({ headerName: capitalize(p), field: p, filter: 'text' });
            }
            // grouped columns
            else if (p === 'counterparty' || p === 'country' || p === 'currency' || p === 'lastUpdatedBy') {
                schema.push({ headerName: capitalize(p), field: p, filter: 'text', enableRowGroup: true });
            }
            else if (p === 'price') {
                schema.push({ headerName: capitalize(p), field: p, filter: 'text' });
            }
            else if (p === 'notional') {  // has own render and is groupable
                schema.push({ headerName: capitalize(p), field: p, editable: true, filter: 'text', cellRenderer: notionalCellRenderer, enableRowGroup: true });
            } else if (p.includes("Date")) {
                schema.push({ headerName: capitalize(p), field: p, editable: true, cellEditorParams: { useFormatter: true }, valueParser: dateParseragGrid, valueFormatter: shortDateFormatteragGrid });
            } else {
                schema.push({ headerName: capitalize(p), field: p, editable: true, filter: 'text' });
            }
        }
    }
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
        animateRows: true,
        enableFilter: true,

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
        predefinedConfigUrl: "", // "predefinedConfig.json",
        iPushPullConfig: {
            api_key: "CbBaMaoqHVifScrYwKssGnGyNkv5xHOhQVGm3cYP",
            api_secret: "xYzE51kuHyyt9kQCvMe0tz0H2sDSjyEQcF5SOBlPQmcL9em0NqcCzyqLYj5fhpuZxQ8BiVcYl6zoOHeI6GYZj1TkUiiLVFoW3HUxiCdEUjlPS8Vl2YHUMEPD5qkLYnGj",
        }
    });

    adaptableblotter.AdaptableBlotterStore.TheStore.subscribe(() => { ThemeChange(adaptableblotter, gridcontainer); });
}
