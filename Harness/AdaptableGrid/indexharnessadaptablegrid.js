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
            schema.push({ field: p, title: capitalize(p), type: typeof firstRow[p] });
        }
    }
    return schema;
}
function InitBlotter() {
    var dataGen = new harness.DataGenerator();
    var trades = dataGen.getTrades();

    var grid = $("#grid").AdaptableGrid({
        columns: getColumns(),
        data: trades,
        display: null,
        sortable: false,
        pageable: false,
        reorderable: false,
        ongridload: function () { },
        ongridsort: function (sortData) { },
        onpagechange: function (page) { },
        oncellenter: function (cell) { },
        oncellchange: function (cell, newVal, oldVal) { },
        oncolumnupdate: function (columns) { },
        onrightclick: function (columnId) { }
    })
    //dataGen.startTickingDataHypergrid(grid)


    function getColumns() {
        return [
            { field: "tradeId", title: "ID", type: 'text' },
            { field: "notional", title: "Notional", type: 'num' },
            { field: "counterparty", title: "Counterparty", type: 'text' },
            { field: "currency", title: "Currency", type: 'text' },
            { field: "country", title: "Country", type: 'text' },
            { field: "tradeDate", title: "Trade Date", type: 'date', format: "DD/MM/YYYY" },
            { field: "settlementDate", title: "Settlement Date", type: 'date', format: "DD/MM/YYYY" },
            { field: "fitchRating", title: "Fitch Rating", type: 'text' },
            { field: "moodysRating", title: "Moodys Rating", type: 'text' },
            { field: "price", title: "Price", type: 'num' },
            { field: "bidOfferSpread", title: "Bid Offer Spread", type: 'num' },
            { field: "bid", title: "Bid", type: 'num', format: "0,0.00" },
            { field: "ask", title: "Ask", type: 'num', format: "0,0.00" },
            { field: "bloombergBid", title: "Bloomberg Bid", type: 'num' },
            { field: "bloombergAsk", title: "Bloomberg Ask", type: 'num' },
            { field: "isLive", title: "Is Live", type: 'checkbox' },
            { field: "changeOnYear", title: "Change On Year", type: 'num' },
           
            { field: "lastUpdated", title: "Last Update", type: 'date', format: "DD/MM/YYYY" },
            { field: "lastUpdatedBy", title: "Last Updated By", type: 'text' }



        ];
    }

    var container = document.getElementById('content');
    adaptableblotter = new adaptableblottergrid.AdaptableBlotter(grid, container, {
        primaryKey: "tradeId",
        userName: "harnessuser",
        enableAuditLog: false,
        enableRemoteConfigServer: false
    });
}
