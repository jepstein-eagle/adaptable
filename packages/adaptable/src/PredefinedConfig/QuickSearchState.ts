import { AdaptableStyle } from './Common/AdaptableStyle';
import { ConfigState } from './ConfigState';

/**
 * The Predefined Configuration for the Quick Search function
 *
 * Quick Search runs a simply text-based search across all **visible columns**
 *
 * There are wildcards available (e.g s* for >15) to improve the search behaviour.
 *
 * --------------
 *
 *  ### Further AdapTable Help Resources
 *
 * - [Quick Search Demo](https://demo.adaptabletools.com/search/aggridquicksearchdemo/)
 *
 * - {@link QuickSearchApi|Quick Search Api}
 *
 * - {@link SearchOptions|Search Options}
 *
 * - [Quick Search Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/quick-search-function.md)
 *
 *
 * --------------
 *
 * ### Quick Search Predefined Config Example
 *
 * ```ts
 * export default {
 *  QuickSearch: {
 *      QuickSearchText: 'j*',
 *      DisplayAction: 'ShowRowAndHighlightCell',
 *      Style: {
 *        BackColor: '#ffff00',
 *        ForeColor: '#8b0000',
 *      },
 *    }
 * } as PredefinedConfig;
 * ```
 * In this example we have set up Quick Search to run a search at startup for all cells whose contents start with 'j'.
 *
 * Only rows which have matching cells will be displayed and highlighted with the back adn fore colors specified in the Style.
 *
 */
export interface QuickSearchState extends ConfigState {
  /**
   * What Quick Search will run at start up.
   *
   * Its very rare to set this property in config
   */
  QuickSearchText?: string;

  /**
   * How AdapTable will show the Quick Search results
   *
   * Can either highight matching cells, filter matching rows or both
   */
  DisplayAction?: 'HighlightCell' | 'ShowRow' | 'ShowRowAndHighlightCell';

  /**
   * The style to use for Quick Search - uses the standard `AdaptableStyle` Object.
   */
  Style?: AdaptableStyle;
}
