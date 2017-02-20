/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux'
//we use that syntax to import the default export from the module.... Took me a while to find the syntax
import SweetAlert from 'react-bootstrap-sweetalert'
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter';


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
            confirmBtnBsStyle="primary"
            cancelBtnBsStyle="default"
            title={this.props.Title}
            onConfirm={(inputValue: any) => this.props.onConfirm(inputValue)}
            onCancel={() => this.props.onClose()}
        >
        </SweetAlert>
    }
}