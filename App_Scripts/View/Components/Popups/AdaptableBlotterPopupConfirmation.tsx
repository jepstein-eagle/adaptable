import * as React from "react";
//we use that syntax to import the default export from the module.... Took me a while to find the syntax
import SweetAlert from 'react-bootstrap-sweetalert'
import * as StyleConstants from '../../../Core/Constants/StyleConstants';


export interface AdaptableBlotterPopupConfirmationProps extends React.ClassAttributes<AdaptableBlotterPopupConfirmation> {
    ShowPopup: boolean
    onConfirm: (comment: string) => void
    onCancel: Function
    Title: string
    Msg: string
    ConfirmText: string
    CancelText: string
    ShowCommentBox: boolean
}

export class AdaptableBlotterPopupConfirmation extends React.Component<AdaptableBlotterPopupConfirmationProps, {}> {
    render() {
        let title = this.props.ShowCommentBox ? <span>
            <SweetAlert.WarningIcon  />
            {this.props.Title}
        </span> : this.props.Title
        let msgSplit = this.props.Msg.split("\n")
        return this.props.ShowPopup && <div className={StyleConstants.POPUP_CONFIRMATION}>
            <SweetAlert
                type={this.props.ShowCommentBox ? "input" : "warning"}
                btnSize="sm"
                showCancel
                confirmBtnBsStyle="primary"
                confirmBtnBsSize="sm"
                
                confirmBtnText={this.props.ConfirmText}
                cancelBtnBsStyle="default"
                cancelBtnText={this.props.CancelText}
                title={title}
                placeholder={"Please enter a comment to confirm"}
                onConfirm={(inputValue: string) => this.props.onConfirm(inputValue)}
                onCancel={() => this.props.onCancel()} >
                <p>
                    {msgSplit.map(function (item, index) {
                        return (
                            <span key={index}>
                                {item}
                                {index != msgSplit.length - 1 && <br />}
                            </span>
                        )
                    })}
                </p>
            </SweetAlert>
        </div>
    }

}