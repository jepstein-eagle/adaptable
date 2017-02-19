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
            cancelBtnBsStyle="default"
            title={this.props.Title}
            onConfirm={(inputValue:any) => this.onValueConfirmed(inputValue)}
            onCancel={() => this.props.onClose()}
         >
        </SweetAlert>
    }



    onValueConfirmed(inputValue: any) {
      // cannot work out how to get the value "back" to calling function in a react way...
      alert(inputValue);
        this.props.onConfirm(inputValue)
        this.props.onClose();
    }
}