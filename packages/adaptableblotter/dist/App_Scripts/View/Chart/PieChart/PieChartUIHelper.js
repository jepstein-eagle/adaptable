"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChartEnums_1 = require("../../../Utilities/ChartEnums");
/* Trying to make Charting a bit more 'manageable by putting some of the functionality in ChartDisplayPopup into this Helper Class
*/
var PieChartUIHelper;
(function (PieChartUIHelper) {
    function getBrushesEven() {
        return ["#7446B9", "#9FB328", "#F96232", "#2E9CA6", "#DC3F76", "#FF9800", "#3F51B5", "#439C47"];
    }
    PieChartUIHelper.getBrushesEven = getBrushesEven;
    function getBrushesOdd() {
        return ["#7446B9", "#9FB328", "#F96232", "#2E9CA6", "#DC3F76", "#FF9800", "#3F51B5", "#439C47", "#795548"];
    }
    PieChartUIHelper.getBrushesOdd = getBrushesOdd;
    function setChartDisplayPopupState(chartDefinition, dataSource) {
        let pieChartProperties = chartDefinition.ChartProperties;
        return {
            DataSource: dataSource,
            ChartProperties: pieChartProperties,
            IsChartSettingsVisible: true,
            IsGeneralMinimised: false,
            SliceSortOption: ChartEnums_1.SliceSortOption.ValueDescending,
            SliceBrushes: dataSource.length % 2 == 0 ? getBrushesOdd() : getBrushesEven(),
        };
    }
    PieChartUIHelper.setChartDisplayPopupState = setChartDisplayPopupState;
    function setDefaultChartDisplayPopupState() {
        let defaultState = {
            IsChartSettingsVisible: true,
            IsGeneralMinimised: false,
            SliceSortOption: ChartEnums_1.SliceSortOption.ValueDescending,
        };
        return defaultState;
    }
    PieChartUIHelper.setDefaultChartDisplayPopupState = setDefaultChartDisplayPopupState;
    function sortDataSource(sliceSortOption, oldData) {
        if (oldData == null || oldData.length == 0) {
            return [];
        }
        let newData = [...oldData];
        switch (sliceSortOption) {
            case ChartEnums_1.SliceSortOption.ValueAscending:
                newData.sort(sortByValueAscending);
                break;
            case ChartEnums_1.SliceSortOption.ValueDescending:
                newData.sort(sortByValueDescending);
                break;
            case ChartEnums_1.SliceSortOption.NameAscending:
                newData.sort(sortByNameAscending);
                break;
            case ChartEnums_1.SliceSortOption.NameDescending:
                newData.sort(sortByNameDescending);
                break;
        }
        return newData;
    }
    PieChartUIHelper.sortDataSource = sortDataSource;
    function sortByNameAscending(a, b) {
        let nameA = a.Name.toLowerCase();
        let nameB = b.Name.toLowerCase();
        if (nameA > nameB) {
            return 1;
        }
        if (nameA < nameB) {
            return -1;
        }
        return 0;
    }
    PieChartUIHelper.sortByNameAscending = sortByNameAscending;
    function sortByNameDescending(a, b) {
        let nameA = a.Name.toLowerCase();
        let nameB = b.Name.toLowerCase();
        if (nameA > nameB) {
            return -1;
        }
        if (nameA < nameB) {
            return 1;
        }
        return 0;
    }
    PieChartUIHelper.sortByNameDescending = sortByNameDescending;
    function sortByValueAscending(a, b) {
        if (a.Value > b.Value) {
            return 1;
        }
        if (a.Value < b.Value) {
            return -1;
        }
        return 0;
    }
    PieChartUIHelper.sortByValueAscending = sortByValueAscending;
    function sortByValueDescending(a, b) {
        if (a.Value > b.Value) {
            return -1;
        }
        if (a.Value < b.Value) {
            return 1;
        }
        return 0;
    }
    PieChartUIHelper.sortByValueDescending = sortByValueDescending;
})(PieChartUIHelper = exports.PieChartUIHelper || (exports.PieChartUIHelper = {}));
