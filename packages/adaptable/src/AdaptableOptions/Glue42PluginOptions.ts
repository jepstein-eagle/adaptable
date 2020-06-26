export interface Glue42PluginOptions {
  username?: string;
  password?: string;
  gatewayURL?: string;
  glue?: any; // this is the glue object
  glue4Office?: any; // this is the Glue4Office object
  throttleTime?: number;
}
