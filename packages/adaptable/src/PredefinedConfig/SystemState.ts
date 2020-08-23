import { IPreviewInfo } from '../Utilities/Interface/IPreview';
import { AdaptableAlert } from '../Utilities/Interface/IMessage';
import { ChartVisibility } from './Common/ChartEnums';
import { Expression, QueryRange } from './Common/Expression';
import { InternalState } from './InternalState';
import { UpdatedRowInfo } from '../Utilities/Services/Interface/IDataService';
import { ChartData } from './ChartState';
import { Report } from './ExportState';
import { BulkUpdateValidationResult } from '../Strategy/Interface/IBulkUpdateStrategy';
import { GridCell } from '../types';
import { IPushPullState, IPushPullReport, IPushPullDomain } from './IPushPullState';
import { Glue42State, Glue42Report } from './Glue42State';
import { OpenFinState, OpenFinReport } from './OpenFinState';

export { IPushPullReport, IPushPullDomain };

export { Glue42Report };
export { OpenFinReport };

//SYSTEM STATE IMPLEMENTATIONS - System, Menu, Grid, Popup, TeamSharing

/**
 * This is for internal use of Adaptable only during a session.
 *
 * None of this State is provided to Adaptable by users (through Predefined Config) and none of it is persisted.
 */
export interface SystemState extends InternalState, IPushPullState, Glue42State, OpenFinState {
  AdaptableAlerts: AdaptableAlert[];
  UpdatedRowInfos: UpdatedRowInfo[];
  IsValidSmartEditSelection: boolean;
  SmartEditPreviewInfo: IPreviewInfo;
  BulkUpdateValidationResult: BulkUpdateValidationResult;
  BulkUpdatePreviewInfo: IPreviewInfo;
  ChartData: ChartData;
  ChartVisibility: ChartVisibility;
  CalculatedColumnErrorMessage: string;

  SystemReports: Report[];
  ReportErrorMessage: string;
  QuickSearchRange: QueryRange;
  LastAppliedShortCut: GridCell | undefined;
}
