import * as React from "react";
import * as Redux from "redux";
import * as LayoutRedux from '../../Redux/ActionsReducers/LayoutRedux'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import { connect } from 'react-redux';
import { FormControl, Panel, FormGroup, ControlLabel, Row, Col, HelpBlock} from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { ILayout } from '../../Strategy/Interface/ILayoutStrategy'
import { IColumn, IConfigEntity } from '../../Core/Interface/IAdaptableBlotter';
import { StringExtensions } from '../../Core/Extensions/StringExtensions';
import { Helper } from '../../Core/Helpers/Helper';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { ButtonDelete } from '../Components/Buttons/ButtonDelete';
import { ButtonSave } from '../Components/Buttons/ButtonSave';
import { ButtonShare } from "../Components/Buttons/ButtonShare";

interface LayoutPopupProps extends StrategyViewPopupProps<LayoutPopupComponent> {
    Layouts: ILayout[],
    CurrentLayout: string,
    Columns: IColumn[]
    onLoadLayout: (layoutName: string) => LayoutRedux.LayoutSelectAction
    onSaveLayout: (columns: string[], layoutName: string) => LayoutRedux.LayoutAddAction,
    onShare: (entity: IConfigEntity) => TeamSharingRedux.TeamSharingShareAction,
}

interface LayoutPopupState {
    NewLayoutName: string,
    ErrorMessage: string
}

class LayoutPopupComponent extends React.Component<LayoutPopupProps, LayoutPopupState> {
    constructor() {
        super();
        this.state = {
            NewLayoutName: "",
            ErrorMessage: null
        }
    }

    render() {
        let infoBody: any[] = ["Use layouts to create and manage multiple named, sets of ordered columns", <br />, <br />, "To change a layout choose an item from the dropdown (you can also use the dropdown in the layout toolbar)", <br />, <br />, "To create a new layout, enter a name in the 'Save As New Layout' textbox."]
        let layoutEntity = this.props.Layouts.find(x => x.Name == this.props.CurrentLayout)
        
        let optionLayouts = this.props.Layouts.map((x, index) => {
            if (x.Name == this.props.CurrentLayout) {
                if (Helper.areArraysEqualWithOrder(layoutEntity.Columns, this.props.Columns.filter(y => y.Visible).map(x => x.ColumnId))) {
                    return <option value={x.Name} key={index}>{x.Name}</option>
                }
                else {
                    return <option value={x.Name} key={index}>{x.Name + " (Modified)"}</option>
                }
            }
            else {
                return <option value={x.Name} key={index}>{x.Name}</option>
            }
        })

        let validationState: "error" | null = StringExtensions.IsNullOrEmpty(this.state.ErrorMessage) ? null : "error";

        return (
            <PanelWithImage header={StrategyNames.LayoutStrategyName} bsStyle="primary" glyphicon={StrategyGlyphs.LayoutGlyph} infoBody={infoBody}>

                <Panel header="Load Layout" bsStyle="info">
                    <AdaptableBlotterForm horizontal>
                        <FormGroup controlId="load">
                            <Col xs={2} >
                                <ControlLabel >Current</ControlLabel>
                            </Col>
                            <Col xs={5}>
                                <FormControl componentClass="select" placeholder="select" value={this.props.CurrentLayout}
                                    onChange={(x) => this.onLayoutSelectionChanged(x)} >
                                    {optionLayouts}
                                </FormControl>
                            </Col>
                            <Col xs={5}>
                                <ButtonDelete
                                    overrideTooltip="Delete Layout"
                                    overrideDisableButton={this.props.CurrentLayout == "Default"}
                                    ConfigEntity={layoutEntity}
                                    DisplayMode="Glyph+Text"
                                    ConfirmAction={LayoutRedux.LayoutDelete(this.props.CurrentLayout)}
                                    ConfirmationMsg={"Are you sure you want to delete '" + this.props.CurrentLayout + "'?"}
                                    ConfirmationTitle={"Delete Layout"} />
                                    {' '}
                                {this.props.TeamSharingActivated && <ButtonShare onClick={() => this.props.onShare(layoutEntity)}
                                    overrideTooltip="Share Layout"
                                    overrideDisableButton={this.props.CurrentLayout == "Default"}
                                    ConfigEntity={layoutEntity}
                                    DisplayMode="Glyph+Text" />}
                            </Col>
                        </FormGroup>
                    </AdaptableBlotterForm>
                </Panel>

                <Panel header="Save As New Layout" bsStyle="info">
                    <AdaptableBlotterForm horizontal>
                        <Row>
                            <Col xs={12} >
                                <HelpBlock>
                                    Enter a name and then click 'Save' in order to create a new layout.  The new layout will contain the Blotter's current column visibility and order.
                                </HelpBlock>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={2} >
                                <ControlLabel >Name</ControlLabel>
                            </Col>
                            <Col xs={7}>
                                <FormGroup controlId="formInlineName" validationState={validationState}>
                                    <FormControl  type="text" placeholder="Enter a Layout Name" onChange={(e) => this.onSaveLayoutNameChanged(e)} />
                                    <FormControl.Feedback />
                                    <HelpBlock>{this.state.ErrorMessage}</HelpBlock>
                                </FormGroup>

                            </Col>
                            <Col xs={3}>
                                <ButtonSave onClick={() => this.onSaveLayoutClicked()}
                                    overrideDisableButton={StringExtensions.IsNullOrEmpty(this.state.NewLayoutName) || StringExtensions.IsNotNullOrEmpty(this.state.ErrorMessage)}
                                    DisplayMode="Glyph+Text" />
                            </Col>
                        </Row>
                    </AdaptableBlotterForm>
                </Panel>

            </PanelWithImage>
        );
    }

    private onLayoutSelectionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.onLoadLayout(e.value);
    }

    private onSaveLayoutNameChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({
            NewLayoutName: e.value,
            ErrorMessage: this.props.Layouts.findIndex(x => x.Name == e.value) > -1 ? "A Layout already exists with that name" : null
        });
    }

    private onSaveLayoutClicked() {
        let layoutName: string = this.state.NewLayoutName;
        this.setState({ NewLayoutName: "" });
        this.props.onSaveLayout(this.props.Columns.filter(c => c.Visible).map(x => x.ColumnId), layoutName);
        this.setState({ NewLayoutName: "" });
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Layouts: state.Layout.AvailableLayouts,
        CurrentLayout: state.Layout.CurrentLayout,
        Columns: state.Grid.Columns
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onLoadLayout: (layoutName: string) => dispatch(LayoutRedux.LayoutSelect(layoutName)),
        onSaveLayout: (Columns: string[], LayoutName: string) => dispatch(LayoutRedux.LayoutAdd(Columns, LayoutName)),
        onShare: (entity: IConfigEntity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.LayoutStrategyId))
    };
}

export let LayoutPopup = connect(mapStateToProps, mapDispatchToProps)(LayoutPopupComponent);
