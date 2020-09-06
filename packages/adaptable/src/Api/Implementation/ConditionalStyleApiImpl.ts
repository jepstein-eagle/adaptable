import { ApiBase } from './ApiBase';
import { ConditionalStyleApi } from '../ConditionalStyleApi';
import {
  ConditionalStyleState,
  ConditionalStyle,
} from '../../PredefinedConfig/ConditionalStyleState';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { AdaptableColumn, Scope } from '../../types';
import { AdaptablePredicateDef } from '../../PredefinedConfig/Common/AdaptablePredicate';

export class ConditionalStyleApiImpl extends ApiBase implements ConditionalStyleApi {
  public getConditionalStyleState(): ConditionalStyleState {
    return this.getAdaptableState().ConditionalStyle;
  }

  public getAllConditionalStyle(): ConditionalStyle[] {
    return this.getConditionalStyleState().ConditionalStyles;
  }

  public showConditionalStylePopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.ConditionalStyleStrategyId,
      ScreenPopups.ConditionalStylePopup
    );
  }

  public getRowConditionalStyles(): ConditionalStyle[] | undefined {
    return this.getAllConditionalStyle().filter(cs =>
      this.adaptable.api.scopeApi.scopeIsAll(cs.Scope)
    );
  }

  public getColumnConditionalStyles(): ConditionalStyle[] | undefined {
    return this.getAllConditionalStyle().filter(
      cs => !this.adaptable.api.scopeApi.scopeIsAll(cs.Scope)
    );
  }

  public getOrderedConditionalStyles(): ConditionalStyle[] | undefined {
    const colConditionalStyles: ConditionalStyle[] | undefined = this.getColumnConditionalStyles();

    let orderedConditionalStyles: ConditionalStyle[] | undefined = this.getRowConditionalStyles()
      .concat(this.getConditionalStylesWithDataTypeScope(colConditionalStyles))
      .concat(this.getConditionalStylesWithColumnScope(colConditionalStyles));
    return orderedConditionalStyles;
  }

  public getConditionalStylesForColumn(column: AdaptableColumn): ConditionalStyle[] | undefined {
    const colConditionalStyles: ConditionalStyle[] | undefined = this.getColumnConditionalStyles();
    let returnStyles: ConditionalStyle[] = [];
    colConditionalStyles.forEach(fc => {
      if (this.adaptable.api.scopeApi.isColumnInScope(column, fc.Scope)) {
        returnStyles.push(fc);
      }
    });
    return returnStyles;
  }

  public getConditionalStylesWithDataTypeScope(
    conditionalStyles: ConditionalStyle[]
  ): ConditionalStyle[] | undefined {
    return conditionalStyles.filter(fc => this.adaptable.api.scopeApi.scopeHasDataType(fc.Scope));
  }

  public getConditionalStylesWithColumnScope(
    conditionalStyles: ConditionalStyle[]
  ): ConditionalStyle[] | undefined {
    return conditionalStyles.filter(fc => this.adaptable.api.scopeApi.scopeHasColumns(fc.Scope));
  }

  public getPredicateDefs(): AdaptablePredicateDef[] {
    return this.adaptable.api.predicateApi.getPredicateDefsByFunctionScope('conditionalstyle');
  }

  public getPredicateDefsForScope(scope: Scope): AdaptablePredicateDef[] {
    return this.getPredicateDefs().filter(predicateDef =>
      this.adaptable.api.scopeApi.isScopeInScope(scope, predicateDef.columnScope)
    );
  }
}
