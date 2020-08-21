import { IAlertStrategy } from './Interface/IAlertStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { ExpressionHelper, IRangeEvaluation } from '../Utilities/Helpers/ExpressionHelper';
import * as AlertRedux from '../Redux/ActionsReducers/AlertRedux';
import { TeamSharingImportInfo } from '../PredefinedConfig/TeamSharingState';
import { LeafExpressionOperator } from '../PredefinedConfig/Common/Enums';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { DataChangedInfo } from '../PredefinedConfig/Common/DataChangedInfo';
import { AlertDefinition } from '../PredefinedConfig/AlertState';
import * as SystemRedux from '../Redux/ActionsReducers/SystemRedux';
import { MenuItemShowPopup } from '../Utilities/MenuItem';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
import { AdaptableAlert } from '../Utilities/Interface/IMessage';
import * as parser from '../parser/src';

export abstract class AlertStrategy extends AdaptableStrategyBase implements IAlertStrategy {
  constructor(adaptable: IAdaptable) {
    super(
      StrategyConstants.AlertStrategyId,
      StrategyConstants.AlertStrategyFriendlyName,
      StrategyConstants.AlertGlyph,
      ScreenPopups.AlertPopup,
      adaptable
    );
    this.adaptable.DataService.on('DataChanged', (dataChangedInfo: DataChangedInfo) => {
      this.handleDataSourceChanged(dataChangedInfo);
    });
  }

  public abstract initStyles(): void;

  public addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined {
    let menuItemShowPopup: MenuItemShowPopup = undefined;
    if (this.canCreateMenuItem('ReadOnly')) {
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
    }
    return menuItemShowPopup;
  }

  public getSpecialColumnReferences(specialColumnId: string): string | undefined {
    let alertDefinitions: AlertDefinition[] = this.adaptable.api.alertApi
      .getAlertDefinitions()
      .filter((ad: AlertDefinition) => ad.ColumnId == specialColumnId);

    return ArrayExtensions.IsNotNullOrEmpty(alertDefinitions)
      ? alertDefinitions.length + ' Alerts'
      : undefined;
  }

  protected handleDataSourceChanged(dataChangedInfo: DataChangedInfo): void {
    let alertDefinitions: AlertDefinition[] = this.getAlertDefinitionsForDataChange(
      dataChangedInfo
    );
    if (ArrayExtensions.IsNotNullOrEmpty(alertDefinitions)) {
      let columns: AdaptableColumn[] = this.adaptable.api.columnApi.getColumns();
      alertDefinitions.forEach((alertDefintion: AlertDefinition) => {
        // might be better to do a single alert with all the messages?
        this.adaptable.api.alertApi.showAlert(
          this.adaptable.api.columnApi.getFriendlyNameFromColumnId(alertDefintion.ColumnId),
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
      let columns: AdaptableColumn[] = this.adaptable.api.columnApi.getColumns();

      // first check the rules which have expressions
      let expressionAlertDefinitions: AlertDefinition[] = relatedAlertDefinitions.filter(
        r => this.adaptable.api.sharedQueryApi.getExpressionForQueryObject(r) != undefined
      );

      if (ArrayExtensions.IsNotNullOrEmpty(expressionAlertDefinitions)) {
        for (let expressionAlertDefinition of expressionAlertDefinitions) {
          let expression: string = this.adaptable.api.sharedQueryApi.getExpressionForQueryObject(
            expressionAlertDefinition
          );

          let rowNode: any = dataChangedEvent.RowNode;
          if (!rowNode) {
            rowNode = this.adaptable.getRowNodeForPrimaryKey(dataChangedEvent.PrimaryKeyValue);
          }
          let isSatisfiedExpression: boolean = parser.evaluate(expression, {
            data: rowNode.data,
          });

          if (
            isSatisfiedExpression &&
            this.isAlertTriggered(expressionAlertDefinition, dataChangedEvent)
          ) {
            triggeredAlerts.push(expressionAlertDefinition);
          }
        }
      }

      // now check the rules without expressions//
      let noExpressionRules: AlertDefinition[] = relatedAlertDefinitions.filter(
        r => this.adaptable.api.sharedQueryApi.getExpressionForQueryObject(r) == undefined
      );
      for (let noExpressionRule of noExpressionRules) {
        if (this.isAlertTriggered(noExpressionRule, dataChangedEvent)) {
          triggeredAlerts.push(noExpressionRule);
        }
      }
    }
    return triggeredAlerts;
  }

  private isAlertTriggered(alert: AlertDefinition, dataChangedEvent: DataChangedInfo): boolean {
    // if its any change then alert triggers immediately
    if (alert.Range.Operator == LeafExpressionOperator.AnyChange) {
      return true;
    }
    // todo: change the last argument from null as we might want to do evaluation based on other cells...
    let column: AdaptableColumn = this.adaptable.api.columnApi.getColumnFromId(
      dataChangedEvent.ColumnId
    );
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

  public getTeamSharingAction(): TeamSharingImportInfo<AlertDefinition> {
    return {
      FunctionEntities: this.adaptable.api.alertApi.getAlertDefinitions(),
      AddAction: AlertRedux.AlertDefinitionAdd,
      EditAction: AlertRedux.AlertDefinitionEdit,
    };
  }
}
