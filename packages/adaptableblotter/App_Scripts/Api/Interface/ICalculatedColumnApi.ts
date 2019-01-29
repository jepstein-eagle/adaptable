import { ICalculatedColumn } from "../../Utilities/Interface/BlotterObjects/ICalculatedColumn";

export interface ICalculatedColumnApi {

 
  GetAll(): ICalculatedColumn[]
  Add(calculatedColumn: ICalculatedColumn): void
  EditExpression(column: string, columnExpression: string): void
  Delete(column: string): void

}

