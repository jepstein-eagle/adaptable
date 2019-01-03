import * as CellValidationRedux from '../../Redux/ActionsReducers/CellValidationRedux'
import { ApiBase } from "../ApiBase";
import { ICellValidationRule } from './IAdaptableBlotterObjects';

export interface ICellValidationApi {

  GetAll(): ICellValidationRule[]
  Add(cellValidationRule: ICellValidationRule): void
  Delete(cellValidationRule: ICellValidationRule): void
}
