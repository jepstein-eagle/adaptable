import { AdaptableBlotter } from './AdaptableBlotter';
import { SortOrder } from '../PredefinedConfig/Common/Enums';
import { DataSourceIndexed } from './DataSourceIndexed';
import * as _ from 'lodash';
import { SortHelper } from '../Utilities/Helpers/SortHelper';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { ColumnSort } from '../PredefinedConfig/IUserState/LayoutState';

export interface ICustomSortInfo {
  SortedValues: any[];
  Formatter: any;
}

//All custom pipelines should extend from pipelineBase
export let CustomSortDataSource = (blotter: AdaptableBlotter) =>
  DataSourceIndexed.extend('CustomSortDataSource', {
    blotter: blotter,
    // This function is called on every reIndex call if this object is in the pipelne
    apply: function() {
      let columnSorts = blotter.api.gridApi.getColumnSorts();

      if (ArrayExtensions.IsNullOrEmpty(columnSorts)) {
        this.clearIndex();
        return;
      }

      //There is a sort so we init the index array with each items index and we'll sort that
      this.buildIndex();

      let dataToSort = new Array(this.index.length);

      let hypergridColumns: any[] = [];

      let customSortInfoList: ICustomSortInfo[] = [];

      let customSortFunction: any = function(
        firstElement: any,
        secondElement: any,
        direction: number
      ) {
        // for now assuming there is only one custom sort... might need something clever in due course
        let customSortInfo: ICustomSortInfo = customSortInfoList[0];
        let firstElementValueString = customSortInfo.Formatter
          ? customSortInfo.Formatter(firstElement)
          : String(firstElement); //firstElement[customSort.ColumnId];
        let secondElementValueString = customSortInfo.Formatter
          ? customSortInfo.Formatter(secondElement)
          : String(secondElement); //secondElement[customSort.ColumnId];
        let indexFirstElement = customSortInfo.SortedValues.indexOf(firstElementValueString);
        let containsFirstElement = indexFirstElement >= 0;
        let indexSecondElement = customSortInfo.SortedValues.indexOf(secondElementValueString);
        let containsSecondElement = indexSecondElement >= 0;
        //if none of the element are in the list we jsut return normal compare
        if (!containsFirstElement && !containsSecondElement) {
          return (firstElement < secondElement ? -1 : 1) * direction;
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
      };

      let basicSortFunction: any = function(a: any, b: any, direction: number) {
        if (a > b) {
          return direction * 1;
        }
        if (a < b) {
          return -1 * direction;
        }
        // a must be equal to b
        return 0 * direction;
      };

      let functionsArray: any[] = [];
      let directionArray: number[] = [];
      columnSorts.forEach((columnSort: ColumnSort) => {
        let hypergridColumn = blotter.getHypergridColumn(columnSort.Column);
        hypergridColumns.push(hypergridColumn);
        let customSort = blotter.api.customSortApi
          .getAllCustomSort()
          .find(x => x.ColumnId == columnSort.Column);
        if (customSort) {
          let direction: number = columnSort.SortOrder === SortOrder.Ascending ? 1 : -1;
          let formatter = blotter.getColumnFormatter(customSort.ColumnId);

          customSortInfoList.push({ SortedValues: customSort.SortedValues, Formatter: formatter });
          directionArray.push(direction);
          functionsArray.push(customSortFunction);
        } else {
          let direction = columnSort.SortOrder == SortOrder.Ascending ? 1 : -1;
          directionArray.push(direction);
          functionsArray.push(basicSortFunction);
        }
      });
      let sortCount = columnSorts.length;

      for (let i = 0; i < dataToSort.length; i++) {
        let dataRow = this.dataSource.getRow(i);

        if (sortCount == 1) {
          dataToSort[i] = {
            OriginalIndex: i,
            ColumnValue1: this.valOrFunc(dataRow, hypergridColumns[0]),
          };
        } else if (sortCount == 2) {
          dataToSort[i] = {
            OriginalIndex: i,
            ColumnValue1: this.valOrFunc(dataRow, hypergridColumns[0]),
            ColumnValue2: this.valOrFunc(dataRow, hypergridColumns[1]),
          };
        } else if (sortCount == 3) {
          dataToSort[i] = {
            OriginalIndex: i,
            ColumnValue1: this.valOrFunc(dataRow, hypergridColumns[0]),
            ColumnValue2: this.valOrFunc(dataRow, hypergridColumns[1]),
            ColumnValue3: this.valOrFunc(dataRow, hypergridColumns[2]),
          };
        } else if (sortCount == 4) {
          dataToSort[i] = {
            OriginalIndex: i,
            ColumnValue1: this.valOrFunc(dataRow, hypergridColumns[0]),
            ColumnValue2: this.valOrFunc(dataRow, hypergridColumns[1]),
            ColumnValue3: this.valOrFunc(dataRow, hypergridColumns[2]),
            ColumnValue4: this.valOrFunc(dataRow, hypergridColumns[3]),
          };
        } else if (sortCount == 5) {
          dataToSort[i] = {
            OriginalIndex: i,
            ColumnValue1: this.valOrFunc(dataRow, hypergridColumns[0]),
            ColumnValue2: this.valOrFunc(dataRow, hypergridColumns[1]),
            ColumnValue3: this.valOrFunc(dataRow, hypergridColumns[2]),
            ColumnValue4: this.valOrFunc(dataRow, hypergridColumns[3]),
            ColumnValue5: this.valOrFunc(dataRow, hypergridColumns[4]),
          };
        }
      }

      if (sortCount == 1) {
        this.index = SortHelper.orderBy(
          dataToSort,
          [(item: any) => item.ColumnValue1],
          directionArray,
          functionsArray
        );
      } else if (sortCount == 2) {
        this.index = SortHelper.orderBy(
          dataToSort,
          [(item: any) => item.ColumnValue1, (item: any) => item.ColumnValue2],
          directionArray,
          functionsArray
        );
      } else if (sortCount == 3) {
        this.index = SortHelper.orderBy(
          dataToSort,
          [
            (item: any) => item.ColumnValue1,
            (item: any) => item.ColumnValue2,
            (item: any) => item.ColumnValue3,
          ],
          directionArray,
          functionsArray
        );
      } else if (sortCount == 4) {
        this.index = SortHelper.orderBy(
          dataToSort,
          [
            (item: any) => item.ColumnValue1,
            (item: any) => item.ColumnValue2,
            (item: any) => item.ColumnValue3,
            (item: any) => item.ColumnValue4,
          ],
          directionArray,
          functionsArray
        );
      } else if (sortCount == 5) {
        this.index = SortHelper.orderBy(
          dataToSort,
          [
            (item: any) => item.ColumnValue1,
            (item: any) => item.ColumnValue2,
            (item: any) => item.ColumnValue3,
            (item: any) => item.ColumnValue4,
            (item: any) => item.ColumnValue5,
          ],
          directionArray,
          functionsArray
        );
      }
    },
    valOrFunc: function(dataRow: any, column: any) {
      var result, calculator;
      if (dataRow) {
        result = dataRow[column.name];
        calculator = ((typeof result)[0] === 'f' && result) || column.calculator;
        if (calculator) {
          result = calculator(dataRow, column.name);
        }
      }
      return result || result === 0 || result === false ? result : '';
    },
  });
