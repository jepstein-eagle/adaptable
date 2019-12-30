import { AdaptableEventArgs, AdaptableEventData } from './BlotterEvents';

/**
 * Event Args used as part of the **on('ThemeChanged')** event.
 *
 * Includes just the name of the new selected theme.
 */
export interface ThemeChangedEventArgs extends AdaptableEventArgs {
  data: ThemeChangedEventData[];
}

export interface ThemeChangedEventData extends AdaptableEventData {
  id: ThemeChangedInfo;
}

export interface ThemeChangedInfo {
  themeName: string;
}
