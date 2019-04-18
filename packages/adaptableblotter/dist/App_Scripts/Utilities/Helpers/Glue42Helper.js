"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Helper_1 = require("./Helper");
const ColumnHelper_1 = require("./ColumnHelper");
const ArrayExtensions_1 = require("../Extensions/ArrayExtensions");
const Enums_1 = require("../Enums");
const ExpressionHelper_1 = require("./ExpressionHelper");
var Glue42Helper;
(function (Glue42Helper) {
    let glue42office; // =   Glue4Office();
    let excelAPIEntryPoint;
    let isRunning = false;
    function init() {
        return __awaiter(this, void 0, void 0, function* () {
            glue42office = yield Glue4Office();
            if (glue42office != null) {
                excelAPIEntryPoint = glue42office.excel;
                // currently doesnt work as its async :(
                isRunning = excelAPIEntryPoint != null;
            }
        });
    }
    Glue42Helper.init = init;
    function isRunningGlue42() {
        // this method is getting called BEFORE the init returns so it retruns false even if init works
        // so im changing this to always return true for the moment...
        return true; // isRunning;
    }
    Glue42Helper.isRunningGlue42 = isRunningGlue42;
    function exportData(data, gridColumns, blotter) {
        return __awaiter(this, void 0, void 0, function* () {
            let exportColumns = data[0];
            let exportData = createData(data, exportColumns);
            let sentRows = Helper_1.Helper.cloneObject(exportData);
            const sheetData = {
                columnConfig: createColumns(data),
                data: exportData,
                options: {
                    workbook: 'Glue42 Excel Integration Demo',
                    worksheet: 'Data Sheet'
                }
            };
            try {
                console.log(sheetData);
                const sheet = excelAPIEntryPoint.openSheet(sheetData).then((sheet) => {
                    sheet.onChanged((data, errorCallback, doneCallback) => {
                        let primaryKeyColumnFriendlyName = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(blotter.BlotterOptions.primaryKey, gridColumns);
                        let cellInfos = [];
                        const errors = [];
                        for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
                            let returnedRow = data[rowIndex];
                            let sentRow = sentRows[rowIndex];
                            for (let columnIndex = 0; columnIndex < exportColumns.length; columnIndex++) {
                                let col = exportColumns[columnIndex];
                                let returnedValue = returnedRow[col];
                                let originalValue = sentRow[col];
                                if (returnedValue != originalValue) {
                                    let column = ColumnHelper_1.ColumnHelper.getColumnFromFriendlyName(col, gridColumns);
                                    let primaryKeyValue = returnedRow[primaryKeyColumnFriendlyName];
                                    if (isValidEdit(column, originalValue, returnedValue, primaryKeyValue, rowIndex, columnIndex, errors, gridColumns, blotter)) {
                                        let cellInfo = {
                                            Id: primaryKeyValue,
                                            ColumnId: column.ColumnId,
                                            Value: returnedValue
                                        };
                                        cellInfos.push(cellInfo);
                                    }
                                    sentRows[rowIndex][col] = returnedValue; // we always set (even if invalid) so dont update after future edits
                                }
                            }
                        }
                        blotter.setValueBatch(cellInfos);
                        ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(errors) ? doneCallback() : errorCallback(errors);
                    });
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    Glue42Helper.exportData = exportData;
    function isValidEdit(column, originalValue, returnedValue, primaryKeyValue, rowIndex, columnIndex, errors, columns, blotter) {
        if (column.ReadOnly) {
            errors.push(addValidationError(rowIndex + 1, columnIndex + 1, column.FriendlyName + " is read only"));
            return false;
        }
        // check for type -- do properly in due course, but for now just check numbers...
        if (column.DataType == Enums_1.DataType.Number) {
            if (isNaN(Number(returnedValue))) {
                errors.push(addValidationError(rowIndex + 1, columnIndex + 1, column.FriendlyName + " is numeric"));
                return false;
            }
        }
        let dataChangedInfo = {
            OldValue: originalValue,
            NewValue: returnedValue,
            ColumnId: column.ColumnId,
            IdentifierValue: primaryKeyValue,
            Record: null
        };
        // check for any validation issues
        let cellValidationRules = blotter.ValidationService.ValidateCellChanging(dataChangedInfo);
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(cellValidationRules)) {
            cellValidationRules.forEach((cv) => {
                let failedvalidationMessage = 'Validation failed for ' + column.FriendlyName + ': ' + ExpressionHelper_1.ExpressionHelper.ConvertRangeToString(cv.Range, columns);
                if (cv.ActionMode == Enums_1.ActionMode.StopEdit) {
                    errors.push(addValidationError(rowIndex + 1, columnIndex + 1, failedvalidationMessage));
                }
                else {
                    errors.push(addValidationWarning(rowIndex + 1, columnIndex + 1, failedvalidationMessage));
                }
            });
            return false;
        }
        return true;
    }
    function addValidationWarning(rowIndex, columnIndex, errorDescription) {
        return {
            row: rowIndex,
            column: columnIndex,
            description: errorDescription,
            foregroundColor: 'orange',
            backgroundColor: 'white'
        };
    }
    function addValidationError(rowIndex, columnIndex, errorDescription) {
        return {
            row: rowIndex,
            column: columnIndex,
            description: errorDescription,
            foregroundColor: 'red',
            backgroundColor: 'white'
        };
    }
    function createColumns(data) {
        let firstRow = data[0];
        let headers = [];
        firstRow.forEach((element) => {
            headers.push({
                header: element.replace(' ', ''), fieldName: element
            });
        });
        return headers;
    }
    Glue42Helper.createColumns = createColumns;
    function createData(data, headers) {
        let returnArray = [];
        for (let i = 1; i < data.length; i++) {
            let row = data[i];
            let returnItem = {};
            for (let j = 0; j < headers.length; j++) {
                returnItem[headers[j]] = row[j];
            }
            returnArray.push(returnItem);
        }
        return returnArray;
    }
    Glue42Helper.createData = createData;
})(Glue42Helper = exports.Glue42Helper || (exports.Glue42Helper = {}));
