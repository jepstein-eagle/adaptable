import { GridOptions } from 'ag-grid-community';
import { ITrade } from './ExamplesHelper';

export class TickingDataHelper {
  startTickingDataHypergrid(grid: any) {
    setInterval(() => {
      let numberToAdd: number = this.generateRandomInt(1, 2) == 1 ? -0.5 : 0.5;
      //pick a random trade in the first ten
      let trade = this.getRandomItem(grid.behavior.getData(), 30);
      //pick a random colum in the numeric col
      let columnName = 'price'; // this.getRandomItem(this._numericCols);
      let initialNewValue = trade[columnName];
      let newValue = this.roundTo4Dp(initialNewValue + numberToAdd);
      trade[columnName] = newValue;

      trade['ask'] = this.roundTo4Dp(trade['price'] - trade['bidOfferSpread'] / 2);
      trade['bid'] = this.roundTo4Dp(trade['price'] + trade['bidOfferSpread'] / 2);

      trade['bloombergAsk'] = this.roundTo4Dp(trade['ask'] + 0.01);
      trade['bloombergBid'] = this.roundTo4Dp(trade['bid'] - 0.01);
      //grid.behavior.reindex();
      grid.repaint();
    }, 500);
  }

  startTickingDataagGridSetDataValue(gridOptions: GridOptions) {
    setInterval(() => {
      let tradeId = this.generateRandomInt(0, 25);
      if (gridOptions != null && gridOptions.api != null && gridOptions.api != undefined) {
        gridOptions.api.forEachNode((rowNode: any) => {
          if (rowNode.group) {
            return;
          }
          let rowTradeId = gridOptions.api!.getValue('tradeId', rowNode);
          if (rowTradeId != tradeId) {
            return;
          }

          let randomInt = this.generateRandomInt(1, 2);
          let numberToAdd: number = randomInt == 1 ? -0.5 : 0.5;
          let directionToAdd: number = randomInt == 1 ? -0.01 : 0.01;
          let trade = rowNode;
          let columnName = 'price';
          let initialPrice = gridOptions.api!.getValue(columnName, trade);
          let newPrice = this.roundTo4Dp(initialPrice + numberToAdd);
          trade.setDataValue(columnName, newPrice);
          let bidOfferSpread = gridOptions.api!.getValue('bidOfferSpread', trade);
          let ask = this.roundTo4Dp(newPrice + bidOfferSpread / 2);
          trade.setDataValue('ask', ask);
          let bid = this.roundTo4Dp(newPrice - bidOfferSpread / 2);
          trade.setDataValue('bid', bid);
          trade.setDataValue('bloombergAsk', this.roundTo4Dp(ask + directionToAdd));
          trade.setDataValue('bloombergBid', this.roundTo4Dp(bid - directionToAdd));

          let notional = gridOptions.api!.getValue('notional', trade);
          if (notional == 4) {
            trade.setDataValue('notional', 100);
          } else {
            trade.setDataValue('notional', 4);
          }
        });
      }
    }, 500);
  }

  startTickingDataagGridThroughRowData(gridOptions: GridOptions, rowData: any) {
    if (
      gridOptions != null &&
      gridOptions.api != null &&
      gridOptions.api != undefined &&
      rowData != null
    ) {
      setInterval(() => {
        let tradeId = 5; //this.generateRandomInt(0, 25);
        let trade: ITrade = rowData[tradeId];
        let randomInt = this.generateRandomInt(1, 2);
        let numberToAdd: number = randomInt == 1 ? -0.5 : 0.5;
        let directionToAdd: number = randomInt == 1 ? -0.01 : 0.01;
        let newPrice = this.roundTo4Dp(trade.price + numberToAdd);
        let bidOfferSpread = trade.bidOfferSpread;
        let ask = this.roundTo4Dp(newPrice + bidOfferSpread / 2);
        let bid = this.roundTo4Dp(newPrice - bidOfferSpread / 2);

        trade.price = newPrice;
        trade.bid = bid;
        trade.ask = ask;
        trade.bloombergAsk = this.roundTo4Dp(ask + directionToAdd);
        trade.bloombergBid = this.roundTo4Dp(bid - directionToAdd);
        trade.notional = trade.notional == 4 ? 34 : 4;
        trade.changeOnYear = trade.changeOnYear > 0 ? -100 : 100;

        gridOptions.api!.updateRowData({ update: [trade] });
      }, 3000);
    }
  }

  public getRandomItem(ary: any[], max?: number): any {
    if (max) {
      return ary[this.generateRandomInt(0, Math.min(max, ary.length - 1))];
    } else {
      return ary[this.generateRandomInt(0, ary.length - 1)];
    }
  }

  public generateRandomInt(minValue: number, maxValue: number): number {
    return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
  }

  protected roundTo4Dp(val: number): number {
    return Math.round(val * 10000) / 10000;
  }
}
