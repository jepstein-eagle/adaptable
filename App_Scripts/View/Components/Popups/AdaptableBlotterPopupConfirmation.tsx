import * as React from "react";
//we use that syntax to import the default export from the module.... Took me a while to find the syntax
import SweetAlert from 'react-bootstrap-sweetalert'

export interface AdaptableBlotterPopupConfirmationProps extends React.ClassAttributes<AdaptableBlotterPopupConfirmation> {
    ShowPopup: boolean
    onConfirm: Function
    onCancel: Function
    Title: string
    Msg: string
    ConfirmText: string
    CancelText: string
}

export class AdaptableBlotterPopupConfirmation extends React.Component<AdaptableBlotterPopupConfirmationProps, {}> {
    render() {
        return this.props.ShowPopup && <SweetAlert
            warning
            showCancel
            confirmBtnBsStyle="danger"
            confirmBtnText={this.props.ConfirmText}
            cancelBtnBsStyle="default"
            cancelBtnText={this.props.CancelText}
            title={this.props.Title}
            onConfirm={() => this.props.onConfirm()}
            onCancel={() => this.props.onCancel()} >
            <p>
                {this.props.Msg.split("\n").map(function (item, index) {
                    return (
                        <span key={index}>
                            {item}
                            <br />
                        </span>
                    )
                })}
            </p>
        </SweetAlert>
    }

}