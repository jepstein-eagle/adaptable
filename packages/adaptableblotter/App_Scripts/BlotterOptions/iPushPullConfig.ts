/**
 * Config required for when using iPushPull
 */
// tslint:disable-next-line: class-name
export interface iPushPullConfig {
  api_url?: string;
  ws_url?: string;
  api_key: string;
  api_secret: string;
  transport?: string;
  storage_prefix?: string;
  hsts?: boolean;
}
