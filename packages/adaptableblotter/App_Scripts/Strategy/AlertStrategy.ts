import { IAlertStrategy } from './Interface/IAlertStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { AdaptableBlotterColumn } from '../PredefinedConfig/Common/AdaptableBlotterColumn';
import { ExpressionHelper, IRangeEvaluation } from '../Utilities/Helpers/ExpressionHelper';
import { LeafExpressionOperator } from '../PredefinedConfig/Common/Enums';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { ColumnHelper } from '../Utilities/Helpers/ColumnHelper';
import { DataChangedInfo } from '../BlotterOptions/CommonObjects/DataChangedInfo';
import { AlertDefinition } from '../PredefinedConfig/AlertState';
import * as SystemRedux from '../Redux/ActionsReducers/SystemRedux';
import { MenuItemShowPopup } from '../Utilities/MenuItem';
import { AdaptableBlotterMenuItem, ContextMenuInfo } from '../PredefinedConfig/Common/Menu';
import { AdaptableAlert } from '../Utilities/Interface/IMessage';

export abstract class AlertStrategy extends AdaptableStrategyBase implements IAlertStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.AlertStrategyId, blotter);
    this.blotter.DataService.OnDataSourceChanged().Subscribe((sender, eventText) =>
      this.handleDataSourceChanged(eventText)
    );
  }

  public abstract initStyles(): void;

  public addMainMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.AlertStrategyName,
      ComponentName: ScreenPopups.AlertPopup,
      Icon: StrategyConstants.AlertGlyph,
    });
  }

  public addContextMenuItem(
    contextMenuInfo: ContextMenuInfo
  ): AdaptableBlotterMenuItem | undefined {
    let menuItemShowPopup: MenuItemShowPopup = undefined;
    if (contextMenuInfo.column && contextMenuInfo.rowNode) {
      let currentAlerts: AdaptableAlert[] = this.blotter.api.internalApi
        .getAdaptableAlerts()
        .filter(a => a.DataChangedInfo && a.AlertDefinition.AlertProperties.HighlightCell);
      if (ArrayExtensions.IsNotNullOrEmpty(currentAlerts)) {
        let relevantAlert: AdaptableAlert = currentAlerts.find(
          a =>
            a.AlertDefinition.ColumnId == contextMenuInfo.column.ColumnId &&
            a.DataChangedInfo.RowNode == contextMenuInfo.rowNode
        );
        if (relevantAlert) {
          menuItemShowPopup = this.createColumnMenuItemReduxAction(
            'Clear Alert',
            StrategyConstants.AlertGlyph,
            SystemRedux.SystemAlertDelete(relevantAlert)
          );
        }
      }
    }
    return menuItemShowPopup;
  }

  protected handleDataSourceChanged(dataChangedInfo: DataChangedInfo): void {
    let alertDefinitions: AlertDefinition[] = this.getAlertDefinitionsForDataChange(
      dataChangedInfo
    );
    if (ArrayExtensions.IsNotNullOrEmpty(alertDefinitions)) {
      let columns: AdaptableBlotterColumn[] = this.blotter.api.gridApi.getColumns();
      alertDefinitions.forEach((alertDefintion: AlertDefinition) => {
        // might be better to do a single alert with all the messages?
        this.blotter.api.alertApi.showAlert(
          ColumnHelper.getFriendlyNameFromColumnId(alertDefintion.ColumnId, columns),
          this.blotter.StrategyService.createAlertDescription(alertDefintion, columns),
          alertDefintion,
          dataChangedInfo
        );
      });
    }
  }

  private getAlertDefinitionsForDataChange(dataChangedEvent: DataChangedInfo): AlertDefinition[] {
    let relatedAlertDefinitions = this.blotter.api.alertApi
      .getAlertDefinitions()
      .filter(v => v.ColumnId == dataChangedEvent.ColumnId);
    let triggeredAlerts: AlertDefinition[] = [];
    if (ArrayExtensions.IsNotNullOrEmpty(relatedAlertDefinitions)) {
      let columns: AdaptableBlotterColumn[] = this.blotter.api.gridApi.getColumns();

      // first check the rules which have expressions
      let expressionAlertDefinitions: AlertDefinition[] = relatedAlertDefinitions.filter(r =>
        ExpressionHelper.IsNotNullOrEmptyExpression(r.Expression)
      );

      if (ArrayExtensions.IsNotNullOrEmpty(expressionAlertDefinitions)) {
        for (let expressionAlertDefinition of expressionAlertDefinitions) {
          let isSatisfiedExpression: boolean = ExpressionHelper.checkForExpression(
            expressionAlertDefinition.Expression,
            dataChangedEvent.PrimaryKeyValue,
            columns,
            this.blotter
          );
          if (
            isSatisfiedExpression &&
            this.isAlertTriggered(expressionAlertDefinition, dataChangedEvent, columns)
          ) {
            triggeredAlerts.push(expressionAlertDefinition);
          }
        }
      }

      // now check the rules without expressions//
      let noExpressionRules: AlertDefinition[] = relatedAlertDefinitions.filter(r =>
        ExpressionHelper.IsNullOrEmptyExpression(r.Expression)
      );
      for (let noExpressionRule of noExpressionRules) {
        if (this.isAlertTriggered(noExpressionRule, dataChangedEvent, columns)) {
          triggeredAlerts.push(noExpressionRule);
        }
      }
    }
    return triggeredAlerts;
  }

  private isAlertTriggered(
    alert: AlertDefinition,
    dataChangedEvent: DataChangedInfo,
    columns: AdaptableBlotterColumn[]
  ): boolean {
    // if its any change then alert triggers immediately
    if (alert.Range.Operator == LeafExpressionOperator.AnyChange) {
      return true;
    }
    // todo: change the last argument from null as we might want to do evaluation based on other cells...
    let column: AdaptableBlotterColumn = ColumnHelper.getColumnFromId(
      dataChangedEvent.ColumnId,
      columns
    );
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
