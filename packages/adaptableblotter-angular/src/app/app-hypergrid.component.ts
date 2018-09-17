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
  data = new DataGenerator().getTrades(1000);
  gridOptions = {
    data: this.data,
    schema: AppHyperGridComponent.getSchema(this.data)
  };
  blotterOptions: IAdaptableBlotterOptions = {
    primaryKey: 'tradeId',
    userName: 'jonathan',
    blotterId: 'my Blotter',
    enableAuditLog: false,
    enableRemoteConfigServer: false,
    //  predefinedConfig: json,
    serverSearchOption: 'None',
    maxColumnValueItemsDisplayed: 1000
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
}
