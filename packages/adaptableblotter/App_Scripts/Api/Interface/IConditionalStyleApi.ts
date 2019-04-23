import { IConditionalStyle } from "../../Utilities/Interface/BlotterObjects/IConditionalStyle";
import { ConditionalStyleState } from "../../Redux/ActionsReducers/Interface/IState";

export interface IConditionalStyleApi {
  GetState(): ConditionalStyleState;
  GetAll(): IConditionalStyle[]
 
}

