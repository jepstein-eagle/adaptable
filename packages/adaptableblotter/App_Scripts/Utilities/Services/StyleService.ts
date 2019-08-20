import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { ConditionalStyle } from '../../PredefinedConfig/RunTimeState/ConditionalStyleState';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { StyleHelper } from '../Helpers/StyleHelper';
import { EnumExtensions } from '../Extensions/EnumExtensions';
import { ConditionalStyleScope } from '../../PredefinedConfig/Common/Enums';
import { StringExtensions } from '../Extensions/StringExtensions';
import { IFormatColumnStrategy } from '../../Strategy/Interface/IFormatColumnStrategy';
import { IFlashingCellsStrategy } from '../../Strategy/Interface/IFlashingCellsStrategy';
import { IConditionalStyleStrategy } from '../../Strategy/Interface/IConditionalStyleStrategy';
import * as QuickSearchRedux from '../../Redux/ActionsReducers/QuickSearchRedux';
import * as FormatColumnRedux from '../../Redux/ActionsReducers/FormatColumnRedux';
import * as ConditionalStyleRedux from '../../Redux/ActionsReducers/ConditionalStyleRedux';
import * as FlashingCellsRedux from '../../Redux/ActionsReducers/FlashingCellsRedux';
import { IStyle } from '../../PredefinedConfig/Common/IStyle';
import { BLOTTER_READY_EVENT } from '../Constants/GeneralConstants';

// Somehow all the CSSRules do not work so I end up just forcing the innerHTML......
export class StyleService {
  private style: HTMLStyleElement;

  constructor(private blotter: IAdaptableBlotter) {
    this.blotter = blotter;
    // Create the <style> tag
    this.style = document.createElement('style');
    this.style.id = `${blotter.blotterOptions.containerOptions!.adaptableBlotterContainer}_${
      blotter.blotterOptions.blotterId
    }-style`;
    // WebKit hack :(
    this.style.appendChild(document.createTextNode(''));
    // Add the <style> element to the page
    document.head.appendChild(this.style);

    this.setUpStoreListeners();
    this.blotter.on(BLOTTER_READY_EVENT, () => {
      this.setUpFirstUsage();
    });
  }

  private setUpFirstUsage(): void {
    // need to check that its all initiliased - perhps onready is better?
    this.setUpFormatColumn();
    this.setUpFlashingCells();
    this.setUpConditionalStyle();
    this.createAdaptableBlotterFunctionStyles();
  }

  private setUpFormatColumn() {
    const formatColumnStrategy = this.blotter.strategies.get(
      StrategyConstants.FormatColumnStrategyId
    ) as IFormatColumnStrategy;
    formatColumnStrategy.initStyles();
  }

  private setUpFlashingCells() {
    const flashingCellsStrategy = this.blotter.strategies.get(
      StrategyConstants.FlashingCellsStrategyId
    ) as IFlashingCellsStrategy;
    flashingCellsStrategy.initStyles();
  }

  private setUpConditionalStyle() {
    const conditionalStyleStrategy = this.blotter.strategies.get(
      StrategyConstants.ConditionalStyleStrategyId
    ) as IConditionalStyleStrategy;
    conditionalStyleStrategy.initStyles();
  }

  /**
   * this method is still not great but its better than the old version at least as it uses the new ever On... from the Store which is better
   * this class is still not perfect as we still delete and recreate all styles every time we create a conditional style, format column or flashing cell
   * but actually that is not the end of the world as it doenst happen so often and at least we are not doing it when quick search is applied.
   */
  private createAdaptableBlotterFunctionStyles() {
    this.clearCSSRules();

    // Format Column
    this.blotter.api.formatColumnApi.getAllFormatColumn().forEach(formatColumn => {
      const styleName = StyleHelper.CreateUniqueStyleName(
        StrategyConstants.FormatColumnStrategyId,
        this.blotter,
        formatColumn
      );
      this.addCSSRule(
        `.${styleName}`,
        `background-color: ${formatColumn.Style.BackColor} !important;color: ${
          formatColumn.Style.ForeColor
        } !important;font-weight: ${formatColumn.Style.FontWeight} !important;font-style: ${
          formatColumn.Style.FontStyle
        } !important;${
          formatColumn.Style.FontSize
            ? `font-size: ${EnumExtensions.getCssFontSizeFromFontSizeEnum(
                formatColumn.Style.FontSize
              )} !important`
            : ''
        }`
      );
    });

    // we define first the row conditions and then columns so priority of CS col > CS Row and allow a record to have both
    const conditioonalStyles: ConditionalStyle[] = this.blotter.api.conditionalStyleApi.getAllConditionalStyle();
    conditioonalStyles
      .filter(x => x.ConditionalStyleScope == ConditionalStyleScope.Row)
      .forEach(element => {
        const styleName = StyleHelper.CreateUniqueStyleName(
          StrategyConstants.ConditionalStyleStrategyId,
          this.blotter,
          element
        );
        this.addCSSRule(
          `.${styleName}`,
          `background-color: ${element.Style.BackColor} !important;color: ${
            element.Style.ForeColor
          } !important;font-weight: ${element.Style.FontWeight} !important;font-style: ${
            element.Style.FontStyle
          } !important;${
            element.Style.FontSize
              ? `font-size: ${EnumExtensions.getCssFontSizeFromFontSizeEnum(
                  element.Style.FontSize
                )} !important`
              : ''
          }`
        );
      });
    conditioonalStyles
      .filter(x => x.ConditionalStyleScope == ConditionalStyleScope.ColumnCategory)
      .forEach(element => {
        const styleName = StyleHelper.CreateUniqueStyleName(
          StrategyConstants.ConditionalStyleStrategyId,
          this.blotter,
          element
        );
        this.addCSSRule(
          `.${styleName}`,
          `background-color: ${element.Style.BackColor} !important;color: ${
            element.Style.ForeColor
          } !important;font-weight: ${element.Style.FontWeight} !important;font-style: ${
            element.Style.FontStyle
          } !important;${
            element.Style.FontSize
              ? `font-size: ${EnumExtensions.getCssFontSizeFromFontSizeEnum(
                  element.Style.FontSize
                )} !important`
              : ''
          }`
        );
      });
    conditioonalStyles
      .filter(cs => cs.ConditionalStyleScope == ConditionalStyleScope.Column)
      .forEach(element => {
        const styleName = StyleHelper.CreateUniqueStyleName(
          StrategyConstants.ConditionalStyleStrategyId,
          this.blotter,
          element
        );
        this.addCSSRule(
          `.${styleName}`,
          `background-color: ${element.Style.BackColor} !important;color: ${
            element.Style.ForeColor
          } !important;font-weight: ${element.Style.FontWeight} !important;font-style: ${
            element.Style.FontStyle
          } !important;${
            element.Style.FontSize
              ? `font-size: ${EnumExtensions.getCssFontSizeFromFontSizeEnum(
                  element.Style.FontSize
                )} !important`
              : ''
          }`
        );
      });

    // quick search
    const quickSearchStyle: IStyle = this.blotter.api.quickSearchApi.getQuickSearchStyle();
    if (StringExtensions.IsNullOrEmpty(quickSearchStyle.ClassName)) {
      const styleName = StyleHelper.CreateStyleName(
        StrategyConstants.QuickSearchStrategyId,
        this.blotter
      );

      this.addCSSRule(
        `.${styleName}`,
        `background-color: ${quickSearchStyle.BackColor} !important;color: ${
          quickSearchStyle.ForeColor
        } !important;font-weight: ${quickSearchStyle.FontWeight} !important;font-style: ${
          quickSearchStyle.FontStyle
        } !important;${
          quickSearchStyle.FontSize
            ? `font-size: ${EnumExtensions.getCssFontSizeFromFontSizeEnum(
                quickSearchStyle.FontSize
              )} !important`
            : ''
        }`
      );
    }
    // we define last Flash since it has the highest priority
    this.blotter.api.flashingCellApi.getAllFlashingCell().forEach(element => {
      if (element.IsLive) {
        this.addCSSRule(
          `.${StyleConstants.FLASH_UP_STYLE}-${element.Uuid}`,
          `background-color: ${element.UpColor} !important`
        );
        this.addCSSRule(
          `.${StyleConstants.FLASH_DOWN_STYLE}-${element.Uuid}`,
          `background-color: ${element.DownColor} !important`
        );
      }
    });
  }

  private clearCSSRules() {
    this.style.innerHTML = '';
  }

  private addCSSRule(selector: string, rules: string) {
    this.style.innerHTML += `${selector}{${rules}}` + '\n';
  }

  // not sure if this is better than us keeping a copy of the state and listening to it which is what we used to do.
  // I suspsect it is so we dont have lots of bits of state being stored and compared
  private setUpStoreListeners() {
    //  Quick Search - no need to set up styles for Quick Search as done in AB not the Strategy = need to test!!!
    this.blotter.adaptableBlotterStore.on(QuickSearchRedux.QUICK_SEARCH_SET_DISPLAY, () => {
      this.createAdaptableBlotterFunctionStyles();
    });
    this.blotter.adaptableBlotterStore.on(QuickSearchRedux.QUICK_SEARCH_SET_STYLE, () => {
      this.createAdaptableBlotterFunctionStyles();
    });

    // Format Column
    this.blotter.adaptableBlotterStore.on(FormatColumnRedux.FORMAT_COLUMN_ADD, () => {
      this.setUpFormatColumn();
      this.createAdaptableBlotterFunctionStyles();
    });
    this.blotter.adaptableBlotterStore.on(FormatColumnRedux.FORMAT_COLUMN_EDIT, () => {
      this.setUpFormatColumn();
      this.createAdaptableBlotterFunctionStyles();
    });
    this.blotter.adaptableBlotterStore.on(FormatColumnRedux.FORMAT_COLUMN_DELETE, () => {
      this.setUpFormatColumn();
      this.createAdaptableBlotterFunctionStyles();
    });

    // Conditional Style
    this.blotter.adaptableBlotterStore.on(ConditionalStyleRedux.CONDITIONAL_STYLE_ADD, () => {
      this.setUpConditionalStyle();
      this.createAdaptableBlotterFunctionStyles();
    });
    this.blotter.adaptableBlotterStore.on(ConditionalStyleRedux.CONDITIONAL_STYLE_EDIT, () => {
      this.setUpConditionalStyle();
      this.createAdaptableBlotterFunctionStyles();
    });
    this.blotter.adaptableBlotterStore.on(ConditionalStyleRedux.CONDITIONAL_STYLE_DELETE, () => {
      this.setUpConditionalStyle();
      this.createAdaptableBlotterFunctionStyles();
    });

    // Flashing Cell
    this.blotter.adaptableBlotterStore.on(FlashingCellsRedux.FLASHING_CELL_SELECT, () => {
      this.setUpFlashingCells();
      this.createAdaptableBlotterFunctionStyles();
    });
    this.blotter.adaptableBlotterStore.on(FlashingCellsRedux.FLASHING_CELL_SELECT_ALL, () => {
      this.setUpFlashingCells();
      this.createAdaptableBlotterFunctionStyles();
    });
    this.blotter.adaptableBlotterStore.on(FlashingCellsRedux.FLASHING_CELL_CHANGE_UP_COLOR, () => {
      this.setUpFlashingCells();
      this.createAdaptableBlotterFunctionStyles();
    });
    this.blotter.adaptableBlotterStore.on(
      FlashingCellsRedux.FLASHING_CELL_CHANGE_DOWN_COLOR,
      () => {
        this.setUpFlashingCells();
        this.createAdaptableBlotterFunctionStyles();
      }
    );
    this.blotter.adaptableBlotterStore.on(FlashingCellsRedux.FLASHING_CELL_CHANGE_DURATION, () => {
      this.setUpFlashingCells();
      this.createAdaptableBlotterFunctionStyles();
    });
  }
}
