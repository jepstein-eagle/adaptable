import { GridOptions, RowNode } from 'ag-grid-community';
import { ITrade, ExamplesHelper } from './ExamplesHelper';
import ArrayExtensions from '../../App_Scripts/Utilities/Extensions/ArrayExtensions';
import { IAdaptableBlotter, BlotterApi } from '../../App_Scripts/types';
import { grid } from 'styled-system';

export class TickingDataHelper {
  startTickingDatSystemStatus(api: BlotterApi) {
    setInterval(() => {
      let systemStatusTyps: any = api.systemStatusApi.getSystemStatusState().StatusType;
      if (systemStatusTyps == 'Info') {
        api.systemStatusApi.setWarningSystemStatus('end is nigh');
      } else {
        api.systemStatusApi.setInfoSystemStatus('nah its ok');
      }
    }, 2000);
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
  startTickingDataagGridSetDataValue(
    gridOptions: GridOptions,
    tickingFrequency: number,
    tradeCount: number
  ) {
    setInterval(() => {
      const tradeId = this.generateRandomInt(0, tradeCount);
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
        });
      }
    }, tickingFrequency);
  }

  startTickingDataagGridRowNodeSetData(
    gridOptions: GridOptions,
    rowData: any,
    tickingFrequency: number,
    tradeCount: number
  ) {
    setInterval(() => {
      if (gridOptions != null && gridOptions.api != null && gridOptions.api != undefined) {
        gridOptions.api.forEachNode((rowNode: RowNode) => {
          if (rowNode.group) {
            return;
          }
          const tradeId = this.generateRandomInt(0, tradeCount);

          const rowTradeId = gridOptions.api!.getValue('tradeId', rowNode);
          if (rowTradeId != tradeId) {
            return;
          }

          // NOTE:  You need to make a COPY of the data that you are changing...
          const trade: ITrade = { ...rowData[tradeId - 1] };
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
            trade.notional = this.generateRandomInt(1, 50);
            trade.changeOnYear = trade.changeOnYear > 0 ? -100 : 100;

            rowNode.setData(trade);
          }
        });
      }
    }, tickingFrequency);
  }

  // This DOES NOT update the AB as agGrid fires an event
  startTickingDataagGridThroughRowData(
    blotter: IAdaptableBlotter,
    rowData: any,
    tickingFrequency: number,
    tradeCount: number
  ) {
    let gridOptions: GridOptions = blotter.blotterOptions.vendorGrid as GridOptions;
    let myRowData = gridOptions.rowData;
    if (
      gridOptions != null &&
      gridOptions.api != null &&
      gridOptions.api != undefined &&
      myRowData != null &&
      myRowData != undefined
    ) {
      setInterval(() => {
        const tradeId = this.generateRandomInt(0, tradeCount);
        // NOTE:  You need to make a COPY of the data that you are changing...
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
          trade.notional = this.generateRandomInt(1, 200); //trade.notional === undefined ? 34 : 4;
          trade.changeOnYear =
            trade.changeOnYear > 0 ? trade.changeOnYear + 50 : trade.changeOnYear - 50;

          //  blotter.api.gridApi.updateGridData([trade]);
          blotter.api.gridApi.setCellValue('notional', trade.notional, tradeId);

          //   gridOptions.api!.updateRowData({ update: [trade] });
        }
      }, tickingFrequency);
    }
  }

  public startTickingDataagGridTradesUpdateData(
    gridOptions: any,
    blotterApi: BlotterApi,
    tickingFrequency: number,
    tradeCount: number
  ) {
    if (gridOptions != null && gridOptions.api != null) {
      setInterval(() => {
        let tradeId = 5; //this.generateRandomInt(1, tradeCount);

        const trade: ITrade = { ...gridOptions.rowData[tradeId] };

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
        trade.notional = this.generateRandomInt(1, 200); //trade.notional === undefined ? 34 : 4;
        trade.changeOnYear =
          trade.changeOnYear > 0 ? trade.changeOnYear + 50 : trade.changeOnYear - 50;
        blotterApi.gridApi.updateGridData([trade]);
      }, tickingFrequency);
    }
  }

  startTickingDataagGridAddRow(blotterApi: BlotterApi, rowData: any, rowCount: number) {
    let gridOptions: GridOptions = blotterApi.gridApi.getVendorGrid() as GridOptions;
    if (
      gridOptions != null &&
      gridOptions.api != null &&
      gridOptions.api != undefined &&
      rowData != null
    ) {
      let newRowCount: number = rowCount;
      const examplesHelper = new ExamplesHelper();
      setInterval(() => {
        ++newRowCount;

        const trade: ITrade = examplesHelper.createTrade(newRowCount);
        if (trade) {
          console.log('adding row with tradeid: ' + newRowCount);
          blotterApi.gridApi.addGridData([trade]);
          //  gridOptions.api!.updateRowData({ add: [trade] });
        }
      }, 2000);
    }
  }

  startTickingDataagGridDeleteRow(blotterApi: BlotterApi, rowData: any, rowCount: number) {
    let gridOptions: GridOptions = blotterApi.gridApi.getVendorGrid() as GridOptions;
    if (
      gridOptions != null &&
      gridOptions.api != null &&
      gridOptions.api != undefined &&
      rowData != null
    ) {
      let deletedTradeIds: number[] = [];
      setInterval(() => {
        const tradeId = this.generateRandomInt(1, rowCount - 1);
        if (ArrayExtensions.NotContainsItem(deletedTradeIds, tradeId)) {
          deletedTradeIds.push(tradeId);
          console.log('deleting row with tradeid: ' + (tradeId + 1));
          blotterApi.gridApi.deleteGridData([rowData[tradeId]]);
          //   gridOptions.api!.updateRowData({ remove: [rowData[tradeId]] });
        }
      }, 5000);
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
