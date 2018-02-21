
var bondDeskHeadBlotter
var bondTraderBlotter
var fxBlotter

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
    var bonds = dataGen.getBonds();
    var fxs = dataGen.getFX();


    var bondDeskHeadGridOptions = {
        columnDefs: getSchema(bonds),
        rowData: bonds,
        enableSorting: true,
        enableGrouping: true,
        enableRangeSelection: true,
        enableFilter: true
    };

    var bondDeskHeadGridDiv = document.getElementById('bondDeskHeadGrid');
    var bondDeskHeadGrid = new agGrid.Grid(bondDeskHeadGridDiv, bondDeskHeadGridOptions);
    var bondDeskHeadContainer = document.getElementById('bondDeskHeadContainer');
    var bondDeskHeadGridcontainer = document.getElementById('bondDeskHeadGrid');
    bondDeskHeadBlotter = new adaptableblotteraggrid.AdaptableBlotter(bondDeskHeadGridOptions, bondDeskHeadContainer, bondDeskHeadGridcontainer, {
        primaryKey: "tradeId",
        userName: "Head of Bond Desk",
        blotterId: "Bond Full Blotter",
        enableAuditLog: false,
        enableRemoteConfigServer: true,
        predefinedConfigUrl: "",// "predefinedConfig.json",
        iPushPullConfig: {
            api_key: "CbBaMaoqHVifScrYwKssGnGyNkv5xHOhQVGm3cYP",
            api_secret: "xYzE51kuHyyt9kQCvMe0tz0H2sDSjyEQcF5SOBlPQmcL9em0NqcCzyqLYj5fhpuZxQ8BiVcYl6zoOHeI6GYZj1TkUiiLVFoW3HUxiCdEUjlPS8Vl2YHUMEPD5qkLYnGj",
        }
    });

    var bondTraderGridOptions = {
        columnDefs: getSchema(bonds),
        rowData: bonds,
        enableSorting: true,
        enableGrouping: true,
        enableRangeSelection: true,
        enableFilter: true
    };

    var bondTraderGridDiv = document.getElementById('bondTraderGrid');
    var bondTraderGrid = new agGrid.Grid(bondTraderGridDiv, bondTraderGridOptions);
    var bondTraderContainer = document.getElementById('bondTraderContainer');
    var bondTraderGridcontainer = document.getElementById('bondTraderGrid');
    bondTraderBlotter = new adaptableblotteraggrid.AdaptableBlotter(bondTraderGridOptions, bondTraderContainer, bondTraderGridcontainer, {
        primaryKey: "tradeId",
        userName: "Bond Trader",
        blotterId: "Bond Trade Blotter",
        enableAuditLog: false,
        enableRemoteConfigServer: true,
        predefinedConfigUrl: "",// "predefinedConfig.json",
        iPushPullConfig: {
            api_key: "CbBaMaoqHVifScrYwKssGnGyNkv5xHOhQVGm3cYP",
            api_secret: "xYzE51kuHyyt9kQCvMe0tz0H2sDSjyEQcF5SOBlPQmcL9em0NqcCzyqLYj5fhpuZxQ8BiVcYl6zoOHeI6GYZj1TkUiiLVFoW3HUxiCdEUjlPS8Vl2YHUMEPD5qkLYnGj",
        }
    });


    var fxGridOptions = {
        columnDefs: getSchema(fxs),
        rowData: fxs,
        enableSorting: true,
        enableGrouping: true,
        enableRangeSelection: true,
        enableFilter: true
    };
    var fxGridDiv = document.getElementById('fxGrid');
    var fxGrid = new agGrid.Grid(fxGridDiv, fxGridOptions);
    var fxContainer = document.getElementById('fxContainer');
    var fxGridcontainer = document.getElementById('fxGrid');
    fxBlotter = new adaptableblotteraggrid.AdaptableBlotter(fxGridOptions, fxContainer, fxGridcontainer, {
        primaryKey: "tradeId",
        userName: "FX User",
        blotterId: "FX Blotter",
        enableAuditLog: false,
        enableRemoteConfigServer: true,
        predefinedConfigUrl: "",// "predefinedConfig.json",
        iPushPullConfig: {
            api_key: "CbBaMaoqHVifScrYwKssGnGyNkv5xHOhQVGm3cYP",
            api_secret: "xYzE51kuHyyt9kQCvMe0tz0H2sDSjyEQcF5SOBlPQmcL9em0NqcCzyqLYj5fhpuZxQ8BiVcYl6zoOHeI6GYZj1TkUiiLVFoW3HUxiCdEUjlPS8Vl2YHUMEPD5qkLYnGj",
        }
    });


    // to run config server its:
    //  "configserver": "ts-node configserver/configserver.ts --configfolder ./tmp | bunyan

    // to kill all processes:
    // killall node
}

