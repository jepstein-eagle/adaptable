import { IAlertStrategy } from './Interface/IAlertStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import * as AlertRedux from '../Redux/ActionsReducers/AlertRedux';
import { TeamSharingImportInfo } from '../PredefinedConfig/TeamSharingState';
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
              this.adaptable.api.scopeApi.isColumnInScopeColumns(
                menuInfo.Column,
                a.AlertDefinition.Scope
              ) && a.DataChangedInfo.RowNode == menuInfo.RowNode
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

  public getSpecialColumnReferences(specialColumnId: string, references: string[]): void {
    const abColumn: AdaptableColumn = this.adaptable.api.columnApi.getColumnFromId(specialColumnId);
    let alertDefinitions: AlertDefinition[] = this.adaptable.api.alertApi
      .getAlertDefinitions()
      .filter((ad: AlertDefinition) =>
        this.adaptable.api.scopeApi.isColumnInScopeColumns(abColumn, ad.Scope)
      );

    if (ArrayExtensions.IsNotNullOrEmpty(alertDefinitions)) {
      let reference: string = alertDefinitions.length == 1 ? ' Alert' : ' Alerts';
      references.push(alertDefinitions.length + reference);
    }
  }

  protected handleDataSourceChanged(dataChangedInfo: DataChangedInfo): void {
    let alertDefinitions: AlertDefinition[] = this.getAlertDefinitionsForDataChange(
      dataChangedInfo
    );
    if (ArrayExtensions.IsNotNullOrEmpty(alertDefinitions)) {
      alertDefinitions.forEach((alertDefintion: AlertDefinition) => {
        // might be better to do a single alert with all the messages?
        this.adaptable.api.alertApi.showAlert(
          this.adaptable.api.columnApi.getFriendlyNameFromColumnId(dataChangedInfo.ColumnId),
          this.adaptable.StrategyService.createAlertDescription(alertDefintion),
          alertDefintion,
          dataChangedInfo
        );
      });
    }
  }

  private getAlertDefinitionsForDataChange(dataChangedEvent: DataChangedInfo): AlertDefinition[] {
    let relatedAlertDefinitions = this.adaptable.api.alertApi
      .getAlertDefinitions()
      .filter(v =>
        this.adaptable.api.scopeApi.isColumnInScope(
          this.adaptable.api.columnApi.getColumnFromId(dataChangedEvent.ColumnId),
          v.Scope
        )
      );
    let triggeredAlerts: AlertDefinition[] = [];
    if (ArrayExtensions.IsNotNullOrEmpty(relatedAlertDefinitions)) {
      // first check the rules which have a Query
      let expressionAlertDefinitions: AlertDefinition[] = relatedAlertDefinitions.filter(
        r => this.adaptable.api.queryApi.QueryObjectToString(r) != undefined
      );

      if (ArrayExtensions.IsNotNullOrEmpty(expressionAlertDefinitions)) {
        for (let expressionAlertDefinition of expressionAlertDefinitions) {
          let expression: string = this.adaptable.api.queryApi.QueryObjectToString(
            expressionAlertDefinition
          );

          let rowNode: any = dataChangedEvent.RowNode;
          if (!rowNode) {
            rowNode = this.adaptable.getRowNodeForPrimaryKey(dataChangedEvent.PrimaryKeyValue);
          }
          let isSatisfiedExpression: boolean = parser.evaluate(expression, {
            node: rowNode,
            api: this.adaptable.api,
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
        r => this.adaptable.api.queryApi.QueryObjectToString(r) == undefined
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
    return this.adaptable.api.predicateApi.handlePredicate(
      alert.Predicate,
      {
        value: dataChangedEvent.NewValue,
        oldValue: dataChangedEvent.OldValue,
        // TODO send real display value
        displayValue: null,
        node: dataChangedEvent.RowNode,
        column: this.adaptable.api.columnApi.getColumnFromId(dataChangedEvent.ColumnId),
      },
      false
    );
  }

  public getTeamSharingAction(): TeamSharingImportInfo<AlertDefinition> {
    return {
      FunctionEntities: this.adaptable.api.alertApi.getAlertDefinitions(),
      AddAction: AlertRedux.AlertDefinitionAdd,
      EditAction: AlertRedux.AlertDefinitionEdit,
    };
  }
}
