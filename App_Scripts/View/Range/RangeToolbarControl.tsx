import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Form, Dropdown, DropdownButton, Panel, FormControl, MenuItem, ControlLabel, Button, OverlayTrigger, Tooltip, FormGroup, Glyphicon, Label, Row } from 'react-bootstrap';
import { StringExtensions } from '../../Core/Extensions';
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { IRange } from '../../Core/Interface/IRangeStrategy'
import * as RangeRedux from '../../Redux/ActionsReducers/RangeRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { IUIPrompt, IUIConfirmation } from '../../Core/Interface/IStrategy';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { IDashboardStrategyControlConfiguration } from '../../Core/Interface/IDashboardStrategy';
import { Helper } from '../../Core/Helper';
import { ButtonSave } from '../Components/Buttons/ButtonSave';
import { ButtonDelete } from '../Components/Buttons/ButtonDelete';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import * as StrategyIds from '../../Core/StrategyIds'
import { RangeExportDestination } from '../../Core/Enums';


interface RangeToolbarControlComponentProps extends IStrategyViewPopupProps<RangeToolbarControlComponent> {
    onExportRange: (rangeUid: string, rangeExportDestination: RangeExportDestination) => RangeRedux.RangeExportAction;
    onSelectRange: (rangeUid: string) => RangeRedux.RangeSelectAction;
    onNewRange: () => PopupRedux.PopupShowAction;
    onEditRange: () => PopupRedux.PopupShowAction;
    onChangeControlCollapsedState: (ControlName: string, IsCollapsed: boolean) => DashboardRedux.DashboardChangeControlCollapseStateAction
    Columns: IColumn[],
    Ranges: IRange[];
    CurrentRangeId: string;
    RangeDashboardControl: IDashboardStrategyControlConfiguration
    IsReadOnly: boolean
}

class RangeToolbarControlComponent extends React.Component<RangeToolbarControlComponentProps, {}> {

    render(): any {
        let savedRange: IRange = this.props.Ranges.find(s => s.Uid == this.props.CurrentRangeId);

        let currentRangeId = StringExtensions.IsNullOrEmpty(this.props.CurrentRangeId) ?
            "select" : this.props.CurrentRangeId

        let availableRanges = this.props.Ranges.map((x, index) => {
            return <option value={x.Uid} key={index}>{x.Name}</option>
        })

        let tooltipText = this.props.RangeDashboardControl.IsCollapsed ? "Expand" : "Collapse"
        let csvMenuItem: any = <MenuItem disabled={this.props.IsReadOnly} onClick={() => this.props.onExportRange(currentRangeId, RangeExportDestination.CSV)} key={"csv"}><Glyphicon glyph="export" /> {"CSV"}</MenuItem>
        let JSONMenuItem: any = <MenuItem disabled={this.props.IsReadOnly} onClick={() => this.props.onExportRange(currentRangeId, RangeExportDestination.JSON)} key={"json"}><Glyphicon glyph="export" /> {"JSON"}</MenuItem>
        let clipboardMenuItem: any = <MenuItem disabled={this.props.IsReadOnly} onClick={() => this.props.onExportRange(currentRangeId, RangeExportDestination.Clipboard)} key={"clipboard"}><Glyphicon glyph="export" /> {"Clipboard"}</MenuItem>
        let excelMenuItem: any = <MenuItem disabled={true} onClick={() => this.props.onExportRange(currentRangeId, RangeExportDestination.Excel)} key={"excel"}><Glyphicon glyph="export" /> {"Excel"}</MenuItem>
        let symphonyMenuItem: any = <MenuItem disabled={true} onClick={() => this.props.onExportRange(currentRangeId, RangeExportDestination.Symphony)} key={"symphony"}><Glyphicon glyph="export" /> {"Symphony"}</MenuItem>

        let toolbarHeaderButton = <span>
            <OverlayTrigger overlay={<Tooltip id="toolexpand">{tooltipText}</Tooltip>}>
                <Button bsStyle="primary" bsSize="small" onClick={() => this.expandCollapseClicked()}>
                    {' '}<Glyphicon glyph="th" />{' '}Range{' '}<Glyphicon glyph={this.props.RangeDashboardControl.IsCollapsed ? "chevron-down" : "chevron-up"} />
                </Button>
            </OverlayTrigger>
            {' '}
            <FormControl componentClass="select" placeholder="select" bsSize="small"
                value={currentRangeId}
                onChange={(x) => this.onSelectedRangeChanged(x)} >
                <option value="select" key="select">Select a Range</option>
                {availableRanges}
            </FormControl>
            {' '}
            {currentRangeId != "select" &&
            <DropdownButton bsSize="small" bsStyle="default" title="Export To" id="exportDropdown" disabled={currentRangeId == "select"} >
                {csvMenuItem}
                {JSONMenuItem}
                {clipboardMenuItem}
                {excelMenuItem}
                {symphonyMenuItem}
            </DropdownButton>
            }
        </span>

        let expandedContent = <span>
            <div style={marginButtonStyle} className={this.props.IsReadOnly ? "adaptable_blotter_readonly" : ""}>

                <ButtonClear onClick={() => this.props.onSelectRange("")}
                    size="small"
                    overrideTooltip="Clear Current Range"
                    overrideDisableButton={currentRangeId == "select"}
                    DisplayMode="Glyph+Text" />
                {' '}
                <ButtonEdit onClick={() => this.props.onEditRange()}
                    size="small"
                    overrideTooltip="Edit Range"
                    overrideDisableButton={currentRangeId == "select"}
                    ConfigEntity={savedRange}
                    DisplayMode="Glyph+Text" />
                {' '}
                <ButtonNew onClick={() => this.props.onNewRange()}
                    size="small"
                    overrideTooltip="Create New Range"
                    DisplayMode="Glyph+Text" />
                {' '}
                <ButtonDelete
                    size="small"
                    overrideTooltip="Delete Range"
                    overrideDisableButton={currentRangeId == "select"}
                    ConfigEntity={savedRange}
                    DisplayMode="Glyph+Text"
                    ConfirmAction={RangeRedux.RangeDelete(savedRange)}
                    ConfirmationMsg={"Are you sure you want to delete '" + !savedRange ? "" : savedRange.Name + "'?"}
                    ConfirmationTitle={"Delete Range"} />
            </div>
        </span>

        return <Panel className="small-padding-panel" >

            <AdaptableBlotterForm inline>
                {this.props.RangeDashboardControl.IsCollapsed ?
                    <span>
                        {toolbarHeaderButton}
                    </span>
                    :
                    <span>
                        {toolbarHeaderButton}
                        {' '}  {' '}
                        {expandedContent}
                    </span>
                }
            </AdaptableBlotterForm>
        </Panel>
    }

    expandCollapseClicked() {
        this.props.onChangeControlCollapsedState(this.props.RangeDashboardControl.Strategy, !this.props.RangeDashboardControl.IsCollapsed);
    }


    private onSelectedRangeChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        if (e.value == "select") {
            this.props.onSelectRange("");
        } else {
            this.props.onSelectRange(e.value);
        }
    }

}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        CurrentRangeId: state.Range.CurrentRangeId,
        Ranges: state.Range.Ranges,
        Columns: state.Grid.Columns,
        RangeDashboardControl: state.Dashboard.DashboardStrategyControls.find(d => d.Strategy == StrategyIds.RangeStrategyId)
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onExportRange: (rangeUid: string, rangeExportDestination: RangeExportDestination) => dispatch(RangeRedux.RangeExport(rangeUid, rangeExportDestination)),
        onSelectRange: (rangeUid: string) => dispatch(RangeRedux.RangeSelect(rangeUid)),
        onNewRange: () => dispatch(PopupRedux.PopupShow("RangeConfig", false, "New")),
        onEditRange: () => dispatch(PopupRedux.PopupShow("RangeConfig", false, "Edit")),
        onChangeControlCollapsedState: (controlName: string, isCollapsed: boolean) => dispatch(DashboardRedux.ChangeCollapsedStateDashboardControl(controlName, isCollapsed))
    };
}

export let RangeToolbarControl = connect(mapStateToProps, mapDispatchToProps)(RangeToolbarControlComponent);

var marginButtonStyle = {
    marginTop: '4px'
};


