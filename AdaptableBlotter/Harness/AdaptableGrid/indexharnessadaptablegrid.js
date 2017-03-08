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
                schema.push({ field: p, title: capitalize(p), type: typeof firstRow[p]  });
        }
    }
    return schema;
}
function InitBlotter() {
    var dataGen = new harness.DataGenerator();
    var trades = dataGen.getTrades();

    var grid = $("#grid").AdaptableGrid({
            columns: getSchema(trades),
            data: trades,
            display: null,
            sortable: false,
            pageable: false,
            reorderable: false,
            ongridload: function() {},
            ongridsort: function(sortData) {},
            onpagechange: function(page) {},
            oncellenter: function(cell) {},
            oncellchange: function(cell, newVal, oldVal) {},
            oncolumnupdate: function(columns) {},
            onrightclick: function(columnId) {}
        })
    //dataGen.startTickingDataHypergrid(grid)
    
    var container = document.getElementById('content');
    adaptableblotter = new adaptableblottergrid.AdaptableBlotter(grid, container, {
        primaryKey: "tradeId",
        userName: "Jonathan",
        enableAuditLog: false,
        enableRemoteConfigServer: false
    });
}
