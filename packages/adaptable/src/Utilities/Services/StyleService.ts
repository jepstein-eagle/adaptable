import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { ConditionalStyle } from '../../PredefinedConfig/ConditionalStyleState';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { EnumExtensions } from '../Extensions/EnumExtensions';
import { StringExtensions } from '../Extensions/StringExtensions';
import { IFormatColumnStrategy } from '../../Strategy/Interface/IFormatColumnStrategy';
import { IFlashingCellsStrategy } from '../../Strategy/Interface/IFlashingCellsStrategy';
import { IConditionalStyleStrategy } from '../../Strategy/Interface/IConditionalStyleStrategy';
import * as QuickSearchRedux from '../../Redux/ActionsReducers/QuickSearchRedux';
import * as FormatColumnRedux from '../../Redux/ActionsReducers/FormatColumnRedux';
import * as ConditionalStyleRedux from '../../Redux/ActionsReducers/ConditionalStyleRedux';
import * as AlertRedux from '../../Redux/ActionsReducers/AlertRedux';
import * as FlashingCellsRedux from '../../Redux/ActionsReducers/FlashingCellsRedux';
import * as UpdatedRowRedux from '../../Redux/ActionsReducers/UpdatedRowRedux';
import { AdaptableStyle } from '../../PredefinedConfig/Common/AdaptableStyle';
import { IAlertStrategy } from '../../Strategy/Interface/IAlertStrategy';
import { UpdatedRowState } from '../../PredefinedConfig/UpdatedRowState';
import { IUpdatedRowStrategy } from '../../Strategy/Interface/IUpdatedRowStrategy';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { IStyleService } from './Interface/IStyleService';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';

export class StyleService implements IStyleService {
  private style: HTMLStyleElement;

  constructor(private adaptable: IAdaptable) {
    this.adaptable = adaptable;
    // Create the <style> tag
    this.style = document.createElement('style');
    this.style.id = `${adaptable.adaptableOptions.containerOptions!.adaptableContainer}_${
      adaptable.adaptableOptions.adaptableId
    }-style`;
    // WebKit hack :(
    this.style.appendChild(document.createTextNode(''));
    // Add the <style> element to the page
    document.head.appendChild(this.style);

    this.setUpStoreListeners();
    this.adaptable.api.eventApi.on('AdaptableReady', () => {
      this.setUpFirstUsage();
    });
  }

  public CreateStyleName(functionName: AdaptableFunctionName): string {
    return (
      StyleConstants.AB_HEADER +
      functionName +
      '-' +
      this.adaptable.adaptableOptions.adaptableId
        .trim()
        .replace(/\s/g, '')
        .replace('.', '')
    );
  }

  public CreateUniqueStyleName(
    functionName: AdaptableFunctionName,
    adaptableObject: AdaptableObject
  ): string {
    return (
      StyleConstants.AB_HEADER +
      functionName +
      '-' +
      this.adaptable.adaptableOptions.adaptableId
        .trim()
        .replace(/\s/g, '')
        .replace('.', '') +
      '-' +
      adaptableObject.Uuid
    );
  }

  private setUpFirstUsage(): void {
    // need to check that its all initiliased - perhps onready is better?
    this.setUpFormatColumn();
    this.setUpFlashingCells();
    this.setUpUpdatedRow();
    this.setUpAlerts();
    this.setUpConditionalStyle();
    this.createAdaptableFunctionStyles();
  }

  private setUpFormatColumn() {
    const formatColumnStrategy = this.adaptable.strategies.get(
      StrategyConstants.FormatColumnStrategyId
    ) as IFormatColumnStrategy;
    formatColumnStrategy.initStyles();
  }

  private setUpFlashingCells() {
    const flashingCellsStrategy = this.adaptable.strategies.get(
      StrategyConstants.FlashingCellsStrategyId
    ) as IFlashingCellsStrategy;
    flashingCellsStrategy.initStyles();
  }

  private setUpUpdatedRow() {
    const updatedRowStrategy = this.adaptable.strategies.get(
      StrategyConstants.UpdatedRowStrategyId
    ) as IUpdatedRowStrategy;
    updatedRowStrategy.initStyles();
  }

  private setUpAlerts() {
    const alertStrategy = this.adaptable.strategies.get(
      StrategyConstants.AlertStrategyId
    ) as IAlertStrategy;
    alertStrategy.initStyles();
  }

  private setUpConditionalStyle() {
    const conditionalStyleStrategy = this.adaptable.strategies.get(
      StrategyConstants.ConditionalStyleStrategyId
    ) as IConditionalStyleStrategy;
    conditionalStyleStrategy.initStyles();
  }

  /**
   * this method is still not great but its better than the old version at least as it uses the new ever On... from the Store which is better
   * this class is still not perfect as we still delete and recreate all styles every time we create a conditional style, format column or flashing cell
   * but actually that is not the end of the world as it doenst happen so often and at least we are not doing it when quick search is applied.
   */
  private createAdaptableFunctionStyles() {
    this.clearCSSRules();

    // Format Column
    this.adaptable.api.formatColumnApi.getAllFormatColumn().forEach(formatColumn => {
      const styleName = this.CreateUniqueStyleName(
        StrategyConstants.FormatColumnStrategyId,
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
    const conditionalStyles: ConditionalStyle[] = this.adaptable.api.conditionalStyleApi.getAllConditionalStyle();
    conditionalStyles
      .filter(x => x.ConditionalStyleScope == 'Row')
      .forEach(element => {
        const styleName = this.CreateUniqueStyleName(
          StrategyConstants.ConditionalStyleStrategyId,
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
    conditionalStyles
      .filter(x => x.ConditionalStyleScope == 'ColumnCategory')
      .forEach(element => {
        const styleName = this.CreateUniqueStyleName(
          StrategyConstants.ConditionalStyleStrategyId,
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
    conditionalStyles
      .filter(cs => cs.ConditionalStyleScope == 'Column')
      .forEach(element => {
        const styleName = this.CreateUniqueStyleName(
          StrategyConstants.ConditionalStyleStrategyId,
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
    /*
    conditionalStyles
      .filter(cs => cs.ConditionalStyleScope == 'DataType')
      .forEach(element => {
        const styleName = this.CreateUniqueStyleName(
          StrategyConstants.ConditionalStyleStrategyId,
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
      */

    // next we do Updated Rows - still not quite sure how this will work...
    const updatedRowState: UpdatedRowState = this.adaptable.api.updatedRowApi.getUpdatedRowState();
    if (updatedRowState.EnableUpdatedRow) {
      this.addCSSRule(
        `.${StyleConstants.UPDATED_ROW_UP_STYLE}`,
        `background-color: ${updatedRowState.UpColor} !important`
      );
      this.addCSSRule(
        `.${StyleConstants.UPDATED_ROW_DOWN_STYLE}`,
        `background-color: ${updatedRowState.DownColor} !important`
      );
      this.addCSSRule(
        `.${StyleConstants.UPDATED_ROW_NEUTRAL_STYLE}`,
        `background-color: ${updatedRowState.NeutralColor} !important`
      );
    }

    // quick search
    const quickSearchStyle: AdaptableStyle = this.adaptable.api.quickSearchApi.getQuickSearchStyle();
    if (StringExtensions.IsNullOrEmpty(quickSearchStyle.ClassName)) {
      const styleName = this.CreateStyleName(StrategyConstants.QuickSearchStrategyId);

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

    // alert
    // nothing to do as it uses existing styles

    // we define last Flash since it has the highest priority
    this.adaptable.api.flashingCellApi.getAllFlashingCell().forEach(element => {
      if (element.IsLive) {
        this.addCSSRule(
          `.${StyleConstants.FLASH_CELL_UP_STYLE}-${element.Uuid}`,
          `background-color: ${element.UpColor} !important`
        );
        this.addCSSRule(
          `.${StyleConstants.FLASH_CELL_DOWN_STYLE}-${element.Uuid}`,
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
    this.adaptable.AdaptableStore.on(QuickSearchRedux.QUICK_SEARCH_SET_DISPLAY, () => {
      this.createAdaptableFunctionStyles();
    });
    this.adaptable.AdaptableStore.on(QuickSearchRedux.QUICK_SEARCH_SET_STYLE, () => {
      this.createAdaptableFunctionStyles();
    });

    // Format Column
    this.adaptable.AdaptableStore.on(FormatColumnRedux.FORMAT_COLUMN_ADD, () => {
      this.setUpFormatColumn();
      this.createAdaptableFunctionStyles();
    });
    this.adaptable.AdaptableStore.on(FormatColumnRedux.FORMAT_COLUMN_EDIT, () => {
      this.setUpFormatColumn();
      this.createAdaptableFunctionStyles();
    });
    this.adaptable.AdaptableStore.on(FormatColumnRedux.FORMAT_COLUMN_DELETE, () => {
      this.setUpFormatColumn();
      this.createAdaptableFunctionStyles();
    });

    // Conditional Style
    this.adaptable.AdaptableStore.on(ConditionalStyleRedux.CONDITIONAL_STYLE_ADD, () => {
      this.setUpConditionalStyle();
      this.createAdaptableFunctionStyles();
    });
    this.adaptable.AdaptableStore.on(ConditionalStyleRedux.CONDITIONAL_STYLE_EDIT, () => {
      this.setUpConditionalStyle();
      this.createAdaptableFunctionStyles();
    });
    this.adaptable.AdaptableStore.on(ConditionalStyleRedux.CONDITIONAL_STYLE_DELETE, () => {
      this.setUpConditionalStyle();
      this.createAdaptableFunctionStyles();
    });

    // Alert Definition (note we dont need to create styles)
    this.adaptable.AdaptableStore.on(AlertRedux.ALERT_DEFIINITION_ADD, () => {
      this.setUpAlerts();
      // this.createAdaptableFunctionStyles();
    });
    this.adaptable.AdaptableStore.on(AlertRedux.ALERT_DEFIINITION_EDIT, () => {
      this.setUpAlerts();
      // this.createAdaptableFunctionStyles();
    });
    this.adaptable.AdaptableStore.on(AlertRedux.ALERT_DEFIINITION_DELETE, () => {
      this.setUpAlerts();
      //  this.createAdaptableFunctionStyles();
    });

    // Updated Row
    this.adaptable.AdaptableStore.on(UpdatedRowRedux.UPDATED_ROW_ENABLE_DISABLE, () => {
      this.setUpUpdatedRow();
      this.createAdaptableFunctionStyles();
    });
    this.adaptable.AdaptableStore.on(UpdatedRowRedux.UP_COLOR_SET, () => {
      this.setUpUpdatedRow();
      this.createAdaptableFunctionStyles();
    });
    this.adaptable.AdaptableStore.on(UpdatedRowRedux.DOWN_COLOR_SET, () => {
      this.setUpUpdatedRow();
      this.createAdaptableFunctionStyles();
    });
    this.adaptable.AdaptableStore.on(UpdatedRowRedux.NEUTRAL_COLOR_SET, () => {
      this.setUpUpdatedRow();
      this.createAdaptableFunctionStyles();
    });

    // Flashing Cell
    this.adaptable.AdaptableStore.on(FlashingCellsRedux.FLASHING_CELL_SELECT, () => {
      this.setUpFlashingCells();
      this.createAdaptableFunctionStyles();
    });
    this.adaptable.AdaptableStore.on(FlashingCellsRedux.FLASHING_CELL_SELECT_ALL, () => {
      this.setUpFlashingCells();
      this.createAdaptableFunctionStyles();
    });
    this.adaptable.AdaptableStore.on(FlashingCellsRedux.FLASHING_CELL_CHANGE_UP_COLOR, () => {
      this.setUpFlashingCells();
      this.createAdaptableFunctionStyles();
    });
    this.adaptable.AdaptableStore.on(FlashingCellsRedux.FLASHING_CELL_CHANGE_DOWN_COLOR, () => {
      this.setUpFlashingCells();
      this.createAdaptableFunctionStyles();
    });
    this.adaptable.AdaptableStore.on(FlashingCellsRedux.FLASHING_CELL_CHANGE_DURATION, () => {
      this.setUpFlashingCells();
      this.createAdaptableFunctionStyles();
    });
  }
}
