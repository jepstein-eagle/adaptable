import { ServiceStatus } from '../PushPullService';
import { iPushPullDomain } from '../../../PredefinedConfig/PartnerState';
export interface IPushPullService {
  Login(login: string, password: string): Promise<any>;
  GetDomainPages(): Promise<iPushPullDomain[]>;
  LoadPage(folderIPP: string, pageIPP: string): Promise<any>;
  UnloadPage(page: string): void;
  pushData(page: string, data: any[]): Promise<any>;
  getIPPStatus(): ServiceStatus;
}
