import { IAlertStrategy } from './Interface/IAlertStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IAlertDefinition } from '../Utilities/Interface/BlotterObjects/IAlertDefinition';
import { IColumn } from '../Utilities/Interface/IColumn';
import { ExpressionHelper, IRangeEvaluation } from '../Utilities/Helpers/ExpressionHelper';
import { LeafExpressionOperator } from '../Utilities/Enums';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { ColumnHelper } from '../Utilities/Helpers/ColumnHelper';
import { AlertHelper } from '../Utilities/Helpers/AlertHelper';
import { IDataChangedInfo } from '../Utilities/Interface/IDataChangedInfo';

export class AlertStrategy extends AdaptableStrategyBase implements IAlertStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.AlertStrategyId, blotter);
    this.blotter.DataService.OnDataSourceChanged().Subscribe((sender, eventText) =>
      this.handleDataSourceChanged(eventText)
    );
  }

  protected addPopupMenuItem() {
    this.createMenuItemShowPopup(
      StrategyConstants.AlertStrategyName,
      ScreenPopups.AlertPopup,
      StrategyConstants.AlertGlyph
    );
  }

  protected handleDataSourceChanged(dataChangedEvent: IDataChangedInfo): void {
    let alertDefinitions: IAlertDefinition[] = this.CheckDataChanged(dataChangedEvent);
    if (ArrayExtensions.IsNotNullOrEmpty(alertDefinitions)) {
      let columns: IColumn[] = this.blotter.api.gridApi.getColumns();
      alertDefinitions.forEach(fr => {
        // might be better to do a single alert with all the messages?
        this.blotter.api.alertApi.displayAlert(
          ColumnHelper.getFriendlyNameFromColumnId(fr.ColumnId, columns),
          AlertHelper.createAlertDescription(fr, columns),
          fr.MessageType,
          fr.ShowAsPopup
        );
      });
    }
  }

  public CheckDataChanged(dataChangedEvent: IDataChangedInfo): IAlertDefinition[] {
    let relatedAlertDefinitions = this.blotter.api.alertApi
      .getAlertState()
      .AlertDefinitions.filter(v => v.ColumnId == dataChangedEvent.ColumnId);
    let triggeredAlerts: IAlertDefinition[] = [];
    if (relatedAlertDefinitions.length > 0) {
      let columns: IColumn[] = this.blotter.api.gridApi.getColumns();

      // first check the rules which have expressions
      let expressionAlertDefinitions: IAlertDefinition[] = relatedAlertDefinitions.filter(r =>
        ExpressionHelper.IsNotEmptyExpression(r.Expression)
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
      let noExpressionRules: IAlertDefinition[] = relatedAlertDefinitions.filter(r =>
        ExpressionHelper.IsEmptyExpression(r.Expression)
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
    alert: IAlertDefinition,
    dataChangedEvent: IDataChangedInfo,
    columns: IColumn[]
  ): boolean {
    // if its none then alert triggers immediately
    if (alert.Range.Operator == LeafExpressionOperator.None) {
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
