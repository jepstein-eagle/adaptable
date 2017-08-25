import { ConditionalStyleScope } from '../Enums';

import { IAdaptableBlotter, IColumn } from '../Interface/IAdaptableBlotter';
import { FlashingCellState } from '../../Redux/ActionsReducers/Interface/IState';
import { ConditionalStyleState } from '../../Redux/ActionsReducers/Interface/IState';
import { FontWeight, FontStyle, FontSize } from '../../Core/Enums';
import { EnumExtensions } from '../../Core/Extensions';


//Somehow all this fucking CSSRules do not work so I end up just forcing the innerHTML......
export class StyleService {
    private FlashingCellState: FlashingCellState
    private ConditionalStyleState: ConditionalStyleState
    private QuickSearchBackColor: string
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
            || this.QuickSearchBackColor != this.blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch.QuickSearchBackColor) {
            this.FlashingCellState = this.blotter.AdaptableBlotterStore.TheStore.getState().FlashingCell;
            this.ConditionalStyleState = this.blotter.AdaptableBlotterStore.TheStore.getState().ConditionalStyle
            this.QuickSearchBackColor = this.blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch.QuickSearchBackColor
            this.clearCSSRules()
            //we define first the row conditions and then columns so priority of CS col > CS Row and allow a record to have both
            this.ConditionalStyleState.ConditionalStyleConditions.filter(x => x.ConditionalStyleScope == ConditionalStyleScope.Row).forEach((element, index) => {
                this.addCSSRule(".Ab-ConditionalStyle-" + this.ConditionalStyleState.ConditionalStyleConditions.indexOf(element), 'background-color: ' + element.Style.BackColor + ' !important;color: ' + element.Style.ForeColor + ' !important;font-weight: ' + FontWeight[element.Style.FontWeight] + ' !important;font-style: ' + FontStyle[element.Style.FontStyle] + ' !important;' + (element.Style.FontSize ? ('font-size: ' + EnumExtensions.getCssFontSizeFromFontSizeEnum(element.Style.FontSize) + ' !important') : ''))
            });
            this.ConditionalStyleState.ConditionalStyleConditions.filter(x => x.ConditionalStyleScope == ConditionalStyleScope.Column).forEach((element, index) => {
                this.addCSSRule(".Ab-ConditionalStyle-" + this.ConditionalStyleState.ConditionalStyleConditions.indexOf(element), 'background-color: ' + element.Style.BackColor + ' !important;color: ' + element.Style.ForeColor + ' !important;font-weight: ' + FontWeight[element.Style.FontWeight] + ' !important;font-style: ' + FontStyle[element.Style.FontStyle] + ' !important;' + (element.Style.FontSize ? ('font-size: ' + EnumExtensions.getCssFontSizeFromFontSizeEnum(element.Style.FontSize) + ' !important') : ''))
            });
            // quick search
            this.addCSSRule(".Ab-QuickSearch", 'background-color: ' + this.QuickSearchBackColor + ' !important')
            //we define last Flash since it has the highest priority
            this.FlashingCellState.FlashingColumns.forEach((element, index) => {
                this.addCSSRule(".Ab-FlashUp" + index, 'background-color: ' + element.UpBackColor + ' !important')
                this.addCSSRule(".Ab-FlashDown" + index, 'background-color: ' + element.DownBackColor + ' !important')
            });
        }
    }

    private clearCSSRules() {
        this.style.innerHTML = ""
        // var i = this.sheet.cssRules.length - 1;
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
