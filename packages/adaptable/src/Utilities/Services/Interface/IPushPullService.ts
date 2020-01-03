import { ServiceStatus } from '../PushPullService';
import { IPushPullDomain } from '../../../PredefinedConfig/PartnerState';
export interface IPushPullService {
  Login(login: string, password: string): Promise<any>;
  GetDomainPages(): Promise<IPushPullDomain[]>;
  LoadPage(folderIPP: string, pageIPP: string): Promise<any>;
  UnloadPage(page: string): void;
  pushData(page: string, data: any[]): Promise<any>;
  getIPPStatus(): ServiceStatus;
  AddNewPage(folderId: number, page: string): Promise<any>;
}
