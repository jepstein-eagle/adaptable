import * as React from "react";
//we use that syntax to import the default export from the module.... Took me a while to find the syntax
import SweetAlert from 'react-bootstrap-sweetalert'
import * as StyleConstants from '../../../Core/Constants/StyleConstants';

export interface AdaptableBlotterPopupInfoProps extends React.ClassAttributes<AdaptableBlotterPopupInfo> {
    ShowPopup: boolean
    onClose: Function
    Msg: string
    Header: string
}

export class AdaptableBlotterPopupInfo extends React.Component<AdaptableBlotterPopupInfoProps, {}> {
    render() {
        return this.props.ShowPopup && <div className={StyleConstants.POPUP_INFO}>
            <SweetAlert
                success
                confirmBtnBsStyle="success" title={this.props.Header} onConfirm={() => this.props.onClose()} >
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