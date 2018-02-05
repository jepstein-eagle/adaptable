function ThemeChange(blotter, container) {

    if (themeName != blotter.AdaptableBlotterStore.TheStore.getState().Theme.CurrentTheme) {
        themeName = blotter.AdaptableBlotterStore.TheStore.getState().Theme.CurrentTheme
        if (themeName == "Slate" || themeName == "Cyborg" || themeName == "Darkly" || themeName == "Superhero") {
             container.className = "ag-dark";
         }
        else {
              container.className = "ag-blue";
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
            if (p === 'ask' || p === 'bid' || p === 'bloombergAsk' || p === 'bloombergBid') {
                schema.push({ headerName: capitalize(p), field: p });
            }
            else if (p === 'price') {
                schema.push({ headerName: capitalize(p), field: p, filter: 'text', cellRenderer: 'animateShowChange' });
            }
            else if (p === 'notional') {
                schema.push({ headerName: capitalize(p), field: p, editable: true, filter: 'text', cellRenderer: notionalCellRenderer });
            }
            else {
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
        enableFilter: true
    };
    var eGridDiv = document.getElementById('grid');
    var grid = new agGrid.Grid(eGridDiv, gridOptions);
    dataGen.startTickingDataagGrid(gridOptions);

    var container = document.getElementById('content');
    var gridcontainer = document.getElementById('grid');
    adaptableblotter = new adaptableblotteraggrid.AdaptableBlotter(gridOptions, container, gridcontainer, {
        primaryKey: "tradeId",
        userName: "harnessuser",
        enableAuditLog: false,
        enableRemoteConfigServer: false,
        iPushPullConfig: {
            api_key: "CbBaMaoqHVifScrYwKssGnGyNkv5xHOhQVGm3cYP",
            api_secret: "xYzE51kuHyyt9kQCvMe0tz0H2sDSjyEQcF5SOBlPQmcL9em0NqcCzyqLYj5fhpuZxQ8BiVcYl6zoOHeI6GYZj1TkUiiLVFoW3HUxiCdEUjlPS8Vl2YHUMEPD5qkLYnGj",
        }
    });

    adaptableblotter.AdaptableBlotterStore.TheStore.subscribe(() => { ThemeChange(adaptableblotter, gridcontainer); });

}

