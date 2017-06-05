import * as React from "react";
//we use that syntax to import the default export from the module.... Took me a while to find the syntax
import SweetAlert from 'react-bootstrap-sweetalert'

export interface AdaptableBlotterPopupErrorProps extends React.ClassAttributes<AdaptableBlotterPopupError> {
    ShowPopup: boolean
    onClose: Function
    Msg: string
}

export class AdaptableBlotterPopupError extends React.Component<AdaptableBlotterPopupErrorProps, {}> {

    render() {
        return this.props.ShowPopup && <SweetAlert danger confirmBtnBsStyle="danger" title="Error" onConfirm={() => this.props.onClose()} >
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