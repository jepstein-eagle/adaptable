import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { Well, Panel, FormGroup, Col, ControlLabel, FormControl } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { IColumn } from '../../Core/Interface/IColumn';
import { Helper } from '../../Core/Helpers/Helper';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { IColItem } from "../UIInterfaces";
import { UIHelper } from '../UIHelper';
import * as StyleConstants from '../../Core/Constants/StyleConstants';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import { IAdaptableBlotterObject } from "../../Core/Api/Interface/AdaptableBlotterObjects";
import { ResetUserData } from '../../Redux/Store/AdaptableBlotterStore';
import { PanelWithImage } from "../Components/Panels/PanelWithImage";
import { AdaptableBlotterForm } from "../Components/Forms/AdaptableBlotterForm";

interface DataManagementPopupProps extends StrategyViewPopupProps<DataManagementPopupComponent> {
}


class DataManagementPopupComponent extends React.Component<DataManagementPopupProps, {}> {



    constructor() {
        super();
        this.state = UIHelper.EmptyConfigState();
    }

    render() {
        let cssClassName: string = this.props.cssClassName + "__userDataManagement";
        let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + "__userDataManagement";


        let infoBody: any[] = ["New strategy to clear user config."]

        let clearButton = <ButtonClear cssClassName={cssClassName} onClick={() => this.onClear()}
            bsStyle={"default"}
            overrideText={"Clear User Data"}
            overrideTooltip="Clear User Data"
            DisplayMode="Text"
            size={"large"} />

        return <div className={cssClassName}>
            <PanelWithImage cssClassName={cssClassName} infoBody={infoBody} header={StrategyNames.DataManagementStrategyName} bsStyle="primary" glyphicon={StrategyGlyphs.DataManagementGlyph}>

                <AdaptableBlotterForm horizontal>
                    <FormGroup controlId="clearData">

                        <Well bsSize="small">Click below to clear all current state.  When you restart / refresh the Blotter any Readonly predefined config will be re-added.</Well>

                        {clearButton}
                    </FormGroup>
                </AdaptableBlotterForm>

            </PanelWithImage>
        </div>
    }

    onClear() {
        this.props.BlotterApi.clearConfig();
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
