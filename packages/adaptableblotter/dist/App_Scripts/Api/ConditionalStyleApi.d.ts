import { ApiBase } from "./ApiBase";
import { IConditionalStyleApi } from './Interface/IConditionalStyleApi';
import { IConditionalStyle } from '../Utilities/Interface/BlotterObjects/IConditionalStyle';
import { ConditionalStyleState } from "../Redux/ActionsReducers/Interface/IState";
export declare class ConditionalStyleApi extends ApiBase implements IConditionalStyleApi {
    GetState(): ConditionalStyleState;
    GetAll(): IConditionalStyle[];
}
