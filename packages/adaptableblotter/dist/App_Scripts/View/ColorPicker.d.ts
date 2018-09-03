import * as React from "react";
export interface ColorPickerProps extends React.HTMLProps<ColorPicker> {
    ColorPalette: string[];
}
export declare class ColorPicker extends React.Component<ColorPickerProps, {}> {
    render(): any;
}
