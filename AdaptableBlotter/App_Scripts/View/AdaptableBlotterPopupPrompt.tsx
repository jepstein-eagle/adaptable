/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
//we use that syntax to import the default export from the module.... Took me a while to find the syntax
import SweetAlert from 'react-bootstrap-sweetalert'

interface AdaptableBlotterPopupPromptProps extends React.ClassAttributes<AdaptableBlotterPopupPrompt> {
    ShowPopup: boolean
    Title: string
    Msg: string
    onClose: Function
onConfirm: Function
}

export class AdaptableBlotterPopupPrompt extends React.Component<AdaptableBlotterPopupPromptProps, {}> {
    render() {
        return this.props.ShowPopup && <SweetAlert
            input
            showCancel
            placeholder={this.props.Msg}
            cancelBtnBsStyle="default"
            title={this.props.Title}
            onConfirm={() => this.onValueConfirmed()}
            onCancel={() => this.props.onClose()}
        >
        </SweetAlert>
    }

    onValueConfirmed() {
     //   alert('hello');
        this.props.onConfirm();
    }
}