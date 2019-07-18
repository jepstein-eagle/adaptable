import { EntitlementsState } from './DesignTimeState/EntitlementsState';
import { UserInterfaceState } from './DesignTimeState/UserInterfaceState';
import { SystemFilterState } from './DesignTimeState/SystemFilterState';
import { ApplicationState } from './DesignTimeState/ApplicationState';
import { AdvancedSearchState } from './RunTimeState/AdvancedSearchState';
import { AlertState } from './RunTimeState/AlertState';
import { BulkUpdateState } from './RunTimeState/BulkUpdateState';
import { CalculatedColumnState } from './RunTimeState/CalculatedColumnState';
import { CalendarState } from './RunTimeState/CalendarState';
import { CellSummaryState } from './RunTimeState/CellSummaryState';
import { CellValidationState } from './RunTimeState/CellValidationState';
import { ColumnCategoryState } from './RunTimeState/ColumnCategoryState';
import { ColumnFilterState } from './RunTimeState/ColumnFilterState';
import { ConditionalStyleState } from './RunTimeState/ConditionalStyleState';
import { CustomSortState } from './RunTimeState/CustomSortState';
import { DashboardState } from './RunTimeState/DashboardState';
import { DataSourceState } from './RunTimeState/DataSourceState';
import { ExportState } from './RunTimeState/ExportState';
import { FlashingCellState } from './RunTimeState/FlashingCellState';
import { FormatColumnState } from './RunTimeState/FormatColumnState';
import { FreeTextColumnState } from './RunTimeState/FreeTextColumnState';
import { LayoutState } from './RunTimeState/LayoutState';
import { PercentBarState } from './RunTimeState/PercentBarState';
import { PlusMinusState } from './RunTimeState/PlusMinusState';
import { QuickSearchState } from './RunTimeState/QuickSearchState';
import { ReminderState } from './RunTimeState/ReminderState';
import { ShortcutState } from './RunTimeState/ShortcutState';
import { SmartEditState } from './RunTimeState/SmartEditState';
import { ThemeState } from './RunTimeState/ThemeState';
import { UserFilterState } from './RunTimeState/UserFilterState';
import { ChartState } from './RunTimeState/ChartState';
import { ActionColumnState } from './DesignTimeState/ActionColumnState';
import { NamedFilterState } from './RunTimeState/NamedFilterState';

/**
 * This is the main Predefined Config interface which users will populate if they wish to ship their Adaptable Botter instance with initial state.
 *
 * The interface consists of a series of (nullable) properties that themselves each implement *ConfigState*.
 *
 * Users only need to provide config for those properties which they want intial state, and within each object every object is nullable (with default values) so only those elements which differ from the default implementation need to be provided.
 *
 * This object when populated forms the **predefinedConfig** property in *BlotterOptions*.
 *
 * ## Predefined Config example
 *
 * ```ts
 * export default {
 *  Dashboard: {
 *    VisibleToolbars: ['SmartEdit', 'Export', 'Layout', 'QuickSearch'],
 *    VisibleButtons: ['Dashboard', 'ColumnChooser', 'AdvancedSearch'],
 *    Zoom: 0.9,
 *    UseSingleColourForButtons: false,
 * },
 *  SmartEdit: {
 *    SmartEditValue: 10,
 *  },
 *  QuickSearch: {
 *     QuickSearchText: 'g*',
 *     DisplayAction: 'ShowRowAndHighlightCell',
 *     Style: {
 *       BackColor: '#ffff00',
 *       ForeColor: '#8b0000',
 *     },
 *   },
 *  Export: {
 *    CurrentReport: 'High Freight',
 *    Reports: [
 *      {
 *        Name: 'High Freight',
 *        ReportColumnScope: 'BespokeColumns',
 *        ReportRowScope: 'ExpressionRows',
 *        ColumnIds: [
 *          'OrderId',
 *          'Freight',
 *          'Employee',
 *          'PackageCost',
 *          'InvoicedCost',
 *         ],
 *         Expression: {
 *             RangeExpressions: [
 *             {
 *               ColumnId: 'Freight',
 *               Ranges: [
 *                 {
 *                   Operand1: '500',
 *                   Operand1Type: 'Value',
 *                   Operand2: '',
 *                   Operand2Type: 'Value',
 *                   Operator: 'GreaterThan',
 *                 },
 *               ],
 *             },
 *           ],
 *         },
 *       },
 *     ],
 *   },
 *   CustomSort: {
 *     Customsorts: [
 *       {
 *         ColumnId: 'Employee',
 *         SortedValues: [
 *           'Margaret Peacock',
 *           'Steven Buchanan',
 *           'Janet Leverling',
 *         ],
 *       },
 *     ],
 *   },
 *   ConditionalStyle: {
 *     ConditionalStyles: [
 *       {
 *         ColumnId: 'ChangeLastOrder',
 *         Style: {
 *           ForeColor: '#008000',
 *         },
 *         ConditionalStyleScope: 'Column',
 *         Expression: {
 *            FilterExpressions: [
 *             {
 *               ColumnId: 'ChangeLastOrder',
 *               Filters: ['Positive'],
 *             },
 *           ],
 *         },
 *       },
 *       {
 *         ColumnId: 'ChangeLastOrder',
 *         Style: {
 *           ForeColor: '#ff0000',
 *         },
 *         ConditionalStyleScope: 'Column',
 *         Expression: {
 *           FilterExpressions: [
 *             {
 *               ColumnId: 'ChangeLastOrder',
 *               Filters: ['Negative'],
 *             },
 *           ],
 *         },
 *       },
 *       {
 *         Style: {
 *           BackColor: '#ffffcc',
 *           FontStyle: 'Italic',
 *           ForeColor: '#000000',
 *         },
 *         ConditionalStyleScope: 'Row',
 *         Expression: {
 *           RangeExpressions: [
 *             {
 *               ColumnId: 'InvoicedCost',
 *               Ranges: [
 *                 {
 *                   Operand1: '2000',
 *                   Operand1Type: 'Value',
 *                   Operand2: '',
 *                   Operand2Type: 'Value',
 *                   Operator: 'GreaterThan',
 *                 },
 *               ],
 *             },
 *           ],
 *         },
 *       },
 *     ],
 *   },
 *   Layout: {
 *     CurrentLayout: 'Orders View',
 *     Layouts: [
 *       {
 *         Columns: [
 *           'OrderId',
 *           'OrderDate',
 *           'CustomerReference',
 *           'CompanyName',
 *          'ContactName',
 *           'InvoicedCost',
 *           'ChangeLastOrder',
 *           'OrderCost',
 *           'PackageCost',
 *           'ItemCost',
 *           'ItemCount',
 *         ],
 *         ColumnSorts: [],
 *         Name: 'Orders View',
 *       },
 *       {
 *         Columns: [
 *           'OrderId',
 *           'ShipVia',
 *           'Freight',
 *           'ShipName',
 *           'ShipCountry',
 *           'ShippedDate',
 *           'CustomerReference',
 *         ],
 *         ColumnSorts: [
 *           {
 *             Column: 'ShipName',
 *             SortOrder: 'Ascending',
 *           },
 *         ],
 *         Name: 'Shipping View',
 *       },
 *     ],
 *   },
 *   FormatColumn: {
 *     FormatColumns: [
 *       {
 *         ColumnId: 'OrderId',
 *         Style: {
 *           BackColor: '#d4fb79',
 *           ForeColor: '#8b0000',
 *           FontWeight: 'Normal',
 *           FontStyle: 'Normal',
 *           ClassName: '',
 *         },
 *       },
 *     ],
 *   },
 *
 * } as PredefinedConfig;
 * ```
 * In this example we have configured the Dashboard, set the Smart Edit value, configured Quick Search and supplied Export (Reports), Custom Sort, Conditional Style, Layout and Format Column config objects.
 *
 */
export interface PredefinedConfig {
  /**
   * Defines which Functions are available to the User and whether as *Full*, *ReadOnly* or *Hidden*.
   *
   * The default is that all functions are fully availalbe so apply Entitlements Config if you wish to restrict access.
   *
   * **This section can only be populated at Design Time and is never updated or amended by the User at Run Time.**
   */
  Entitlement?: EntitlementsState;

  /**
   * State that manages UI elements in the Adaptable Blotter e.g. which colours to put in the default palette.
   *
   * Also allows users to specify css class names which can then be used in Styling functions (e.g. Conditional Style) in place of having to define the style.
   *
   *  **This section can only be populated at Design Time and is never updated or amended by the User at Run Time.**
   */
  UserInterface?: UserInterfaceState;

  /**
   * List of which System Filters should be available to users - see the list at [Adaptable Blotter Help](http://www.bbc.co.uk)
   *
   * If no values are listed, then **all System Filters** are available.
   *
   *  **This section can only be populated at Design Time and is never updated or amended by the User at Run Time.**
   */
  SystemFilter?: SystemFilterState;

  /**
   * Columns that contain buttons which, when clicked, fire an event giving detials of the button and the row in which its placed.
   *
   * **This section can only be populated at Design Time and is never updated or amended by the User at Run Time.**
   */
  ActionColumn?: ActionColumnState;
  /**
   * A deliberately empty state section, thereby available for the User to manage their own additional values (or whatever form they want) with the rest of the Adaptable Blotter state.
   *
   * **This section can only be populated at Design Time and is never updated or amended by the User at Run Time.**
   */
  Application?: ApplicationState;

  /**
   * Supplies a collection of *AdvancedSearch* objects, to provide saveable cross-column searching, and the selection of the Current Advanced Search.
   */
  AdvancedSearch?: AdvancedSearchState;

  /**
   * Supplies a collection of *Alert Definition* objects which will fire when their definition is triggered, and where Alerts are displayed.
   */
  Alert?: AlertState;

  /**
   * Provides an initial *BulkUpdateValue* to enable replacing multiple cells with a single value.
   */
  BulkUpdate?: BulkUpdateState;

  /**
   * Supplies a collection of *CalculatedColumn* objects that will display a value based on other cells in the row (using a Calculated Column Expression).
   */
  CalculatedColumn?: CalculatedColumnState;

  /**
   * Defines which is the Current Holiday Calendar.
   */
  Calendar?: CalendarState;

  /**
   * Lists which *SummaryOperation* indicators are available when selecting multiple cells.
   */
  CellSummary?: CellSummaryState;

  /**
   * Supplies a collection of *CellValidation* objects to ensure that data entry meets user rules and requirements.
   */
  CellValidation?: CellValidationState;

  /**
   * Supplies a collection of *Chart* objects to enable seeing grid data visually in chart format.
   */
  Chart?: ChartState;

  /**
   * Supplies a collection of *ColumnCategory* objects to enable the logical grouping of columns (used in the Column Chooser).
   */
  ColumnCategory?: ColumnCategoryState;

  /**
   * Supplies a collection of *ColumnFilter* objects to provide the Adaptable Blotter with initial filtering.
   */
  ColumnFilter?: ColumnFilterState;

  /**
   * Supplies a collection of *ConditionalStyle* objects to provides columns and rows with a particular style when the data matches a given rule.
   */
  ConditionalStyle?: ConditionalStyleState;

  /**
   * Supplies a collection of *Custom Sort* objects to allow some columns to be sorted in non-standard (e.g. non alphabetical) ways.
   */
  CustomSort?: CustomSortState;

  /**
   * Large series of properties to give users full control over the look and feel of the *Dashboard* - the section above the grid with toolbars and buttons.
   */
  Dashboard?: DashboardState;

  /**
   * Supplies a collection of *DataSource* objects to facilitate replacing the DataSource in the Grid with an alternate set of data (e.g. a Book or Stored Proc name).
   */
  DataSource?: DataSourceState;

  /**
   * Supplies a collection of *Report* objects, together with name of the Current Report, as part of the Adaptable Blotter export Function.
   */
  Export?: ExportState;

  /**
   * Supplies a collection of *FlashingCell* objects to set up which columns should flash when their contents change and how.  Also includes default values to facilitiate creating new flashing cell columns.
   */
  FlashingCell?: FlashingCellState;

  /**
   * Supplies a collection of *FormatColumn* objects that will style an entire column in a single way (and not subject to a rule like with Conditional Style).
   */
  FormatColumn?: FormatColumnState;

  /**
   * Supplies a collection of *FreeText* objects so users can make their own notes in bespoke columns that will get stored with their state (and not with the DataSource).  Useful if needing a 'Comments' column.
   */
  FreeTextColumn?: FreeTextColumnState;

  /**
   * Supplies a collection of *Layout* objects to name and manage groups of column visibility, order and sorts.
   */
  Layout?: LayoutState;

  /**
   * Supplies a collection of *PercentBar* objects which will display numeric columns as a coloured bar, the fill of which is bassed on the cell value.
   */
  PercentBar?: PercentBarState;

  /**
   * Supplies a collection of *PlusMinus* rule objects to stipulate what happens when the user clicks '+' or '-' in a numeric cell.
   */
  PlusMinus?: PlusMinusState;

  /**
   * Configues how Quick Search will run i.e. how and whether to highlight matching cells and to filter out non-matching rows.
   */
  QuickSearch?: QuickSearchState;

  /**
   * Supplies a collection of *Reminder* objects to display warnings at scheduled times.
   */
  Reminder?: ReminderState;

  /**
   * Supplies a collection of *Shortcut* objects to aid data entry and prevent 'fat finger' issues.
   */
  Shortcut?: ShortcutState;

  /**
   * Provides the initial Smart Edit Operation to use (the default is *Multiply*) and the initial Smart Edit Value.
   */
  SmartEdit?: SmartEditState;

  /**
   * Specifies the current Theme and lists the User and System themes available for selection.
   */
  Theme?: ThemeState;

  /**
   * Supplies a collection of *UserFilter* objects which can be used to create Column Filters and in other Functions.
   */
  UserFilter?: UserFilterState;

  NamedFilter?: NamedFilterState;
}
