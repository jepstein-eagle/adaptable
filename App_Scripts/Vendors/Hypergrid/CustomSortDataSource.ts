import { AdaptableBlotter } from './AdaptableBlotter'
import { SortOrder } from '../../Core/Enums'
import { DataSourceIndexed } from './DataSourceIndexed'

//All custom pipelines should extend from pipelineBase
export let CustomSortDataSource = (blotter: AdaptableBlotter) => DataSourceIndexed.extend('CustomSortDataSource', {
    blotter: blotter,
    // This function is called on every reIndex call if this object is in the pipelne
    apply: function () {
        var c = blotter.sortColumnGridIndex;
        if (c == -1) {
            this.clearIndex();
            return;
        }

        //There is a sort so we init the index array with each items index and we'll sort that
        this.buildIndex()
        let fields = blotter.sortColumnName
        let hypergridColumn = blotter.getHypergridColumn(blotter.sortColumnName);
        let tmp = new Array(this.index.length);


        let customSort = blotter.AdaptableBlotterStore.TheStore.getState().CustomSort.CustomSorts.find(x => x.ColumnId == fields)
        if (customSort) {
            for (let i = 0; i < tmp.length; i++) {
                let dataRow = this.dataSource.getRow(i);
                tmp[i] = [this.valOrFunc(dataRow, hypergridColumn), i];
            }
            let direction: number = 1
            if (this.blotter.sortOrder === SortOrder.Descending) {
                direction = -1
            }
            let formatter = blotter.getColumnFormatter(customSort.ColumnId)
            tmp.sort(function (a: any, b: any) {
                let firstElement = a[0]
                let secondElement = b[0]
                let firstElementValueString = formatter?formatter(firstElement):String(firstElement) //firstElement[customSort.ColumnId];
                let secondElementValueString = formatter?formatter(secondElement):String(secondElement)//secondElement[customSort.ColumnId];
                let indexFirstElement = customSort.CustomSortItems.indexOf(firstElementValueString);
                let containsFirstElement = indexFirstElement >= 0;
                let indexSecondElement = customSort.CustomSortItems.indexOf(secondElementValueString);
                let containsSecondElement = indexSecondElement >= 0;
                //if none of the element are in the list we jsut return normal compare
                if (!containsFirstElement && !containsSecondElement) {
                    return ((firstElement < secondElement) ? -1 : 1) * direction;
                }
                //if first item not in the list make sure we put it after the second item
                if (!containsFirstElement) {
                    return 1 * direction;
                }
                //if second item not in the list make sure we put it after the first item
                if (!containsSecondElement) {
                    return -1 * direction;
                }
                //return the comparison from the list if the two items are in the list
                return indexFirstElement - indexSecondElement;
            })
        }
        else {

            for (let i = 0; i < tmp.length; i++) {
                let dataRow = this.dataSource.getRow(i);
                tmp[i] = [this.valOrFunc(dataRow, hypergridColumn), i];
            }
            let direction: number = 1
            if (this.blotter.sortOrder === SortOrder.Descending) {
                direction = -1
            }
            tmp.sort(function (a: any, b: any) {
                if (a[0] > b[0]) {
                    return direction * 1;
                }
                if (a[0] < b[0]) {
                    return -1 * direction;
                }
                // a must be equal to b
                return 0 * direction;
            })
        }

        for (let i = 0; i < this.index.length; i++) {
            this.index[i] = tmp[i][1];
        }
    },
    valOrFunc : function(dataRow: any, column: any) {
        var result, calculator;
        if (dataRow) {
            result = dataRow[column.name];
            calculator = (typeof result)[0] === 'f' && result || column.calculator;
            if (calculator) {
                result = calculator(dataRow, column.name);
            }
        }
        return result || result === 0 || result === false ? result : '';
    }
});