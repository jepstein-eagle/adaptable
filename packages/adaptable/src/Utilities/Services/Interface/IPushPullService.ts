import { ServiceStatus } from '../PushPullService';
import { IPushPullDomain } from '../../../PredefinedConfig/IPushPullState';
export interface IPushPullService {
  login(login: string, password: string): Promise<any>;
  getDomainPages(): Promise<IPushPullDomain[]>;
  loadPage(folderIPP: string, pageIPP: string): Promise<any>;
  unloadPage(page: string): void;
  pushData(page: string, data: any[]): Promise<any>;
  getIPushPullStatus(): ServiceStatus;
  addNewPage(folderId: number, page: string): Promise<any>;
}
