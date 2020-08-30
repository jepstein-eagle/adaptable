import { ApiBase } from './ApiBase';
import { ConditionalStyleApi } from '../ConditionalStyleApi';
import {
  ConditionalStyleState,
  ConditionalStyle,
} from '../../PredefinedConfig/ConditionalStyleState';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { AdaptableColumn } from '../../types';

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

  public getConditionalStyleForColumn(column: AdaptableColumn): ConditionalStyle | undefined {
    const colConditionalStyles: ConditionalStyle[] | undefined = this.getColumnConditionalStyles();

    let orderedConditionalStyles:
      | ConditionalStyle[]
      | undefined = this.getConditionalStylesWithColumnScope(colConditionalStyles).concat(
      this.getConditionalStylesWithDataTypeScope(colConditionalStyles)
    );

    let returnConditionalStyle: ConditionalStyle = undefined;
    orderedConditionalStyles.forEach((fc, index) => {
      // we just do one and then return
      if (returnConditionalStyle == undefined) {
        if (this.adaptable.api.scopeApi.isColumnInScope(column, fc.Scope)) {
          returnConditionalStyle = fc;
        }
      }
    });
    return returnConditionalStyle;
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
}
