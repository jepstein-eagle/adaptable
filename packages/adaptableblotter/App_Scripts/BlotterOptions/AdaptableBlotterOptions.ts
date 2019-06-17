import { ContainerOptions } from './ContainerOptions';
import { AuditOptions } from './AuditOptions';
import { ConfigServerOptions } from './ConfigServerOptions';
import { LayoutOptions } from './LayoutOptions';
import { FilterOptions } from './FilterOptions';
import { QueryOptions } from './QueryOptions';
import { GeneralOptions } from './GeneralOptions';
import { ChartOptions } from './ChartOptions';
import { PredefinedConfig } from '../PredefinedConfig/PredefinedConfig';

/**
 * This is the class injected into the Adaptable Blotter at startup.
 *
 * It forms the ONLY parameter requried by the Adaptable Blotter constructor.
 *
 * It provides all the layout, DataGrid, config and other nformation required to ensure a full user experience.
 *
 * The class contains a few properties of which 2 (*vendorGrid* and *primaryKey*) are mandatory - and a number of *xxxOptions* classes.
 *
 * Typically users will ony populate a few of the classes in this object, and only a few properties in each class.
 *
 * Any property that is not supplied by the user when populating the object, will use the default value (which is listed here for each property).
 */
export interface AdaptableBlotterOptions {
  /**
   * MANDATORY property
   *
   * This is the underlying vendor grid or grid object which the Adaptable Blotter will interact with.
   *
   * Depending on the vendor it is either a Grid or an Options object.
   *
   * The vendor Grid should contain all the column definitions and data sources required.
   *
   * *Default value* - N/A
   */
  vendorGrid?: any;
  /**
   * MANDATORY property
   * Unique column in the grid
   * Required for cell identification purpose
   */
  primaryKey: string;
  /**
   * Identifier for this instance of the Adaptable Blotter
   *
   * Useful if Audit Log is turned on or you are using multiple Blotters
   */
  blotterId?: string;
  /**
   * Current user of the Adaptable Blotter
   * Strongly recommended to be set if using Config Server
   * Also used in Audit Log to identify the current user
   */
  userName?: string;
  /**
   * Configuration properties and objects set at design-time.
   *
   * Only used when Config Server is not enabled.
   *
   * Can be either an PredefinedConfig object or a url to a file which contains the config.
   */
  predefinedConfig?: PredefinedConfig | string;
  /**
   * A unique key - provided by the Adaptable Tools team that uniquely identifies the user / team
   * Required to get access to Standard or Enterprise functionality.
   * If not supplied then user has Community / Evaluation access where state cannot be saved or loaded.
   */
  licenceKey?: string;
  /**
   * Options for setting the <div>s which the Adaptable Blotter and underlying grid are placed.
   * Also can set where popups are displayed relative to the page.
   */
  containerOptions?: ContainerOptions;

  /**
   * The name of the theme to apply to the blotter UI. If not specified, will default to "light"
   */
  // theme?: string;
  /**
   * Options for mananging the Audit Log
   * Depending on your options, every keystroke, data change, user action etc. is logged
   * This is then sent as JSON to and Audit Http Channel for you to listen to using the software of your choice
   */
  auditOptions?: AuditOptions;
  /**
   * Options for setting Config Server
   * This allows you to store user state not in local storage (the default)
   */
  configServerOptions?: ConfigServerOptions;
  /**
   * Options for running queries
   * Lets you specify how (and how many) values are returned
   */
  queryOptions?: QueryOptions;
  /**
   * Options for use in Layouts
   * (ie. saveable view of column order, visibility and sorts)
   */
  layoutOptions?: LayoutOptions;
  /**
   * Options for running filters
   * Whether to use Adaptable Blotter or vendor grid forms
   */
  filterOptions?: FilterOptions;
  /**
   * Manage Adaptable Blotter charting
   */
  chartOptions?: ChartOptions;
  /**
   * General options to manage the Adaptable Blotter
   */
  generalOptions?: GeneralOptions;
  /**
   * Configuration settings for iPushPull
   * Required if using iPushPull to display / send live report data
   * NOTE: an iPushPull licence is required to access this functionality
   */
  iPushPullConfig?: {
    api_url?: string;
    ws_url?: string;
    api_key: string;
    api_secret: string;
    transport?: string;
    storage_prefix?: string;
    hsts?: boolean;
  };
}
