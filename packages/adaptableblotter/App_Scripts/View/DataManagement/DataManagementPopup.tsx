import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import {  HelpBlock } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { UIHelper } from '../UIHelper';
import { AccessLevel } from "../../Utilities/Enums";

interface DataManagementPopupProps extends StrategyViewPopupProps<DataManagementPopupComponent> {
}


class DataManagementPopupComponent extends React.Component<DataManagementPopupProps, {}> {

    constructor(props: DataManagementPopupProps) {
        super(props);
        this.state = UIHelper.getEmptyConfigState();
    }

    render() {
        let cssClassName: string = this.props.cssClassName + "__userDataManagement";
        
        let infoBody: any[] = ["Function that clears user config - for development use only."]

        let clearButton = <ButtonClear cssClassName={cssClassName} onClick={() => this.onClear()}
            bsStyle={"default"}
            overrideText={"Clear User Data"}
            overrideTooltip="Clear User Data"
            DisplayMode="Text"
            size={"small"} 
            AccessLevel={AccessLevel.Full}
            />

        return <div className={cssClassName}>
            <PanelWithButton headerText={StrategyConstants.DataManagementStrategyName} button={null} bsStyle="primary" cssClassName={cssClassName} glyphicon={StrategyConstants.DataManagementGlyph} infoBody={infoBody}>
                <HelpBlock>Click below to clear all current state.
                    <br /><br />
                    When you restart / refresh the Blotter any state that you have previously created will be lost and only the 'predefined config' will be re-added.
                    <br /><br />
                    <b>This option only appears in non production builds.</b>
                    </HelpBlock>

                {clearButton}

            </PanelWithButton>
        </div>
    }

    onClear() {
        this.props.Blotter.api.configApi.configDeleteLocalStorage();
    }



}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
    };
}

export let DataManagementPopup = connect(mapStateToProps, mapDispatchToProps)(DataManagementPopupComponent);
