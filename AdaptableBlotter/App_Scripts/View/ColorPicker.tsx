/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Helper } from '../Core/Helper'
import { FormControl } from 'react-bootstrap';



interface ColorPickerProps extends React.HTMLProps<ColorPicker> {
}

export class ColorPicker extends React.Component<ColorPickerProps, {}> {
    render(): any {

        return <div>
            <FormControl {...this.props} type="color" style={{ width: '70px' }} list='ABcolorChoices' />
            {ABcolorChoices}
        </div>
    }
}

//common colors from http://htmlcolorcodes.com/
const ABcolorChoices = <datalist id={'ABcolorChoices'}>
    <option>#000000</option>
    <option>#ffffff</option>
    <option>#C0C0C0</option>
    <option>#808080</option>
    <option>#FF0000</option>
    <option>#FFFFCC</option>
    <option>#FFFF00</option>
    <option>#808000</option>
    <option>#00FF00</option>
    <option>#008000</option>
    <option>#00FFFF</option>
    <option>#008080</option>
    <option>#0000FF</option>
    <option>#000080</option>
    <option>#FF00FF</option>
    <option>#800080</option>
    <option>#800000</option>
    
</datalist>
