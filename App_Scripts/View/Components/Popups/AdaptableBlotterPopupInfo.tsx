import * as React from "react";
//we use that syntax to import the default export from the module.... Took me a while to find the syntax
import SweetAlert from 'react-bootstrap-sweetalert'

export interface AdaptableBlotterPopupInfoProps extends React.ClassAttributes<AdaptableBlotterPopupInfo> {
    ShowPopup: boolean
    onClose: Function
    Msg: string
}

export class AdaptableBlotterPopupInfo extends React.Component<AdaptableBlotterPopupInfoProps, {}> {
    render() {
        return this.props.ShowPopup && <SweetAlert 
        success 
        confirmBtnBsStyle="success" title="Info" onConfirm={() => this.props.onClose()} >
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