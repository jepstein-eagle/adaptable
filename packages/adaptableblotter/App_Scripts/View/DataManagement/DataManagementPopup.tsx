import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { Well } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { UIHelper } from '../UIHelper';
import { AccessLevel } from "../../Core/Enums";

interface DataManagementPopupProps extends StrategyViewPopupProps<DataManagementPopupComponent> {
}


class DataManagementPopupComponent extends React.Component<DataManagementPopupProps, {}> {

    constructor(props: DataManagementPopupProps) {
        super(props);
        this.state = UIHelper.EmptyConfigState();
    }

    render() {
        let cssClassName: string = this.props.cssClassName + "__userDataManagement";
        
        let infoBody: any[] = ["Function that clears user config - for development use only."]

        let clearButton = <ButtonClear cssClassName={cssClassName} onClick={() => this.onClear()}
            bsStyle={"default"}
            overrideText={"Clear User Data"}
            overrideTooltip="Clear User Data"
            DisplayMode="Text"
            size={"large"} 
            AccessLevel={AccessLevel.Full}
            />

        return <div className={cssClassName}>
            <PanelWithButton headerText={StrategyIds.DataManagementStrategyName} button={null} bsStyle="primary" cssClassName={cssClassName} glyphicon={StrategyIds.DataManagementGlyph} infoBody={infoBody}>
                <Well bsSize="small">Click below to clear all current state.<br /><br />
                    When you restart / refresh the Blotter any predefined config will be re-added.</Well>

                {clearButton}

            </PanelWithButton>
        </div>
    }

    onClear() {
        this.props.Blotter.api.configClear();
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
