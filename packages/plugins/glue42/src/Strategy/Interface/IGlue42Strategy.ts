export interface IGlue42Strategy extends IStrategy {
  sendSnapshot(report: Glue42Report): void;
  startLiveData(report: Glue42Report): void;
}
