import * as React from "react";
import { FormControl } from 'react-bootstrap';

export interface ColorPickerProps extends React.HTMLProps<ColorPicker> {
    ColorPalette: string[]
}

export class ColorPicker extends React.Component<ColorPickerProps, {}> {
    render(): any {
        const { ColorPalette, ...restProps } = this.props
        let ABcolorChoicesOptions = ColorPalette.map(x => <option key={x}>{x}</option>)
        let ABcolorChoices = <datalist id={'ABcolorChoices'}>
            {ABcolorChoicesOptions}
        </datalist>
        return <div className="adaptable_blotter_style_colorpicker" >
            <FormControl {...restProps} type="color" style={{ width: '70px' }} list='ABcolorChoices' />
            {ABcolorChoices}
        </div>
    }
}