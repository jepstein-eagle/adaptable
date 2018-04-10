﻿import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { FormControl } from 'react-bootstrap';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { IColumn } from '../../Core/Interface/IColumn';
import { ILayout } from '../../Strategy/Interface/ILayoutStrategy'
import * as LayoutRedux from '../../Redux/ActionsReducers/LayoutRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { IUIPrompt } from '../../Core/Interface/IMessage';
import { Helper } from '../../Core/Helpers/Helper';
import { ButtonSave } from '../Components/Buttons/ButtonSave';
import { ButtonDelete } from '../Components/Buttons/ButtonDelete';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { ButtonUndo } from '../Components/Buttons/ButtonUndo';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as ScreenPopups from '../../Core/Constants/ScreenPopups'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import * as GeneralConstants from '../../Core/Constants/GeneralConstants'
import { IGridSort } from "../../Core/Interface/Interfaces";
import { ObjectFactory } from "../../Core/ObjectFactory";

interface LayoutToolbarControlComponentProps extends ToolbarStrategyViewPopupProps<LayoutToolbarControlComponent> {
    onSelectLayout: (layoutName: string) => LayoutRedux.LayoutSelectAction;
    onSaveLayout: (layout: ILayout) => LayoutRedux.LayoutSaveAction;
    onNewLayout: () => PopupRedux.PopupShowAction;
    Layouts: ILayout[];
    CurrentLayout: string;
}



class LayoutToolbarControlComponent extends React.Component<LayoutToolbarControlComponentProps, {}> {

    render(): any {

        let layoutEntity = this.props.Layouts.find(x => x.Name == this.props.CurrentLayout)
        let isLayoutModified = this.isLayoutModified(layoutEntity);
        let availableLayouts = this.props.Layouts.map((x, index) => {
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

        let content = <span>
            <div className={this.props.IsReadOnly ? "adaptable_blotter_readonly" : ""}>
                <FormControl componentClass="select" placeholder="select" bsSize={"small"}
                    value={this.props.CurrentLayout}
                    onChange={(x) => this.onSelectedLayoutChanged(x)} >
                    {availableLayouts}
                </FormControl>
                {' '}
                <ButtonSave onClick={() => this.onSave()}
                    size={"small"}
                    overrideTooltip="Save Changes to Current Layout"
                    overrideDisableButton={this.props.CurrentLayout == GeneralConstants.DEFAULT_LAYOUT}
                    ConfigEntity={layoutEntity}
                    DisplayMode="Glyph" />
                {' '}
                <ButtonNew onClick={() => this.props.onNewLayout()}
                    size={"small"}
                    overrideTooltip="Create a new Layout"
                    DisplayMode="Glyph" />
                {' '}
                <ButtonUndo onClick={() => this.props.onSelectLayout(this.props.CurrentLayout)}
                    size={"small"}
                    overrideTooltip="Undo Layout Changes"
                    overrideDisableButton={!isLayoutModified}
                    ConfigEntity={layoutEntity}
                    DisplayMode="Glyph" />
                {' '}
                <ButtonDelete
                    size={"small"}
                    overrideTooltip="Delete Layout"
                    overrideDisableButton={this.props.CurrentLayout == GeneralConstants.DEFAULT_LAYOUT}
                    ConfigEntity={layoutEntity}
                    DisplayMode="Glyph"
                    ConfirmAction={LayoutRedux.LayoutDelete(this.props.CurrentLayout)}
                    ConfirmationMsg={"Are you sure you want to delete '" + this.props.CurrentLayout + "'?"}
                    ConfirmationTitle={"Delete Layout"} />
            </div>
        </span>

        return <div className="adaptable_blotter_style_dashboard_layout">
            <PanelDashboard headerText={StrategyNames.LayoutStrategyName} glyphicon={StrategyGlyphs.LayoutGlyph} onClose={() => this.props.onClose(StrategyIds.LayoutStrategyId)} onConfigure={() => this.props.onConfigure(this.props.IsReadOnly)}>
                {content}
            </PanelDashboard>
        </div>
    }

    private isLayoutModified(layoutEntity: ILayout): boolean {
        if (layoutEntity) {

            if (!Helper.areArraysEqualWithOrder(layoutEntity.Columns, this.props.Columns.filter(y => y.Visible).map(x => x.ColumnId))) {
                return true;
            }
            if (!Helper.areObjectsEqual(layoutEntity.GridSort, this.props.GridSort)) {
                return true;
            }
        }
        return false;
    }

    private onSelectedLayoutChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.onSelectLayout(e.value);
    }

    private onSave() {
        let layoutToSave = ObjectFactory.CreateLayout(this.props.Columns.filter(c => c.Visible), this.props.GridSort, this.props.CurrentLayout)
        this.props.onSaveLayout(layoutToSave);
    }

    private onUndo() {
        this.props.onSelectLayout(this.props.CurrentLayout);
    }

}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        CurrentLayout: state.Layout.CurrentLayout,
        Layouts: state.Layout.Layouts,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSelectLayout: (layoutName: string) => dispatch(LayoutRedux.LayoutSelect(layoutName)),
        onSaveLayout: (layout: ILayout) => dispatch(LayoutRedux.LayoutSave(layout)),
        onNewLayout: () => dispatch(PopupRedux.PopupShow(ScreenPopups.LayoutPopup, false, "New")),
        onClose: (dashboardControl: string) => dispatch(DashboardRedux.ChangeVisibilityDashboardControl(dashboardControl)),
        onConfigure: (isReadonly: boolean) => dispatch(PopupRedux.PopupShow(ScreenPopups.LayoutPopup, isReadonly))
    };
}

export let LayoutToolbarControl = connect(mapStateToProps, mapDispatchToProps)(LayoutToolbarControlComponent);
