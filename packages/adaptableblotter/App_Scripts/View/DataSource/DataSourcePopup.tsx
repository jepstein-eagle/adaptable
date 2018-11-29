import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import * as DataSourceRedux from '../../Redux/ActionsReducers/DataSourceRedux'
import { FormControl, Row, Col, ControlLabel, Button, ListGroup, Glyphicon, Label, MenuItem, InputGroup, DropdownButton, HelpBlock, Well, FormGroup } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { AdaptableBlotterPopup } from '../Components/Popups/AdaptableBlotterPopup';
import * as StrategyConstants from '../../Core/Constants/StrategyConstants'
import { Helper } from '../../Utilities/Helpers/Helper'
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { IColItem } from "../UIInterfaces";
import { AdaptableBlotterForm } from "../Components/Forms/AdaptableBlotterForm";
import { StringExtensions } from "../../Utilities/Extensions/StringExtensions";
import { ButtonClear } from "../Components/Buttons/ButtonClear";
import { AccessLevel } from "../../Utilities/Enums";
import { EntitlementHelper } from "../../Utilities/Helpers/EntitlementHelper";


interface DataSourcePopupProps extends StrategyViewPopupProps<DataSourcePopupComponent> {
    CurrentDataSource: string;
    DataSources: string[];
    onSelectDataSource: (dataSource: string) => DataSourceRedux.DataSourceSelectAction,
}



class DataSourcePopupComponent extends React.Component<DataSourcePopupProps, {}> {


    render() {
        const selectDataSourceString: string = "Select Data Source"
        let cssClassName: string = this.props.cssClassName + "__dataSource";
      
        let infoBody :any[] = [ "Select a datasource from the dropdown to be evaluated on the server."]

        let currentDataSource = StringExtensions.IsNullOrEmpty(this.props.CurrentDataSource) ?
            selectDataSourceString : this.props.CurrentDataSource

        let availableSearches: any[] = this.props.DataSources.filter(s => s != this.props.CurrentDataSource).map((dataSource, index) => {
            return <MenuItem key={index} eventKey={index} onClick={() => this.onSelectedDataSourceChanged(dataSource)} >{dataSource}</MenuItem>
        })
        let content = <div>
            <Well bsSize="small">
                <HelpBlock>Choose a Data Source from the dropdown.</HelpBlock>
                <HelpBlock>Data Sources run on your server and supply data to the Grid.</HelpBlock>
            </Well>
            <AdaptableBlotterForm inline>
                <FormGroup controlId="formInlineName">
                    <InputGroup>
                        <DropdownButton disabled={availableSearches.length == 0} style={{minWidth: "500px"}}
                            className={cssClassName}  bsStyle={"default"} title={currentDataSource} id="DataSource" componentClass={InputGroup.Button}>
                            {availableSearches}
                        </DropdownButton>
                        <InputGroup.Button>
                            <ButtonClear
                                bsStyle={"default"}
                                cssClassName={cssClassName}
                                onClick={() => this.onSelectedDataSourceChanged("")}
                                overrideTooltip="Clear Data Source"
                                overrideDisableButton={StringExtensions.IsNullOrEmpty(this.props.CurrentDataSource)}
                                DisplayMode="Text+Glyph" 
                                AccessLevel={this.props.AccessLevel}
                                />
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>
            </AdaptableBlotterForm>
        </div>


        return <div className={cssClassName}>
            <PanelWithImage cssClassName={cssClassName} header={StrategyConstants.DataSourceStrategyName} bsStyle="primary" infoBody={infoBody} glyphicon={StrategyConstants.DataSourceGlyph} >
                {content}
            </PanelWithImage>
        </div>

    }


    onSelectedDataSourceChanged(dataSource: string) {
        this.props.onSelectDataSource(dataSource);
    }


}
function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        CurrentDataSource: state.DataSource.CurrentDataSource,
        DataSources: state.DataSource.DataSources,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSelectDataSource: (dataSource: string) => dispatch(DataSourceRedux.DataSourceSelect(dataSource)),
    };
}

export let DataSourcePopup = connect(mapStateToProps, mapDispatchToProps)(DataSourcePopupComponent);
