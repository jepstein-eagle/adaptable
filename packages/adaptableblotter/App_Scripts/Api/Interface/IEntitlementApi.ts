import * as EntitlementsRedux from '../../Redux/ActionsReducers/EntitlementsRedux'
import { IEntitlement } from "./Interfaces";
import { ApiBase } from "../ApiBase";

export interface IEntitlementApi {

  GetAll(): IEntitlement[]
  GetByFunction(functionName: string): IEntitlement
  GetAccessLevelForFunction(functionName: string): string
  Add(functionName: string, accessLevel: "ReadOnly" | "Hidden" | "Full"): void
  Edit(functionName: string, accessLevel: "ReadOnly" | "Hidden" | "Full"): void
  Delete(functionName: string): void

}

