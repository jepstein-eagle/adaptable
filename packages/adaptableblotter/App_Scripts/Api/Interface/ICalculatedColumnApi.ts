import * as CalculatedColumnRedux from '../../Redux/ActionsReducers/CalculatedColumnRedux'
import { ApiBase } from "../ApiBase";
import { ICalculatedColumn } from './IAdaptableBlotterObjects';

export interface ICalculatedColumnApi {

 
  GetAll(): ICalculatedColumn[]
  Add(calculatedColumn: ICalculatedColumn): void
  EditExpression(column: string, columnExpression: string): void
  Delete(column: string): void

}

