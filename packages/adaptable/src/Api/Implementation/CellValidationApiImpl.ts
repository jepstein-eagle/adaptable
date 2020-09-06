import * as CellValidationRedux from '../../Redux/ActionsReducers/CellValidationRedux';
import { ApiBase } from './ApiBase';
import { CellValidationApi } from '../CellValidationApi';
import {
  CellValidationState,
  CellValidationRule,
} from '../../PredefinedConfig/CellValidationState';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { PredicateDef } from '../../PredefinedConfig/Common/AdaptablePredicate';
import { AdaptableScope } from '../../PredefinedConfig/Common/AdaptableScope';

export class CellValidationApiImpl extends ApiBase implements CellValidationApi {
  public getCellValidationState(): CellValidationState {
    return this.getAdaptableState().CellValidation;
  }

  public getAllCellValidation(): CellValidationRule[] {
    return this.getCellValidationState().CellValidations;
  }

  public addCellValidation(cellValidationRule: CellValidationRule): void {
    this.dispatchAction(CellValidationRedux.CellValidationAdd(cellValidationRule));
  }

  public deleteCellValidation(cellValidationRule: CellValidationRule): void {
    this.dispatchAction(CellValidationRedux.CellValidationDelete(cellValidationRule));
  }

  public showCellValidationPopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.CellValidationStrategyId,
      ScreenPopups.CellValidationPopup
    );
  }

  public getPredicateDefs(): PredicateDef[] {
    return this.adaptable.api.predicateApi.getPredicateDefsByFunctionScope('validation');
  }

  public getPredicateDefsForScope(scope: AdaptableScope): PredicateDef[] {
    return this.getPredicateDefs().filter(predicateDef =>
      this.adaptable.api.scopeApi.isScopeInScope(scope, predicateDef.columnScope)
    );
  }
}
