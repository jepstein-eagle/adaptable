import { GridOptions, RowNode } from '@ag-grid-community/all-modules';
import { ITrade, ExamplesHelper } from './ExamplesHelper';
import ArrayExtensions from '../../src/Utilities/Extensions/ArrayExtensions';
import { AdaptableApi } from '../../src/types';

export class TickingDataHelper {
  startTickingDatSystemStatus(api: AdaptableApi) {
    setInterval(() => {
      let systemStatusTyps: any = api.systemStatusApi.getSystemStatusState().StatusType;
      if (systemStatusTyps == 'Info') {
        api.systemStatusApi.setWarningSystemStatus('end is nigh');
      } else {
        api.systemStatusApi.setInfoSystemStatus('nah its ok');
      }
    }, 2000);
  }

  useTickingDataagGrid(
    gridOptions: any,
    adaptableApi: AdaptableApi,
    tickingFrequency: number,
    tradeCount: number
  ) {
    if (gridOptions != null && gridOptions.api != null) {
      const examplesHelper = new ExamplesHelper();
      let useadaptableApiUpdateGridData: boolean = false;
      let useadaptableApiUpdateGridDataBatch: boolean = false;
      let useadaptableApiSetCellValue: boolean = true;
      let useRowNodeSetDataValue: boolean = false;
      let useRowNodeSetData: boolean = false;
      let gridOptionsUpdateRowData: boolean = false;

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
        const bid = this.generateRandomInt(1, 20000); //this.roundTo4Dp(price - bidOfferSpread / 2);
        const bloombergAsk = this.roundTo4Dp(ask + directionToAdd);
        const bloombergBid = this.roundTo4Dp(bid - directionToAdd);
        const notional = this.getRandomItem(examplesHelper.getNotionals());
        const changeOnYear = examplesHelper.getMeaningfulDouble();

        if (useadaptableApiUpdateGridData) {
          trade.price = price;
          trade.bid = bid;
          trade.ask = ask;
          trade.bloombergAsk = bloombergAsk;
          trade.bloombergBid = bloombergBid;
          trade.notional = notional;
          trade.changeOnYear = changeOnYear;
          adaptableApi.gridApi.updateGridData([trade]);
        }

        if (useadaptableApiUpdateGridDataBatch) {
          let test = function resultCallback() {
            //  console.log('batch occurred');
          };

          trade.price = price;
          trade.bid = bid;
          trade.ask = ask;
          trade.bloombergAsk = bloombergAsk;
          trade.bloombergBid = bloombergBid;
          trade.notional = notional;
          trade.changeOnYear = changeOnYear;
          let config = {
            batchUpdate: true,
            callback: test,
          };
          adaptableApi.gridApi.updateGridData([trade], config);
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

        if (useadaptableApiSetCellValue) {
          adaptableApi.gridApi.setCellValue('price', price, tradeId);
          adaptableApi.gridApi.setCellValue('bid', bid, tradeId);
          adaptableApi.gridApi.setCellValue('ask', ask, tradeId);
          adaptableApi.gridApi.setCellValue('bloombergAsk', bloombergAsk, tradeId);
          adaptableApi.gridApi.setCellValue('bloombergBid', bloombergBid, tradeId);
          adaptableApi.gridApi.setCellValue('notional', notional, tradeId);
          adaptableApi.gridApi.setCellValue('changeOnYear', changeOnYear, tradeId);
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

  startTickingDataagGridAddRow(adaptableApi: AdaptableApi, rowData: any, rowCount: number) {
    let gridOptions: GridOptions = adaptableApi.gridApi.getVendorGrid() as GridOptions;
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
          adaptableApi.gridApi.addGridData([trade]);
          //  gridOptions.api!.updateRowData({ add: [trade] });
        }
      }, 2000);
    }
  }

  startTickingDataagGridDeleteRow(adaptableApi: AdaptableApi, rowData: any, rowCount: number) {
    let gridOptions: GridOptions = adaptableApi.gridApi.getVendorGrid() as GridOptions;
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
          adaptableApi.gridApi.deleteGridData([rowData[tradeId]]);
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
