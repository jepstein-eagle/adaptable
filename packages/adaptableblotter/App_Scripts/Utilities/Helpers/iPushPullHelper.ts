// import { IPageService } from 'ipushpull-js/dist/Page/Page';
// import ipushpull, { ICreate } from 'ipushpull-js';
import { IPPDomain } from '../Interface/Reports/IPPDomain';
import { IPPStyle } from '../Interface/Reports/IPPStyle';
import { LoggingHelper } from './LoggingHelper';

export enum ServiceStatus {
  Unknown = 'Unknown',
  Disconnected = 'Disconnected',
  Connected = 'Connected',
  Error = 'Error',
}

const pages: Map<string, any> = new Map();

// Logs in to iPushpull
export function Login(ipp: any, login: string, password: string): Promise<any> {
  if (!ipp) {
    return Promise.reject('No iPushPull instance found!');
  }
  return ipp.auth
    .login(login, password)
    .then((result: any) => {
      ipp.__status = ServiceStatus.Connected;
      return result;
    })
    .catch((err: any) => {
      ipp.__status = ServiceStatus.Error;
      throw err.message;
    });
}

// Retrieves domain pages from iPushPull
export function GetDomainPages(ipp: any, clientId: string): Promise<IPPDomain[]> {
  if (!ipp) {
    return Promise.reject('No iPushPull instance found!');
  }
  return ipp.api
    .getDomainsAndPages(clientId)
    .then((response: any) => {
      return response.data.domains.map((domain: any) => ({
        Name: domain.name,
        Pages: domain.current_user_domain_page_access.pages
          .filter((page: any) => page.special_page_type == 0 && page.write_access)
          .map((page: any) => page.name),
      })) as IPPDomain[];
    })
    .catch((error: any) => {
      LoggingHelper.LogAdaptableBlotterError("couldn't get Domain/Pages from IPP : ", error);
      throw error.message;
    });
}

export function LoadPage(ipp: any, folderIPP: string, pageIPP: string): Promise<any> {
  if (!ipp) {
    return Promise.reject('No iPushPull instance found!');
  }
  return new Promise<any>((resolve: any, reject: any) => {
    const page: any = new ipp.Page(pageIPP, folderIPP);
    page.on(page.EVENT_NEW_CONTENT, () => {
      LoggingHelper.LogAdaptableBlotterInfo(`Page Ready : ${pageIPP}`);
      pages.set(pageIPP, page);
      resolve(page);
      // we return true so it removes the listener for new content.
      // IPP should add that line to their wiki
      return true;
    });
  });
}

export function UnloadPage(page: string) {
  const pageIPP = pages.get(page);
  if (pageIPP) {
    pageIPP.destroy();
    pages.delete(page);
    LoggingHelper.LogAdaptableBlotterInfo(`Page Unloaded : ${page}`);
  }
}

export function pushData(page: string, data: any[], style: IPPStyle): Promise<any> {
  return new Promise<any>((resolve, reject) => {
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

    const pageIPP = pages.get(page);
    pageIPP.Content.canDoDelta = false;
    pageIPP.Content.update(newData, true);
    pageIPP.push().then(
      () => {
        LoggingHelper.LogAdaptableBlotterSuccess(`Data pushed for iPushPull page : ${page}`);
        resolve();
      },
      (err: any) => {
        LoggingHelper.LogAdaptableBlotterInfo(`Error pushing data for iPushPull page : ${page}`);
        reject();
      }
    );
  });
}
export const iPushPullHelper = {
  ServiceStatus,
  getIPPStatus: (ipp: any): ServiceStatus => ipp.__status as ServiceStatus,
  Login,
  GetDomainPages,
  LoadPage,
  UnloadPage,
  pushData,
};
export default iPushPullHelper;
