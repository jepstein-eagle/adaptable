import * as Redux from 'redux';
import * as GridRedux from '../../Redux/ActionsReducers/GridRedux';
import { ApiBase } from './ApiBase';
import { GridApi } from '../GridApi';
import { AdaptableBlotterColumn } from '../../Utilities/Interface/AdaptableBlotterColumn';
import { GridState } from '../../PredefinedConfig/GridState';
import { DataType } from '../../PredefinedConfig/Common/Enums';
import { SelectedCellInfo } from '../../Utilities/Interface/Selection/SelectedCellInfo';
import { ColumnSort } from '../../PredefinedConfig/LayoutState';
import { SelectedRowInfo } from '../../Utilities/Interface/Selection/SelectedRowInfo';
import { GridCell } from '../../Utilities/Interface/Selection/GridCell';
import { DataChangedInfo } from '../../BlotterOptions/CommonObjects/DataChangedInfo';
import { CellValidationRule } from '../../PredefinedConfig/CellValidationState';
import ObjectFactory from '../../Utilities/ObjectFactory';
import { IUIConfirmation } from '../../Utilities/Interface/IMessage';
import CellValidationHelper from '../../Utilities/Helpers/CellValidationHelper';

export class GridApiImpl extends ApiBase implements GridApi {
  public getGridState(): GridState {
    return this.getBlotterState().Grid;
  }

  public setGridData(dataSource: any): void {
    this.blotter.setDataSource(dataSource);
  }

  public updateGridData(dataRows: any[]): void {
    this.blotter.updateRows(dataRows);
  }

  public addGridData(dataRows: any[]): void {
    this.blotter.addRows(dataRows);
  }

  public deleteGridData(dataRows: any[]): void {
    if (this.checkArrayExists(dataRows)) {
      this.blotter.deleteRows(dataRows);
    }
  }

  public setCellValue(
    primaryKeyValue: any,
    columnId: string,
    newValue: any,
    validateChange: boolean = true
  ): void {
    let gridCell: GridCell = {
      primaryKeyValue: primaryKeyValue,
      columnId: columnId,
      value: newValue,
    };
    this.setGridCell(gridCell, validateChange);
  }

  public setGridCell(gridCell: GridCell, validateChange: boolean = true): void {
    let dataChangedInfo: DataChangedInfo = this.createDataChangedInfoFromGridCell(gridCell);
    if (validateChange) {
      if (!this.blotter.ValidationService.PerformCellValidation(dataChangedInfo)) {
        return;
      }
    }

    const onServerValidationCompleted = () => {
      this.blotter.setValue(dataChangedInfo);
    };

    const mimicPromise = this.blotter.blotterOptions.editOptions.validateOnServer
      ? this.blotter.ValidationService.PerformServerValidation(dataChangedInfo, {
          onServerValidationCompleted,
        })
      : onServerValidationCompleted;

    mimicPromise();
  }

  private createDataChangedInfoFromGridCell(gridCell: GridCell): DataChangedInfo {
    let currentValue = this.blotter.getDisplayValue(gridCell.primaryKeyValue, gridCell.columnId);
    let currentRowNode = this.blotter.getRowNodeForPrimaryKey(gridCell.primaryKeyValue);
    let dataChangedInfo: DataChangedInfo = {
      OldValue: currentValue,
      NewValue: gridCell.value,
      ColumnId: gridCell.columnId,
      PrimaryKeyValue: gridCell.primaryKeyValue,
      RowNode: currentRowNode,
    };
    return dataChangedInfo;
  }

  public setGridCells(gridCells: GridCell[], validateChange: boolean): void {
    gridCells.forEach(gc => {
      this.setGridCell(gc, validateChange);
    });
  }

  public getColumns(): AdaptableBlotterColumn[] {
    return this.getGridState().Columns;
  }

  public getSelectedCellInfo(): SelectedCellInfo {
    return this.getGridState().SelectedCellInfo;
  }

  public getSelectedRowInfo(): SelectedRowInfo {
    return this.getGridState().SelectedRowInfo;
  }

  public getVisibleColumns(): AdaptableBlotterColumn[] {
    return this.getColumns().filter(c => c.Visible);
  }

  public getNumericColumns(): AdaptableBlotterColumn[] {
    return this.getColumns().filter(c => c.DataType == DataType.Number);
  }

  public getDateColumns(): AdaptableBlotterColumn[] {
    return this.getColumns().filter(c => c.DataType == DataType.Date);
  }

  public getColumnSorts(): ColumnSort[] {
    return this.getGridState().ColumnSorts;
  }

  private ShowErrorPreventMessage(failedRules: CellValidationRule[]): void {
    let failedMessages: string[] = [];
    failedRules.forEach(fr => {
      let failedMessage: string =
        ObjectFactory.CreateCellValidationMessage(fr, this.blotter) + '\n';
      let existingMessage = failedMessages.find(f => f == failedMessage);
      if (existingMessage == null) {
        failedMessages.push(failedMessage);
      }
    });
    this.blotter.api.alertApi.showAlertError('Data Update failed rule', failedMessages.toString());
  }

  private ShowWarningMessages(
    failedRules: CellValidationRule[],
    warningValues: DataChangedInfo[],
    successfulValues: DataChangedInfo[]
  ): void {
    if (failedRules.length > 0) {
      let allValues = warningValues.concat(...successfulValues);

      let warningMessages: string[] = [];
      failedRules.forEach(fr => {
        let warningMessage: string =
          ObjectFactory.CreateCellValidationMessage(fr, this.blotter) + '\n';
        let existingMessage = warningMessages.find(w => w == warningMessage);
        if (existingMessage == null) {
          warningMessages.push(warningMessage);
        }
      });
      let warningMessage: string =
        failedRules.length + ' Data Update failed rule:\n' + warningMessages.toString();

      let confirmAction: Redux.Action = GridRedux.GridSetValueLikeEditBatch(allValues);
      let cancelAction: Redux.Action = GridRedux.GridSetValueLikeEditBatch(successfulValues);
      let confirmation: IUIConfirmation = CellValidationHelper.createCellValidationUIConfirmation(
        confirmAction,
        cancelAction,
        warningMessage
      );
      this.blotter.api.internalApi.showPopupConfirmation(confirmation);
    }
  }
}
