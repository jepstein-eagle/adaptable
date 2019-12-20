import { GridOptions, RowNode } from 'ag-grid-community';
import { ITrade, ExamplesHelper } from './ExamplesHelper';
import ArrayExtensions from '../../App_Scripts/Utilities/Extensions/ArrayExtensions';
import { BlotterApi } from '../../App_Scripts/types';

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

  testTickingDataagGrid(
    gridOptions: any,
    blotterApi: BlotterApi,
    tickingFrequency: number,
    tradeCount: number
  ) {
    if (gridOptions != null && gridOptions.api != null) {
      const examplesHelper = new ExamplesHelper();
      let useBlotterAPIUpdateGridData: boolean = false;
      let useBlotterAPISetCellValue: boolean = false;
      let useRowNodeSetDataValue: boolean = false;
      let useRowNodeSetData: boolean = false;
      let gridOptionsUpdateRowData: boolean = true;

      setInterval(() => {
        let tradeId = this.generateRandomInt(1, tradeCount);
        let rowNode: RowNode = gridOptions.api!.getRowNode(tradeId);

        const trade: ITrade = { ...gridOptions.rowData[tradeId] };
        const randomInt = this.generateRandomInt(1, 2);
        const numberToAdd: number = randomInt == 1 ? -0.5 : 0.5;
        const directionToAdd: number = randomInt == 1 ? -0.01 : 0.01;
        const price = this.roundTo4Dp(trade.price + numberToAdd);
        const bidOfferSpread = trade.bidOfferSpread;
        const ask = this.roundTo4Dp(price + bidOfferSpread / 2);
        const bid = this.roundTo4Dp(price - bidOfferSpread / 2);
        const bloombergAsk = this.roundTo4Dp(ask + directionToAdd);
        const bloombergBid = this.roundTo4Dp(bid - directionToAdd);
        const notional = this.getRandomItem(examplesHelper.getNotionals());
        const changeOnYear = examplesHelper.getMeaningfulDouble();

        if (useBlotterAPIUpdateGridData) {
          trade.price = price;
          trade.bid = bid;
          trade.ask = ask;
          trade.bloombergAsk = bloombergAsk;
          trade.bloombergBid = bloombergBid;
          trade.notional = notional;
          trade.changeOnYear = changeOnYear;
          blotterApi.gridApi.updateGridData([trade]);
        }

        if (gridOptionsUpdateRowData) {
          trade.price = price;
          trade.bid = bid;
          trade.ask = ask;
          trade.bloombergAsk = bloombergAsk;
          trade.bloombergBid = bloombergBid;
          trade.notional = notional;
          trade.changeOnYear = changeOnYear;
          gridOptions.api!.updateRowData({ update: [trade] });
        }

        if (useBlotterAPISetCellValue) {
          blotterApi.gridApi.setCellValue('price', price, tradeId, false);
          blotterApi.gridApi.setCellValue('bid', bid, tradeId, false);
          blotterApi.gridApi.setCellValue('ask', ask, tradeId, false);
          blotterApi.gridApi.setCellValue('bloombergAsk', bloombergAsk, tradeId, false);
          blotterApi.gridApi.setCellValue('bloombergBid', bloombergBid, tradeId, false);
          blotterApi.gridApi.setCellValue('notional', notional, tradeId, false);
          blotterApi.gridApi.setCellValue('changeOnYear', changeOnYear, tradeId, false);
        }

        if (useRowNodeSetDataValue) {
          rowNode.setDataValue('price', price);
          rowNode.setDataValue('bid', bid);
          rowNode.setDataValue('ask', ask);
          rowNode.setDataValue('bloombergAsk', bloombergAsk);
          rowNode.setDataValue('bloombergBid', bloombergBid);
          rowNode.setDataValue('notional', notional);
          rowNode.setDataValue('changeOnYear', changeOnYear);
        }

        if (useRowNodeSetData) {
          const data = rowNode.data;
          data.price = price;
          data.bid = bid;
          data.ask = ask;
          data.bloombergAsk = bloombergAsk;
          data.bloombergBid = bloombergBid;
          data.notional = notional;
          data.changeOnYear = changeOnYear;
          rowNode.setData(data);
        }
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
