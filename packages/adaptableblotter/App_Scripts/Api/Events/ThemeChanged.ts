import { BlotterEventArgs, AdaptableBlotterEventData } from './BlotterEvents';

/**
 * Event Args used as part of the **on('ThemeChanged')** event.
 *
 * Includes just the name of the new selected theme.
 */
export interface ThemeChangedEventArgs extends BlotterEventArgs {
  data: ThemeChangedEventData[];
}

export interface ThemeChangedEventData extends AdaptableBlotterEventData {
  id: ThemeChangedInfo;
}

export interface ThemeChangedInfo {
  themeName: string;
}
