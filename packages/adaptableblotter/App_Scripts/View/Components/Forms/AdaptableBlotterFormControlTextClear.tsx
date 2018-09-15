import * as React from "react";
import { StringExtensions } from '../../../Core/Extensions/StringExtensions'
import { FormControl, FormControlProps, ButtonGroup, Glyphicon, Sizes, InputGroup, DropdownButton } from 'react-bootstrap';
import { ButtonClear } from "../Buttons/ButtonClear";
import * as StyleConstants from '../../../Core/Constants/StyleConstants'


export interface AdaptableBlotterFormControlTextClearProps extends FormControlProps {
    OnTextChange: (textValue: string) => void
    autoFocus?: boolean
    cssClassName: string
}

export class AdaptableBlotterFormControlTextClear extends React.Component<AdaptableBlotterFormControlTextClearProps, {}> {
    render() {
        let size: any = (this.props.bsSize) ? this.props.bsSize : 'small'
        let cssClassName: string = this.props.cssClassName + StyleConstants.TEXT_ENTRY_FORM;

        return <span>
            <InputGroup>
                <FormControl
                    className={cssClassName}
                    autoFocus={this.props.autoFocus}
                    bsSize={size}
                    style={this.props.style}
                    type="text"
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={(x) => this.props.OnTextChange((x.target as HTMLInputElement).value)} />

                {StringExtensions.IsNotNullOrEmpty(this.props.value.toString()) &&
                    <InputGroup.Button>
                        <ButtonClear
                            bsStyle={"default"}
                            cssClassName={cssClassName}
                            onClick={() => this.props.OnTextChange("")}
                            size={size}
                            overrideTooltip="Clear"
                            ConfigEntity={null}
                            DisplayMode="Glyph" />
                    </InputGroup.Button>
                }
            </InputGroup>




        </span>
    }
}