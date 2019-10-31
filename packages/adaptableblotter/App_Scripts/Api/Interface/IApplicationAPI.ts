import {
  ApplicationToolbarButton,
  ApplicationState,
} from '../../PredefinedConfig/DesignTimeState/ApplicationState';

/**
 * Provides access to an empty Toolbar and Popup, allowing developers to populate it as they wish.
 *
 */
export interface IApplicationApi {
  getApplicationState(): ApplicationState;

  getApplicationToolbarButtons(): ApplicationToolbarButton[];

  // RenderToolbar(toolbarContents: any): void;

  getApplicationToolbarContentsDivId(): string;

  getApplicationToolbarContentsDiv(): HTMLElement | null;
}
