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
import { DataChangedInfo } from '../../Utilities/Interface/DataChangedInfo';
import * as DeepDiff from 'deep-diff';
import ArrayExtensions from '../../Utilities/Extensions/ArrayExtensions';
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
    // need to do better as there might be multiple validation issues but...

    // only want to do this if we have any validation rows - likely we wont...
    if (
      ArrayExtensions.IsNotNullOrEmpty(this.blotter.api.cellValidationApi.getAllCellValidation())
    ) {
      let successfulValues: DataChangedInfo[] = [];
      let failedPreventEdits: CellValidationRule[] = [];
      let failedWarningEdits: CellValidationRule[] = [];
      let warningValues: DataChangedInfo[] = [];

      dataRows.forEach(dataRow => {
        //let test = this.blotter.getDataRowFromRowNode
        let pkValue = dataRow[this.blotter.blotterOptions.primaryKey];
        let currentRowNode = this.blotter.getRowNodeForPrimaryKey(pkValue);
        let currentRow = this.blotter.getDataRowFromRowNode(currentRowNode);
        let differences: deepDiff.IDiff[] = DeepDiff.diff(dataRow, currentRow);
        if (ArrayExtensions.IsNotNullOrEmpty(differences)) {
          differences.forEach(diff => {
            let dataChangedInfo: DataChangedInfo = {
              OldValue: diff.rhs,
              NewValue: diff.lhs,
              ColumnId: diff.path[0],
              IdentifierValue: pkValue,
            };

            let validationRules: CellValidationRule[] = this.blotter.ValidationService.GetValidationRulesForDataChange(
              dataChangedInfo
            );

            if (validationRules.length > 0) {
              if (validationRules[0].ActionMode == 'Stop Edit') {
                failedPreventEdits.push(validationRules[0]);
              } else {
                failedWarningEdits.push(validationRules[0]);
                warningValues.push(dataChangedInfo);
              }
            } else {
              successfulValues.push(dataChangedInfo);
            }
          });
        }
      });

      if (failedPreventEdits.length > 0) {
        this.ShowErrorPreventMessage(failedPreventEdits);
      } else if (failedWarningEdits.length > 0) {
        this.ShowWarningMessages(failedWarningEdits, warningValues, successfulValues);
      } else {
        this.blotter.updateRows(dataRows);
      }
    } else {
      this.blotter.updateRows(dataRows);
    }
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
    performCellValidation: boolean = true
  ): void {
    let gridCell: GridCell = {
      primaryKeyValue: primaryKeyValue,
      columnId: columnId,
      value: newValue,
    };
    this.setGridCell(gridCell, performCellValidation);
  }

  public setGridCell(gridCell: GridCell, performCellValidation: boolean = true): void {
    let dataChangedInfo: DataChangedInfo = this.createDataChangedInfoFromGridCell(gridCell);
    if (performCellValidation) {
      if (this.blotter.ValidationService.ValidateDataChange(dataChangedInfo)) {
        this.blotter.setValue(dataChangedInfo);
      }
    } else {
      this.blotter.setValue(dataChangedInfo);
    }
  }

  private createDataChangedInfoFromGridCell(gridCell: GridCell): DataChangedInfo {
    let currentValue = this.blotter.getDisplayValue(gridCell.primaryKeyValue, gridCell.columnId);
    let dataChangedInfo: DataChangedInfo = {
      OldValue: currentValue,
      NewValue: gridCell.value,
      ColumnId: gridCell.columnId,
      IdentifierValue: gridCell.primaryKeyValue,
    };
    return dataChangedInfo;
  }

  public setGridCells(gridCells: GridCell[], performCellValidation: boolean): void {
    let dataChangedInfos: DataChangedInfo[] = gridCells.map(gc => {
      return this.createDataChangedInfoFromGridCell(gc);
    });
    if (performCellValidation) {
      // not sure here what we do.  probably similar to what we did in other one.
    } else {
      this.blotter.setValueBatch(dataChangedInfos);
    }
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
