import * as StyleConstants from '../../Utilities/Constants/StyleConstants'
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { FlashingCellState, ConditionalStyleState, QuickSearchState, FormatColumnState } from '../../Redux/ActionsReducers/Interface/IState';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { StyleHelper } from '../Helpers/StyleHelper';
import { EnumExtensions } from '../Extensions/EnumExtensions';
import { ConditionalStyleScope } from '../Enums';
import { StringExtensions } from '../Extensions/StringExtensions';

//Somehow all the CSSRules do not work so I end up just forcing the innerHTML......
export class StyleService {
    private FlashingCellState: FlashingCellState
    private ConditionalStyleState: ConditionalStyleState
    private QuickSearchState: QuickSearchState
    private FormatColumnState: FormatColumnState
    private sheet: CSSStyleSheet
    private style: HTMLStyleElement
    constructor(private blotter: IAdaptableBlotter) {
        // Create the <style> tag
        this.style = document.createElement("style");
        this.style.id = blotter.blotterOptions.containerOptions.adaptableBlotterContainer + '_' + blotter.blotterOptions.blotterId +'-style';
        // WebKit hack :(
        this.style.appendChild(document.createTextNode(""));
        // Add the <style> element to the page
        document.head.appendChild(this.style);

        this.sheet = <CSSStyleSheet>this.style.sheet
        this.InitState();
        blotter.adaptableBlotterStore.TheStore.subscribe(() => this.InitState())
    }

    InitState() {

        if (this.FlashingCellState != this.blotter.api.flashingCellApi.getFlashingCellState()
            || this.ConditionalStyleState != this.blotter.api.conditionalStyleApi.getConditionalStyleState()
            || this.QuickSearchState != this.blotter.api.quickSearchApi.getQuickSearchState()
            || this.FormatColumnState != this.blotter.api.formatColumnApi.getFormatColumnState()) {
            this.FlashingCellState = this.blotter.api.flashingCellApi.getFlashingCellState();
            this.ConditionalStyleState = this.blotter.api.conditionalStyleApi.getConditionalStyleState();
            this.FormatColumnState = this.blotter.api.formatColumnApi.getFormatColumnState();
            this.QuickSearchState = this.blotter.api.quickSearchApi.getQuickSearchState();
            this.clearCSSRules()

            // Format Column
            this.FormatColumnState.FormatColumns.forEach((formatColumn, index) => {
                let styleName = StyleHelper.CreateIndexedStyleName(StrategyConstants.FormatColumnStrategyId, this.FormatColumnState.FormatColumns.indexOf(formatColumn), this.blotter)
                this.addCSSRule("." + styleName,
                    'background-color: ' + formatColumn.Style.BackColor + ' !important;color: ' + formatColumn.Style.ForeColor + ' !important;font-weight: ' + formatColumn.Style.FontWeight + ' !important;font-style: ' + formatColumn.Style.FontStyle + ' !important;' + (formatColumn.Style.FontSize ? ('font-size: ' + EnumExtensions.getCssFontSizeFromFontSizeEnum(formatColumn.Style.FontSize) + ' !important') : ''))
            });

            //we define first the row conditions and then columns so priority of CS col > CS Row and allow a record to have both
            this.ConditionalStyleState.ConditionalStyles.filter(x => x.ConditionalStyleScope == ConditionalStyleScope.Row).forEach((element, index) => {
                let styleName = StyleHelper.CreateIndexedStyleName(StrategyConstants.ConditionalStyleStrategyId, this.ConditionalStyleState.ConditionalStyles.indexOf(element), this.blotter)
                this.addCSSRule("." + styleName, 'background-color: ' + element.Style.BackColor + ' !important;color: ' + element.Style.ForeColor + ' !important;font-weight: ' + element.Style.FontWeight + ' !important;font-style: ' + element.Style.FontStyle + ' !important;' + (element.Style.FontSize ? ('font-size: ' + EnumExtensions.getCssFontSizeFromFontSizeEnum(element.Style.FontSize) + ' !important') : ''))
            });
            this.ConditionalStyleState.ConditionalStyles.filter(x => x.ConditionalStyleScope == ConditionalStyleScope.ColumnCategory).forEach((element, index) => {
                let styleName = StyleHelper.CreateIndexedStyleName(StrategyConstants.ConditionalStyleStrategyId, this.ConditionalStyleState.ConditionalStyles.indexOf(element), this.blotter)
                this.addCSSRule("." + styleName, 'background-color: ' + element.Style.BackColor + ' !important;color: ' + element.Style.ForeColor + ' !important;font-weight: ' + element.Style.FontWeight + ' !important;font-style: ' + element.Style.FontStyle + ' !important;' + (element.Style.FontSize ? ('font-size: ' + EnumExtensions.getCssFontSizeFromFontSizeEnum(element.Style.FontSize) + ' !important') : ''))
            });
            this.ConditionalStyleState.ConditionalStyles.filter(x => x.ConditionalStyleScope == ConditionalStyleScope.Column).forEach((element, index) => {
                let styleName = StyleHelper.CreateIndexedStyleName(StrategyConstants.ConditionalStyleStrategyId, this.ConditionalStyleState.ConditionalStyles.indexOf(element), this.blotter)
                this.addCSSRule("." + styleName, 'background-color: ' + element.Style.BackColor + ' !important;color: ' + element.Style.ForeColor + ' !important;font-weight: ' + element.Style.FontWeight + ' !important;font-style: ' + element.Style.FontStyle + ' !important;' + (element.Style.FontSize ? ('font-size: ' + EnumExtensions.getCssFontSizeFromFontSizeEnum(element.Style.FontSize) + ' !important') : ''))
            });

            // quick search
            if (StringExtensions.IsNullOrEmpty(this.QuickSearchState.Style.ClassName)) {
                let styleName = StyleHelper.CreateStyleName(StrategyConstants.QuickSearchStrategyId, this.blotter)
                this.addCSSRule("." + styleName, 'background-color: ' + this.QuickSearchState.Style.BackColor + ' !important;color: ' + this.QuickSearchState.Style.ForeColor + ' !important;font-weight: ' + this.QuickSearchState.Style.FontWeight + ' !important;font-style: ' + this.QuickSearchState.Style.FontStyle + ' !important;' + (this.QuickSearchState.Style.FontSize ? ('font-size: ' + EnumExtensions.getCssFontSizeFromFontSizeEnum(this.QuickSearchState.Style.FontSize) + ' !important') : ''))
            }
            //we define last Flash since it has the highest priority
            this.FlashingCellState.FlashingCells.forEach((element, index) => {
                if (element.IsLive) {
                    this.addCSSRule("." + StyleConstants.FLASH_UP_STYLE + index, 'background-color: ' + element.UpColor + ' !important')
                    this.addCSSRule("." + StyleConstants.FLASH_DOWN_STYLE + index, 'background-color: ' + element.DownColor + ' !important')
                }
            });
        }
    }

    private clearCSSRules() {
        this.style.innerHTML = ""
    }

    private addCSSRule(selector: string, rules: string) {
        this.style.innerHTML += selector + "{" + rules + "}" + "\n"
    }

}