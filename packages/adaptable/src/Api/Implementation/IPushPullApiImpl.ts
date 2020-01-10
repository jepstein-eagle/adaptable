import { ApiBase } from './ApiBase';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import * as IPushPullRedux from '../../Redux/ActionsReducers/IPushPullRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import {
  IPushPullState,
  IPushPullDomain,
  IPushPullReport,
} from '../../PredefinedConfig/IPushPullState';
import { IPushPullApi } from '../IPushPullApi';
import { LiveReport } from '../Events/LiveReportUpdated';
import LoggingHelper from '../../Utilities/Helpers/LoggingHelper';
import { StrategyParams } from '../../View/Components/SharedProps/StrategyViewPopupProps';
import Helper from '../../Utilities/Helpers/Helper';

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

  public getCurrentIPushPullReportName(): string {
    return this.getIPushPullState().CurrentIPushPullReport;
  }

  public getCurrentIPushPullReport(): IPushPullReport {
    let reportName: string = this.getCurrentIPushPullReportName();
    return this.getReportByName(reportName);
  }

  public getAllReports(): IPushPullReport[] {
    return this.getIPushPullState().IPushPullReports;
  }

  public getScheduledReports(): IPushPullReport[] {
    return this.getIPushPullState().IPushPullReports.filter(r => r.Report.AutoExport !== null);
  }

  public getIPushPullInstance(): any {
    let pushpullState = this.getIPushPullState();
    if (pushpullState != undefined) {
      return pushpullState.iPushPullInstance;
    } else {
      return pushpullState;
    }
  }

  public exportToIPushPull(iPushPullReportName: string): void {
    let iPushPullReport: IPushPullReport = this.getReportByName(iPushPullReportName);
    let isLiveReport = this.isIPushPullReportLive(iPushPullReport);
    if (this.checkItemExists(iPushPullReport, iPushPullReportName, 'IPushPull Report')) {
      this.dispatchAction(IPushPullRedux.IPushPullExport(iPushPullReport, isLiveReport));
    }
  }

  public isIPushPullReportLive(iPushPullReport: IPushPullReport): boolean {
    if (!iPushPullReport) {
      return false;
    }
    let liveReports: LiveReport[] = this.adaptable.api.internalApi.getLiveReports();
    let currentLiveReport = liveReports.find(lr => lr.Report.Name == iPushPullReport.Report.Name);
    return Helper.objectExists(currentLiveReport);
  }

  public isIPushPullAvailable(): boolean {
    return this.getAdaptableState().Grid.IsIPushPullAvailable;
  }

  public getIPushPullDomainsPages(): IPushPullDomain[] {
    return this.getAdaptableState().System.IPushPullDomainsPages;
  }

  public getIPushPullThrottleTime(): number | undefined {
    return this.getIPushPullState().ThrottleTime;
  }

  public setIPushPullThrottleTime(throttleTime: number): void {
    this.dispatchAction(IPushPullRedux.IPushPullSetThrottleTime(throttleTime));
  }

  public getReportByName(reportName: string): IPushPullReport {
    let report: IPushPullReport = this.getAllReports().find(r => r.Report.Name == reportName);
    return report;
  }

  public setIPushPullDomains(iPushPullDomains: IPushPullDomain[]): void {
    this.dispatchAction(SystemRedux.SetIPushPullDomainsPages(iPushPullDomains));
  }

  public showIPushPullPopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.IPushPullStrategyId,
      ScreenPopups.IPushPullPopup
    );
  }

  public showIPushPullLogin(): void {
    // need this/
    let params: StrategyParams = {
      // value: ,
      source: 'Other',
    };

    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.IPushPullStrategyId,
      'IPushPullLogin',
      params,
      { footer: false }
    );
  }

  public async loginToIPushPull(userName: string, password: string): Promise<void> {
    await this.adaptable.PushPullService.login(userName, password);
    const domainpages: IPushPullDomain[] = await this.adaptable.PushPullService.getDomainPages();
    this.setIPushPullDomains(domainpages);
    this.adaptable.api.internalApi.setIPushPullAvailableOn();
    this.adaptable.api.internalApi.hidePopupScreen();
  }
}
