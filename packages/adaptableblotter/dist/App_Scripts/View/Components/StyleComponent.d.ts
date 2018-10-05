import * as React from "react";
import { IStyle } from "../../Core/Api/Interface/IAdaptableBlotterObjects";
export interface StyleComponentProps extends React.ClassAttributes<StyleComponent> {
    ColorPalette: string[];
    StyleClassNames: string[];
    Style: IStyle;
    UpdateStyle: (style: IStyle) => void;
    CanUseClassName: boolean;
    cssClassName: string;
}
export interface StyleComponentState {
    myStyle: IStyle;
    ShowClassName: boolean;
}
export declare class StyleComponent extends React.Component<StyleComponentProps, StyleComponentState> {
    constructor(props: StyleComponentProps);
    render(): JSX.Element;
    private onShowClassNameChanged;
    private onStyleClassNameChanged;
    private onUseBackColorCheckChange;
    private onUseForeColorCheckChange;
    private onUseFontSizeCheckChange;
    private onBackColorSelectChange;
    private onForeColorSelectChange;
    private onFontWeightChange;
    private onFontStyleChange;
    private onFontSizeChange;
}
