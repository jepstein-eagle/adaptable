/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Helper } from '../Core/Helper'
import { Form, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';


interface StyleSelectorProps extends React.ClassAttributes<StyleSelector> {
    hideForeColor?: boolean
    hideBackColor?: boolean
}

export class StyleSelector extends React.Component<StyleSelectorProps, {}> {
    public static defaultProps: StyleSelectorProps = {
        hideForeColor: false,
        hideBackColor: false
    };
    render() {
        return <Form inline>
            {!this.props.hideForeColor &&
                <FormGroup controlId="formInlineForeColor">
                    ForeColor
                {' '}
                    <FormControl type="color" placeholder="Enter a Number" style={{ width: '40px' }} />
                </FormGroup>
            }
            {' '}
            {!this.props.hideBackColor &&
                <FormGroup controlId="formInlineBackColor">
                    BackColor
                {' '}
                    <FormControl type="color" placeholder="Enter a Number" style={{ width: '40px' }} />
                </FormGroup>}
        </Form>
    }

}