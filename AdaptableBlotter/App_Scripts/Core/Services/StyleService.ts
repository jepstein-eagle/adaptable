
import { IAdaptableBlotter, IColumn } from '../Interface/IAdaptableBlotter';
import { FlashingCellState } from '../../Redux/ActionsReducers/Interface/IState';
import { ConditionalStyleState } from '../../Redux/ActionsReducers/Interface/IState';

//Somehow all this fucking CSSRules do not work so I end up just forcing the innerHTML......
export class StyleService {
    private FlashingCellState: FlashingCellState
    private ConditionalStyleState: ConditionalStyleState
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
            || this.ConditionalStyleState != this.blotter.AdaptableBlotterStore.TheStore.getState().ConditionalStyle) {
            this.FlashingCellState = this.blotter.AdaptableBlotterStore.TheStore.getState().FlashingCell;
            this.ConditionalStyleState = this.blotter.AdaptableBlotterStore.TheStore.getState().ConditionalStyle
            this.clearCSSRules()
            this.FlashingCellState.FlashingColumns.forEach((element, index) => {
                this.addCSSRule(".FlashUp" + index, 'background-color: ' + element.UpBackColor + ' !important')
                this.addCSSRule(".FlashDown" + index, 'background-color: ' + element.DownBackColor + ' !important')
            });
            this.ConditionalStyleState.ConditionalStyleConditions.forEach((element, index) => {
                this.addCSSRule(".Ab-ConditionalStyle-" + index, 'background-color: ' + element.BackColor + ' !important;color: ' + element.ForeColor + ' !important')

            });
            // quick search
            this.addCSSRule(".QuickSearch", 'background-color: #FFFFCC !important;color: #000000  !important')
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
