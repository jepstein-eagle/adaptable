export interface Glue42Config {
  initialization: {
    application: string;
    gateway: {
      protocolVersion: number;
      ws: string;
    };
    auth: {
      username: string;
      password: string;
    };
  };
  excelExport?: {
    timeoutMs?: number;
  };
}
