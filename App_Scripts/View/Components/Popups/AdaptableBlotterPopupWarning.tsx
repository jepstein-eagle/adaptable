import * as React from "react";
//we use that syntax to import the default export from the module.... Took me a while to find the syntax
import SweetAlert from 'react-bootstrap-sweetalert'

export interface AdaptableBlotterPopupWarningProps extends React.ClassAttributes<AdaptableBlotterPopupWarning> {
    ShowPopup: boolean
    onClose: Function
    Msg: string
}

export class AdaptableBlotterPopupWarning extends React.Component<AdaptableBlotterPopupWarningProps, {}> {
    render() {
        return this.props.ShowPopup && <div className="adaptable_blotter_style_popup_warning">
            <SweetAlert
                warning
                confirmBtnBsStyle="warning" title="Warning" bsSize="small"
                btnSize="sm"
                onConfirm={() => this.props.onClose()} >
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
        </div>
    }

}