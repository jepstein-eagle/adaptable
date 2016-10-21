import { ResetUserData } from '../../Redux/Store/AdaptableBlotterStore';
import { ISimulateTickingDataStrategy } from '../../Core/Interface/ISimulateTickingDataStrategy';
import { MenuItem } from '../../Core/MenuItem';
import { ColumnType } from '../../Core/Enums';
import { AdaptableStrategyBase } from '../../Core/AdaptableStrategyBase';
import { AdaptableViewFactory } from '../../View/AdaptableViewFactory'
import * as StrategyIds from '../../Core/StrategyIds'
import { IAdaptableBlotter, IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { IMenuItem } from '../../Core/Interface/IStrategy';
import { DataGenerator } from '../../../Harness/DataGenerator';

const simulateTickingData: string = "SimulateTickingData"


// This is a temporary Strategy to allow us to see if we are able to update multiple cells at the same time and that they all flash the right way.  So far it looks good...
export class SimulateTickingDataStrategy extends AdaptableStrategyBase implements ISimulateTickingDataStrategy {
    private menuItemConfig: IMenuItem;
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.SimulateTickingDataStrategyId, blotter)
        this.menuItemConfig = new MenuItem("Simulate Ticking Data", this.Id, simulateTickingData, "play-circle");
    }

    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }

    public onAction(action: string) {
        if (action == simulateTickingData) {
            var identifierValue: any = null;
            var columnName: string;
            var newValue: any;
            var row: any;

            var dataGen = new DataGenerator();
            var numericCols: string[] = ["bid", "ask", "marketPrice", "bloombergAsk", "bloombergBid", "indicativeAsk", "indicativeBid"];

            for (var i = 0; i < 50; i++) {
                var numberToAdd: number = dataGen.generateRandomInt(1, 2) == 1 ? -0.5 : 0.5;
                var rowNumber = dataGen.generateRandomInt(1, 50);
                row = this.blotter.DataSource._data[rowNumber];
                identifierValue = row["uid"];

                columnName = dataGen.getRandomItem(numericCols);
                let initialNewValue = row[columnName];
                newValue = initialNewValue + numberToAdd;
                row[columnName] = newValue;
                this.UpdateCell(identifierValue, columnName, newValue);
            }
        }
    }

    private UpdateCell(identifierValue: any, columnName: string, newValue: any): void {
        this.blotter.AuditService.CreateAuditEvent(identifierValue, newValue, columnName);
        var cell = this.blotter.getCellByColumnNameAndRowIdentifier(identifierValue, columnName);
        this.blotter.addValueDirectlyToCell(cell, newValue);
    }


}