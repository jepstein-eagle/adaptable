﻿import { GridOptions, RowNode } from 'ag-grid-community';
import { ITrade } from './ExamplesHelper';

export class TickingDataHelper {
  startTickingDataHypergrid(grid: any) {
    setInterval(() => {
      const numberToAdd: number = this.generateRandomInt(1, 2) == 1 ? -0.5 : 0.5;
      // pick a random trade in the first ten
      const trade = this.getRandomItem(grid.behavior.getData(), 20);
      // pick a random colum in the numeric col
      const columnName = 'price'; // this.getRandomItem(this._numericCols);
      const initialNewValue = trade[columnName];
      const newValue = this.roundTo4Dp(initialNewValue + numberToAdd);
      trade[columnName] = newValue;

      trade.ask = this.roundTo4Dp(trade.price - trade.bidOfferSpread / 2);
      trade.bid = this.roundTo4Dp(trade.price + trade.bidOfferSpread / 2);

      trade.bloombergAsk = this.roundTo4Dp(trade.ask + 0.01);
      trade.bloombergBid = this.roundTo4Dp(trade.bid - 0.01);
      // grid.behavior.reindex();
      grid.repaint();
    }, 1000);
  }

  startTickingDataagGridSetData(gridOptions: GridOptions) {
    setInterval(() => {
      const tradeId = this.generateRandomInt(0, 20);
      if (gridOptions != null && gridOptions.api != null && gridOptions.api != undefined) {
        gridOptions.api.forEachNode((rowNode: RowNode) => {
          if (rowNode.group) {
            return;
          }
          const rowTradeId = gridOptions.api!.getValue('tradeId', rowNode);
          if (rowTradeId != tradeId) {
            return;
          }

          const test = rowNode.data;
          test.notional = this.generateRandomInt(1, 200000);
          rowNode.setData(test);
        });
      }
    }, 5000);
  }

  // This DOES update the AB as agGrid fires an event
  startTickingDataagGridSetDataValue(gridOptions: GridOptions) {
    setInterval(() => {
      const tradeId = this.generateRandomInt(0, 20);
      if (gridOptions != null && gridOptions.api != null && gridOptions.api != undefined) {
        gridOptions.api.forEachNode((rowNode: RowNode) => {
          if (rowNode.group) {
            return;
          }
          const rowTradeId = gridOptions.api!.getValue('tradeId', rowNode);
          if (rowTradeId != tradeId) {
            return;
          }

          const randomInt = this.generateRandomInt(1, 2);
          const numberToAdd: number = randomInt == 1 ? -0.5 : 0.5;
          const directionToAdd: number = randomInt == 1 ? -0.01 : 0.01;
          const trade = rowNode;
          const columnName = 'price';
          const initialPrice = gridOptions.api!.getValue(columnName, trade);
          const newPrice = this.roundTo4Dp(initialPrice + numberToAdd);
          trade.setDataValue(columnName, newPrice);
          const bidOfferSpread = gridOptions.api!.getValue('bidOfferSpread', trade);
          const ask = this.roundTo4Dp(newPrice + bidOfferSpread / 2);
          trade.setDataValue('ask', ask);
          const bid = this.roundTo4Dp(newPrice - bidOfferSpread / 2);
          trade.setDataValue('bid', bid);
          trade.setDataValue('bloombergAsk', this.roundTo4Dp(ask + directionToAdd));
          trade.setDataValue('bloombergBid', this.roundTo4Dp(bid - directionToAdd));

          const notional = gridOptions.api!.getValue('notional', trade);
          if (notional == 340) {
            trade.setDataValue('notional', 4);
          } else {
            trade.setDataValue('notional', 340);
          }
        });
      }
    }, 2000);
  }

  // This DOES NOT update the AB as agGrid fires an event
  startTickingDataagGridThroughRowData(gridOptions: GridOptions, rowData: any) {
    if (
      gridOptions != null &&
      gridOptions.api != null &&
      gridOptions.api != undefined &&
      rowData != null
    ) {
      setInterval(() => {
        const tradeId = 4; // this.generateRandomInt(0, 25);
        const trade: ITrade = { ...rowData[tradeId] };
        if (trade) {
          const randomInt = this.generateRandomInt(1, 2);
          const numberToAdd: number = randomInt == 1 ? -0.5 : 0.5;
          const directionToAdd: number = randomInt == 1 ? -0.01 : 0.01;
          const newPrice = this.roundTo4Dp(trade.price + numberToAdd);
          const bidOfferSpread = trade.bidOfferSpread;
          const ask = this.roundTo4Dp(newPrice + bidOfferSpread / 2);
          const bid = this.roundTo4Dp(newPrice - bidOfferSpread / 2);

          trade.price = newPrice;
          trade.bid = bid;
          trade.ask = ask;
          trade.bloombergAsk = this.roundTo4Dp(ask + directionToAdd);
          trade.bloombergBid = this.roundTo4Dp(bid - directionToAdd);
          trade.notional = trade.notional == 4 ? 34 : 4;
          trade.changeOnYear = trade.changeOnYear > 0 ? -100 : 100;

          gridOptions.api!.updateRowData({ update: [trade] });
        }
      }, 10000);
    }
  }

  public getRandomItem(ary: any[], max?: number): any {
    if (max) {
      return ary[this.generateRandomInt(0, Math.min(max, ary.length - 1))];
    }
    return ary[this.generateRandomInt(0, ary.length - 1)];
  }

  public generateRandomInt(minValue: number, maxValue: number): number {
    return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
  }

  protected roundTo4Dp(val: number): number {
    return Math.round(val * 10000) / 10000;
  }
}
