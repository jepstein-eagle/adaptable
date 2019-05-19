import { ISharedEntity } from '../../../Utilities/Interface/ISharedEntity';
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { IEntitlement } from '../../../Utilities/Interface/IEntitlement';
import { IGridSort } from '../../../Utilities/Interface/IGridSort';
import { IStyle } from '../../../Utilities/Interface/IStyle';
import { IPermittedColumnValues } from '../../../Utilities/Interface/IPermittedColumnValues';
import { ISystemStatus } from '../../../Utilities/Interface/ISystemStatus';
import { IColumnCategory } from '../../../Utilities/Interface/BlotterObjects/IColumnCategory';
import { IFormatColumn } from '../../../Utilities/Interface/BlotterObjects/IFormatColumn';
import { ILayout } from '../../../Utilities/Interface/BlotterObjects/ILayout';
import { IPlusMinusRule } from '../../../Utilities/Interface/BlotterObjects/IPlusMinusRule';
import { IShortcut } from '../../../Utilities/Interface/BlotterObjects/IShortcut';
import { IUserFilter } from '../../../Utilities/Interface/BlotterObjects/IUserFilter';
import { IUserTheme } from '../../../Utilities/Interface/BlotterObjects/IUserTheme';
import { IPercentBar } from '../../../Utilities/Interface/BlotterObjects/IPercentBar';
import { IFreeTextColumn } from '../../../Utilities/Interface/BlotterObjects/IFreeTextColumn';
import { IReport } from '../../../Utilities/Interface/BlotterObjects/IReport';
import { IFlashingCell } from '../../../Utilities/Interface/BlotterObjects/IFlashingCell';
import { ICustomSort } from '../../../Utilities/Interface/BlotterObjects/ICustomSort';
import { IConditionalStyle } from '../../../Utilities/Interface/BlotterObjects/IConditionalStyle';
import { IColumnFilter } from '../../../Utilities/Interface/BlotterObjects/IColumnFilter';
import { ICellValidationRule } from '../../../Utilities/Interface/BlotterObjects/ICellValidationRule';
import { ICalendar } from '../../../Utilities/Interface/BlotterObjects/ICalendar';
import { ICalculatedColumn } from '../../../Utilities/Interface/BlotterObjects/ICalculatedColumn';
import { IAdvancedSearch } from '../../../Utilities/Interface/BlotterObjects/IAdvancedSearch';
import { IChartDefinition } from '../../../Utilities/Interface/BlotterObjects/Charting/IChartDefinition';
import { IChartData } from '../../../Utilities/Interface/BlotterObjects/Charting/IChartData';
import { IAlertDefinition } from '../../../Utilities/Interface/BlotterObjects/IAlertDefinition';
import { IPPDomain } from '../../../Utilities/Interface/Reports/IPPDomain';
import { ILiveReport } from '../../../Utilities/Interface/Reports/ILiveReport';
import { ISelectedCellInfo } from '../../../Utilities/Interface/SelectedCell/ISelectedCellInfo';
import { ICellSummmary } from '../../../Utilities/Interface/SelectedCell/ICellSummmary';
import { IPreviewInfo } from '../../../Utilities/Interface/IPreview';
import { IMenuItem, IContextMenu } from '../../../Utilities/Interface/IMenu';
import {
  IScreenPopup,
  IAlertPopup,
  IConfirmationPopup,
  IPromptPopup,
  ILoadingPopup,
  IAboutPopup,
  IAdaptableAlert,
} from '../../../Utilities/Interface/IMessage';
import { ChartVisibility } from '../../../Utilities/ChartEnums';
import { IReminder } from '../../../Utilities/Interface/BlotterObjects/IReminder';
import { IDataSource } from '../../../Utilities/Interface/BlotterObjects/IDataSource';
import { IRange } from '../../../Utilities/Interface/Expression/IRange';
import { Expression } from '../../../Utilities/Expression';

// Base interface
export interface IState {}

/**
 * Interface for System related State elements
 * This is created by the system at run-time and NOT part of predefined or user config.
 * Therefore it is not saved nor included in State events

 */
export interface ISystemState extends IState {}

// Interface for State elements which are provided at Design time and never modified in the Blotter
export interface IDesignTimeState extends IState {}

// Interface for State elements which the User is able to modify during the lifetime of the application
export interface IUserState extends IState {}

export interface SystemState extends ISystemState {
  SystemStatus: ISystemStatus;
  Alerts: IAdaptableAlert[];
  AvailableCalendars: ICalendar[];
  CurrentLiveReports: ILiveReport[];
  IsValidSmartEditSelection: boolean;
  SmartEditPreviewInfo: IPreviewInfo;
  IsValidBulkUpdateSelection: boolean;
  BulkUpdatePreviewInfo: IPreviewInfo;
  ChartData: IChartData;
  ChartVisibility: ChartVisibility;
  CalculatedColumnErrorMessage: string;
  IPPDomainsPages: IPPDomain[];
  SystemReports: IReport[];
  ReportErrorMessage: string;
  QuickSearchRange: IRange;
  QuickSearchVisibleColumnExpressions: Expression[];
}

export interface GridState extends ISystemState {
  Columns: IColumn[];
  GridSorts: IGridSort[];
  SelectedCellInfo: ISelectedCellInfo;
  CellSummary: ICellSummmary;
  IsFloatingFilterActive: boolean;
}

export interface MenuState extends ISystemState {
  MenuItems: IMenuItem[];
  ContextMenu: IContextMenu;
}

export interface PopupState extends ISystemState {
  ScreenPopup: IScreenPopup;
  AlertPopup: IAlertPopup;
  ConfirmationPopup: IConfirmationPopup;
  PromptPopup: IPromptPopup;
  LoadingPopup: ILoadingPopup;
  AboutPopup: IAboutPopup;
}

export interface TeamSharingState extends ISystemState {
  Activated: boolean;
  SharedEntities: ISharedEntity[];
}

export interface HomeState extends ISystemState {}

/*
Predefined Config Only 
This can be set by users in Predefined Config at design-time but never editable by users at runtime
Therefore it is not saved nor included in State events
*/
export interface EntitlementsState extends IDesignTimeState {
  FunctionEntitlements: IEntitlement[];
}

export interface UserInterfaceState extends IDesignTimeState {
  ColorPalette: string[];
  StyleClassNames: string[];
  PermittedColumnValues: IPermittedColumnValues[];
}

export interface SystemFilterState extends IDesignTimeState {
  SystemFilters: string[];
}

export interface ApplicationState extends IDesignTimeState {}

/* 
Full Config 
Can bet set at design time and also editable at run time by users 
*/
export interface AdvancedSearchState extends IUserState {
  AdvancedSearches: IAdvancedSearch[];
  CurrentAdvancedSearch: string;
}

export interface AlertState extends IUserState {
  AlertDefinitions: IAlertDefinition[];
  MaxAlertsInStore: number;
  AlertPopupDiv: string;
}

export interface BulkUpdateState extends IUserState {
  BulkUpdateValue: string;
}

export interface CalculatedColumnState extends IUserState {
  CalculatedColumns: ICalculatedColumn[];
}

export interface CalendarState extends IUserState {
  CurrentCalendar: string;
}

export interface CellSummaryState extends IUserState {
  SummaryOperation:
    | 'Sum'
    | 'Average'
    | 'Mode'
    | 'Median'
    | 'Distinct'
    | 'Max'
    | 'Min'
    | 'Count'
    | 'VWap'
    | 'Only';
  OptionalSummaryOperations: string[]; // for now just 'VWaP' and 'Only' are available
}

export interface CellValidationState extends IUserState {
  CellValidations: ICellValidationRule[];
}

export interface ChartState extends IUserState {
  ChartDefinitions: IChartDefinition[];
  CurrentChartName: string; // this will change as we might show more than one?
  RefreshRate: number;
}

export interface ColumnCategoryState extends IUserState {
  ColumnCategories: IColumnCategory[];
}

export interface ColumnFilterState extends IUserState {
  ColumnFilters: IColumnFilter[];
}

export interface ConditionalStyleState extends IUserState {
  ConditionalStyles: IConditionalStyle[];
}

export interface CustomSortState extends IUserState {
  CustomSorts: ICustomSort[];
}

export interface DashboardState extends IUserState {
  AvailableToolbars: string[];
  VisibleToolbars: string[];
  VisibleButtons: string[];
  Zoom: number;
  DashboardVisibility: 'Minimised' | 'Visible' | 'Hidden';
  ShowSystemStatusButton: boolean;
  ShowAboutButton: boolean;
  ShowFunctionsDropdown: boolean;
  ShowColumnsDropdown: boolean;
  ShowToolbarsDropdown: boolean;
  HomeToolbarTitle: string;
  ApplicationToolbarTitle: string;
  UseSingleColourForButtons: boolean;
  UseExtraSmallButtons: boolean;
}

export interface DataSourceState extends IUserState {
  DataSources: IDataSource[];
  CurrentDataSource: string;
}

export interface ExportState extends IUserState {
  CurrentReport: string;
  Reports: IReport[];
}

export interface FlashingCellState extends IUserState {
  FlashingCells: IFlashingCell[];
  DefaultUpColor?: string;
  DefautDownColor?: string;
  DefaultDuration?: 250 | 500 | 750 | 1000;
}

export interface FormatColumnState extends IUserState {
  FormatColumns: IFormatColumn[];
}

export interface FreeTextColumnState extends IUserState {
  FreeTextColumns: IFreeTextColumn[];
}

export interface LayoutState extends IUserState {
  CurrentLayout: string;
  Layouts: ILayout[];
}

export interface PercentBarState extends IUserState {
  PercentBars: IPercentBar[];
}

export interface PlusMinusState extends IUserState {
  PlusMinusRules: IPlusMinusRule[];
}

export interface QuickSearchState extends IUserState {
  QuickSearchText: string;
  DisplayAction: 'HighlightCell' | 'ShowRow' | 'ShowRowAndHighlightCell';
  Style: IStyle;
}

export interface ReminderState extends IUserState {
  Reminders: IReminder[];
}

export interface ShortcutState extends IUserState {
  Shortcuts: IShortcut[];
}

export interface SmartEditState extends IUserState {
  SmartEditValue: number;
  MathOperation: 'Add' | 'Subtract' | 'Multiply' | 'Divide';
}

export interface ThemeState extends IUserState {
  CurrentTheme: string;
  SystemThemes: string[];
  UserThemes: IUserTheme[];
}

export interface UserFilterState extends IUserState {
  UserFilters: IUserFilter[];
}
