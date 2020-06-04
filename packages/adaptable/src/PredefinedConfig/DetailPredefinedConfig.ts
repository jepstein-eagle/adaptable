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
import { ColumnFilterState } from './ColumnFilterState';
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
import { GradientColumnState } from './GradientColumnState';

/**
 * This is the main Predefined Config interface which developers will populate at design-time.
 *
 * Typically you will want to "pre-populate" your deployed application with predefined config - the initial state that AdapTable will use when it first loads up.
 *
 * This ensures that users wont see an empty AdapTable instance but, rather, one full of reports, searches, conditional styles etc that allow them to be productive immediately.
 *
 * --------------
 *
 *  **Further AdapTable Help Resources**
 *
 * [Demo Site](https://demo.adaptabletools.com/adaptablestate) | [Adaptable State ReadMe](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/guides/adaptable-state-guide.md)
 *
 *  --------------
 *
 *
 * Predefined Config consists of a series of (nullable) properties that themselves each implement [*Config State*](_src_predefinedconfig_configstate_.configstate.html).
 *
 * > Users only need to provide config for those properties which they want intial state, and within each object every object is nullable (with default values) so only those elements which differ from the default implementation need to be provided.
 *
 * The State items in Predefined Config can be conceptually be put into 2 categories:
 *
 * - **Design-Time**: Cannot be overriden & saved by users (e.g. Menus, Entitlements etc.)
 *
 * - **Run-Time**: Can be overriden & saved by user's actions (and persisted through State Management)
 *
 * If you don't want your users to edit the Adaptable Objects that you ship in PredefinedConfig, then set the [Entitlement](_src_predefinedconfig_entitlementstate_.entitlementstate.html) for that function to be `ReadOnly`.
 *
 * This object when populated forms the [predefinedConfig](_src_adaptableoptions_adaptableoptions_.adaptableoptions.html#predefinedconfig) property in *adaptableOptions*.  It can be passed in either as pure JSON or as a url to a file which contains the JSON.
 *
 * > Although you can construct all your config by hand, its often easier when building more "complex" items like Queries to create them in the GUI at design time and then copy and paste the resulting state into your config file.
 *
 * --------------
 *
 * ### Functions
 *
 * Many objects in AdapTable (e.g Custom Sorts, User Menus, Action Columns etc.) include 'functions' that developers can provide when it makes sense to use a custom implementation rather than one provided by AdapTable.
 *
 * But this provides a problem for Predefined Config, because it is stored as JSON which means it can only contain elements which can be 'stringified' (and that excludes functions).
 *
 * The solution is that Predefined Config contains a **named reference** to the function but the **actual implementation is elsewhere** (in the [`UserFunctions`](../../modules/_src_adaptableoptions_userfunctions_.html) section of AdaptableOptions).
 *
 * --------------
 *
 * ### Revision Property
 *
 * The concept behind Predefined Config is that it provides - at design-time - the objects, entitlements and theme for initial use of the Application.
 *
 * It is read once and merged into the user's Adaptable State, and then any run-time changes which users make will form part of their State and be continually updated.
 *
 * But sometimes developers might want to update a section in Predefined Config while ensuring that the rest of the user's State remains untouched.
 *
 * This can be accomplished through the [`Revision`](_src_predefinedconfig_configstate_.configstate.html#revision) property in [Config State](_src_predefinedconfig_configstate_.configstate.html) (the base interface for all User State sections).
 *
 * Simply put: if you increment (or provide from new) the revision number in a section of Predefined Config, AdapTable will replace that section (but only that section) in the user's State with the new Config.
 *
 * > This is, currently, **replace only**, so you cannot use Revisions to merge a new Layout section in Predefined Config with the user's Layouts in State.
 *
 * > But you can, for example, provide a new `CustomSort` section in Predefined Config which will replace the user's Custom Sorts in State while keeping their Layouts and other state elements untouched (see example below).
 *
 * ```ts
 * export default {
 *  .....
 *   CustomSort: {
 *     Revision: 2, // This section will replace the Custom Sort section in User State if the Revision Number is greater than the one currently in User State
 *     CustomSorts: [
 *     {
 *       ColumnId: 'Rating',
 *       SortedValues: ['AAA', 'AA+', 'AA', 'AA-'], // etc.
 *     },
 *     {
 *        ColumnId: 'Country',
 *        CustomSortComparerFunction: 'country',
 *      },
 *     {
 *        ColumnId: 'currency',
 *        CustomSortComparerFunction: 'currency',
 *      },
 *   ],
 *   },
 *  .....
 * } as PredefinedConfig;
 * ```
 *
 * --------------
 *
 * ### AdaptableObject
 *
 * Most objects in PredefinedConfig implement the [`AdaptableObject`](_src_predefinedconfig_common_adaptableobject_.adaptableobject.html) interface.
 *
 * This has a single [`Uuid`](_src_predefinedconfig_common_adaptableobject_.adaptableobject.html#uuid) property which is used for easy identification of objects and to make it easy for AdapTable instances to share state and inform each other when an item has been created / edited / deleted..
 *
 * This is included by AdapTable in all base objects and also frequently used objects like Expressions.
 *
 * **Do not set this property** when writing objects in your Predefined Config as it will be set by AdapTable at run-tine when the config is first read
 *
 * --------------
 *
 * ### Bespoke State
 *
 * The Application State property of Predefined Config contains an [ApplicationDataEntries](_src_predefinedconfig_applicationstate_.applicationstate.html) array.
 *
 * This is essentially a set of key / value pairs that you can populate with any data that you want and which AdapTable will store in its state.
 *
 * --------------
 *
 *  ### Predefined Config Contents
 *
 *  | State Property 	                                                                        | Saveable            | Details                                     	                |
 *  |----------------	                                                                        |-------------------	|---------------------------------------------	                |
 *  | [ActionColumn](_src_predefinedconfig_actioncolumnstate_.actioncolumnstate.html)   	        | No	                | Create dynamic columns with Buttons that fire events 	        |
 *  | [AdvancedSearch](_src_predefinedconfig_advancedsearchstate_.advancedsearchstate.html)   	  | Yes 	              | Create saveable multi-column searches with multiple criteria  |
 *  | [Alert](_src_predefinedconfig_alertstate_.alertstate.html)   	                              | Yes 	              | Provide Alert Definitions which will trigger run-time alerts  |
 *  | [Application](_src_predefinedconfig_applicationstate_.applicationstate.html)   	            | No	                | Save your own state as key / value pairs 	                    |
 *  | [BulkUpdate](_src_predefinedconfig__bulkupdatestate_.bulkupdatestate.html)   	              | Yes 	              | Update multiple cells in a column to contain a new value      |
 *  | [CalculatedColumn](_src_predefinedconfig_calculatedcolumnstate_.calculatedcolumn.html)   	  | Yes 	              | Create custom columns with dynamic values based on expression |
 *  | [Calendar](_src_predefinedconfig_calendarstate_.calendar.html)   	                          | Yes 	              | Select or provide your own calendar for dealing with holidays |
 *  | [CellSummary](_src_predefinedconfig_cellsummarystate_.cellsummarystate.html)   	            | Yes 	              | Choose which summary operations to see for selected cells     |
 *  | [CellValidation](_src_predefinedconfig_cellvalidationstate_.cellvalidationstate.html)     	| Yes 	              | Provide (complex) rules to validate cell edits                |
 *  | [ColumnCategory](_src_predefinedconfig_columncategorystate_.columncategorystate.html)       | Yes     	          | Group columns into category for easier column management      |
 *  | [ColumnFilter](_src_predefinedconfig_columnfilterstate_.columnfilterstate.html)             | Yes 	              | Supply your own filters for columns to findy your data easily |
 *  | [ConditionalStyle](_src_predefinedconfig_conditionalstylestate_.conditionalstylestate.html) | Yes 	              | Dynamically Style columns & rows according to rules provided  |
 *  | [CustomSort](_src_predefinedconfig_customsortstate_.customsortstate.html)                   | Yes 	              | Build your own sort orders for columns with non-standard sorts|
 *  | [Dashboard](_src_predefinedconfig_dashboardstate_.dashboardstate.html)                      | Yes 	              | Configure & populate the Dasboard area (abov the main grid)   |
 *  | [DataSource](_src_predefinedconfig_datasourcestate.datasourcestate.html)                    | Yes 	              | Provide Data Sources that will populate Grid via the server   |
 *  | [Entitlements](_src_predefinedconfig_entitlementstate_.entitlementstate.html)               | No	                | Manage permissions so users only see relevant functions       |
 *  | [Export](_src_predefinedconfig_exportstate_.exportstate.html)                               | Yes 	              | Create reports to export data from grid to numerous loctions  |
 *  | [FlashingCell](_src_predefinedconfig_flashingcellstate_.flashingcellstate.html)             | Yes 	              | Specify how cells will briefly flash as their values change   |
 *  | [FormatColumn](_src_predefinedconfig_formatcolumnstate_.formatcolumnstate.html)             | Yes 	              | Style a column so it always has a particular set of colours   |
 *  | [FreeTextColumn](_src_predefinedconfig_freetextcolumnstate_.freetextcolumnstate.html)       | Yes 	              | Special free entry columns (e.g. Comments) saved with state   |
 *  | [GradientColumn](_src_predefinedconfig_gradientcolumnstate_.gradientcolumnstate.html)       | Yes 	              | Style columns so that back colour is in ratio to cell contents|
 *  | [Layout](_src_predefinedconfig_layoutstate_.layoutstate.html)                               | Yes 	              | Named views of column sorts, order, pivots, visbility & groups|
 *  | [NamedFilter](_src_predefinedconfig_namedfilterstate_.namedfilterstate.html)                | No                  | Bespoke filters for which you provide a predicate function    |
 *  | [PercentBar](_src_predefinedconfig_percentbarstate_.percentbarstate.html)                   | Yes 	              | Columns which display a bar that is filled based on cell value|
 *  | [PlusMinus](interfaces/_predefinedconfig_plusminusstate_.plusminusstate.html)               | Yes 	              | Specify how cells will nudge when '+' and '-' keys are pressed|
 *  | [QuickSearch](_src_predefinedconfig_quicksearchstate_.quicksearchstate.html)                | Yes 	              | Run a text based search across whole grid (using wildcards)   |
 *  | [Reminder](_src_predefinedconfig_reminderstate_.reminder.html)                              | Yes 	              | Schedule alerts to run to remind you of actions to perform    |
 *  | [Shortcut](_src_predefinedconfig_shortcutstate_.shortcutstate.html)                         | Yes 	              | Avoid fat finger issues by creating keyboard shortcuts        |
 *  | [SmartEdit](_src_predefinedconfig_smarteditstate_.smarteditstate.html)                      | Yes 	              | Update multiple numeric cells with a single maths operation   |
 *  | [SystemFilter](_src_predefinedconfig_systemfilterstate_.systemfilterstate.html)             | No                  | Select availability of System Filters (e.g. Today, Blanks)    |
 *  | [SystemStatus](_src_predefinedconfig_systemstatusstate_.systemstatusstate.html)             | No                  | Show Messages and Alerts describing curent Status of the App  |
 *  | [Theme](_src_predefinedconfig_themestate_.themestate.html)                                  | Yes                 | Select with shipped Theme is used or provide a custom one     |
 *  | [ToolPanel](_src_predefinedconfig_toolpanelstate_.toolpanelstate.html)                      | Yes                 | Manage AdapTable ToolPanel (the area to the right of grid)  |
 *  | [UpdatedRow](_src_predefinedconfig_updatedrowstate_.updatedrowstate.html)                   | Yes                 | Colour (and jump to) rows whose contents have changed         |
 *  | [UserFilter](_src_predefinedconfig_userfilterstate_.userfilterstate.html)                   | Yes                 | Create your own filters baseed on your data and requirements  |
 *  | [UserInterface](_src_predefinedconfig_userinterfacestate_.userinterfacestate.html)          | No                  | Provide your own menus, styles and colour palettes            |
 *
 *
 * --------------
 *
 *  ### Predefined Config Contents (plugins)
 *
 *  | State Property 	                                                                            | Plugin              | Details                                     	                |
 *  |----------------	                                                                            |-------------------	|---------------------------------------------	                |
 *  | [Chart](_src_predefinedconfig_chartstate_.chartstate.html)   	                              | Chart 	            | Visualise grid data using a variety of different chart types  |
 *  | [SparklineColumn](_src_predefinedconfig_sparklinecolumnstate_.sparklinecolumnstate.html)    | Chart               | See columns containing ranges of data as a sparkline          |
 *  | [Glue42](_src_predefinedconfig_glue42state_.glue42state.html)                               | Glue42 	            | Specify how to send live 2-way data to / from excel via Glue42|
 *  | [ipushpull](_src_predefinedconfig_ipushpullstate_.ipushpullstate.html)                      | ipushpull 	        | Specify how to send live data to ipushpull (and Symphony)     |
 *
 * --------------
 *
 * ### Predefined Config Example
 *
 * ```ts
 * export default {
 *  Dashboard: {
 *    Tabs: [
 *          {
 *            Name: 'Search',
 *            Toolbars: ['QuickSearch', 'DataSource', 'AdvancedSearch'],
 *          },
 *          {
 *            Name: 'Edit',
 *            Toolbars: ['BulkUpdate','SmartEdit'],
 *          },
 *          {
 *            Name: 'Grid',
 *            Toolbars: ['Layout', 'CellSummary', 'SystemStatus', 'appToolbar']
 *          },
 *     ],
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
export interface DetailPredefinedConfig {
  Dashboard?: DashboardState;
  FormatColumn?: FormatColumnState;
}
