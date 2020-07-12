import { ConfigState } from './ConfigState';
import { AdaptableObject } from './Common/AdaptableObject';
import { Expression } from './Common/Expression';
import { BaseSchedule } from './Common/Schedule';

/**
 * The Predefined Configuration for the Export function
 *
 * Export enables you to create saveable Reports that you can run either manually or on a schedule.
 *
 * Adaptable will popuplate the Export dropdown with your reports and allow you to export the data to a number of destinations.
 *
 * Each Report has both Row and Column Scope to allow you define which Rows and Columns are contained in the Export
 *
 * --------------
 *
 * **Further AdapTable Help Resources**
 *
 * [Export Demo](https://demo.adaptabletools.com/gridmanagement/aggridexportdemo)
 *
 * {@link ExportApi|Export API}
 *
 * [Export Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/export-function.md)
 *
 * [Export Options](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_exportoptions_.exportoptions.html)
 *
 * --------------
 *
 *  * **Export Predefined Config Example**
 *
 * ```ts
 *   Export: {
 *   CurrentReport: 'My Team Big Invoice',
 *   Reports: [
 *     {
 *       Expression: {
 *         ColumnValueExpressions: [
 *           {
 *             ColumnId: 'Employee',
 *             ColumnDisplayValues: [
 *               'Robert King',
 *               'Margaret Peacock',
 *               'Anne Dodsworth',
 *             ],
 *           },
 *         ],
 *         RangeExpressions: [
 *           {
 *             ColumnId: 'InvoicedCost',
 *             Ranges: [
 *               {
 *                 Operator: 'GreaterThan',
 *                 Operand1: '1000',
 *                 Operand1Type: 'Value',
 *               },
 *             ],
 *           },
 *         ],
 *       },
 *       Name: 'My Team Big Invoice',
 *       ReportColumnScope: 'AllColumns',
 *       ReportRowScope: 'ExpressionRows',
 *     },
 *     {
 *       ColumnIds: [
 *         'OrderId',
 *         'ChangeLastOrder',
 *         'ContactName',
 *         'InvoicedCost',
 *         'ItemCost',
 *         'ItemCount',
 *         'OrderCost',
 *         'OrderDate',
 *       ],
 *       Name: 'End of Day',
 *       ReportColumnScope: 'BespokeColumns',
 *       ReportRowScope: 'VisibleRows',
 *     },
 *   ],
 * },
 * Schedule: {
 *   ReportSchedules: [
 *     {
 *       ScheduleType: 'Report',
 *       ReportName: 'End of Day',
 *       ExportDestination: 'Excel',
 *       Schedule: {
 *         DaysOfWeek: [1, 2, 3, 4, 5],
 *         Hour: 17,
 *         Minute: 30,
 *       },
 *     },
 *   ],
 * }, as PredefinedConfig;
 * ```
 *
 * In this example we have created 2 Reports
 *
 * - 'My Team Big Invoice' (the currently selected one) - which exports ALL Columns and any rows where the 'InvoicedCost' Column > 1000 AND the 'Employee' column value is one of 'Robert King', 'Margaret Peacock' or 'Anne Dodsworth'
 *
 * - 'End of Day' - which exports 8 named Columns and ALL Rows.
 *
 * Note: we have also defined a Schedule so that the 'End of Day' Report will export to Excel automatically every weekday at 17:30
 */
export interface ExportState extends ConfigState {
  /**
   * The Report that is currently selected in the Export dropdown..
   */
  CurrentReport?: string;

  /**
   * Any user-created Reports.
   *
   * Each report contains a name and Row and Column Scope (essentially which rows and columns to export).
   *
   * Additionally Adaptable ships with 'System Reports' which will be automatically available to users.
   *
   * **Default Value**:  Empty array
   */
  Reports?: Report[];
}

export interface Report extends AdaptableObject {
  /**
   * The name of the Report - a mandatory property
   */
  Name: string;

  /**
   * Which Columns are contained in the Report.  The choices are:
   *
   * - AllColumns - all columns in your DataSource
   *
   * - VisibleColumns - all columns that are in the Grid when the Report is run (by visible we mean all columns which are not explicity hidden, so it includes any columns that are not in the current view port but can be scrolled across to)
   *
   * - SelectedColumns - all columns which are currently selected (only available in Vendor Grids where multiple columns can be selected)
   *
   * - BespokeColumns - a list of Columns to be provided by you; if the Report is built using the UI Wizard a separate page appears to facilitate this column selection
   */
  ReportColumnScope: 'AllColumns' | 'VisibleColumns' | 'SelectedCellColumns' | 'BespokeColumns';

  /**
   * Which Rows are exported when the Report runs.  The choices are:
   *
   * - AllRows - all rows in your DataSource
   *
   * - VisibleRows - all rows that are in the Grid when the Report is run (by visible we mean all rows which are not explicity filtered, so it includes any rows that are not in the current view port but can be scrolled down to)
   *
   * - SelectedCells - all cells currently selected (depending on the Grid being used, selected cells do not need to be contiguous)
   *
   * - SelectedRows - all cells in all currently selected rows  (depending on the Grid being used, selected rows do not need to be contiguous)
   *
   * - ExpressionRows - the Expression (or Query) that should be run to see which rows to include in the exported data.  See [Expression](https://api.adaptabletools.com/modules/_predefinedconfig_common_expression_.html) for more details.
   */
  ReportRowScope:
    | 'AllRows'
    | 'VisibleRows'
    | 'SelectedCellRows'
    | 'SelectedRows'
    | 'ExpressionRows';

  /**
   * Which columns to include in the report.
   *
   * This is only required if the `ReportColumnScope` is 'BespokeColumns'
   */
  ColumnIds?: string[];

  /**
   * Which [Expression](https://api.adaptabletools.com/modules/_predefinedconfig_common_expression_.html) to run to get the rows for the Report
   *
   * This is only required if the `ReportRowScope` is 'ExpressionRows'
   */
  Expression?: Expression;
}

/**
 * Defines a Scheduled Report.  Used in the Schedule Function (where the State will be stored).
 *
 * Includes 2 properties:
 *
 * - Schedule: **When** the Report will run
 *
 * - ExportDestination: **Where** the Report data will be exported.
 */
export interface ReportSchedule extends BaseSchedule {
  ReportName: string;
  ExportDestination: 'Excel' | 'CSV' | 'Clipboard' | 'JSON';
}
