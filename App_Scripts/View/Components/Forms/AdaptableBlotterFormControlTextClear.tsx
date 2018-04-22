import * as React from "react";
import { StringExtensions } from '../../../Core/Extensions/StringExtensions'
import { FormControl, FormControlProps, ButtonGroup, Glyphicon, Sizes } from 'react-bootstrap';

export interface AdaptableBlotterFormControlTextClearProps extends FormControlProps {
    OnTextChange: (textValue: string) => void
    autoFocus?: boolean
    
}

export class AdaptableBlotterFormControlTextClear extends React.Component<AdaptableBlotterFormControlTextClearProps, {}> {
    render() {
        let size: any =(this.props.bsSize)? this.props.bsSize: 'small'
        return <ButtonGroup>
            <FormControl
               autoFocus = {this.props.autoFocus}
               bsSize={this.props.bsSize}
               style={this.props.style}
                type="text"
                placeholder={this.props.placeholder}
                value={this.props.value}
                onChange={(x) => this.props.OnTextChange((x.target as HTMLInputElement).value)} />
            {
                StringExtensions.IsNotNullOrEmpty(String(this.props.value)) &&
                <Glyphicon className="ab_clear_button" glyph={"remove-circle"} onClick={() => this.props.OnTextChange("")}></Glyphicon>
            }

        </ButtonGroup>
    }
}