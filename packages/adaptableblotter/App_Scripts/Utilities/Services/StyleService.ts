import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { QuickSearchState } from '../../PredefinedConfig/IUserState/QuickSearchState';
import { PercentBarState } from '../../PredefinedConfig/IUserState/PercentBarState';
import { FormatColumnState } from '../../PredefinedConfig/IUserState/FormatColumnState';
import { FlashingCellState } from '../../PredefinedConfig/IUserState/FlashingCellState';
import { ConditionalStyleState } from '../../PredefinedConfig/IUserState/ConditionalStyleState';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { StyleHelper } from '../Helpers/StyleHelper';
import { EnumExtensions } from '../Extensions/EnumExtensions';
import { ConditionalStyleScope } from '../../PredefinedConfig/Common/Enums';
import { StringExtensions } from '../Extensions/StringExtensions';
import { IFormatColumnStrategy } from '../../Strategy/Interface/IFormatColumnStrategy';
import { IFlashingCellsStrategy } from '../../Strategy/Interface/IFlashingCellsStrategy';
import { IConditionalStyleStrategy } from '../../Strategy/Interface/IConditionalStyleStrategy';

//Somehow all the CSSRules do not work so I end up just forcing the innerHTML......
export class StyleService {
  private flashingCellState!: FlashingCellState;
  private conditionalStyleState!: ConditionalStyleState;
  private quickSearchState!: QuickSearchState;
  private formatColumnState!: FormatColumnState;

  private style: HTMLStyleElement;
  constructor(private blotter: IAdaptableBlotter) {
    this.blotter = blotter;
    // Create the <style> tag
    this.style = document.createElement('style');
    this.style.id =
      blotter.blotterOptions.containerOptions!.adaptableBlotterContainer +
      '_' +
      blotter.blotterOptions.blotterId +
      '-style';
    // WebKit hack :(
    this.style.appendChild(document.createTextNode(''));
    // Add the <style> element to the page
    document.head.appendChild(this.style);

    this.listenToStyleStoreChanges();
    blotter.adaptableBlotterStore.TheStore.subscribe(() => this.listenToStyleStoreChanges());
  }

  /**
   * This function is HORRIBLE.  It deletes and recreates all styles each time that quick search changes even if its just text???
   */
  private listenToStyleStoreChanges() {
    let isStyleStateChanged: boolean = false;
    if (this.blotter.isInitialised) {
      if (this.formatColumnState != this.blotter.api.formatColumnApi.getFormatColumnState()) {
        isStyleStateChanged = true;
        this.formatColumnState = this.blotter.api.formatColumnApi.getFormatColumnState();
        let formatColumnStrategy = <IFormatColumnStrategy>(
          this.blotter.strategies.get(StrategyConstants.FormatColumnStrategyId)
        );
        formatColumnStrategy.initStyles();
      }

      if (this.flashingCellState != this.blotter.api.flashingCellApi.getFlashingCellState()) {
        isStyleStateChanged = true;
        this.flashingCellState = this.blotter.api.flashingCellApi.getFlashingCellState();
        this.formatColumnState = this.blotter.api.formatColumnApi.getFormatColumnState();
        let flashingCellsStrategy = <IFlashingCellsStrategy>(
          this.blotter.strategies.get(StrategyConstants.FlashingCellsStrategyId)
        );
        flashingCellsStrategy.initStyles();
      }

      if (this.quickSearchState != this.blotter.api.quickSearchApi.getQuickSearchState()) {
        // not quite right as we reapply if the display action changes but for some reason we cannot compare on styles
        // and this way at least we dont rebuild styles every time we update quick search text
        if (
          this.quickSearchState != null &&
          this.quickSearchState.QuickSearchText ==
            this.blotter.api.quickSearchApi.getQuickSearchValue()
        ) {
          isStyleStateChanged = true;
        }
        this.quickSearchState = this.blotter.api.quickSearchApi.getQuickSearchState();
      }

      if (
        this.conditionalStyleState !=
        this.blotter.api.conditionalStyleApi.getConditionalStyleState()
      ) {
        isStyleStateChanged = true;
        this.conditionalStyleState = this.blotter.api.conditionalStyleApi.getConditionalStyleState();
        let conditionalStyleStrategy = <IConditionalStyleStrategy>(
          this.blotter.strategies.get(StrategyConstants.ConditionalStyleStrategyId)
        );
        conditionalStyleStrategy.initStyles();
      }

      if (isStyleStateChanged) {
        this.clearCSSRules();

        // Format Column
        this.formatColumnState.FormatColumns.forEach(formatColumn => {
          let styleName = StyleHelper.CreateIndexedStyleName(
            StrategyConstants.FormatColumnStrategyId,
            this.formatColumnState.FormatColumns.indexOf(formatColumn),
            this.blotter
          );
          this.addCSSRule(
            '.' + styleName,
            'background-color: ' +
              formatColumn.Style.BackColor +
              ' !important;color: ' +
              formatColumn.Style.ForeColor +
              ' !important;font-weight: ' +
              formatColumn.Style.FontWeight +
              ' !important;font-style: ' +
              formatColumn.Style.FontStyle +
              ' !important;' +
              (formatColumn.Style.FontSize
                ? 'font-size: ' +
                  EnumExtensions.getCssFontSizeFromFontSizeEnum(formatColumn.Style.FontSize) +
                  ' !important'
                : '')
          );
        });

        //we define first the row conditions and then columns so priority of CS col > CS Row and allow a record to have both
        this.conditionalStyleState.ConditionalStyles.filter(
          x => x.ConditionalStyleScope == ConditionalStyleScope.Row
        ).forEach(element => {
          let styleName = StyleHelper.CreateIndexedStyleName(
            StrategyConstants.ConditionalStyleStrategyId,
            this.conditionalStyleState.ConditionalStyles.indexOf(element),
            this.blotter
          );
          this.addCSSRule(
            '.' + styleName,
            'background-color: ' +
              element.Style.BackColor +
              ' !important;color: ' +
              element.Style.ForeColor +
              ' !important;font-weight: ' +
              element.Style.FontWeight +
              ' !important;font-style: ' +
              element.Style.FontStyle +
              ' !important;' +
              (element.Style.FontSize
                ? 'font-size: ' +
                  EnumExtensions.getCssFontSizeFromFontSizeEnum(element.Style.FontSize) +
                  ' !important'
                : '')
          );
        });
        this.conditionalStyleState.ConditionalStyles.filter(
          x => x.ConditionalStyleScope == ConditionalStyleScope.ColumnCategory
        ).forEach(element => {
          let styleName = StyleHelper.CreateIndexedStyleName(
            StrategyConstants.ConditionalStyleStrategyId,
            this.conditionalStyleState.ConditionalStyles.indexOf(element),
            this.blotter
          );
          this.addCSSRule(
            '.' + styleName,
            'background-color: ' +
              element.Style.BackColor +
              ' !important;color: ' +
              element.Style.ForeColor +
              ' !important;font-weight: ' +
              element.Style.FontWeight +
              ' !important;font-style: ' +
              element.Style.FontStyle +
              ' !important;' +
              (element.Style.FontSize
                ? 'font-size: ' +
                  EnumExtensions.getCssFontSizeFromFontSizeEnum(element.Style.FontSize) +
                  ' !important'
                : '')
          );
        });
        this.conditionalStyleState.ConditionalStyles.filter(
          x => x.ConditionalStyleScope == ConditionalStyleScope.Column
        ).forEach(element => {
          let styleName = StyleHelper.CreateIndexedStyleName(
            StrategyConstants.ConditionalStyleStrategyId,
            this.conditionalStyleState.ConditionalStyles.indexOf(element),
            this.blotter
          );
          this.addCSSRule(
            '.' + styleName,
            'background-color: ' +
              element.Style.BackColor +
              ' !important;color: ' +
              element.Style.ForeColor +
              ' !important;font-weight: ' +
              element.Style.FontWeight +
              ' !important;font-style: ' +
              element.Style.FontStyle +
              ' !important;' +
              (element.Style.FontSize
                ? 'font-size: ' +
                  EnumExtensions.getCssFontSizeFromFontSizeEnum(element.Style.FontSize) +
                  ' !important'
                : '')
          );
        });

        // quick search
        if (StringExtensions.IsNullOrEmpty(this.quickSearchState.Style.ClassName)) {
          let styleName = StyleHelper.CreateStyleName(
            StrategyConstants.QuickSearchStrategyId,
            this.blotter
          );

          this.addCSSRule(
            '.' + styleName,
            'background-color: ' +
              this.quickSearchState.Style.BackColor +
              ' !important;color: ' +
              this.quickSearchState.Style.ForeColor +
              ' !important;font-weight: ' +
              this.quickSearchState.Style.FontWeight +
              ' !important;font-style: ' +
              this.quickSearchState.Style.FontStyle +
              ' !important;' +
              (this.quickSearchState.Style.FontSize
                ? 'font-size: ' +
                  EnumExtensions.getCssFontSizeFromFontSizeEnum(
                    this.quickSearchState.Style.FontSize
                  ) +
                  ' !important'
                : '')
          );
        }
        //we define last Flash since it has the highest priority
        this.flashingCellState.FlashingCells.forEach((element, index) => {
          if (element.IsLive) {
            this.addCSSRule(
              '.' + StyleConstants.FLASH_UP_STYLE + index,
              'background-color: ' + element.UpColor + ' !important'
            );
            this.addCSSRule(
              '.' + StyleConstants.FLASH_DOWN_STYLE + index,
              'background-color: ' + element.DownColor + ' !important'
            );
          }
        });
      }
    }
  }

  private clearCSSRules() {
    this.style.innerHTML = '';
  }

  private addCSSRule(selector: string, rules: string) {
    this.style.innerHTML += selector + '{' + rules + '}' + '\n';
  }
}
