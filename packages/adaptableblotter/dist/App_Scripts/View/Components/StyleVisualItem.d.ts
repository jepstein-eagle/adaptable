import * as React from "react";
import { IStyle } from "../../Utilities/Interface/IStyle";
export interface StyleVisualItemProps extends React.ClassAttributes<StyleVisualItem> {
    Style: IStyle;
}
export declare class StyleVisualItem extends React.Component<StyleVisualItemProps, {}> {
    render(): any;
}
