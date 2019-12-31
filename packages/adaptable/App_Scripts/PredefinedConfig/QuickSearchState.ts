import { AdaptableStyle } from './Common/AdaptableStyle';
import { RunTimeState } from './RunTimeState';

export interface QuickSearchState extends RunTimeState {
  QuickSearchText?: string;
  DisplayAction?: 'HighlightCell' | 'ShowRow' | 'ShowRowAndHighlightCell';
  Style?: AdaptableStyle;
}

/*
QuickSearchText

string

What Quick Search will look up. Its very rare to set this property in config.

DisplayAction

string

How Adaptable should show the results. There are 3 options for this property:

HighlightCell - The grid shows all rows and cells that match the quick search are highlighted

ShowRow - Only rows that contain cells which match the quick search are shown (but not highlighted)

ShowRowAndHighlightCell - Only rows that contain cells which match the quick search are shown, with matching cells highlighted

Style

Style object

The style to use for Quick Search - see Style Object Config for more details.
*/
