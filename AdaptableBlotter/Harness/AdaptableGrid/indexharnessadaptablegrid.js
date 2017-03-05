function InitBlotter() {
    var dataGen = new harness.DataGenerator();
    var trades = dataGen.getTrades();

    var grid = null //CREATE_GRID_METHOD
    //dataGen.startTickingDataHypergrid(grid)
    
    var container = document.getElementById('content');
    var blotter = new adaptableblottergrid.AdaptableBlotter(grid, container, {
        primaryKey: "tradeId",
        userName: "Jonathan",
        enableAuditLog: false,
        enableRemoteConfigServer: false
    });
}
