import * as React from "react";
//we use that syntax to import the default export from the module.... Took me a while to find the syntax
import SweetAlert from 'react-bootstrap-sweetalert'
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';

export interface AdaptableBlotterPopupWarningProps extends React.ClassAttributes<AdaptableBlotterPopupWarning> {
    ShowPopup: boolean
    onClose: Function
    Msg: string
    Header: string
}

export class AdaptableBlotterPopupWarning extends React.Component<AdaptableBlotterPopupWarningProps, {}> {
    render() {
        return <div> this is dead
        </div>
    }

}