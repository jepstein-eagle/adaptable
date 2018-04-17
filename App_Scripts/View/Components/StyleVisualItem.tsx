import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import { IStyle } from '../../Core/Interface/IStyle';
import { EnumExtensions } from '../../Core/Extensions/EnumExtensions';
import { FontWeight, FontStyle } from '../../Core/Enums';

export interface StyleVisualItemProps extends React.ClassAttributes<StyleVisualItem> {
    Style: IStyle
}

export class StyleVisualItem extends React.Component<StyleVisualItemProps, {}> {
    render(): any {
        let styleVisualisation: any
        if (this.props.Style.ClassName) {
            styleVisualisation = <div>{"CSS Class: " + this.props.Style.ClassName}</div>
        } else {
            let backColorForStyle: string = this.props.Style.BackColor != undefined ? this.props.Style.BackColor : null;
            let foreColorForStyle: string = this.props.Style.ForeColor != undefined ? this.props.Style.ForeColor : "black";
            let fontWeightForStyle: any = this.props.Style.FontWeight == FontWeight.Bold ? "bold" : "normal"
            let fontStyleForStyle: any = this.props.Style.FontStyle == FontStyle.Italic ? "italic" : "normal"
            let fontSizeForStyle: any = EnumExtensions.getCssFontSizeFromFontSizeEnum(this.props.Style.FontSize);
            styleVisualisation = <div className={this.props.Style.BackColor != undefined ? "" : "adaptable_blotter_white_grey_stripes"}
                style={{
                    textAlign: 'center',
                    margin: '2px',
                    padding: '3px',
                    background: backColorForStyle,
                    color: foreColorForStyle,
                    fontWeight: fontWeightForStyle,
                    fontStyle: fontStyleForStyle,
                    fontSize: fontSizeForStyle
                }}>Style</div>

        }
        return styleVisualisation;
    }
}
