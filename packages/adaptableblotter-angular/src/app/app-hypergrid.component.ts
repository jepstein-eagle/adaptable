import { Component } from '@angular/core';
import { IAdaptableBlotterOptions } from 'adaptableblotter-angular';

import DataGenerator from './data-generator';

@Component({
  selector: 'adaptableblotter-hypergrid-root',
  template: `
   <div id="adaptableblotter-hypergrid-react-demo-app">
    <adaptable-blotter-hypergrid
      [adaptableBlotterOptions]="blotterOptions"
      [gridOptions]="gridOptions">
    </adaptable-blotter-hypergrid>
  </div>
  `
})
export class AppHyperGridComponent {
  data = new DataGenerator().getTrades(5000);
  gridOptions = {
    data: this.data,
    schema: AppHyperGridComponent.getSchema(this.data),
    setupgrid: ((grid) => AppHyperGridComponent.setupHypergrid(grid))
  };
  blotterOptions: IAdaptableBlotterOptions = {
    primaryKey: 'tradeId',
    userName: 'jonathan',
    blotterId: 'Hypergrid Wrapper'
  };

  static getSchema(data) {
    const schema = [];
    let firstRow = Array.isArray(data) && data[0];

    firstRow = typeof firstRow === 'object' ? firstRow : {};
    for (const p in firstRow) {
      if (firstRow.hasOwnProperty(p)) {
        if (p === 'notional' || p === 'ask' || p === 'bid') {
          schema.push({ name: p, header: AppHyperGridComponent.capitalize(p), type: 'number' });
        } else if (p === 'tradeDate') {
          schema.push({ name: p, header: AppHyperGridComponent.capitalize(p), type: 'date' });
        } else {
          schema.push({ name: p, header: AppHyperGridComponent.capitalize(p) });
        }
      }
    }
    return schema;
  }

  static capitalize(string) {
    const replacer = (a, b, c) => {
      return b.toUpperCase() + c;
    };
    return (/[a-z]/.test(string) ? string : string.toLowerCase())
      .replace(/[\s\-_]*([^\s\-_])([^\s\-_]+)/g, replacer)
      .replace(/[A-Z]/g, ' $&')
      .trim();
  }

  // setupgrid method allowing you to add any additional functionality to the grid
  static setupHypergrid(grid: any) {
    grid.addProperties({ renderFalsy: true });
    grid.addProperties({ editOnKeydown: false });
    grid.behavior.dataModel.getCellEditorAt = function (columnIndex, rowIndex, declaredEditorName, options) {
      let editorName = declaredEditorName;
      if (options.column.name !== 'tradeId'
        && options.column.name !== 'price'
        && options.column.name !== 'bid'
        && options.column.name !== 'ask'
        && options.column.name !== 'isLive'
        && options.column.name !== 'bloomberkAsk'
        && options.column.name !== 'bloomberkBid'
        && options.column.name !== 'percentChange'
      ) {
        editorName = 'textfield';
      }
      return grid.cellEditors.create(editorName, options);
    };
  }
}
