import { ApiBase } from "./ApiBase";
import { ICellSummaryApi } from './Interface/ICellSummaryApi';
import { CellSummaryState } from '../Redux/ActionsReducers/Interface/IState';


export class CellSummaryApi extends ApiBase implements ICellSummaryApi {
 
  
  public GetState(): CellSummaryState {
    return this.getBlotterState().CellSummary;
}




}