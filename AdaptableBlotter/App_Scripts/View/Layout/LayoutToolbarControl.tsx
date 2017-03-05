/// <reference path="../../../typings/index.d.ts" />
import * as React from "react";
import { Provider, connect } from 'react-redux';
import { Form, Panel, FormControl, ControlLabel, Button, OverlayTrigger, Tooltip, FormGroup, Glyphicon, Label, Row } from 'react-bootstrap';
import { StringExtensions } from '../../Core/Extensions';
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { ILayout } from '../../Core/Interface/ILayoutStrategy'
import * as LayoutRedux from '../../Redux/ActionsReducers/LayoutRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { IUIPrompt, IUIConfirmation } from '../../Core/Interface/IStrategy';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { IDashboardControl } from '../../Core/Interface/IDashboardStrategy';
import { Helper } from '../../Core/Helper';
import { ButtonSave } from '../ButtonSave';
import { ButtonDelete } from '../ButtonDelete';
import { ButtonNew } from '../ButtonNew';

interface LayoutToolbarControlComponentProps extends IStrategyViewPopupProps<LayoutToolbarControlComponent> {
    onLoadLayout: (layoutName: string) => LayoutRedux.LayoutSelectAction
    onSaveLayout: (columns: string[], layoutName: string) => LayoutRedux.LayoutSaveAction,
    onShowPrompt: (prompt: IUIPrompt) => PopupRedux.PopupShowPromptAction,
    onChangeControlCollapsedState: (ControlName: string, IsCollapsed: boolean) => DashboardRedux.DashboardChangeControlCollapseStateAction
    Columns: IColumn[],
    AvailableLayouts: ILayout[];
    CurrentLayout: string;
    LayoutDashboardControl: IDashboardControl
}

class LayoutToolbarControlComponent extends React.Component<LayoutToolbarControlComponentProps, {}> {

    render(): any {

        let availableLayouts = this.props.AvailableLayouts.map((x, index) => {
            return <option value={x.Name} key={index}>{x.Name}</option>
        })

        let layoutEntity = this.props.AvailableLayouts.find(x => x.Name == this.props.CurrentLayout)
        let collapsedContent = <ControlLabel> {this.props.CurrentLayout}</ControlLabel>

        let labelContent = <Label style={labelStyle} bsStyle="primary"><Glyphicon glyph="th" />{' '}Layout</Label>;

        let layoutContent = <FormGroup controlId="formAdvancedSearch">
            <FormControl componentClass="select" placeholder="select"
                value={this.props.CurrentLayout}
                onChange={(x) => this.onSelectedLayoutChanged(x)} >
                {availableLayouts}
            </FormControl>
            {' '}
            <ButtonSave onClick={() => this.onSaveLayoutClicked()}
                overrideTooltip="Save Changes to Current Layout"
                overrideDisableButton={this.props.CurrentLayout == "Default"}
                ConfigEntity={layoutEntity} 
                DisplayMode="Glyph+Text"/>
            {' '}
            <ButtonNew onClick={() => this.onAddLayoutClicked()}
                overrideTooltip="Create a new Layout using the Blotter's current column order and visibility" 
                DisplayMode="Glyph+Text"/>
            {' '}
            <ButtonDelete 
                overrideTooltip="Delete Layout"
                overrideDisableButton={this.props.CurrentLayout == "Default"}
                ConfigEntity={layoutEntity} 
                DisplayMode="Glyph+Text"
                ConfirmAction={LayoutRedux.DeleteLayout(this.props.CurrentLayout)}
                ConfirmationMsg={"Are you sure you want to delete '" + this.props.CurrentLayout + "'?"}
                ConfirmationTitle={"Delete Layout"}/>
        </FormGroup>

        return <Panel className="small-padding-panel" >
            {this.props.LayoutDashboardControl.IsCollapsed ?
                <AdaptableBlotterForm className='navbar-form' inline>
                    <div >
                        {labelContent}
                        {' '}
                        <OverlayTrigger overlay={<Tooltip id="toolexpand">Expand</Tooltip>}>
                            <Button bsStyle="primary" bsSize='small' style={buttonOpenStyle} onClick={() => this.expandCollapseClicked()}>
                                <Glyphicon glyph="chevron-right" />
                            </Button>
                        </OverlayTrigger>
                        {' '}
                        {collapsedContent}
                    </div>

                </AdaptableBlotterForm>
                :
                <AdaptableBlotterForm className='navbar-form' inline>
                    <div >
                        {labelContent}
                        {' '}
                        <OverlayTrigger overlay={<Tooltip id="toolcollapse">Collapse</Tooltip>}>
                            <Button bsSize='small' bsStyle="primary" style={buttonCloseStyle} onClick={() => this.expandCollapseClicked()}>
                                <Glyphicon glyph="chevron-up" />
                            </Button>
                        </OverlayTrigger>
                        <Row style={marginButtonStyle}>
                            {layoutContent}
                        </Row>
                    </div>
                </AdaptableBlotterForm>
            }
        </Panel>
    }

    expandCollapseClicked() {
        this.props.onChangeControlCollapsedState(this.props.LayoutDashboardControl.Name, !this.props.LayoutDashboardControl.IsCollapsed);
    }

    private onSaveLayoutClicked() {
        this.props.onSaveLayout(this.props.Columns.filter(c => c.Visible).map(x => x.ColumnId), this.props.CurrentLayout);
    }

    private onAddLayoutClicked() {
        let prompt: IUIPrompt = {
            PromptTitle: "Create New Layout",
            PromptMsg: "Please enter a layout name",
            ConfirmAction: LayoutRedux.LayoutAdd(this.props.Columns.filter(c => c.Visible).map(x => x.ColumnId), "")
        }
        this.props.onShowPrompt(prompt)
    }

    private onSelectedLayoutChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.props.onLoadLayout(e.value);
    }

}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        CurrentLayout: state.Layout.CurrentLayout,
        AvailableLayouts: state.Layout.AvailableLayouts,
        Columns: state.Grid.Columns,
        LayoutDashboardControl: state.Dashboard.DashboardControls.find(d => d.Name == "Layout"),

    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onLoadLayout: (layoutName: string) => dispatch(LayoutRedux.LayoutSelect(layoutName)),
        onSaveLayout: (columns: string[], layoutName: string) => dispatch(LayoutRedux.SaveLayout(columns, layoutName)),
        onShowPrompt: (prompt: IUIPrompt) => dispatch(PopupRedux.PopupShowPrompt(prompt)),
        onChangeControlCollapsedState: (controlName: string, isCollapsed: boolean) => dispatch(DashboardRedux.ChangeCollapsedStateDashboardControl(controlName, isCollapsed))
    };
}

export let LayoutToolbarControl = connect(mapStateToProps, mapDispatchToProps)(LayoutToolbarControlComponent);

var marginButtonStyle = {
    margin: '4px'
};

var noSearchStyle = {
    fontStyle: 'italic'
};

var labelStyle = {
    fontSize: 'small'
};

var buttonOpenStyle = {
    padding: '1px',
};

var buttonCloseStyle = {
    padding: '0px',
    marginTop: '2px',
    marginBottom: '4px'
};