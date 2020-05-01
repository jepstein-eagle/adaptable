import { ApiBase } from './ApiBase';
import { CellSummaryApi } from '../CellSummaryApi';
import {
  CellSummaryState,
  CellSummaryOperationDefinition,
} from '../../PredefinedConfig/CellSummaryState';
import { CellSummaryOperation } from '../../PredefinedConfig/Common/Enums';
import * as CellSummaryRedux from '../../Redux/ActionsReducers/CellSummaryRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';

export class CellSummaryApiImpl extends ApiBase implements CellSummaryApi {
  public getCellSummaryState(): CellSummaryState {
    return this.getAdaptableState().CellSummary;
  }

  public getCellSummaryOperation(): CellSummaryOperation | string {
    return this.getCellSummaryState().SummaryOperation;
  }

  public getCellSummaryOperationDefinitions(): CellSummaryOperationDefinition[] {
    return this.getCellSummaryState().CellSummaryOperationDefinitions;
  }

  public addCellSummaryOperationDefinitions(
    cellSummaryOperationDefinitions: CellSummaryOperationDefinition[]
  ) {
    const currentDefinitions = this.getCellSummaryOperationDefinitions();
    const currentDefinitionsMap = currentDefinitions.reduce((acc, definition) => {
      acc[definition.OperationName] = definition;
      return acc;
    }, {} as { [key: string]: CellSummaryOperationDefinition });

    const operationDefinitions = [
      ...currentDefinitions,
      ...cellSummaryOperationDefinitions.filter(definition => {
        return !currentDefinitionsMap[definition.OperationName];
      }),
    ];
    this.dispatchAction(CellSummaryRedux.CellSummaryOperationDefinitionsSet(operationDefinitions));
  }

  public showCellSummaryPopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.CellSummaryStrategyId,
      ScreenPopups.CellSummaryPopup
    );
  }
}
