import React, { useEffect } from 'react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import AdaptableBlotter from '../../../../App_Scripts/Hypergrid'
import '../../../../App_Scripts/base.css'
import '../../../../App_Scripts/themes/light.css'
import { DataGenerator } from '../../../../Harness/DataGenerator'

/*
Basic Hypergrid demo that just tests that we can create a Hypergrid and an Adaptable Blotter working together
No JSON or anything complicated
*/



function InitAdaptableBlotter() {
  const dataGen = new DataGenerator();

  const trades = dataGen.getTrades(20);
  var gridOptions = { data: trades, schema: getSchema(trades) };
  var vendorGrid = new fin.Hypergrid('#grid', gridOptions);
  dataGen.startTickingDataHypergrid(vendorGrid)
  //Set to `true` to render `0` and `false`. Otherwise these value appear as blank cells.
  vendorGrid.addProperties({ renderFalsy: true })
  //JO: Temporary. I still havent found a way to prevent the editor to open if a shortcut is executed and editonky is ON
  //which causes an issue.....
  vendorGrid.addProperties({ editOnKeydown: false })

  // make it unsortable 
  // vendorGrid.addProperties({ unsortable: true })

  let behavior = vendorGrid.behavior;

  vendorGrid.localization.add('USDCurrencyFormat', new vendorGrid.localization.NumberFormatter('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }));

  var shortDateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  vendorGrid.localization.add('shortDateFormat', new vendorGrid.localization.DateFormatter('en-EN', shortDateOptions));

  //we enable the edit on some columns
  vendorGrid.behavior.dataModel.getCellEditorAt = function (columnIndex: any, rowIndex: any, declaredEditorName: any, options: any) {
    let editorName = declaredEditorName;
    if (options.column.name !== "tradeId"
      //  && options.column.name !== "changeOnYear"
      && options.column.name !== "price"
      && options.column.name !== "bid"
      && options.column.name !== "ask"
      && options.column.name !== "isLive"
      && options.column.name !== "bloomberkAsk"
      && options.column.name !== "bloomberkBid"
      && options.column.name !== "percentChange"
    ) {
      editorName = 'textfield';
    }
    return vendorGrid.cellEditors.create(editorName, options);
  }

  // Make DeskID not sortable
  behavior.setColumnProperties(2, {
    unsortable: true,
    //   unfilterable: true
  });


  //Add Format for Notional column
  behavior.setColumnProperties(1, {
    format: 'USDCurrencyFormat'
  });

  //Add Edit for Trade Date column
  behavior.setColumnProperties(18, {
    format: 'shortDateFormat'
  });

  //Add Edit for Settlement Date column
  behavior.setColumnProperties(19, {
    format: 'shortDateFormat'
  });

  let adaptableBlotterOptions = {
    vendorGrid: vendorGrid, 
    primaryKey: "tradeId", 
    userName: "demo user", 
    blotterId: "hypergrid demo",
      }

  const adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);
 }

function capitalize(string: any) {
  return (/[a-z]/.test(string) ? string : string.toLowerCase())
    .replace(/[\s\-_]*([^\s\-_])([^\s\-_]+)/g, replacer)
    .replace(/[A-Z]/g, ' $&')
    .trim();
}
function replacer(a: any, b: any, c: any) {
  return b.toUpperCase() + c;
}

function getSchema(data: any) {
  var schema = [],
    firstRow = Array.isArray(data) && data[0];

  firstRow = (typeof firstRow === 'object') ? firstRow : {};
  for (var p in firstRow) {
    if (firstRow.hasOwnProperty(p)) {
      if (p === 'notional' || p === 'ask' || p === 'bid') {
        schema.push({ name: p, header: capitalize(p), type: 'number' });
      }
      else if (p === 'tradeDate') {
        schema.push({ name: p, header: capitalize(p), type: 'date' });
      }
      else {
        schema.push({ name: p, header: capitalize(p) });
      }
    }
  }
  return schema;
}


export default () => {
  useEffect(() => {
    if (!process.browser) {
      return
    }

    InitAdaptableBlotter()
  }, [])

  return null
}