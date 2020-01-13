import LoggingHelper from '../Helpers/LoggingHelper';
import { IPPStyle } from '../Interface/IPPStyle';
import { IPushPullService } from './Interface/IPushPullService';
import { ExportDestination, LiveReportTrigger } from '../../PredefinedConfig/Common/Enums';

import env from '../../env';
import folder from '../../components/icons/folder';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { IPushPullDomain, IPushPullState } from '../../PredefinedConfig/IPushPullState';
import StringExtensions from '../Extensions/StringExtensions';

export enum ServiceStatus {
  Unknown = 'Unknown',
  Disconnected = 'Disconnected',
  Connected = 'Connected',
  Error = 'Error',
}

export class PushPullService implements IPushPullService {
  private ppInstance: any = null;

  private pages: Map<string, any> = new Map();

  constructor(public adaptable: IAdaptable) {
    this.adaptable = adaptable;

    this.adaptable.api.eventApi.on('AdaptableReady', async () => {
      // turn off and clear everything
      this.adaptable.api.iPushPullApi.clearIPushPullInternalState();
      this.adaptable.api.iPushPullApi.setIPushPullAvailableOff();

      if (!this.ppInstance) {
        let instance = this.adaptable.api.iPushPullApi.getIPushPullInstance();

        if (instance) {
          let userPushPullConfig = instance.config;

          instance.config.set({
            api_url: userPushPullConfig.api_url || 'https://www.ipushpull.com/api/1.0',
            ws_url: userPushPullConfig.ws_url || 'https://www.ipushpull.com',
            web_url: userPushPullConfig.web_url || 'https://www.ipushpull.com',
            docs_url: userPushPullConfig.docs_url || 'https://docs.ipushpull.com',
            storage_prefix: userPushPullConfig.storage_prefix || 'ipp_local',
            api_key: userPushPullConfig.api_key || this.getApiKey(),
            api_secret: userPushPullConfig.api_secret || this.getApiSecret(),
            transport: userPushPullConfig.transport || 'polling',
            hsts: false, // strict cors policy
          });
          this.ppInstance = instance;

          // set that it is available
          this.adaptable.api.iPushPullApi.setIPushPullAvailableOn();

          let autoLogin: boolean = this.adaptable.api.iPushPullApi.getAutoLogin();
          console.log('auto login');
          console.log(autoLogin);

          if (autoLogin) {
            let userName:
              | string
              | undefined = this.adaptable.api.iPushPullApi.getIPushPullUsername();
            let password:
              | string
              | undefined = this.adaptable.api.iPushPullApi.getIPushPullPassword();

            if (
              StringExtensions.IsNotNullOrEmpty(userName) &&
              StringExtensions.IsNotNullOrEmpty(password)
            ) {
              try {
                // slightly circular but it means tht we do the logic in one go..
                this.adaptable.api.iPushPullApi.loginToIPushPull(userName, password);
              } catch (err) {
                // set that it is not running (but still available)
                this.adaptable.api.iPushPullApi.setIPushPullRunningOff();
              }
            }
          }
        }
      }
    });
  }

  public getIPushPullStatus(): ServiceStatus {
    if (!this.ppInstance) {
      return ServiceStatus.Error;
    }
    return this.ppInstance.__status as ServiceStatus;
  }

  // Logs in to iPushpull
  public login(login: string, password: string): Promise<any> {
    if (!this.ppInstance) {
      return Promise.reject('No iPushPull instance found!');
    }
    return this.ppInstance.auth
      .login(login, password)
      .then((result: any) => {
        this.ppInstance.__status = ServiceStatus.Connected;
        LoggingHelper.LogAdaptableSuccess('Logged in to ipushpull');
        return result;
      })
      .catch((err: any) => {
        this.ppInstance.__status = ServiceStatus.Error;
        this.adaptable.api.iPushPullApi.setIPushPullLoginErrorMessage(
          err.data ? err.data.error_description || err.message : err.message
        );
        // prefer a more descriptive error, which IPP generally provides
        throw err.data ? err.data.error_description || err.message : err.message;
      });
  }

  // Retrieves domain pages from iPushPull
  public getDomainPages(): Promise<IPushPullDomain[]> {
    if (!this.ppInstance) {
      return Promise.reject('No iPushPull instance found!');
    }
    return this.ppInstance.api
      .getDomainsAndPages(this.ppInstance.config.api_key)
      .then((response: any) => {
        LoggingHelper.LogAdaptableSuccess('Retrieved iPushPull Folder/Page info');
        return response.data.domains.map((domain: any) => ({
          Name: domain.name,
          FolderId: domain.id,
          Pages: domain.current_user_domain_page_access.pages
            .filter((page: any) => page.special_page_type == 0 && page.write_access)
            .map((page: any) => page.name),
        })) as IPushPullDomain[];
      })

      .catch((error: any) => {
        LoggingHelper.LogAdaptableError("Couldn't get Domain/Pages from iPushPull : ", error);
        throw error.message;
      });
  }

  public loadPage(folderIPP: string, pageIPP: string): Promise<any> {
    if (!this.ppInstance) {
      return Promise.reject('No iPushPull instance found!');
    }
    return new Promise<any>((resolve: any, reject: any) => {
      const page: any = new this.ppInstance.Page(pageIPP, folderIPP);
      page.on(page.EVENT_NEW_CONTENT, () => {
        LoggingHelper.LogAdaptableInfo(`Page Ready : ${pageIPP}`);
        this.pages.set(pageIPP, page);
        resolve(page);
        // we return true so it removes the listener for new content.
        // IPP should add that line to their wiki
        return true;
      });
    });
  }

  public unloadPage(page: string): void {
    const pageIPP = this.pages.get(page);
    if (pageIPP) {
      pageIPP.destroy();
      this.pages.delete(page);
      LoggingHelper.LogAdaptableInfo(`Page Unloaded : ${page}`);
    }
  }

  public addNewPage(folderId: number, page: string): Promise<any> {
    if (!this.ppInstance) {
      return Promise.reject('No iPushPull instance found!');
    }
    this.ppInstance.Page.create(folderId, page)
      .then((createdPage: any) => {
        LoggingHelper.LogAdaptableSuccess("Page: '" + page + "' successfully created.");
      })
      .catch((err: any) => {
        LoggingHelper.LogAdaptableError("Couldn't create Page: '" + page + "'. Reason: " + err);
      });
  }

  public pushData(page: string, data: any[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const style: IPPStyle = this.adaptable.getIPPStyle();
      var newData = data.map((row: any, i: number) =>
        row.map((cell: any, y: number) => {
          const col =
            i == 0
              ? style.Header.Columns.find(x => x.columnFriendlyName == data[0][y])
              : style.Row.Columns.find(x => x.columnFriendlyName == data[0][y]);
          let styleIPP: any;
          if (i == 0) {
            styleIPP = {
              'background-color': style.Header.headerBackColor,
              bbc: '000000',
              bbs: 'none',
              bbw: 'none',
              lbc: '000000',
              lbs: 'none',
              lbw: 'none',
              rbc: '000000',
              rbs: 'none',
              rbw: 'none',
              tbc: '000000',
              tbs: 'none',
              tbw: 'none',
              color: style.Header.headerColor,
              'font-family': style.Header.headerFontFamily,
              'font-size': style.Header.headerFontSize,
              'font-style': style.Header.headerFontStyle,
              'font-weight': style.Header.headerFontWeight,
              height: `${String(style.Header.height / 3)}px`,
              'text-align': col.textAlign,
              'vertical-align': 'middle',
              'white-space': 'nowrap',
              width: `${String(col.width)}px`,
              'text-wrap': 'normal',
              'word-wrap': 'normal',
            };
          } else if (i == 1) {
            styleIPP = {
              'background-color': i % 2 ? style.Row.backColor : style.Row.altBackColor,
              color: style.Row.color,
              'font-family': style.Row.fontFamily,
              'font-size': style.Row.fontSize,
              'font-style': style.Row.fontStyle,
              'font-weight': style.Row.fontWeight,
              'text-align': col.textAlign,
            };
          } else {
            styleIPP = {
              'background-color': i % 2 ? style.Row.backColor : style.Row.altBackColor,
            };
          }
          return {
            value: cell,
            formatted_value: cell,
            style: styleIPP,
          };
        })
      );

      const pageIPP = this.pages.get(page);
      pageIPP.Content.canDoDelta = false;
      pageIPP.Content.update(newData, true);
      this.adaptable.ReportService.PublishLiveReportUpdatedEvent(
        ExportDestination.iPushPull,
        LiveReportTrigger.LiveDataUpdated
      );
      pageIPP.push().then(
        () => {
          LoggingHelper.LogAdaptableSuccess(`Data pushed for iPushPull page : ${page}`);
          resolve();
        },
        (err: any) => {
          LoggingHelper.LogAdaptableInfo(`Error pushing data for iPushPull page : ${page}`);
          reject();
        }
      );
    });
  }

  private getApiKey(): string {
    let key = env.IPUSHPULL_API_KEY; // need to make sure that is always there
    return key;
  }

  private getApiSecret(): string {
    let secret: string = env.IPUSHPULL_API_SECRET; // need to make sure that is always there
    return secret;
  }
}
