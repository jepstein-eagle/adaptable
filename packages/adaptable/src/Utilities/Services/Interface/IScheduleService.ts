export interface IScheduleService {
  ClearAllReminderJobs(): void;
  ClearAllExportJobs(): void;
  ClearAllIPushPullJobs(): void;
}
