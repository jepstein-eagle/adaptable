import { ApiBase } from './ApiBase';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import * as IPushPullRedux from '../../Redux/ActionsReducers/IPushPullRedux';
import {
  IPushPullState,
  IPushPullDomain,
  IPushPullReport,
  IPushPullSchedule,
} from '../../PredefinedConfig/IPushPullState';
import { IPushPullApi } from '../IPushPullApi';
import ArrayExtensions from '../../Utilities/Extensions/ArrayExtensions';
import { ExportDestination, LiveReportTrigger } from '../../PredefinedConfig/Common/Enums';

export class IPushPullApiImpl extends ApiBase implements IPushPullApi {
  public getIPushPullState(): IPushPullState | undefined {
    return this.getAdaptableState().IPushPull;
  }
  public getIPushPullUsername(): string | undefined {
    return this.getIPushPullState().Username;
  }
  public getIPushPullPassword(): string | undefined {
    return this.getIPushPullState().Password;
  }

  public getSelectedIPushPullReportName(): string | undefined {
    return this.getIPushPullState().SelectedIPushPullReportName;
  }

  public getCurrentLiveIPushPullReport(): IPushPullReport | undefined {
    return this.getIPushPullState().CurrentLiveIPushPullReport;
  }

  public getIPushPullInstance(): any {
    let pushpullState = this.getIPushPullState();
    if (pushpullState != undefined) {
      return pushpullState.iPushPullInstance;
    } else {
      return pushpullState;
    }
  }

  public sendSnapshot(iPushPullReport: IPushPullReport): void {
    if (this.checkItemExists(iPushPullReport, iPushPullReport.ReportName, 'IPushPull Report')) {
      this.dispatchAction(IPushPullRedux.IPushPullSendSnapshot(iPushPullReport));
    }
  }

  public startLiveData(iPushPullReport: IPushPullReport): void {
    if (this.checkItemExists(iPushPullReport, iPushPullReport.ReportName, 'IPushPull Report')) {
      this.dispatchAction(IPushPullRedux.IPushPullLiveReportSet(iPushPullReport));

      this.adaptable.ReportService.PublishLiveReportUpdatedEvent(
        ExportDestination.iPushPull,
        LiveReportTrigger.ExportStarted
      );
      // set livereport on
      this.setIPushPullLiveDataRunningOn();
    }
  }

  public stopLiveData(): void {
    let currentLiveReport: IPushPullReport = this.getCurrentLiveIPushPullReport();

    this.adaptable.PushPullService.unloadPage(currentLiveReport.Page);

    // clear the live report
    this.dispatchAction(IPushPullRedux.IPushPullLiveReportClear());

    // fire the Live Report event for Export Stopped
    this.adaptable.ReportService.PublishLiveReportUpdatedEvent(
      ExportDestination.iPushPull,
      LiveReportTrigger.ExportStopped
    );
    // set live data running off
    this.setIPushPullLiveDataRunningOff();
  }

  public isIPushPullReportLive(iPushPullReport: IPushPullReport): boolean {
    if (!iPushPullReport) {
      return false;
    }
    return (
      this.getIPushPullState().CurrentLiveIPushPullReport != null &&
      this.getIPushPullState().CurrentLiveIPushPullReport == iPushPullReport
    );
  }

  public isIPushPullAvailable(): boolean {
    return this.getIPushPullState().IsIPushPullAvailable;
  }

  public getIPushPullDomains(): IPushPullDomain[] {
    return this.getIPushPullState().IPushPullDomainsPages;
  }

  public getPagesForIPushPullDomain(folderName: string): string[] {
    let returnArray: string[] = [];
    let iPushPullDomains: IPushPullDomain[] = this.getIPushPullDomains();
    if (ArrayExtensions.IsNotNullOrEmpty(iPushPullDomains)) {
      let iPushPullDomain: IPushPullDomain = iPushPullDomains.find(f => f.Name == folderName);
      if (iPushPullDomain) {
        returnArray = iPushPullDomain.Pages;
      }
    }
    return returnArray;
  }

  public setIPushPullLoginErrorMessage(loginErrorMessage: string): void {
    this.dispatchAction(IPushPullRedux.IPushPullSetLoginErrorMessage(loginErrorMessage));
  }

  public getFolderIdForName(folderName: string): number {
    let iPushPullDomains: IPushPullDomain[] = this.getIPushPullDomains();
    return iPushPullDomains.find(i => i.Name == folderName).FolderId;
  }

  public addNewIPushPullPage(folderName: string, pageName: string): void {
    let folderId: number = this.getFolderIdForName(folderName);
    this.adaptable.PushPullService.addNewPage(folderId, pageName);
  }

  public getIPushPullThrottleTime(): number | undefined {
    return this.getIPushPullState().ThrottleTime;
  }

  public setIPushPullThrottleTime(throttleTime: number): void {
    this.dispatchAction(IPushPullRedux.IPushPullSetThrottleTime(throttleTime));
  }

  public setIPushPullDomains(iPushPullDomains: IPushPullDomain[]): void {
    this.dispatchAction(IPushPullRedux.IPushPullSetDomainsPages(iPushPullDomains));
  }

  public getIPushPullSchedules(): IPushPullSchedule[] {
    return this.getIPushPullState().IPushPullSchedules;
  }

  public showIPushPullPopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.IPushPullStrategyId,
      ScreenPopups.IPushPullLoginPopup
    );
  }

  public setIPushPullAvailableOn(): void {
    this.dispatchAction(IPushPullRedux.SetIPushPullAvailableOn());
    this.adaptable.ReportService.PublishLiveReportUpdatedEvent(
      ExportDestination.iPushPull,
      LiveReportTrigger.Connected
    );
  }

  public setIPushPullAvailableOff(): void {
    this.dispatchAction(IPushPullRedux.SetIPushPullAvailableOff());
    this.adaptable.ReportService.PublishLiveReportUpdatedEvent(
      ExportDestination.iPushPull,
      LiveReportTrigger.Disconnected
    );
  }

  public setIPushPullLiveDataRunningOn(): void {
    this.dispatchAction(IPushPullRedux.SetIPushPullLiveDataRunningOn());
  }

  public setIPushPullLiveDataRunningOff(): void {
    this.dispatchAction(IPushPullRedux.SetIPushPullLiveDataRunningOff());
  }

  public isIPushPullLiveDataRunning(): boolean {
    return this.getIPushPullState().IsIPushPullLiveDataRunning;
  }

  public async loginToIPushPull(userName: string, password: string): Promise<void> {
    await this.adaptable.PushPullService.login(userName, password);
    const domainpages: IPushPullDomain[] = await this.adaptable.PushPullService.getDomainPages();
    this.setIPushPullDomains(domainpages);
    this.setIPushPullAvailableOn();
    this.adaptable.api.internalApi.hidePopupScreen();
    this.setIPushPullLoginErrorMessage('');
  }

  public logoutFromIPushPull(): void {
    this.setIPushPullDomains([]);
    this.setIPushPullAvailableOff();
    this.adaptable.api.internalApi.hidePopupScreen();
  }
}
