/// <reference path="../../../typings/index.d.ts" />
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as LayoutRedux from '../../Redux/ActionsReducers/LayoutRedux'
import { Provider, connect } from 'react-redux';
import { FormControl, Panel, Form, FormGroup, Button, ControlLabel, Checkbox, Row, Col, Well, HelpBlock, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { PanelWithImage } from '../PanelWithImage';
import { ILayout } from '../../Core/Interface/ILayoutStrategy'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { StringExtensions } from '../../Core/Extensions';
import { IUIConfirmation } from '../../Core/Interface/IStrategy';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { ButtonDelete } from '../ButtonDelete';
import { ButtonSave } from '../ButtonSave';

interface LayoutConfigProps extends IStrategyViewPopupProps<LayoutConfigComponent> {
    Layouts: ILayout[],
    CurrentLayout: string,
    Columns: IColumn[]
    onLoadLayout: (layoutName: string) => LayoutRedux.LayoutSelectAction
    onSaveLayout: (columns: string[], layoutName: string) => LayoutRedux.LayoutAddAction,
}

interface LayoutConfigState {
    NewLayoutName: string
}

class LayoutConfigComponent extends React.Component<LayoutConfigProps, LayoutConfigState> {
    constructor() {
        super();
        this.state = { NewLayoutName: "" }
    }

    render() {
        let optionLayouts = this.props.Layouts.map((x, index) => {
            return <option value={x.Name} key={index}>{x.Name}</option>
        })

        let layoutEntity = this.props.Layouts.find(x => x.Name == this.props.CurrentLayout)

        return (
            <PanelWithImage header="Layout" bsStyle="primary" glyphicon="th">

                <Panel header="Load Layout" bsStyle="info">
                    <AdaptableBlotterForm horizontal>
                        <FormGroup controlId="load">
                            <Col xs={2} >
                                <ControlLabel >Current</ControlLabel>
                            </Col>
                            <Col xs={7}>
                                <FormControl componentClass="select" placeholder="select" value={this.props.CurrentLayout}
                                    onChange={(x) => this.onLayoutSelectionChanged(x)} >
                                    {optionLayouts}
                                </FormControl>
                            </Col>
                            <Col xs={3}>
                                <ButtonDelete
                                    overrideTooltip="Delete Layout"
                                    overrideDisableButton={this.props.CurrentLayout == "Default"}
                                    ConfigEntity={layoutEntity}
                                    DisplayMode="Glyph+Text"
                                    ConfirmAction={LayoutRedux.DeleteLayout(this.props.CurrentLayout)}
                                    ConfirmationMsg={"Are you sure you want to delete '" + this.props.CurrentLayout + "'?"}
                                    ConfirmationTitle={"Delete Layout"} />
                            </Col>
                        </FormGroup>
                    </AdaptableBlotterForm>
                </Panel>

                <Panel header="Save As New Layout" bsStyle="info">
                    <AdaptableBlotterForm horizontal>
                        <Row>
                            <Col xs={12} >
                                <Well bsSize="small">
                                    <HelpBlock>
                                        Enter a name and then click 'Save' in order to create a new layout.
                                </HelpBlock>
                                    <HelpBlock>
                                        The new layout will contain the Blotter's current column visibility and order.
                                </HelpBlock>
                                </Well>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={2} >
                                <ControlLabel >Name</ControlLabel>
                            </Col>
                            <Col xs={7}>
                                <FormControl type="text" placeholder="Enter a Layout Name" onChange={(e: React.FormEvent) => this.onSaveLayoutNameChanged(e)} />
                            </Col>
                            <Col xs={3}>
                                <ButtonSave onClick={() => this.onSaveLayoutClicked()}
                                    overrideDisableButton={StringExtensions.IsNullOrEmpty(this.state.NewLayoutName)}
                                    DisplayMode="Glyph+Text" />
                            </Col>
                        </Row>
                    </AdaptableBlotterForm>
                </Panel>

            </PanelWithImage>
        );
    }

    private onLayoutSelectionChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.props.onLoadLayout(e.value);
    }

    private onSaveLayoutNameChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ NewLayoutName: e.value });
    }

    private onSaveLayoutClicked() {
        this.props.onSaveLayout(this.props.Columns.filter(c => c.Visible).map(x => x.ColumnId), this.state.NewLayoutName);
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
    };
}

export let LayoutConfig = connect(mapStateToProps, mapDispatchToProps)(LayoutConfigComponent);
