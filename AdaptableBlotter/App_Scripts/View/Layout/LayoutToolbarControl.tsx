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
import { IDashboardStrategyControl } from '../../Core/Interface/IDashboardStrategy';
import { Helper } from '../../Core/Helper';
import { ButtonSave } from '../Components/Buttons/ButtonSave';
import { ButtonDelete } from '../Components/Buttons/ButtonDelete';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import * as StrategyIds from '../../Core/StrategyIds'

interface LayoutToolbarControlComponentProps extends IStrategyViewPopupProps<LayoutToolbarControlComponent> {
    onLoadLayout: (layoutName: string) => LayoutRedux.LayoutSelectAction
    onSaveLayout: (columns: string[], layoutName: string) => LayoutRedux.LayoutSaveAction,
    onShowPrompt: (prompt: IUIPrompt) => PopupRedux.PopupShowPromptAction,
    onChangeControlCollapsedState: (ControlName: string, IsCollapsed: boolean) => DashboardRedux.DashboardChangeControlCollapseStateAction
    Columns: IColumn[],
    AvailableLayouts: ILayout[];
    CurrentLayout: string;
    LayoutDashboardControl: IDashboardStrategyControl
    IsReadOnly: boolean
}

class LayoutToolbarControlComponent extends React.Component<LayoutToolbarControlComponentProps, {}> {

    render(): any {

        let layoutEntity = this.props.AvailableLayouts.find(x => x.Name == this.props.CurrentLayout)
        let isLayoutModified = layoutEntity && !Helper.areArraysEqualWithOrder(layoutEntity.Columns, this.props.Columns.filter(y => y.Visible).map(x => x.ColumnId))
        let availableLayouts = this.props.AvailableLayouts.map((x, index) => {
            if (x.Name == this.props.CurrentLayout) {
                if (!isLayoutModified) {
                    return <option value={x.Name} key={index}>{x.Name}</option>
                }
                else {
                    return <option value={x.Name} key={index}>{x.Name + "(Modified)"}</option>
                }
            }
            else {
                return <option value={x.Name} key={index}>{x.Name}</option>
            }
        })

        let tooltipText = this.props.LayoutDashboardControl.IsCollapsed ? "Expand" : "Collapse"


        let toolbarHeaderButton = <OverlayTrigger overlay={<Tooltip id="toolexpand">{tooltipText}</Tooltip>}>
            <Button bsStyle="primary" onClick={() => this.expandCollapseClicked()}>
                {' '}<Glyphicon glyph="th" />{' '}Layout{' '}<Glyphicon glyph={this.props.LayoutDashboardControl.IsCollapsed ? "chevron-down" : "chevron-up"} />
            </Button>
        </OverlayTrigger>

        let collapsedContent = <ControlLabel> {isLayoutModified ? this.props.CurrentLayout + "(Modified)" : this.props.CurrentLayout}</ControlLabel>

        let expandedContent = <span>
            <div style={marginButtonStyle} className={this.props.IsReadOnly ? "adaptable_blotter_readonly" : ""}>
                <FormControl componentClass="select" placeholder="select"
                    value={this.props.CurrentLayout}
                    onChange={(x) => this.onSelectedLayoutChanged(x)} >
                    {availableLayouts}
                </FormControl>
                {' '}
                <ButtonSave onClick={() => this.onSaveLayoutClicked()}
                    size="small"
                    overrideTooltip="Save Changes to Current Layout"
                    overrideDisableButton={this.props.CurrentLayout == "Default"}
                    ConfigEntity={layoutEntity}
                    DisplayMode="Glyph+Text" />
                {' '}
                <ButtonNew onClick={() => this.onAddLayoutClicked()}
                    size="small"
                    overrideTooltip="Create a new Layout using the Blotter's current column order and visibility"
                    DisplayMode="Glyph+Text" />
                {' '}
                <ButtonDelete
                    size="small"
                    overrideTooltip="Delete Layout"
                    overrideDisableButton={this.props.CurrentLayout == "Default"}
                    ConfigEntity={layoutEntity}
                    DisplayMode="Glyph+Text"
                    ConfirmAction={LayoutRedux.DeleteLayout(this.props.CurrentLayout)}
                    ConfirmationMsg={"Are you sure you want to delete '" + this.props.CurrentLayout + "'?"}
                    ConfirmationTitle={"Delete Layout"} />
            </div>
        </span>

        return <Panel className="small-padding-panel" >

            <AdaptableBlotterForm className='navbar-form' >
                <FormGroup controlId="formLayout">
                    {this.props.LayoutDashboardControl.IsCollapsed ?
                        <span>
                            {toolbarHeaderButton}
                            {' '}
                            {collapsedContent}
                        </span>
                        :
                        <span>
                            {toolbarHeaderButton}
                            {' '}  {' '}
                            {expandedContent}
                        </span>
                    }
                </FormGroup>

            </AdaptableBlotterForm>
        </Panel>
    }

    expandCollapseClicked() {
        this.props.onChangeControlCollapsedState(this.props.LayoutDashboardControl.Strategy, !this.props.LayoutDashboardControl.IsCollapsed);
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
        LayoutDashboardControl: state.Dashboard.DashboardStrategyControls.find(d => d.Strategy == StrategyIds.LayoutStrategyId),

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
    marginTop: '4px'
};