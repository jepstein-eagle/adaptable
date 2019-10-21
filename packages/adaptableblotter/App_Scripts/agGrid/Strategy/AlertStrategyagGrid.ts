import { AlertStrategy } from '../../Strategy/AlertStrategy';
import { AdaptableBlotter } from '../AdaptableBlotter';
import { IAlertStrategy } from '../../Strategy/Interface/IAlertStrategy';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AlertDefinition } from '../../PredefinedConfig/RunTimeState/AlertState';
import { AdaptableAlert } from '../../Utilities/Interface/IMessage';
import ArrayExtensions from '../../Utilities/Extensions/ArrayExtensions';
import StyleHelper from '../../Utilities/Helpers/StyleHelper';

export class AlertStrategyagGrid extends AlertStrategy implements IAlertStrategy {
  constructor(blotter: AdaptableBlotter) {
    super(blotter);
  }

  public initStyles(): void {
    let allColumns = this.blotter.api.gridApi.getColumns();
    let theBlotter = this.blotter as AdaptableBlotter;

    let alertDefsWithHighlightCells: AlertDefinition[] = this.blotter.api.alertApi
      .getAlertDefinitions()
      .filter(a => a.AlertProperties.HighlightCell);

    if (ArrayExtensions.IsNotNullOrEmpty(alertDefsWithHighlightCells)) {
      allColumns.forEach(col => {
        let cellClassRules: any = {};

        let alertDefinitions = alertDefsWithHighlightCells.filter(x => x.ColumnId == col.ColumnId);

        if (ArrayExtensions.IsNotNullOrEmpty(alertDefinitions)) {
          alertDefinitions.forEach((alertDefinition: AlertDefinition) => {
            // let styleName: string = StyleHelper.CreateUniqueStyleName(
            //   StrategyConstants.AlertStrategyId,
            //   this.blotter,
            //   alertDefinition
            // );

            let styleName = `ab-alert--${alertDefinition.MessageType.toLowerCase()}`;

            cellClassRules[styleName] = function(params: any) {
              let currentAlerts: AdaptableAlert[] = theBlotter.api.internalApi.getAdaptableAlerts();
              if (ArrayExtensions.IsNotNullOrEmpty(currentAlerts)) {
                let relevantAlerts: AdaptableAlert[] = currentAlerts.filter(
                  aa =>
                    aa.AlertDefinition.AlertProperties.HighlightCell &&
                    aa.AlertDefinition.ColumnId == col.ColumnId &&
                    aa.AlertDefinition.MessageType == alertDefinition.MessageType &&
                    aa.DataChangedInfo &&
                    aa.DataChangedInfo.IdentifierValue ==
                      theBlotter.getPrimaryKeyValueFromRecord(params.node)

                  //   return result;
                );

                return relevantAlerts.length > 0;
              }
              return false;
            };
          });

          theBlotter.setCellClassRules(cellClassRules, col.ColumnId, 'Alert');
        }
      });
    }
  }
}
