
import { ApiBase } from "./ApiBase";
import { IGridApi } from "./Interface/IGridApi";

export class GridApi extends ApiBase implements IGridApi {

  
  public setGridData(dataSource: any): void {
    this.blotter.setGridData(dataSource);
  }

}