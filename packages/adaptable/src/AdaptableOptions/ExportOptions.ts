import { Report } from '../PredefinedConfig/ExportState';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';

/**
 * Export options section of Adaptable Options.
 *
 * Allows users to provide a function to specify whether a Column will export its diaplay value (the default) or raw value when sending Grid data.
 *
 */
export interface ExportOptions {
  /**
   *  A function allowing you to specify for each Column (and Report) whether to export the DisplayValue (the default) or the RawValue.
   *
   * ```ts
   * adaptableOptions.exportOptions = {
   *    exportColumnRawValue: (column: AdaptableColumn, report: Report) => {
   *      if (column.ColumnId === 'bid') {
   *        return true;
   *      } else if (column.ColumnId === 'tradeDate' && report.Name === 'Visible Data') {
   *        return true;
   *      }
   *      return false;
   *    },
   *  };
   * ```
   *
   * In this example, the 'bid' column (for any report) and the 'tradeDate' column (for 'Visible Data' report) will export the `RawValue`.
   *
   * And all other columns will always export the `DisplayValue`.
   *
   *
   */
  exportColumnRawValue?: (column: AdaptableColumn, report: Report) => boolean;
}
