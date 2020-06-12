import { ApiBase } from '@adaptabletools/adaptable/src/Api/Implementation/ApiBase';
import * as StrategyConstants from '@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '@adaptabletools/adaptable/src/Utilities/Constants/ScreenPopups';
import * as IPushPullRedux from './Redux/ActionReducers/IPushPullRedux';
import { IPushPullPluginOptions } from './';
import {
  IPushPullDomain,
  IPushPullReport,
} from '@adaptabletools/adaptable/src/PredefinedConfig/SystemState';

import { IPushPullSchedule } from '@adaptabletools/adaptable/src/PredefinedConfig/IPushPullSchedule';
import { IPushPullApi } from '@adaptabletools/adaptable/src/Api/IPushPullApi';
import ArrayExtensions from '@adaptabletools/adaptable/src/Utilities/Extensions/ArrayExtensions';
import Helper from '@adaptabletools/adaptable/src/Utilities/Helpers/Helper';
import { IAdaptable } from '@adaptabletools/adaptable/types';

import { IPushPullService } from './Utilities/Services/Interface/IPushPullService';

export class IPushPullApiImpl extends ApiBase implements IPushPullApi {
  private ippInstance: any;
  private ippService: IPushPullService | null = null;

  private options: IPushPullPluginOptions;

  constructor(adaptable: IAdaptable, options: IPushPullPluginOptions) {
    super(adaptable);

    this.options = options;
  }

  public getIPushPullUsername(): string | undefined {
    return this.options.username;
  }
  public getIPushPullPassword(): string | undefined {
    return this.options.password;
  }

  public getAutoLogin(): boolean {
    return this.options.autoLogin ?? false;
  }

  public getCurrentLiveIPushPullReport(): IPushPullReport | undefined {
    return this.getAdaptableState().System.CurrentLiveIPushPullReport;
  }

  public setIPushPullInstance(ippInstance: any) {
    this.ippInstance = ippInstance;
  }

  public getIPushPullInstance(): any {
    return this.ippInstance;
  }

  public sendSnapshot(iPushPullReport: IPushPullReport): void {
    if (this.checkItemExists(iPushPullReport, iPushPullReport.ReportName, 'IPushPull Report')) {
      this.dispatchAction(IPushPullRedux.IPushPullSendSnapshot(iPushPullReport));
    }
  }

  public startLiveData(iPushPullReport: IPushPullReport): void {
    if (this.checkItemExists(iPushPullReport, iPushPullReport.ReportName, 'IPushPull Report')) {
      this.dispatchAction(IPushPullRedux.IPushPullLiveReportSet(iPushPullReport));

      this.adaptable.ReportService.PublishLiveLiveDataChangedEvent(
        'iPushPull',
        'LiveDataStarted',
        iPushPullReport
      );
    }
  }

  public stopLiveData(): void {
    let currentLiveReport: IPushPullReport | undefined = this.getCurrentLiveIPushPullReport();

    if (!currentLiveReport) {
      return;
    }

    this.getIPPService().unloadPage(currentLiveReport.Page);

    // clear the live report
    this.dispatchAction(IPushPullRedux.IPushPullLiveReportClear());

    // fire the Live Report event for Export Stopped
    this.adaptable.ReportService.PublishLiveLiveDataChangedEvent(
      'iPushPull',
      'LiveDataStopped',
      currentLiveReport
    );
  }

  public isIPushPullReportLive(iPushPullReport: IPushPullReport): boolean {
    if (!iPushPullReport) {
      return false;
    }
    const CurrentLiveIPushPullReport = this.getCurrentLiveIPushPullReport();
    return CurrentLiveIPushPullReport != null && CurrentLiveIPushPullReport == iPushPullReport;
  }

  public isIPushPullAvailable(): boolean {
    return true;
  }

  public isIPushPullRunning(): boolean | undefined {
    return this.getAdaptableState().System.IsIPushPullRunning;
  }

  public getIPushPullDomains(): IPushPullDomain[] {
    return this.getAdaptableState().System.IPushPullDomainsPages || [];
  }

  public getPagesForIPushPullDomain(folderName: string): string[] {
    let returnArray: string[] = [];
    let iPushPullDomains: IPushPullDomain[] = this.getIPushPullDomains();
    if (ArrayExtensions.IsNotNullOrEmpty(iPushPullDomains)) {
      let iPushPullDomain: IPushPullDomain | undefined = iPushPullDomains.find(
        f => f.Name == folderName
      );
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
    return iPushPullDomains.find(i => i.Name == folderName)!.FolderId;
  }

  public addNewIPushPullPage(folderName: string, pageName: string): void {
    let folderId: number = this.getFolderIdForName(folderName);
    this.getIPPService().addNewPage(folderId, pageName);
  }

  public getIPushPullThrottleTime(): number | undefined {
    return this.options.throttleTime;
  }

  public setIPushPullThrottleTime(throttleTime: number): void {
    this.dispatchAction(IPushPullRedux.IPushPullSetThrottleTime(throttleTime));
  }

  public setIPushPullDomains(iPushPullDomains: IPushPullDomain[]): void {
    this.dispatchAction(IPushPullRedux.IPushPullSetDomainsPages(iPushPullDomains));
  }

  public clearIPushPullDomains(): void {
    this.dispatchAction(IPushPullRedux.IPushPullClearDomainsPages());
  }

  public getIPushPullSchedules(): IPushPullSchedule[] {
    return this.getAdaptableState().Schedule.IPushPullSchedules || [];
  }

  public showIPushPullPopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.IPushPullStrategyId,
      ScreenPopups.IPushPullLoginPopup
    );
  }

  public setIPushPullAvailableOn(): void {
    this.dispatchAction(IPushPullRedux.SetIPushPullAvailableOn());
  }

  public setIPushPullAvailableOff(): void {
    this.dispatchAction(IPushPullRedux.SetIPushPullAvailableOff());
  }

  public setIPushPullRunningOn(): void {
    this.dispatchAction(IPushPullRedux.SetIPushPullRunningOn());
    this.adaptable.ReportService.PublishLiveLiveDataChangedEvent('iPushPull', 'Connected');
  }

  public setIPushPullRunningOff(): void {
    this.dispatchAction(IPushPullRedux.SetIPushPullRunningOff());
    this.adaptable.ReportService.PublishLiveLiveDataChangedEvent('iPushPull', 'Disconnected');
  }

  public isIPushPullLiveDataRunning(): boolean {
    return Helper.objectExists(this.getCurrentLiveIPushPullReport());
  }

  private getIPPService(): IPushPullService {
    if (!this.ippService) {
      this.ippService = this.adaptable.getPluginProperty('ipushpull', 'service') || null;
    }

    return this.ippService as IPushPullService;
  }

  public async loginToIPushPull(userName: string, password: string): Promise<void> {
    await this.getIPPService().login(userName, password);
    const domainpages: IPushPullDomain[] = await this.getIPPService().getDomainPages();
    this.setIPushPullDomains(domainpages);
    this.setIPushPullRunningOn();
    this.adaptable.api.internalApi.hidePopupScreen();
    this.setIPushPullLoginErrorMessage('');
  }

  public async retrieveIPushPullDomainsFromIPushPull(): Promise<void> {
    this.clearIPushPullDomains();
    const domainpages: IPushPullDomain[] = await this.getIPPService().getDomainPages();
    this.setIPushPullDomains(domainpages);
  }

  public logoutFromIPushPull(): void {
    this.clearIPushPullInternalState();
    this.adaptable.api.internalApi.hidePopupScreen();
  }

  public includeSystemReports(): boolean {
    return this.options.includeSystemReports || false;
  }

  public clearIPushPullInternalState(): void {
    this.setIPushPullDomains([]);
    this.setIPushPullRunningOff();
    this.setIPushPullLoginErrorMessage('');
    this.dispatchAction(IPushPullRedux.IPushPullLiveReportClear());
  }
}
