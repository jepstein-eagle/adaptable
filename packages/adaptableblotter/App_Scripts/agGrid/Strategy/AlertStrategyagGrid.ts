import { AlertStrategy } from '../../Strategy/AlertStrategy';
import { Adaptable } from '../Adaptable';
import { IAlertStrategy } from '../../Strategy/Interface/IAlertStrategy';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AlertDefinition } from '../../PredefinedConfig/AlertState';
import { AdaptableAlert } from '../../Utilities/Interface/IMessage';
import ArrayExtensions from '../../Utilities/Extensions/ArrayExtensions';

export class AlertStrategyagGrid extends AlertStrategy implements IAlertStrategy {
  constructor(blotter: Adaptable) {
    super(blotter);
  }

  public initStyles(): void {
    let allColumns = this.blotter.api.gridApi.getColumns();
    let theBlotter = this.blotter as Adaptable;

    let alertDefsWithHighlightCells: AlertDefinition[] = this.blotter.api.alertApi
      .getAlertDefinitions()
      .filter(a => a.AlertProperties.HighlightCell);

    if (ArrayExtensions.IsNotNullOrEmpty(alertDefsWithHighlightCells)) {
      allColumns.forEach(col => {
        let cellClassRules: any = {};

        let alertDefinitions = alertDefsWithHighlightCells.filter(x => x.ColumnId == col.ColumnId);

        if (ArrayExtensions.IsNotNullOrEmpty(alertDefinitions)) {
          alertDefinitions.forEach((alertDefinition: AlertDefinition) => {
            let styleName = StyleConstants.ALERT_STYLE + alertDefinition.MessageType.toLowerCase();

            cellClassRules[styleName] = function(params: any) {
              let currentAlerts: AdaptableAlert[] = theBlotter.api.internalApi.getAdaptableAlerts();
              if (ArrayExtensions.IsNotNullOrEmpty(currentAlerts)) {
                let relevantAlerts: AdaptableAlert[] = currentAlerts.filter(
                  aa =>
                    aa.AlertDefinition.AlertProperties.HighlightCell &&
                    aa.AlertDefinition.ColumnId == col.ColumnId &&
                    aa.AlertDefinition.MessageType == alertDefinition.MessageType &&
                    aa.DataChangedInfo &&
                    aa.DataChangedInfo.PrimaryKeyValue ==
                      theBlotter.getPrimaryKeyValueFromRowNode(params.node)
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
