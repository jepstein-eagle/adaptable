import { IPPDomain } from '../../Interface/Reports/IPPDomain';
import { ServiceStatus } from '../PushPullService';
export interface IPushPullService {
  Login(login: string, password: string): Promise<any>;
  GetDomainPages(): Promise<IPPDomain[]>;
  LoadPage(folderIPP: string, pageIPP: string): Promise<any>;
  UnloadPage(page: string): void;
  pushData(page: string, data: any[]): Promise<any>;
  getIPPStatus(): ServiceStatus;
}
