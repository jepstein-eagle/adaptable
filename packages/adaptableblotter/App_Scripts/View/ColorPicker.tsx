import * as React from "react";
import { FormControl } from 'react-bootstrap';
import * as StyleConstants from '../Core/Constants/StyleConstants';


export interface ColorPickerProps extends React.HTMLProps<ColorPicker> {
    ColorPalette: string[]
   }

export class ColorPicker extends React.Component<ColorPickerProps, {}> {
    render(): any {
      // let cssClassName: string= this.props.cssClassName + StyleConstants.COLOR_PICKER
        const { ColorPalette, ...restProps } = this.props
        let ABcolorChoicesOptions = ColorPalette.map(x => <option key={x}>{x}</option>)
        let ABcolorChoices = <datalist id={'ABcolorChoices'}>
            {ABcolorChoicesOptions}
        </datalist>
        return <div className={"ColorPicker"} >
            <FormControl {...restProps} type="color" style={{ width: '70px' }} list='ABcolorChoices' />
            {ABcolorChoices}
        </div>
    }
}