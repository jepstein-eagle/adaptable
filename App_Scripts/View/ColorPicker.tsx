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
    <option>#000000</option>  {/* black */}
    <option>#ffffff</option>  {/* white */}
    <option>#C0C0C0</option>  {/* light gray */}
    <option>#808080</option>  {/* dark gray */}
    <option>#800000</option>  {/* brown */}

    <option>#808000</option>  {/* olive */}
    <option>#008000</option>  {/* dark green */}
    <option>#00FF00</option>  {/* light green */}
    <option>#FFFF00</option>  {/* yellow */}
    <option>#FFFFCC</option>  {/* pale yellow (quick search default) */}

    <option>#000080</option>  {/* dark blue */}
    <option>#0000FF</option>  {/* blue */}
    <option>#008080</option>  {/* cyan */}
    <option>#00FFFF</option>  {/* light blue */}
    <option>#FF00FF</option>  {/* pink */}

    <option>#800080</option>  {/* purple */}
    <option>#8B0000</option>  {/* dark red */}
    <option>#FF0000</option>  {/* red */}
    <option>#FF6961</option>  {/* pastel red */}
    <option>#FFA500</option>  {/* orange */}



</datalist>
