import { ContainerOptions } from './ContainerOptions';
import { AuditOptions } from './AuditOptions';
import { ConfigServerOptions } from './ConfigServerOptions';
import { LayoutOptions } from './LayoutOptions';
import { FilterOptions } from './FilterOptions';
import { QueryOptions } from './QueryOptions';
import { GeneralOptions } from './GeneralOptions';
import { ChartOptions } from './ChartOptions';
import { PredefinedConfig } from '../PredefinedConfig/PredefinedConfig';
import { iPushPullConfig } from './iPushPullConfig';

/**
 * AdaptableBlotterOptions is the class injected into the Adaptable Blotter at startup.
 *
 * **This forms the only parameter requried by the Adaptable Blotter constructor.**
 *
 * AdaptableBlotterOptions provides all the layout, DataGrid, config and other information required to ensure a full, rich user experience.
 *
 * The AdaptableBlotterOptions class contains a few *normal* properties of which 2 (*vendorGrid* and *primaryKey*) are mandatory - and a number of *xxxOptions* properties where the type is itself a collection of related properties.
 *
 * Typically users will ony populate a few of the properties in AdaptableBlotterOptions, and only a few properties in each class.
 *
 * Any property that is not supplied by the user when populating the object, will use the default value (which is listed here for each property).
 */
export interface AdaptableBlotterOptions {
  /**
   * **MANDATORY property**
   *
   * This is the underlying vendor grid or grid object which the Adaptable Blotter will interact with.
   *
   * Depending on the vendor it is either a Grid or an Options object.
   *
   * The vendor Grid should contain all the column definitions and data sources required.
   *
   * Note: if you are using the *React Wrapper* or the *Angular Wrapper* then you do **not** need to populate this property (as *gridOptions* is a separate parameter).
   *
   * **Default value** - N/A
   */
  vendorGrid?: any;

  /**
   * **MANDATORY property**
   *
   * The name of unique column in the grid
   *
   * Required for cell identification purpose when using Audit and other related functions.
   *
   * Note: The column does not need to be visible but it does need to exist in the grid's data source.
   *
   * **Default value** - N/A
   */
  primaryKey: string;

  /**
   * Identifier for this instance of the Adaptable Blotter
   *
   * Useful if Audit Log is turned on or you are using multiple Blotters
   *
   * The value provided here is also that used to name the *Home Toolbar* (the first toolbar that appears in the Dashboard).
   *
   * **Default value** - adaptable_blotter_id
   */
  blotterId?: string;

  /**
   * The name of the current user of the Adaptable Blotter
   *
   * Strongly recommended to be set if using Config Server
   *
   * Also used in Audit Log to identify the current user who has made edits or changed state.
   *
   * **Default value** - anonymous
   */
  userName?: string;

  /**
   * User State (a.ka. 'Predefined Configu) set at design-time and shipped with the Blotter for first use.
   *
   * Contains a mixture of objects and properties.
   *
   * Only used when Config Server is not enabled.
   *
   * Can be either an *PredefinedConfig* object or a url to the file which contains the config.
   *
   * See full details at [Predefined Configuration](./interfaces/_predefinedconfig_predefinedconfig_.predefinedconfig.html)
   *
   * **Default value** - null
   */
  predefinedConfig?: PredefinedConfig | string;

  /**
   * A unique key - provided by the Adaptable Tools team that uniquely identifies the user / team.
   *
   * Required to get access to Standard or Enterprise functionality.
   *
   * If not supplied then user has Community / Evaluation access where state cannot be saved or loaded.
   *
   * See full details at [Licence Key](./interfaces/_predefinedconfig_predefinedconfig_.predefinedconfig.html)
   *
   * **Default value** - anonymous
   */
  licenceKey?: string;

  /**
   * Options for setting the  *Div elements* in which the Adaptable Blotter and underlying grid are placed.
   *
   * Also allow you  to set where popups appear relative to the page and where charts are displayed.
   */
  containerOptions?: ContainerOptions;

  /**
   * Options for mananging the **Audit Log**.
   *
   * Depending on the options you set audit messages will send details of actions in the Blotter to an Audit destination.
   *
   * You can choose to listen to any mixture of Audits for: *CellEdit*, *FunctionEvent*, *UserStateChange* and *InternalStateChange*.
   *
   * You additionally choose to send each audit message (which is packaged as a simple JSON object) to any mixture of: *Http Channel*, *Console* or *Event*.
   *
   * If you select HttpChannel, you can subsequently see these message using reporting software such as the Elastic Stack.
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
  iPushPullConfig?: iPushPullConfig;
}
