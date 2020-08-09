import { ThemeState, AdaptableTheme } from '../PredefinedConfig/ThemeState';

/**
 * Provides full and comprehensive run-time access to the Team Sharing function and associated state.
 */
export interface TeamSharingApi {
  isTeamSharingActivated(): boolean;
  /**
   * Opens the Team Sharing popup screen
   */
  showTeamSharingPopup(): void;
}
