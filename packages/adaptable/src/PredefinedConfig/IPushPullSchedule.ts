import { BaseSchedule } from './Common/Schedule';
import { AdaptableObject } from './Common/AdaptableObject';

export interface IPushPullReport extends AdaptableObject {
  ReportName: string;
  Folder: string;
  Page: string;
}
export interface IPushPullSchedule extends BaseSchedule {
  IPushPullReport: IPushPullReport;
  Transmission: 'Snapshot' | 'Live Data';
}
