var adaptableblotter
function InitBlotter() {
    var dataGen = new harness.DataGenerator();
    var trades = dataGen.getTrades();

    $("#grid")
        .kendoGrid({
            dataSource: {
                //  pageSize: 100,
                data: trades,
                schema: {
                    model: {
                        fields: {
                            tradeId: { type: "number" },
                            notional: { type: "number" },
                            counterparty: { type: "string" },
                            currency: { type: "string" },
                            country: { type: "string" },
                            changeOnYear: { type: "number" },
                            price: { type: "number" },
                            bidOfferSpread: { type: "number" },
                            bid: { type: "number", editable: false },
                            ask: { type: "number", editable: false },
                            tradeDate: { type: "date" },
                            isLive: { type: "boolean" },
                            fitchRating: { type: "string" },
                            moodysRating: { type: "string" },
                            sandpRating: { type: "string" },
                            settlementDate: { type: "date" },
                            bloombergAsk: { type: "number" },
                            bloombergBid: { type: "number" },
                            percentChange: { type: "number" },
                            lastUpdated: { type: "date" },
                            lastUpdatedBy: { type: "string" }
                        }
                    }
                }
            },
            columns:
                [
                    { field: "tradeId", title: "ID" },
                    { field: "notional", title: "Notional", format: "{0:c0}", attributes: { style: "text-align:right;" } },
                    { field: "counterparty", title: "Counterparty", filterable: { multi: true, search: true } },
                    { field: "currency", title: "Currency", width: 100 },
                    { field: "country", title: "Country", filterable: { multi: true, search: true }, width: 200 },
                    { field: "tradeDate", title: "Trade Date", format: "{0:dd MMM yyyy}", width: 200 },
                    { field: "settlementDate", title: "Settlement Date", format: "{0:dd MMM yyyy}" },
                    { field: "fitchRating", title: "Fitch Rating", filterable: { multi: true, search: true, search: true } },
                    { field: "moodysRating", title: "Moodys Rating" },
                    { field: "sandpRating", title: "S & P Rating" },
                    { field: "price", title: "Price", format: "{0:n4}", attributes: { class: "numberColumn" }, editor: setEditDecimals },
                    { field: "bidOfferSpread", title: "Bid Offer Spread", format: "{0:n}", attributes: { class: "numberColumn" }, editor: setEditDecimals },
                    { field: "bid", title: "Bid", format: "{0:n4}", attributes: { class: "numberColumn" }, editor: setEditDecimals },
                    { field: "ask", title: "Ask", format: "{0:n4}", attributes: { class: "numberColumn" }, editor: setEditDecimals },
                    { field: "bloombergBid", title: "Bloomberg Bid", format: "{0:n4}", attributes: { class: "numberColumn" }, editor: setEditDecimals },
                    { field: "bloombergAsk", title: "Bloomberg Ask", format: "{0:n4}", attributes: { class: "numberColumn" }, editor: setEditDecimals },
                    { field: "isLive", title: "Is Live" },
                    { field: "changeOnYear", title: "Change On Year", format: "{0:n4}", attributes: { class: "numberColumn" }, editor: setEditDecimals },
                    { field: "percentChange", title: "Percent Change", format: "{0:p}", attributes: { class: "numberColumn" } },
                    { field: "lastUpdated", title: "Last Update", format: "{0:dd MMM yyyy}", width: "450px" },
                    { field: "lastUpdatedBy", title: "Last Updated By" }
                ],
            selectable: "multiple cell",
            sortable: true,
            reorderable: true,
            navigatable: true,
            resizable: true,
            scrollable: false,
            filterable: true,
            editable: true,
            columnMenu: false,
            /*{
                   filterable: false,
messages: {
  columns: "Choose columns",
  filter: "Apply filter",
  sortAscending: "Sort (asc)",
  sortDescending: "Sort (desc)"
},
*/

        });

    let json = {
        "ConditionalStyle": {
            "ConditionalStyles": [
                {
                    "ColumnId": '',
                    "Style": {
                        "ClassName": "styleForeYellow"
                    },
                    "ConditionalStyleScope": 'Row',
                    "Expression": {
                        "DisplayValueExpressions": [
                            {
                                "ColumnId": 'country',
                                "DisplayValues": [
                                    'France',
                                    'Germany'
                                ]
                            }
                        ],
                        "RawValueExpressions": [],
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
        }
    }

    var grid = $("#grid").data("kendoGrid");
    var container = document.getElementById('content');
    adaptableblotter = new adaptableblotterkendo.AdaptableBlotter(grid, container, {
        primaryKey: "tradeId",
        userName: "harnessuser",
        enableAuditLog: false,
        enableRemoteConfigServer: false,
        predefinedConfig: json,
        iPushPullConfig: {
            api_key: "CbBaMaoqHVifScrYwKssGnGyNkv5xHOhQVGm3cYP",
            api_secret: "xYzE51kuHyyt9kQCvMe0tz0H2sDSjyEQcF5SOBlPQmcL9em0NqcCzyqLYj5fhpuZxQ8BiVcYl6zoOHeI6GYZj1TkUiiLVFoW3HUxiCdEUjlPS8Vl2YHUMEPD5qkLYnGj",
        }
    });
    adaptableblotter.AdaptableBlotterStore.TheStore.subscribe(() => this.ThemeChange(adaptableblotter))
}

function setEditDecimals(container, options) {
    $("<input name='" + options.field + "'/>")
        .appendTo(container)
        .kendoNumericTextBox({ decimals: 4 });
}
var themeName = ""
function ThemeChange(blotter, grid) {
    if (themeName != blotter.AdaptableBlotterStore.TheStore.getState().Theme.CurrentTheme) {
        themeName = blotter.AdaptableBlotterStore.TheStore.getState().Theme.CurrentTheme
        if (themeName == "Dark Theme" || themeName == "Slate" || themeName == "Cyborg" || themeName == "Darkly" || themeName == "Superhero") {
            var a_href = $('#kendotheme').attr('href')
            $('#kendotheme').attr('href', a_href.replace('blueopal', 'black'));
        }
        else {
            var a_href = $('#kendotheme').attr('href')
            $('#kendotheme').attr('href', a_href.replace('black', 'blueopal'));
        }
    }
}