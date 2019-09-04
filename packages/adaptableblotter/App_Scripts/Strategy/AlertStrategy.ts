import { IAlertStrategy } from './Interface/IAlertStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IColumn } from '../Utilities/Interface/IColumn';
import { ExpressionHelper, IRangeEvaluation } from '../Utilities/Helpers/ExpressionHelper';
import { LeafExpressionOperator } from '../PredefinedConfig/Common/Enums';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { ColumnHelper } from '../Utilities/Helpers/ColumnHelper';
import { AlertHelper } from '../Utilities/Helpers/AlertHelper';
import { DataChangedInfo } from '../Utilities/Interface/DataChangedInfo';
import { AlertDefinition } from '../PredefinedConfig/RunTimeState/AlertState';
import { AdaptableBlotterMenuItem } from '../Utilities/MenuItem';

export class AlertStrategy extends AdaptableStrategyBase implements IAlertStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.AlertStrategyId, blotter);
    this.blotter.DataService.OnDataSourceChanged().Subscribe((sender, eventText) =>
      this.handleDataSourceChanged(eventText)
    );
  }

  public addMainMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.AlertStrategyName,
      ComponentName: ScreenPopups.AlertPopup,
      GlyphIcon: StrategyConstants.AlertGlyph,
    });
  }

  protected handleDataSourceChanged(dataChangedEvent: DataChangedInfo): void {
    let alertDefinitions: AlertDefinition[] = this.CheckDataChanged(dataChangedEvent);
    if (ArrayExtensions.IsNotNullOrEmpty(alertDefinitions)) {
      let columns: IColumn[] = this.blotter.api.gridApi.getColumns();
      alertDefinitions.forEach(fr => {
        // might be better to do a single alert with all the messages?
        this.blotter.api.alertApi.showAlert(
          ColumnHelper.getFriendlyNameFromColumnId(fr.ColumnId, columns),
          AlertHelper.createAlertDescription(fr, columns),
          fr.MessageType,
          fr.ShowAsPopup
        );
      });
    }
  }

  public CheckDataChanged(dataChangedEvent: DataChangedInfo): AlertDefinition[] {
    let relatedAlertDefinitions = this.blotter.api.alertApi
      .getAlertState()
      .AlertDefinitions.filter(v => v.ColumnId == dataChangedEvent.ColumnId);
    let triggeredAlerts: AlertDefinition[] = [];
    if (relatedAlertDefinitions.length > 0) {
      let columns: IColumn[] = this.blotter.api.gridApi.getColumns();

      // first check the rules which have expressions
      let expressionAlertDefinitions: AlertDefinition[] = relatedAlertDefinitions.filter(r =>
        ExpressionHelper.IsNotNullOrEmptyExpression(r.Expression)
      );

      if (expressionAlertDefinitions.length > 0) {
        for (let expressionRule of expressionAlertDefinitions) {
          let isSatisfiedExpression: boolean = ExpressionHelper.checkForExpression(
            expressionRule.Expression,
            dataChangedEvent.IdentifierValue,
            columns,
            this.blotter
          );
          if (
            isSatisfiedExpression &&
            this.IsAlertTriggered(expressionRule, dataChangedEvent, columns)
          ) {
            triggeredAlerts.push(expressionRule);
          }
        }
      }

      // now check the rules without expressions//
      let noExpressionRules: AlertDefinition[] = relatedAlertDefinitions.filter(r =>
        ExpressionHelper.IsNullOrEmptyExpression(r.Expression)
      );
      for (let noExpressionRule of noExpressionRules) {
        if (this.IsAlertTriggered(noExpressionRule, dataChangedEvent, columns)) {
          triggeredAlerts.push(noExpressionRule);
        }
      }
    }
    return triggeredAlerts;
  }

  private IsAlertTriggered(
    alert: AlertDefinition,
    dataChangedEvent: DataChangedInfo,
    columns: IColumn[]
  ): boolean {
    // if its any change then alert triggers immediately
    if (alert.Range.Operator == LeafExpressionOperator.AnyChange) {
      return true;
    }
    // todo: change the last argument from null as we might want to do evaluation based on other cells...
    let column: IColumn = ColumnHelper.getColumnFromId(dataChangedEvent.ColumnId, columns);
    let rangeEvaluation: IRangeEvaluation = ExpressionHelper.GetRangeEvaluation(
      alert.Range,
      dataChangedEvent.NewValue,
      dataChangedEvent.OldValue,
      column,
      this.blotter,
      null
    );
    return ExpressionHelper.TestRangeEvaluation(rangeEvaluation, this.blotter);
  }
}
