import LoggingHelper from '@adaptabletools/adaptable/src/Utilities/Helpers/LoggingHelper';
import env from '@adaptabletools/adaptable/src/env';
import { IAdaptable } from '@adaptabletools/adaptable/src/AdaptableInterfaces/IAdaptable';
import StringExtensions from '@adaptabletools/adaptable/src/Utilities/Extensions/StringExtensions';

import { IPPStyle } from '@adaptabletools/adaptable/src/Utilities/Interface/IPPStyle';
import { IPushPullService } from './Interface/IPushPullService';
import { IPushPullDomain } from '@adaptabletools/adaptable/src/PredefinedConfig/SystemState';

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
      this.getIPPApi().clearIPushPullInternalState();
      this.getIPPApi().setIPushPullAvailableOff();

      if (!this.ppInstance) {
        let instance = this.getIPPApi().getIPushPullInstance();

        if (instance) {
          this.ppInstance = instance;

          // set that it is available
          this.getIPPApi().setIPushPullAvailableOn();

          let autoLogin: boolean = this.getIPPApi().getAutoLogin();

          if (autoLogin) {
            let userName: string | undefined = this.getIPPApi().getIPushPullUsername();
            let password: string | undefined = this.getIPPApi().getIPushPullPassword();

            if (
              StringExtensions.IsNotNullOrEmpty(userName) &&
              StringExtensions.IsNotNullOrEmpty(password)
            ) {
              try {
                // slightly circular but it means tht we do the logic in one go..
                this.getIPPApi().loginToIPushPull(userName, password);
              } catch (err) {
                // set that it is not running (but still available)
                this.getIPPApi().setIPushPullRunningOff();
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

  private getIPPApi() {
    return this.adaptable.api.pluginsApi.getPluginApi('ipushpull');
  }

  // Logs in to ipushpull
  public login(login: string, password: string): Promise<any> {
    if (!this.ppInstance) {
      return Promise.reject('No ipushpull instance found!');
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
        this.getIPPApi().setIPushPullLoginErrorMessage(
          err.data ? err.data.error_description || err.message : err.message
        );
        // prefer a more descriptive error, which IPP generally provides
        throw err.data ? err.data.error_description || err.message : err.message;
      });
  }

  // Retrieves domain pages from ipushpull
  public getDomainPages(): Promise<IPushPullDomain[]> {
    if (!this.ppInstance) {
      return Promise.reject('No ipushpull instance found!');
    }
    return this.ppInstance.api
      .getDomainsAndPages(this.ppInstance.config.api_key)
      .then((response: any) => {
        LoggingHelper.LogAdaptableSuccess('Retrieved ipushpull Folder/Page info');
        return response.data.domains.map((domain: any) => ({
          Name: domain.name,
          FolderId: domain.id,
          Pages: domain.current_user_domain_page_access.pages
            .filter((page: any) => page.special_page_type == 0 && page.write_access)
            .map((page: any) => page.name),
        })) as IPushPullDomain[];
      })

      .catch((error: any) => {
        LoggingHelper.LogAdaptableError("Couldn't get Domain/Pages from ipushpull : ", error);
        throw error.message;
      });
  }

  public loadPage(folderIPP: string, pageIPP: string): Promise<any> {
    if (!this.ppInstance) {
      return Promise.reject('No ipushpull instance found!');
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
      return Promise.reject('No ipushpull instance found!');
    }

    this.ppInstance.Page.create(folderId, page)
      .then((createdPage: any) => {
        let message: string = page + "' successfully created.";
        this.adaptable.api.alertApi.showAlertSuccess('ipushpull Page', message);
        this.adaptable.api.internalApi.hidePopupScreen();
        this.getIPPApi().retrieveIPushPullDomainsFromIPushPull();
      })
      .catch((err: any) => {
        LoggingHelper.LogAdaptableError("Couldn't create Page: '" + page + "'. Reason: " + err);
      });
  }

  public pushData(page: string, data: any[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let newData: any = [];

      const style: IPPStyle =
        data && data.length > 1
          ? this.adaptable.getCurrentIPPStyle()
          : this.adaptable.getDefaultIPPStyle();
      newData = data.map((row: any, i: number) =>
        row.map((cell: any, y: number) => {
          const col =
            i == 0
              ? style.Header.Columns.find((x: any) => x.columnFriendlyName == data[0][y])
              : style.Row.Columns.find((x: any) => x.columnFriendlyName == data[0][y]);
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

      pageIPP.push().then(
        () => {
          LoggingHelper.LogAdaptableSuccess(`Data pushed for ipushpull page : ${page}`);
          resolve();
        },
        (err: any) => {
          LoggingHelper.LogAdaptableInfo(`Error pushing data for ipushpull page : ${page}`);
          reject();
        }
      );
    });
  }
}
