import { ConditionalStyleScope } from '../Enums';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { FlashingCellState, QuickSearchState, ConditionalStyleState, FormatColumnState } from '../../Redux/ActionsReducers/Interface/IState';
import { EnumExtensions } from '../../Core/Extensions/EnumExtensions';
import * as StyleConstants from '../../Core/Constants/StyleConstants'
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
        // WebKit hack :(
        this.style.appendChild(document.createTextNode(""));
        // Add the <style> element to the page
        document.head.appendChild(this.style);

        this.sheet = <CSSStyleSheet>this.style.sheet
        this.InitState();
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState())
    }

    InitState() {



        if (this.FlashingCellState != this.blotter.AdaptableBlotterStore.TheStore.getState().FlashingCell
            || this.ConditionalStyleState != this.blotter.AdaptableBlotterStore.TheStore.getState().ConditionalStyle
            || this.QuickSearchState != this.blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch
            || this.FormatColumnState != this.blotter.AdaptableBlotterStore.TheStore.getState().FormatColumn) {
            this.FlashingCellState = this.blotter.AdaptableBlotterStore.TheStore.getState().FlashingCell;
            this.ConditionalStyleState = this.blotter.AdaptableBlotterStore.TheStore.getState().ConditionalStyle
            this.FormatColumnState = this.blotter.AdaptableBlotterStore.TheStore.getState().FormatColumn
            this.QuickSearchState = this.blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch
            this.clearCSSRules()

            this.FormatColumnState.FormatColumns.forEach((formatColumn, index) => {
                this.addCSSRule("." + StyleConstants.FORMAT_COLUMN_STYLE + this.FormatColumnState.FormatColumns.indexOf(formatColumn),
                    'background-color: ' + formatColumn.Style.BackColor + ' !important;color: ' + formatColumn.Style.ForeColor + ' !important;font-weight: ' + formatColumn.Style.FontWeight + ' !important;font-style: ' + formatColumn.Style.FontStyle + ' !important;' + (formatColumn.Style.FontSize ? ('font-size: ' + EnumExtensions.getCssFontSizeFromFontSizeEnum(formatColumn.Style.FontSize) + ' !important') : ''))
            });

            //we define first the row conditions and then columns so priority of CS col > CS Row and allow a record to have both
            this.ConditionalStyleState.ConditionalStyles.filter(x => x.ConditionalStyleScope == ConditionalStyleScope.Row).forEach((element, index) => {
                this.addCSSRule("." + StyleConstants.CONDITIONAL_STYLE_STYLE + this.ConditionalStyleState.ConditionalStyles.indexOf(element), 'background-color: ' + element.Style.BackColor + ' !important;color: ' + element.Style.ForeColor + ' !important;font-weight: ' + element.Style.FontWeight + ' !important;font-style: ' + element.Style.FontStyle + ' !important;' + (element.Style.FontSize ? ('font-size: ' + EnumExtensions.getCssFontSizeFromFontSizeEnum(element.Style.FontSize) + ' !important') : ''))
            });
            this.ConditionalStyleState.ConditionalStyles.filter(x => x.ConditionalStyleScope == ConditionalStyleScope.Column).forEach((element, index) => {
                this.addCSSRule("." + StyleConstants.CONDITIONAL_STYLE_STYLE + this.ConditionalStyleState.ConditionalStyles.indexOf(element), 'background-color: ' + element.Style.BackColor + ' !important;color: ' + element.Style.ForeColor + ' !important;font-weight: ' + element.Style.FontWeight + ' !important;font-style: ' + element.Style.FontStyle + ' !important;' + (element.Style.FontSize ? ('font-size: ' + EnumExtensions.getCssFontSizeFromFontSizeEnum(element.Style.FontSize) + ' !important') : ''))
            });


            // quick search
            if (StringExtensions.IsNullOrEmpty(this.QuickSearchState.Style.ClassName)) {
                this.addCSSRule("." + StyleConstants.QUICK_SEARCH_STYLE, 'background-color: ' + this.QuickSearchState.Style.BackColor + ' !important;color: ' + this.QuickSearchState.Style.ForeColor + ' !important;font-weight: ' + this.QuickSearchState.Style.FontWeight + ' !important;font-style: ' + this.QuickSearchState.Style.FontStyle + ' !important;' + (this.QuickSearchState.Style.FontSize ? ('font-size: ' + EnumExtensions.getCssFontSizeFromFontSizeEnum(this.QuickSearchState.Style.FontSize) + ' !important') : ''))
            }
            //we define last Flash since it has the highest priority
            this.FlashingCellState.FlashingCells.forEach((element, index) => {
                this.addCSSRule("." + StyleConstants.FLASH_UP_STYLE + index, 'background-color: ' + element.UpColor + ' !important')
                this.addCSSRule("." + StyleConstants.FLASH_DOWN_STYLE + index, 'background-color: ' + element.DownColor + ' !important')
            });
        }
    }

    private clearCSSRules() {
        this.style.innerHTML = ""
        // let i = this.sheet.cssRules.length - 1;
        // while (i >= 0) {
        //     if ("deleteRule" in this.sheet) { this.sheet.deleteRule(i); }
        //     else if ("removeRule" in this.sheet) { this.sheet.removeRule(i); }
        //     i--;
        // }
    }

    private addCSSRule(selector: string, rules: string) {
        this.style.innerHTML += selector + "{" + rules + "}" + "\n"
        // if ("insertRule" in this.sheet) {
        //     this.style.innerHTML += selector + "{" + rules + "}"
        //     this.sheet.insertRule(selector + "{" + rules + "}", this.sheet.cssRules.length);
        // }
        // else if ("addRule" in this.sheet) {
        //     this.sheet.addRule(selector, rules);
        // }
    }


}