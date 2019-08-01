import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IThemeStrategy } from './Interface/IThemeStrategy';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { ThemeState } from '../PredefinedConfig/RunTimeState/ThemeState';
import * as GeneralConstants from '../Utilities/Constants/GeneralConstants';
import { ThemeChangedEventArgs } from '../Api/Events/BlotterEvents';

const WARNINGS: { [key: string]: boolean } = {};
const warnTheme = (themeName: string) => {
  if (WARNINGS[themeName]) {
    return;
  }
  WARNINGS[themeName] = true;
  const themeFile = `${themeName.toLowerCase().split(' ')[0]}.css`;
  setTimeout(() => {
    if (document.documentElement) {
      // every thing should contain this custom css variable: --ab-theme-loaded defined on the document element.
      if (!getComputedStyle(document.documentElement).getPropertyValue('--ab-theme-loaded')) {
        console.warn(`Theme "${themeName}" is no longer imported automatically. Make sure you import it separately:

    'import "adaptableblotter/themes/${themeFile}"'

Also make sure to import the main styles:

    'import "adaptableblotter/index.css"'`);
      }
    }
  }, 500);
};

export class ThemeStrategy extends AdaptableStrategyBase implements IThemeStrategy {
  private ThemeState: ThemeState;

  private style: HTMLStyleElement;

  private theme: HTMLLinkElement;

  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.ThemeStrategyId, blotter);

    // Create the theme link for predefined themes
    this.theme = document.createElement('link');
    this.theme.id = `${blotter.blotterOptions.containerOptions!.adaptableBlotterContainer}_${
      blotter.blotterOptions.blotterId
    }-link`;
    this.theme.rel = 'stylesheet';
    document.head.appendChild(this.theme);
  }

  protected addPopupMenuItem() {
    this.createMenuItemShowPopup(
      StrategyConstants.ThemeStrategyName,
      ScreenPopups.ThemePopup,
      StrategyConstants.ThemeGlyph
    );
  }

  publishThemeChanged(themeState: ThemeState) {
    const themeName = themeState.CurrentTheme;

    const themeChangedInfo: ThemeChangedEventArgs = {
      themeName,
    };
    this.blotter.api.eventApi._onThemeChanged.Dispatch(this.blotter, themeChangedInfo);
  }

  protected InitState() {
    if (this.ThemeState != this.blotter.api.themeApi.getThemeState()) {
      this.ThemeState = this.blotter.api.themeApi.getThemeState();

      // publish the theme changed event even on initialization
      this.publishThemeChanged(this.ThemeState);

      this.theme.href = '';
      switch (this.ThemeState.CurrentTheme) {
        case 'None':
          // do nothing...
          break;
        case GeneralConstants.LIGHT_THEME:
          warnTheme(this.ThemeState.CurrentTheme);
          // this.style.innerHTML = ThemesContent.get(this.ThemeState.CurrentTheme)
          this.blotter.applyLightTheme();
          break;
        case GeneralConstants.DARK_THEME:
          warnTheme(this.ThemeState.CurrentTheme);
          // this.style.innerHTML = ThemesContent.get(this.ThemeState.CurrentTheme)
          this.blotter.applyDarkTheme();
          break;
        default:
          const shippedTheme = this.ThemeState.SystemThemes.find(
            t => t == this.ThemeState.CurrentTheme
          );
          // if its a system theme then use that..
          if (shippedTheme) {
            warnTheme(this.ThemeState.CurrentTheme);
            // this.style.innerHTML = ThemesContent.get(this.ThemeState.CurrentTheme)
          } else {
            // otherwise use the predefined one
            const userTheme = this.ThemeState.UserThemes.find(
              t => t.Name == this.ThemeState.CurrentTheme
            );
            if (userTheme) {
              this.theme.href = userTheme.Url;
            }
          }
          break;
      }

      if (this.ThemeState.CurrentTheme == 'None') {
        // do nothing...
      } else {
        const shippedTheme = this.ThemeState.SystemThemes.find(
          t => t == this.ThemeState.CurrentTheme
        );
        // if its a system theme then use that..
        if (shippedTheme) {
          warnTheme(this.ThemeState.CurrentTheme);
        } else {
          // otherwise use the predefined one
          const userTheme = this.ThemeState.UserThemes.find(
            t => t.Name == this.ThemeState.CurrentTheme
          );
          if (userTheme) {
            this.theme.href = userTheme.Url;
          }
        }
      }
    }
  }
}
