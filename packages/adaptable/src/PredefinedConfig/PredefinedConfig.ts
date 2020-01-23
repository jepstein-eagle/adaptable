import { EntitlementState } from './EntitlementState';
import { UserInterfaceState } from './UserInterfaceState';
import { SystemFilterState } from './SystemFilterState';
import { ApplicationState } from './ApplicationState';
import { AdvancedSearchState } from './AdvancedSearchState';
import { AlertState } from './AlertState';
import { BulkUpdateState } from './BulkUpdateState';
import { CalculatedColumnState } from './CalculatedColumnState';
import { CalendarState } from './CalendarState';
import { CellSummaryState } from './CellSummaryState';
import { CellValidationState } from './CellValidationState';
import { ColumnCategoryState } from './ColumnCategoryState';
import { ColumnFilterState } from './/ColumnFilterState';
import { ConditionalStyleState } from './ConditionalStyleState';
import { CustomSortState } from './CustomSortState';
import { DashboardState } from './DashboardState';
import { DataSourceState } from './DataSourceState';
import { ExportState } from './ExportState';
import { FlashingCellState } from './FlashingCellState';
import { UpdatedRowState } from './UpdatedRowState';
import { FormatColumnState } from './FormatColumnState';
import { FreeTextColumnState } from './FreeTextColumnState';
import { IPushPullState } from './IPushPullState';
import { Glue42State } from './Glue42State';
import { LayoutState } from './LayoutState';
import { PercentBarState } from './PercentBarState';
import { PlusMinusState } from './PlusMinusState';
import { QuickSearchState } from './QuickSearchState';
import { ReminderState } from './ReminderState';
import { ShortcutState } from './ShortcutState';
import { SmartEditState } from './SmartEditState';
import { ThemeState } from './ThemeState';
import { UserFilterState } from './UserFilterState';
import { ChartState } from './ChartState';
import { ActionColumnState } from './ActionColumnState';
import { SparklineColumnState } from './SparklineColumnState';
import { NamedFilterState } from './NamedFilterState';
import { SystemStatusState } from './SystemStatusState';
import { ToolPanelState } from './ToolPanelState';

/**
 * This is the main Predefined Config interface which users will populate if they wish to ship their AdapTable instance with initial state.
 *
 * The interface consists of a series of (nullable) properties that themselves each implement *ConfigState*.
 *
 * Users only need to provide config for those properties which they want intial state, and within each object every object is nullable (with default values) so only those elements which differ from the default implementation need to be provided.
 *
 * The State items in Predefined Config can be conceptually be put into 2 categories:
 *
 * - **Design-Time**: Cannot be overriden & saved by users (e.g. Menus, Entitlements etc.)
 *
 * - **Run-Time**: Can be overriden & saved by user's actions (and persisted through State Management)
 *
 *
 *
 *  | State Property 	                                                                        | Saveable            | Details                                     	                |
 *  |----------------	                                                                        |-------------------	|---------------------------------------------	                |
 *  | [ActionColumn](_predefinedconfig_actioncolumnstate_.actioncolumnstate.html)   	        | No	                | Create dynamic columns with Buttons that fire events 	        |
 *  | [AdvancedSearch](_predefinedconfig_advancedsearchstate_.advancedsearchstate.html)   	  | Yes 	              | Create saveable multi-column searches with multiple criteria  |
 *  | [Alert](_predefinedconfig_alertstate_.alertstate.html)   	                              | Yes 	              | Provide Alert Definitions which will trigger run-time alerts  |
 *  | [Application](_predefinedconfig_applicationstate_.applicationstate.html)   	            | No	                | Save your own state as key / value pairs 	                    |
 *  | [BulkUpdate](_predefinedconfig__bulkupdatestate_.bulkupdatestate.html)   	              | Yes 	              | Update multiple cells in a column to contain a new value      |
 *  | [CalculatedColumn](_predefinedconfig_calculatedcolumnstate_.calculatedcolumn.html)   	  | Yes 	              | Create custom columns with dynamic values based on expression |
 *  | [Calendar](_predefinedconfig_calendarstate_.calendar.html)   	                          | Yes 	              | Select or provide your own calendar for dealing with holidays |
 *  | [CellSummary](_predefinedconfig_cellsummarystate_.cellsummarystate.html)   	            | Yes 	              | Choose which summary operations to see for selected cells     |
 *  | [CellValidation](_predefinedconfig_cellvalidationstate_.cellvalidationstate.html)     	| Yes 	              | Provide (complex) rules to validate cell edits                |
 *  | [Chart](_predefinedconfig_chartstate_.chartstate.html)   	                              | Yes 	              | Visualise grid data using a variety of different chart types  |
 *  | [ColumnCategory](_predefinedconfig_columncategorystate_.columncategorystate.html)       | Yes     	          | Group columns into category for easier column management      |
 *  | [ColumnFilter](_predefinedconfig_columnfilterstate_.columnfilterstate.html)             | Yes 	              | Supply your own filters for columns to findy your data easily |
 *  | [ConditionalStyle](_predefinedconfig_conditionalstylestate_.conditionalstylestate.html) | Yes 	              | Dynamically Style columns & rows according to rules provided  |
 *  | [CustomSort](_predefinedconfig_customsortstate_.customsortstate.html)                   | Yes 	              | Build your own sort orders for columns with non-standard sorts|
 *  | [Dashboard](_predefinedconfig_dashboardstate_.dashboardstate.html)                      | Yes 	              | Configure & populate the Dasboard area (abov the main grid)   |
 *  | [DataSource](_predefinedconfig_datasourcestate.datasourcestate.html)                    | Yes 	              | Provide Data Sources that will populate Grid via the server   |
 *  | [Entitlements](_predefinedconfig_entitlementstate_.entitlementstate.html)               | No	                | Manage permissions so users only see relevant functions       |
 *  | [Export](_predefinedconfig_exportstate_.exportstate.html)                               | Yes 	              | Create reports to export data from grid to numerous loctions  |
 *  | [FreeTextColumn](_predefinedconfig_freetextcolumnstate_.freetextcolumnstate.html)       | Yes 	              | Speical free entry columns (e.g. Comments) saved with state   |
 *  | [Layout](_predefinedconfig_layoutstate_.layoutstate.html)                               | Yes 	              | Named views of column sorts, order, pivots, visbility & groups|
 *  | [NamedFilter](_predefinedconfig_namedfilterstate_.namedfilterstate.html)                | No                  | Bespoke filters for which you provide a predicate function    |
 *  | [Partner](_predefinedconfig_partnerstate_.partnerstate.html)                            | No                  | State required for partners (e.g. ipushpull, OpenFin, Glue42) |
 *  | [QuickSearch](_predefinedconfig_quicksearchstate_.quicksearchstate.html)                | Yes 	              | Run a text based search across whole grid (using wildcards)   |
 *  | [Reminder](_predefinedconfig_reminderstate_.reminder.html)                              | Yes 	              | Schedule alerts to run to remind you of actions to perform    |
 *  | [Schedule](_predefinedconfig_schedulestate_.schedule.html)                              | Yes 	              | To do   |
 *  | [Shortcut](_predefinedconfig_shortcutstate_.shortcutstate.html)                         | Yes 	              | Avoid fat finger issues by creating keyboard shortcuts        |
 *  | [SmartEdit](_predefinedconfig_smarteditstate_.smarteditstate.html)                      | Yes 	              | Update multiple numeric cells with a single maths operation   |
 *  | [SparklineColumn](_predefinedconfig_sparklinecolumnstate_.sparklinecolumnstate.html)    | No                  | See columns containing ranges of data as a sparkline          |
 *  | [SystemFilter](_predefinedconfig_systemfilterstate_.systemfilterstate.html)             | No                  | Select availability of System Filters (e.g. Today, Blanks)    |
 *  | [SystemStatus](_predefinedconfig_systemstatusstate_.systemstatusstate.html)             | No                  | Show Messages and Alerts describing curent Status of the App  |
 *  | [Theme](_predefinedconfig_themestate_.themestate.html)                                  | Yes                 | Select with shipped Theme is used or provide a custom one     |
 *  | [ToolPanel](_predefinedconfig_toolpanelstate_.toolpanelstate.html)                      | Yes                 | Manage AdapTable ToolPanel (the area to the right of grid)  |
 *  | [UpdatedRow](_predefinedconfig_updatedrowstate_.updatedrowstate.html)                   | Yes                 | Colour (and jump to) rows whose contents have changed         |
 *  | [UserFilter](_predefinedconfig_userfilterstate_.userfilterstate.html)                   | Yes                 | Create your own filters baseed on your data and requirements  |
 *  | [UserInterface](_predefinedconfig_userinterfacestate_.userinterfacestate.html)          | No                  | Provide your own menus, styles and colour palettes            |
 *
 *
 * This object when populated forms the **predefinedConfig** property in *adaptableOptions*.
 *
 * ## Predefined Config example
 *
 * ```ts
 * export default {
 *  Dashboard: {
 *    VisibleToolbars: ['SmartEdit', 'Export', 'Layout', 'QuickSearch'],
 *    VisibleButtons: ['Dashboard', 'ColumnChooser', 'AdvancedSearch'],
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
   * Columns that contain buttons which, when clicked, fire an event giving detials of the button and the row in which its placed.
   *
   * **This section can only be populated at Design Time.  It cannot be updated or amended by the User at Yes.**
   *
   * (Note: Action Column State can be updated via `AdaptableApi` but these updates **will not be persisted**).
   */
  ActionColumn?: ActionColumnState;
  /**
   * A deliberately empty state section, thereby available for the User to manage their own additional values (or whatever form they want) with the rest of AdapTable state.
   *
   * **This section can only be populated at Design Time.  It cannot be updated or amended by the User at Yes.**
   *
   * (Note: Application State can be updated via `AdaptableApi` but these updates **will not be persisted**).
   */
  Application?: ApplicationState;
  /**
   * Defines which Functions are available to the User and whether as *Full*, *ReadOnly* or *Hidden*.
   *
   * The default is that all functions are fully availalbe so apply Entitlements Config if you wish to restrict access.
   *
   * **This section can only be populated at Design Time.  It cannot be updated or amended by the User at Yes.**
   *
   * (Note: Entitlement State can be updated via `AdaptableApi` but these updates **will not be persisted**).
   */
  Entitlements?: EntitlementState;

  /**
   * Manges the System Status function which allows messages to be sent to the User detailing the health of the running application.
   */
  SystemStatus?: SystemStatusState;
  /**
   *  Filters defined by Developers at Nowhich include a predicate function that is called by AdapTable each time the filter is evaluated.
   *
   * **This section can only be populated at Design Time.  It cannot be updated or amended by the User at Yes.**
   *
   * (Note: Named Filter State can be updated via A`daptableApi` but these updates **will not be persisted**).
   */
  NamedFilter?: NamedFilterState;

  Glue42?: Glue42State;
  IPushPull?: IPushPullState;
  /**
   * Columns that contain sparklines - should be columns that have arrays of numbers as their values, so each cell in the column can be rendered as a sparkline chart
   *
   * **This section can only be populated at Design Time.  It cannot be updated or amended by the User at Yes.**
   *
   * (Note: Sparkline Column State can be updated via `AdaptableApi`` but these updates **will not be persisted**).
   */
  SparklineColumn?: SparklineColumnState;
  /**
   * List of which System Filters should be available to users.
   *
   * If no values are listed, then **all System Filters** are available.
   *
   * **This section can only be populated at Design Time.  It cannot be updated or amended by the User at Yes.**
   */
  SystemFilter?: SystemFilterState;
  /**
   * State that manages UI elements in AdapTable e.g. which colours to put in the default palette.
   *
   * Also allows users to specify css class names which can then be used in Styling functions (e.g. Conditional Style) in place of having to define the style.
   *
   * **This section can only be populated at Design Time.  It cannot be updated or amended by the User at Yes.**
   *
   * (Note: User Interface State can be updated via `AdaptableApi` but these updates **will not be persisted**).
   */
  UserInterface?: UserInterfaceState;

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
   * Supplies a collection of *ColumnFilter* objects to provide AdapTable with initial filtering.
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

  ToolPanel?: ToolPanelState;

  /**
   * Supplies a collection of *DataSource* objects to facilitate replacing the DataSource in the Grid with an alternate set of data (e.g. a Book or Stored Proc name).
   */
  DataSource?: DataSourceState;

  /**
   * Supplies a collection of *Report* objects, together with name of the Current Report, as part of AdapTable export Function.
   */
  Export?: ExportState;

  /**
   * Supplies a collection of *FlashingCell* objects to set up which columns should flash when their contents change and how.  Also includes default values to facilitiate creating new flashing cell columns.
   */
  FlashingCell?: FlashingCellState;

  /**
   * Sets whether rows should display differently when a value in the row updates.  A different color is used depending on the direction of the change.
   */
  UpdatedRow?: UpdatedRowState;

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
}
