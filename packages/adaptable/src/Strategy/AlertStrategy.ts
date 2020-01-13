import { IAlertStrategy } from './Interface/IAlertStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { ExpressionHelper, IRangeEvaluation } from '../Utilities/Helpers/ExpressionHelper';
import { LeafExpressionOperator } from '../PredefinedConfig/Common/Enums';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { ColumnHelper } from '../Utilities/Helpers/ColumnHelper';
import { DataChangedInfo } from '../AdaptableOptions/CommonObjects/DataChangedInfo';
import { AlertDefinition } from '../PredefinedConfig/AlertState';
import * as SystemRedux from '../Redux/ActionsReducers/SystemRedux';
import { MenuItemShowPopup } from '../Utilities/MenuItem';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
import { AdaptableAlert } from '../Utilities/Interface/IMessage';

export abstract class AlertStrategy extends AdaptableStrategyBase implements IAlertStrategy {
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.AlertStrategyId, adaptable);
    this.adaptable.DataService.on('DataChanged', (dataChangedInfo: DataChangedInfo) => {
      this.handleDataSourceChanged(dataChangedInfo);
    });
  }

  public abstract initStyles(): void;

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.AlertStrategyFriendlyName,
      ComponentName: ScreenPopups.AlertPopup,
      Icon: StrategyConstants.AlertGlyph,
    });
  }

  public addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined {
    let menuItemShowPopup: MenuItemShowPopup = undefined;
    if (menuInfo.Column && menuInfo.RowNode) {
      let currentAlerts: AdaptableAlert[] = this.adaptable.api.internalApi
        .getAdaptableAlerts()
        .filter(a => a.DataChangedInfo && a.AlertDefinition.AlertProperties.HighlightCell);
      if (ArrayExtensions.IsNotNullOrEmpty(currentAlerts)) {
        let relevantAlert: AdaptableAlert = currentAlerts.find(
          a =>
            a.AlertDefinition.ColumnId == menuInfo.Column.ColumnId &&
            a.DataChangedInfo.RowNode == menuInfo.RowNode
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
      let columns: AdaptableColumn[] = this.adaptable.api.gridApi.getColumns();
      alertDefinitions.forEach((alertDefintion: AlertDefinition) => {
        // might be better to do a single alert with all the messages?
        this.adaptable.api.alertApi.showAlert(
          ColumnHelper.getFriendlyNameFromColumnId(alertDefintion.ColumnId, columns),
          this.adaptable.StrategyService.createAlertDescription(alertDefintion, columns),
          alertDefintion,
          dataChangedInfo
        );
      });
    }
  }

  private getAlertDefinitionsForDataChange(dataChangedEvent: DataChangedInfo): AlertDefinition[] {
    let relatedAlertDefinitions = this.adaptable.api.alertApi
      .getAlertDefinitions()
      .filter(v => v.ColumnId == dataChangedEvent.ColumnId);
    let triggeredAlerts: AlertDefinition[] = [];
    if (ArrayExtensions.IsNotNullOrEmpty(relatedAlertDefinitions)) {
      let columns: AdaptableColumn[] = this.adaptable.api.gridApi.getColumns();

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
            this.adaptable
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
    columns: AdaptableColumn[]
  ): boolean {
    // if its any change then alert triggers immediately
    if (alert.Range.Operator == LeafExpressionOperator.AnyChange) {
      return true;
    }
    // todo: change the last argument from null as we might want to do evaluation based on other cells...
    let column: AdaptableColumn = ColumnHelper.getColumnFromId(dataChangedEvent.ColumnId, columns);
    let rangeEvaluation: IRangeEvaluation = ExpressionHelper.GetRangeEvaluation(
      alert.Range,
      dataChangedEvent.NewValue,
      dataChangedEvent.OldValue,
      column,
      this.adaptable,
      null
    );
    return ExpressionHelper.TestRangeEvaluation(rangeEvaluation, this.adaptable);
  }
}
