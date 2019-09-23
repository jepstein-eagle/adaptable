import * as ExportRedux from '../Redux/ActionsReducers/ExportRedux';
import { ExportDestination } from '../PredefinedConfig/Common/Enums';
import { IExportApi } from './Interface/IExportApi';
import { ExportState, Report } from '../PredefinedConfig/RunTimeState/ExportState';
import { ApiBase } from './ApiBase';
import { IPartnerConfigAPI } from './Interface/IPartnerConfigAPI';
import { PartnerConfigState } from '../PredefinedConfig/RunTimeState/PartnerConfigstate';

export class PartnerConfigAPI extends ApiBase implements IPartnerConfigAPI {
  public getPartnerConfigState(): PartnerConfigState {
    return this.getBlotterState().PartnerConfig;
  }
}
