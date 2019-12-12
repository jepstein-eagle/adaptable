import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import * as GridRedux from '../../Redux/ActionsReducers/GridRedux';
import { ApiBase } from './ApiBase';
import { InternalApi } from '../InternalApi';
import { IUIConfirmation, AdaptableAlert } from '../../Utilities/Interface/IMessage';
import { ExportDestination } from '../../PredefinedConfig/Common/Enums';
import { ILiveReport } from '../../Utilities/Interface/Reports/ILiveReport';
import { Report } from '../../PredefinedConfig/ExportState';
import { SystemState } from '../../PredefinedConfig/SystemState';
import { Calendar } from '../../PredefinedConfig/CalendarState';
import { ChartData } from '../../PredefinedConfig/ChartState';
import { ChartVisibility } from '../../PredefinedConfig/Common/ChartEnums';
import { Action } from 'redux';
import { StrategyParams } from '../../View/Components/SharedProps/StrategyViewPopupProps';
import { AdaptableBlotterColumn } from '../../PredefinedConfig/Common/AdaptableBlotterColumn';
import { AdaptableBlotterMenuItem } from '../../PredefinedConfig/Common/Menu';
import { SelectedCellInfo } from '../../Utilities/Interface/Selection/SelectedCellInfo';
import { SelectedRowInfo } from '../../Utilities/Interface/Selection/SelectedRowInfo';
import { ColumnSort } from '../../PredefinedConfig/LayoutState';
import { UpdatedRowInfo, ChangeDirection } from '../../Utilities/Services/Interface/IDataService';
import Helper from '../../Utilities/Helpers/Helper';
import BlotterHelper from '../../Utilities/Helpers/BlotterHelper';
import {
  PartnerConnectivityChangedInfo,
  PartnerConnectivityChangedEventArgs,
} from '../Events/BlotterEvents';

export class InternalApiImpl extends ApiBase implements InternalApi {
  // System Redux Actions
  public startLiveReport(
    report: Report,
    workbookName: string,
    exportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull
  ): void {
    this.dispatchAction(SystemRedux.ReportStartLive(report, workbookName, exportDestination));
  }

  public getSystemState(): SystemState {
    return this.getBlotterState().System;
  }

  public getAvailableCalendars(): Calendar[] {
    return this.getSystemState().AvailableCalendars;
  }

  public setChartData(chartData: ChartData): void {
    this.dispatchAction(SystemRedux.ChartSetChartData(chartData));
  }

  public setChartVisibility(chartVisbility: ChartVisibility): void {
    this.dispatchAction(SystemRedux.ChartSetChartVisibility(chartVisbility));
  }

  public getSystemReports(): Report[] {
    return this.getSystemState().SystemReports;
  }

  public getLiveReports(): ILiveReport[] {
    return this.getSystemState().CurrentLiveReports;
  }

  public getAdaptableAlerts(): AdaptableAlert[] {
    return this.getSystemState().AdaptableAlerts;
  }

  // Popup Redux Actions
  public showPopupConfirmation(confirmation: IUIConfirmation): void {
    this.dispatchAction(PopupRedux.PopupShowConfirmation(confirmation));
  }

  public showLoadingScreen(): void {
    this.dispatchAction(PopupRedux.PopupShowLoading());
  }

  public hideLoadingScreen(): void {
    this.dispatchAction(PopupRedux.PopupHideLoading());
  }

  public showPopupScreen(
    strategyId: string,
    componentName: string,
    popupParams?: StrategyParams
  ): void {
    this.dispatchAction(PopupRedux.PopupShowScreen(strategyId, componentName, popupParams));
  }

  public setColumns(columns: AdaptableBlotterColumn[]): void {
    this.dispatchAction(GridRedux.GridSetColumns(columns));
  }

  public setMainMenuItems(menuItems: AdaptableBlotterMenuItem[]): void {
    this.dispatchAction(GridRedux.SetMainMenuItems(menuItems));
  }

  public setSelectedCells(selectedCellInfo: SelectedCellInfo): void {
    this.dispatchAction(GridRedux.GridSetSelectedCells(selectedCellInfo));
  }

  public setSelectedRows(selectedRowInfo: SelectedRowInfo): void {
    this.dispatchAction(GridRedux.GridSetSelectedRows(selectedRowInfo));
  }

  public showQuickFilterBar(): void {
    this.dispatchAction(GridRedux.QuickFilterBarShow());
  }

  public setGlue42On(): void {
    // fire partner connectivity changed event...
    let partnerConnectivityChangedInfo: PartnerConnectivityChangedInfo = {
      isConnected: true,
      partner: 'Glue42',
      params: null,
    };
    const partnerConnectivityChangedEventArgs: PartnerConnectivityChangedEventArgs = BlotterHelper.createFDC3Message(
      'Partner Created Args',
      partnerConnectivityChangedInfo
    );

    this.blotter.api.eventApi.emit(
      'PartnerConnectivityChanged',
      partnerConnectivityChangedEventArgs
    );
    this.dispatchAction(GridRedux.SetGlue42On());
  }

  public setGlue42Off(): void {
    // fire partner connectivity changed event...
    let partnerConnectivityChangedInfo: PartnerConnectivityChangedInfo = {
      isConnected: false,
      partner: 'Glue42',
      params: null,
    };
    const partnerConnectivityChangedEventArgs: PartnerConnectivityChangedEventArgs = BlotterHelper.createFDC3Message(
      'Partner Created Args',
      partnerConnectivityChangedInfo
    );
    this.blotter.api.eventApi.emit(
      'PartnerConnectivityChanged',
      partnerConnectivityChangedEventArgs
    );

    this.dispatchAction(GridRedux.SetGlue42Off());
  }

  public setIPushPullOn(): void {
    // fire partner connectivity changed event...
    let partnerConnectivityChangedInfo: PartnerConnectivityChangedInfo = {
      isConnected: true,
      partner: 'iPushPull',
      params: {
        CurrentLiveReports: this.blotter.api.partnerApi.getCurrentLiveReports,
        DomainsPages: this.blotter.api.partnerApi.getIPushPullDomainsPages,
      },
    };
    const partnerConnectivityChangedEventArgs: PartnerConnectivityChangedEventArgs = BlotterHelper.createFDC3Message(
      'Partner Created Args',
      partnerConnectivityChangedInfo
    );

    this.blotter.api.eventApi.emit(
      'PartnerConnectivityChanged',
      partnerConnectivityChangedEventArgs
    );
    this.dispatchAction(GridRedux.SetIPushPullOn());
  }

  public setIPushPullOff(): void {
    // fire partner connectivity changed event...
    let partnerConnectivityChangedInfo: PartnerConnectivityChangedInfo = {
      isConnected: false,
      partner: 'iPushPull',
      params: null,
    };
    const partnerConnectivityChangedEventArgs: PartnerConnectivityChangedEventArgs = BlotterHelper.createFDC3Message(
      'Partner Created Args',
      partnerConnectivityChangedInfo
    );
    this.blotter.api.eventApi.emit(
      'PartnerConnectivityChanged',
      partnerConnectivityChangedEventArgs
    );
    this.dispatchAction(GridRedux.SetIPushPullOff());
  }

  public setPivotModeOn(): void {
    this.dispatchAction(GridRedux.SetPivotModeOn());
  }

  public setPivotModeOff(): void {
    this.dispatchAction(GridRedux.SetPivotModeOff());
  }

  public isGridInPivotMode(): boolean {
    return this.getBlotterState().Grid.IsGridInPivotMode;
  }

  public addAdaptableBlotterColumn(adaptableBlotterColumn: AdaptableBlotterColumn): void {
    this.dispatchAction(GridRedux.GridAddColumn(adaptableBlotterColumn));
  }

  public setColumnSorts(columnSorts: ColumnSort[]): void {
    this.dispatchAction(GridRedux.GridSetSort(columnSorts));
  }

  public getUpdatedRowInfos(): any[] {
    return this.getSystemState().UpdatedRowInfos;
  }

  public isRowInUpdatedRowInfo(primaryKeyValue: any, changeDirection: ChangeDirection): boolean {
    let foundUpdatedRowInfo: UpdatedRowInfo = this.getSystemState().UpdatedRowInfos.find(
      uri => uri.primaryKeyValue == primaryKeyValue && uri.changeDirection == changeDirection
    );
    return Helper.objectExists(foundUpdatedRowInfo);
  }

  // General way to get to store from inside the Blotter...
  public dispatchReduxAction(action: Action): void {
    this.dispatchAction(action);
  }
}
